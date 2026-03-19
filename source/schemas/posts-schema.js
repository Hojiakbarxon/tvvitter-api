import mongoose from "mongoose";

let postsSchema = new mongoose.Schema({
    description: { type: String, required: true },
    photo: { type: String },
    video: { type: String },
    audio: { type: String },
    userId: { ref: "User", type: mongoose.Schema.Types.ObjectId, required: true },
    likeCounts: { type: Number, default: 0 }
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

postsSchema.virtual('comments', {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId"
})

postsSchema.virtual('likes', {
    ref: "Like",
    localField: "_id",
    foreignField: "postId"
})
export default mongoose.model('Post', postsSchema)