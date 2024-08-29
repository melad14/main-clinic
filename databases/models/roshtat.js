import mongoose from "mongoose";

const roshtaSchema = mongoose.Schema({
    title: {
        type: String,
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    reservationId: {
        type: mongoose.Types.ObjectId,
        ref: "Reservation",
    },
    image:[String],
    terms: { type: String}


}, { timestamps: true })
export const roshtaModel = mongoose.model('roshta', roshtaSchema)