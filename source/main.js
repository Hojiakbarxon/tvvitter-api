import express from 'express'
import { envConfig } from './config/index.js'
import { connectDb } from './config/db.js'
import { errorHandle } from './middlewares/error-handle.js'
import indexRoute from './routers/index-route.js'
import cookieParser from 'cookie-parser'
import { createSuperAdmin } from './helpers/create-admin.js'
import ApiError from './utils/custom-error.js'
let app = express()
app.use(express.json())

let port = envConfig.PORT

app.use(cookieParser())

await connectDb()

await createSuperAdmin()

app.use("/api", indexRoute)
app.all(/(.*)/, (_req, _res, next) => {
    next(new ApiError(404, `Url not found`))
})
app.use(errorHandle)
app.listen(port, () => console.log(`Server is running on port ${port}`))