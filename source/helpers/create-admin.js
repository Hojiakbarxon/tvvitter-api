import User from "../schemas/users-schema.js"
import { envConfig } from "../config/index.js"
import { Roles, Genders } from "../enums/index.js"
import crypto from "../crypto/crypto.js"
export async function createSuperAdmin() {
    try {
        let existedSuperAdmin = await User.findOne({ role: Roles.SUPERADMIN })
        if (!existedSuperAdmin) {
            let superAdmin = await User.create({
                fullName: "Hojiakbarxon Olimxo'jayev",
                profilePhoto: "superadmin.img",
                email: "olimxojayev22.2007@gmail.com",
                userName: "Hojiakbar_superadmin",
                hashedPassword: await crypto.decode(envConfig.ADMIN.PASSWORD),
                role: Roles.SUPERADMIN,
                gender: Genders.MALE
            })
            console.log(superAdmin)
        } else {
            console.log(existedSuperAdmin)
        }


    } catch (error) {
        console.log(`Error on creating SuperAdmin`, error)
    }
}