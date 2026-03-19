import { Router } from "express";
import postController from "../controllers/post-controller.js";
import { validator } from "../middlewares/middleware.js";
import postsValidator from "../validation/posts-validator.js";
import { authGuard } from "../guards/auth.guard.js";
import { roleGuard } from "../guards/role.guard.js"
import { Roles } from "../enums/index.js"

let postRouter = Router()

export default postRouter
    .get("/", postController.findAll)
    .get("/:id", postController.findById)
    .post('/', authGuard, validator(postsValidator.create), postController.create)
    .patch("/:id", authGuard, roleGuard(Roles.SUPERADMIN,"POSTID"), validator(postsValidator.update), postController.update)
    .delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN,  "POSTID"), postController.remove)
