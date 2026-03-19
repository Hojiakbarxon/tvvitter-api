import User from "../schemas/users-schema.js"
import { envConfig } from "../config/index.js"
import { Roles, Genders } from "../enums/index.js"
import crypto from "../crypto/crypto.js"
export async function createSuperAdmin() {
    try {
        let existedSuperAdmin = await User.findOne({ role: Roles.SUPERADMIN })
        if (!existedSuperAdmin) {
            let superAdmin = await User.create({
                fullName: envConfig.ADMIN.FULLNAME,
                profilePhoto: envConfig.ADMIN.PROFILE_PHOTO,
                email: envConfig.ADMIN.EMAIL,
                userName: envConfig.ADMIN.USERNAME,
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