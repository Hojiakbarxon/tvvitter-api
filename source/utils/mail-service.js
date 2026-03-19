import nodemailer from "nodemailer"
import { envConfig } from "../config/index.js"

export async function sendMail(user, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: envConfig.MAIL.MAIL_HOST,
        port: envConfig.MAIL.MAIL_PORT,
        auth: {
            user: envConfig.MAIL.MAIL_USER,
            pass: envConfig.MAIL.MAIL_PASS
        }
    })
    let mailOptions = {
        from: envConfig.MAIL.MAIL_USER,
        to: user,
        subject: "tvvitter",
        text: message
    }
    let res = await transporter.sendMail(mailOptions)
    return res
}