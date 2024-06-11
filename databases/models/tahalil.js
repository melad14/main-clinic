import mongoose from "mongoose";

const thalilSchema = mongoose.Schema({

    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    image: {
        type: String,
        required: true
    },
    special: {
        type: String,
    },
    terms: {
        type: [String],
        required: true,
    },

}, { timestamps: true })
export const thalilModel = mongoose.model('thalil', thalilSchema)