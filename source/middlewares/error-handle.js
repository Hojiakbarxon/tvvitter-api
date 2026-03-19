export function errorHandle(err, req, res, next) {
    console.log(`Error has happened  `, err)

    let statusCode = err?.statusCode || 500
    let message = err?.message || 'Internal server error'

    return res.status(statusCode).json({
        statusCode,
        message
    })
}