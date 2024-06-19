import mongoose from "mongoose";

const roshtaSchema = mongoose.Schema({

    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    reservationId: {
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
    }

}, { timestamps: true })
export const roshtaModel = mongoose.model('roshta', roshtaSchema)