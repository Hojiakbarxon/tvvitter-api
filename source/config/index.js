import { config } from "dotenv"
config()

export let envConfig = {
    PORT: String(process.env.PORT),
    MONGO_URI: String(process.env.MONGO_URI),
    TOKEN: {
        ACCESS_TOKEN_KEY: String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TOKEN_TIME: String(process.env.ACCESS_TOKEN_TIME),
        REFRESH_TOKEN_KEY: String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TOKEN_TIME: String(process.env.REFRESH_TOKEN_TIME)
    },
    MAIL : {
        MAIL_PASS : String(process.env.MAIL_PASS),
        MAIL_PORT : Number(process.env.MAIL_PORT),
        MAIL_HOST : String(process.env.MAIL_HOST),
        MAIL_USER : String(process.env.MAIL_USER)
    },
    ADMIN : {
        USERNAME : String(process.env.SUPERADMIN_USERNAME),
        PASSWORD : String(process.env.SUPERADMIN_PASSWORD)
    }
}