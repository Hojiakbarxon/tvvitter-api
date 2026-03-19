import { catchAsync } from "../middlewares/catch-async.js";
import { BaseController } from "./base-controller.js";
import Like from "../schemas/likes-schema.js"
import User from "../schemas/users-schema.js"
import Post from "../schemas/posts-schema.js"
import ApiError from "../utils/custom-error.js";
import successResponse from "../utils/success-response.js";
class LikeController extends BaseController {
    create = catchAsync(async (req, res) => {
        let { userId, postId } = req.body
        let user = await User.findById(userId)
        let post = await Post.findById(postId)
        let existedLike = await Like.findOne({ userId, postId })
        if (!user) {
            throw new ApiError(404, `The user with this id -> ${userId} is not found`)
        }
        if (!post) {
            throw new ApiError(404, `The post with this id -> ${postId} is not found`)
        }
        if (existedLike) {
            throw new ApiError(409, `User has already liked this post`)
        }
        let newLike = await Like.create(req.body)
        await Post.findByIdAndUpdate(postId, { $inc: { likeCounts: 1 } }, { new: true })

        return successResponse(res, newLike, 201)
    })
    remove = catchAsync(async (req, res) => {
        let id = req.params?.id
        let like = await this._getById(id)
        await Like.findByIdAndDelete(id)
        let post = await Post.findById(like.postId)

        await Post.findByIdAndUpdate(like.postId, { $inc: { likeCounts: -1 } }, { new: true })

        return successResponse(res, {})
    })
}

export default new LikeController(Like, [{
    path : "userId",
    select : "userName profilePhoto"
}, {
    path : "postId",
    select : "description likeCounts userId",
    populate : {
        path : "userId",
        select : "userName profilePhoto"
    }
}])