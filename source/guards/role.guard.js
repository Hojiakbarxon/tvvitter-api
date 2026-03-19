import { catchAsync } from "../middlewares/catch-async.js"
import ApiError from "../utils/custom-error.js"
import Post from "../schemas/posts-schema.js"
import Comment from "../schemas/comments-schema.js"
import Like from "../schemas/likes-schema.js"
export let roleGuard = (...roles) => {
    return catchAsync(async (req, _res, next) => {

        if (roles.includes(req.user?.role)) {
            return next()
        }
        console.log(roles, req.user.role)
        if (roles.includes("ID")) {
            if (req.user?.id === req.params?.id) {
                return next()
            }
        }

        if (roles.includes("POSTID")) {
            let post = await Post.findById(req.params?.id)
            if (!post) {
                throw new ApiError(404, `Post is not found`)
            }

            if (req.user?.id === post.userId.toString()) {
                return next()
            }
        }

        if (roles.includes("COMMENT")) {
            let comment = await Comment.findById(req.params?.id)
            if (!comment) {
                throw new ApiError(404, `Comment is not found`)
            }

            if (req.user?.id === comment.userId.toString()) {
                return next()
            }
        }
        if (roles.includes("LIKE")) {
            let like = await Like.findById(req.params?.id)
            if (!like) {
                throw new ApiError(404, `Like is not found`)
            }

            if (req.user?.id === like.userId.toString()) {
                return next()
            }
        }



        throw new ApiError(403, `Forbidden User`)
    })
}