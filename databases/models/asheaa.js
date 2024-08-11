import mongoose from "mongoose";

const asheaaSchema = mongoose.Schema({

    title: {
        type: String,
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    image:[String],
    pdf: [String], 
    terms: { type: String}

}, { timestamps: true })
export const asheaaModel = mongoose.model('asheaa', asheaaSchema)