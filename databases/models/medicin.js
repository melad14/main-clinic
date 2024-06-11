import mongoose from "mongoose";

const medicinSchema = mongoose.Schema({

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
export const medicinModel = mongoose.model('medicin', medicinSchema)