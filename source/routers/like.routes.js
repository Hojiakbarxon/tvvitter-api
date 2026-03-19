import { Router } from "express";
import likeController from "../controllers/like.controller.js";
import { validator } from "../middlewares/middleware.js";
import likesValidator from "../validation/likes-validator.js";
import { authGuard } from "../guards/auth.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/index.js";

let likeRouter = Router()

export default likeRouter
    .get("/", likeController.findAll)
    .get("/:id", likeController.findById)
    .post('/', authGuard, validator(likesValidator.create), likeController.create)
    .delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN, 'LIKE'), likeController.remove)
