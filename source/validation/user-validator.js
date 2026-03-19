import Joi from "joi";

class UserValidator {
    create(data) {
        let user = Joi.object({
            fullName: Joi.string().required(),
            profilePhoto: Joi.string().optional(),
            email: Joi.string().email().required(),
            userName: Joi.string().required(),
            password: Joi.string().required(),
            gender: Joi.string().valid("MALE", "FEMALE").optional()
        })

        return user.validate(data)
    }
    update(data) {
        let user = Joi.object({
            fullName: Joi.string().optional(),
            profilePhoto: Joi.string().optional(),
            email: Joi.string().email().optional(),
            userName: Joi.string().optional(),
            gender: Joi.string().valid("MALE", "FEMALE").optional()
        })

        return user.validate(data)
    }

    updatePassword(data) {
        let user = Joi.object({
            oldPassword: Joi.string().optional(),
            newPassword: Joi.string().required()
        })

        return user.validate(data)
    }

    resetPassword(data) {
        let user = Joi.object({
            email : Joi.string().email().required()
        })

        return user.validate(data)
    }

    confirmOtpReset(data) {
        let user = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().required(),
            newPassword : Joi.string().required()
        })

        return user.validate(data)
    }

    signIn(data) {
        let user = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
        return user.validate(data)
    }
    confirmOtp(data) {
        let user = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().required(),
        })

        return user.validate(data)
    }
}

export default new UserValidator()