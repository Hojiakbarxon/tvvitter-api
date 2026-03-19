import Joi from "joi";

class PostValidator {
    create(data) {
        let post = Joi.object({
            description: Joi.string().required(),
            photo: Joi.string().optional(),
            video: Joi.string().optional(),
            audio: Joi.string().optional(),
            userId : Joi.string().hex().length(24).required()
        })

        return post.validate(data)
    }
    update(data) {
        let post = Joi.object({
            description: Joi.string().optional(),
            photo: Joi.string().optional(),
            video: Joi.string().optional(),
            audio: Joi.string().optional(),
            userId : Joi.string().hex().length(24).optional()
        })

        return post.validate(data)
    }
}

export default new PostValidator()