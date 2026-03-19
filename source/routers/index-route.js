import { Router } from "express";
import postRouter from "./post-router.js";
import commentsRoute from "./comments.route.js";
import userRoute from "./user.route.js";
import likesRoute from "./like.routes.js"

let router = Router()

export default router
    .use("/posts", postRouter)
    .use("/comments", commentsRoute)
    .use("/users", userRoute)
    .use("/likes", likesRoute)