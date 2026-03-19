import bcrypt from "bcrypt"
import ApiError from "../utils/custom-error.js"

class Crypto {
    async decode(data) {
        try {
            let hashedData = await bcrypt.hash(data, 7)
            return hashedData
        } catch (error) {
            throw new ApiError(500, `Something went wrong`)
        }
    }
    async encode(data, hashedData) {
        try {
            let isMatch = await bcrypt.compare(data, hashedData)
            return isMatch
        } catch (error) {
            throw new ApiError(500, `Something went wrong`)
        }
    }
}

export default new Crypto()