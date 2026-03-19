import { catchAsync } from "../middlewares/catch-async.js"
import ApiError from "../utils/custom-error.js"
import successResponse from "../utils/success-response.js"

export class BaseController {
    constructor(model, relation) {
        this.model = model
        this.relation = relation
    }

    create = catchAsync(async (req, res) => {
        let newModel = await this.model.create(req.body)
        return successResponse(res, newModel, 201)
    })

    findAll = catchAsync(async (req, res) => {
        let datas = await this.model.find().populate(this.relation)
        return successResponse(res, datas)
    })
    findById = catchAsync(async (req, res) => {
        let id = req.params.id
        let data = await this._getById(id)
        return successResponse(res, data)
    })
    update = catchAsync(async (req, res) => {
        let id = req.params.id
        await this._getById(id)
        let updatedData = await this.model.findByIdAndUpdate(id, req.body, { new: true })
        return successResponse(res, updatedData)
    })
    remove = catchAsync(async (req, res) => {
        let id = req.params?.id
        await this._getById(id)
        await this.model.findByIdAndDelete(id)

        return successResponse(res, {})
    })



    async _getById(id) {
        let data = await this.model.findById(id).populate(this.relation)
        if (!data) {
            throw new ApiError(404, `The data with this id -> ${id} is not found`)
        }
        return data
    }

    async _isExist(property, message) {
        let existedData = await this.model.findOne(property).populate(this.relation)
        if (existedData) {
            throw new ApiError(409, `${message} already exists`)
        }
    }
    async _isExistBefore(property, id, message) {
        let existedData = await this.model.findOne(property).populate(this.relation)
        if (existedData && existedData.id !== id) {
            throw new ApiError(409,`${message} already exists, please choose another one`)
        }
    }
}