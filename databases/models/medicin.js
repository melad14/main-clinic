import mongoose from "mongoose";

const medicinSchema = mongoose.Schema({

    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    image:[String],
    
    terms: { type: String}


}, { timestamps: true })
export const medicinModel = mongoose.model('medicin', medicinSchema)