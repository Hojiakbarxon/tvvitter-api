import { BaseController } from "./base-controller.js";
import Post from "../schemas/posts-schema.js"
import { catchAsync } from "../middlewares/catch-async.js";
import Comment from "../schemas/comments-schema.js"
import Like from "../schemas/likes-schema.js"
import successResponse from "../utils/success-response.js";
class PostController extends BaseController{
    remove = catchAsync(async (req, res) => {
        let id = req.params?.id
        let post = await this._getById(id)
        await Comment.deleteMany({postId : id})
        await Like.deleteMany({postId : id})
        await Post.findByIdAndDelete(id)

        return successResponse(res, {})
    })
}

export default new PostController(Post, [{
    path: "comments",
    select : 'description userId',
    populate : {
        path : "userId",
        select : "userName"
    }
},
{
    path : "userId",
    select : "userName profilePhoto"
},
{
    path : 'likes',
    select : "userId",
    populate : {
        path : "userId",
        select : "userName profilePhoto"
    }
}])