import mongoose from "mongoose";

const asheaaSchema = mongoose.Schema({

    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    image:[String],
    terms: { type: String}

}, { timestamps: true })
export const asheaaModel = mongoose.model('asheaa', asheaaSchema)