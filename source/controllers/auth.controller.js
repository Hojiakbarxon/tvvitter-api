import { catchAsync } from "../middlewares/catch-async.js"
import User from "../schemas/users-schema.js"
import ApiError from "../utils/custom-error.js"
import crypto from "../crypto/crypto.js"
import generateOtp from "../utils/otp-generator.js"
import { sendMail } from "../utils/mail-service.js"
import successRes from "../utils/success-response.js"
import { getCache, setCache } from "../helpers/cache-control.js"
import Token from "../utils/token.js"
class AuthController {
    signIn = catchAsync(async (req, res) => {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            res.clearCookie("refreshToken")
            throw new ApiError(400, `Email or password is wrong`)
        }

        let isMatch = await crypto.encode(password, user?.hashedPassword)
        if (!isMatch) {
            res.clearCookie("refreshToken")
            throw new ApiError(400, `Email or password is wrong`)
        }

        let otp = generateOtp()
        setCache(email, otp)
        let sms = await sendMail(user?.email, `This ${otp} is your OTP to log in to tvvitter, Please do not share with anyone else`)
        console.log(sms)

        return successRes(res, {
            user,
            otp
        })
    })
    confirmOtp = catchAsync(async (req, res) => {
        let { email, otp } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(400, `Something went wrong`)
        }
        let value = getCache(email)
        if (!value || otp !== value) {
            throw new ApiError(400, `OTP is incorrect or expired`)
        }

        let payload = { id: user._id, fullName: user.fullName, role: user.role, gender: user.gender }

        let accessToken = Token.getAccessToken(payload)
        let refreshToken = Token.getRefreshToken(res, payload)

        return successRes(res, {
            user,
            accessToken,
            refreshToken
        })
    })
    getAccessToken = catchAsync(async (req, res) => {
        let refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            throw new ApiError(401, `Please sign in first`)
        }
        let data = Token.verifyRefresh(refreshToken)
        if (!data) {
            throw new ApiError(401, `Something went wrong please sign in again`)
        }
        let user = await User.findById(data?.id)
        if (!user) {
            throw new ApiError(404, `Your data is not found in our Database`)
        }

        let payload = { id: user._id, fullName: user.fullName, role: user.role, gender: user.gender }

        let accessToken = Token.getAccessToken(payload)
        return successRes(res, accessToken)
    })
}

export default new AuthController()