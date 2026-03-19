import { BaseController } from "./base-controller.js";
import Comment from "../schemas/comments-schema.js"
class CommentController extends BaseController {
}

export default new CommentController(Comment, [{
    path: "postId",
    select: "description userId",
    populate : {
        path : "userId",
        select : "userName profilePhoto"
    }
}, {
    path: "userId",
    select: "userName profilePhoto"
}])