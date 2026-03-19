import { Router } from "express";
import { validator } from "../middlewares/middleware.js";
import userValidator from "../validation/user-validator.js"
import usersController from "../controllers/users.controller.js";
import authController from "../controllers/auth.controller.js"
import { authGuard } from "../guards/auth.guard.js";
import { roleGuard } from "../guards/role.guard.js"
import { Roles } from "../enums/index.js";
let userRouter = Router()

export default userRouter
    .post("/signin", validator(userValidator.signIn), authController.signIn)
    .post("/otp", validator(userValidator.confirmOtp), authController.confirmOtp)
    .post("/token", authController.getAccessToken)
    .post("/reset-password", validator(userValidator.resetPassword), usersController.resetPassword)
    .post("/otp-reset", validator(userValidator.confirmOtpReset), usersController.getResetOtp)

    .post("/", authGuard, roleGuard(Roles.SUPERADMIN), validator(userValidator.create), usersController.create)
    .post("/regular-user", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), validator(userValidator.create), usersController.createUser)
    .get("/", authGuard, roleGuard(Roles.SUPERADMIN), usersController.findAll)

    .patch("/password/:id", authGuard, roleGuard(Roles.SUPERADMIN, "ID"), validator(userValidator.updatePassword), usersController.updatePassword)

    .get("/:id", authGuard, roleGuard(Roles.SUPERADMIN, "ID"), usersController.findById)
    .patch("/:id", authGuard, roleGuard(Roles.SUPERADMIN, "ID"), validator(userValidator.update), usersController.update)
    .delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN, "ID"), usersController.remove)