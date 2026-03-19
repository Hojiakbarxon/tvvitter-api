import { BaseController } from "./base-controller.js";
import User from "../schemas/users-schema.js"
import { catchAsync } from "../middlewares/catch-async.js";
import Crypto from "../crypto/crypto.js"
import { Roles } from "../enums/index.js";
import successResponse from "../utils/success-response.js";
import Post from "../schemas/posts-schema.js"
import Comment from "../schemas/comments-schema.js"
import Like from "../schemas/likes-schema.js"
import ApiError from "../utils/custom-error.js";
import generateOtp from "../utils/otp-generator.js";
import { getCache, setCache } from "../helpers/cache-control.js";
import { sendMail } from "../utils/mail-service.js";
class UserController extends BaseController {
    create = catchAsync(async (req, res) => {
        let { email, userName, password } = req.body
        await this._isExist({ email }, "Email ")
        await this._isExist({ userName }, "User name ")
        let hashedPassword = await Crypto.decode(password)
        delete req.body?.password
        let newUser = await User.create({
            hashedPassword,
            role: Roles.ADMIN,
            ...req.body
        })

        return successResponse(res, newUser, 201)
    })

    createUser = catchAsync(async (req, res) => {
        let { email, userName, password } = req.body
        await this._isExist({ email }, "Email ")
        await this._isExist({ userName }, "User name ")
        let hashedPassword = await Crypto.decode(password)
        delete req.body?.password
        let newUser = await User.create({
            hashedPassword,
            role: Roles.USER,
            ...req.body
        })

        return successResponse(res, newUser, 201)
    })

    update = catchAsync(async (req, res) => {
        let id = req.params?.id
        let user = await this._getById(id)

        let { email, userName } = req.body
        if (email) {
            await this._isExistBefore({ email }, id, `Email `)
        }

        if (userName) {
            await this._isExistBefore({ userName }, id, `User name `)
        }

        let result = {
            role: user?.role,
            ...req.body
        }

        let updatedUser = await User.findByIdAndUpdate(id, result, { new: true })

        return successResponse(res, updatedUser)
    })

    updatePassword = catchAsync(async (req, res) => {
        let id = req.params?.id
        let user = await this._getById(id)
        let { oldPassword, newPassword } = req.body

        if (!oldPassword && req.user?.role !== Roles.SUPERADMIN) {
            throw new ApiError(400, `Old password is required`)
        }
        if (oldPassword) {
            let isMatch = await Crypto.encode(oldPassword, user.hashedPassword)
            if (!isMatch) {
                throw new ApiError(400, `Old password is wrong`)
            }
            if (oldPassword === newPassword) {
                throw new ApiError(400, `Old password must be different from new password`)
            }
        }
        let hashedPassword = await Crypto.decode(newPassword)
        let updatedUser = await User.findByIdAndUpdate(id, { hashedPassword }, { new: true })

        return successResponse(res, updatedUser)

    })

    resetPassword = catchAsync(async (req, res) => {
        let { email } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(404, `The user with this email is not found`)
        }

        let otp = generateOtp()
        setCache(email, otp)

        let sms = await sendMail(email, otp)

        return successResponse(res, {
            user,
            otp
        })
    })

    getResetOtp = catchAsync(async (req, res) => {

        let { email, otp, newPassword } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(404, `The user with this email is not found`)
        }

        let data = getCache(email)

        if (!data || data !== otp) {
            throw new ApiError(400, `OTP is incorrect or expired`)
        }
        let hashedPassword = await Crypto.decode(newPassword)
        let updatedUser = await User.findOneAndUpdate({ email }, { hashedPassword }, { new: true })

        return successResponse(res, updatedUser)

    })


    remove = catchAsync(async (req, res) => {
        let userId = req.params?.id
        let user = await this._getById(userId)

        await Post.deleteMany({ userId })
        await Comment.deleteMany({ userId })
        await Like.deleteMany({ userId })
        await User.findByIdAndDelete(userId)

        return successResponse(res, {})
    })
}

export default new UserController(User, [{
    path: "comments",
    select: "description postId"
},
{
    path: "posts",
    select: "description likeCounts"
}, {
    path: "likes",
    select: 'postId',
    populate: {
        path: "postId",
        select: "userId",
        populate: {
            path: "userId",
            select: "userName profilePhoto"
        }
    }
}])