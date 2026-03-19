import mongoose from "mongoose";
import { envConfig } from "./index.js";

let MONGO_URI = envConfig.MONGO_URI

export async function connectDb() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`Connected to the database successfully`)
    } catch (error) {
        console.log(`Error has happened to connect DB`)
    }
}