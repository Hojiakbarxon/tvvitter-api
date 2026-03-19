import mongoose from "mongoose";
import { Genders, Roles } from "../enums/index.js";

let usersSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    profilePhoto: { type: String },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: [Roles.SUPERADMIN, Roles.ADMIN, Roles.USER], required: true },
    gender: { type: String, enum: [Genders.FEMALE, Genders.MALE] }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true, versionKey: false, transform: (doc, ret) => {
            delete ret.id
            return ret
        }
    },
    toObject: { virtuals: true }
})

usersSchema.virtual('posts', {
    ref: "Post",
    localField: "_id",
    foreignField: "userId"
})

usersSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "userId"
})

usersSchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "userId"
})
export default new mongoose.model("User", usersSchema)