import jwt from "jsonwebtoken"
import { envConfig } from "../config/index.js"

class Token{
    getAccessToken(payload) {
        let accessToken =  jwt.sign(payload, envConfig.TOKEN.ACCESS_TOKEN_KEY, {
            expiresIn : envConfig.TOKEN.ACCESS_TOKEN_TIME
        })
        return accessToken
    }

    getRefreshToken(res,payload){
        let refreshToken =  jwt.sign(payload, envConfig.TOKEN.REFRESH_TOKEN_KEY, {
            expiresIn : envConfig.TOKEN.REFRESH_TOKEN_TIME
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            secure : false,
            maxAge : 30 * 24 * 60 * 60 * 1000
        })
        return refreshToken
    }
    verifyAccess(token){
        let isMatch = jwt.verify(token, envConfig.TOKEN.ACCESS_TOKEN_KEY)
        return isMatch
    }
    verifyRefresh(token){
        let isMatch = jwt.verify(token, envConfig.TOKEN.REFRESH_TOKEN_KEY)
        return isMatch
    }
}

export default new Token()