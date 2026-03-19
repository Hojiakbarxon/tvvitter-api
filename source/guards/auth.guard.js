import { catchAsync } from "../middlewares/catch-async.js";
import ApiError from "../utils/custom-error.js";
import token from "../utils/token.js";

export let authGuard = catchAsync(async (req, res, next) => {
    let auth = req.headers?.authorization
    if (!auth){
        throw new ApiError(401, `User did not sign in`)
    }

    let bearer = auth.split(' ')[0]
    let accessToken = auth.split(" ")[1]

    if (bearer != "Bearer" || !accessToken){
        throw new ApiError(401, `User did not sign in`)
    }

    let data = token.verifyAccess(accessToken)
    
    if (!data){
        throw new ApiError(401, `User did not sign in`)
    }
    req.user = data
    next()
})