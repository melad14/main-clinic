import mongoose from "mongoose";

const thalilSchema = mongoose.Schema({
    title: {
        type: String,
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    image:[String],
  
    terms: { type: String}


}, { timestamps: true })
export const thalilModel = mongoose.model('thalil', thalilSchema)