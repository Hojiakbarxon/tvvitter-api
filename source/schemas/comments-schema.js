import mongoose from "mongoose";

let commentsSchema = new mongoose.Schema({
    description: { type: String, required: true },
    photo: { type: String },
    video: { type: String },
    audio: { type: String },
    postId: { ref: "Post", type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { ref: "User", type: mongoose.Schema.Types.ObjectId, required: true }
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

export default new mongoose.model('Comment', commentsSchema)