import Joi from "joi";

class LikeValidator{
    create(data){
        let like = Joi.object({
            userId : Joi.string().hex().length(24).required(),
            postId : Joi.string().hex().length(24).required()
        })
        return like.validate(data)
    }

    update(data){
        let like = Joi.object({
            userId : Joi.string().hex().length(24).optional(),
            postId : Joi.string().hex().length(24).optional()
        })
        return like.validate(data)
    }
}

export default new LikeValidator()