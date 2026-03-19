import Joi from "joi";

class CommentValidator {
    create(data) {
        let comment = Joi.object({
            description: Joi.string().required(),
            photo: Joi.string().optional(),
            video: Joi.string().optional(),
            audio: Joi.string().optional(),
            postId: Joi.string().hex().length(24).required(),
            userId: Joi.string().hex().length(24).required()
        })

        return comment.validate(data)
    }
    update(data) {
        let comment = Joi.object({
            description: Joi.string().optional(),
            photo: Joi.string().optional(),
            video: Joi.string().optional(),
            audio: Joi.string().optional(),
            postId: Joi.string().hex().length(24).optional(),
            userId: Joi.string().hex().length(24).optional()
        })

        return comment.validate(data)
    }
}

export default new CommentValidator()