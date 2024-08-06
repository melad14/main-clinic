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
    image:[String],
    terms: { type: String}


}, { timestamps: true })
export const roshtaModel = mongoose.model('roshta', roshtaSchema)