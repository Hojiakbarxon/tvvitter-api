import ApiError from "../utils/custom-error.js"

export function validator(schema) {
    return function (req, res, next) {
        let obj = schema(req.body)
        let { error } = obj

        if (error) {
            return next(new ApiError(422, error.details[0]?.message))
        }

        next()
    }
}