import mongoose from "mongoose";

let likesSchema = new mongoose.Schema({
    userId: { ref: "User", type: mongoose.Schema.Types.ObjectId, required: true },
    postId: { ref: "Post", type: mongoose.Schema.Types.ObjectId, required: true }
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

export default new mongoose.model("Like", likesSchema)