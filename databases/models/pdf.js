import mongoose from "mongoose";

const pdfScheme = mongoose.Schema({

    pdf: { type: String}

}, { timestamps: true })
export const pdfModel = mongoose.model('pdf', pdfScheme)