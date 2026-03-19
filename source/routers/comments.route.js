import { Router } from "express";
import { validator } from "../middlewares/middleware.js";
import commentsValidator from "../validation/comments-validator.js";
import commentController from "../controllers/comment-controller.js";
import { authGuard } from "../guards/auth.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/index.js";
let commentRouter = Router()

export default commentRouter
    .get("/", commentController.findAll)
    .get("/:id", commentController.findById)
    .post("/", authGuard, validator(commentsValidator.create), commentController.create)
    .patch("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, 'COMMENT'), validator(commentsValidator.update), commentController.update)
    .delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, 'COMMENT'), commentController.remove)