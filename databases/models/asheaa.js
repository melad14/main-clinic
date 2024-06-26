import mongoose from "mongoose";

const asheaaSchema = mongoose.Schema({

    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    image: {
        type: String,
        required: true
    },
  
    terms: {
        type: [String],
    },

}, { timestamps: true })
export const asheaaModel = mongoose.model('asheaa', asheaaSchema)