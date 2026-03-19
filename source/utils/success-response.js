export default function successResponse(res, data, statusCode = 200) {
    return res.status(statusCode).json({
        message: `Executed successfully!`,
        data,
        statusCode
    })
}