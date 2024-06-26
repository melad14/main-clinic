import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    role: {
        type: String,
        default: 'user'
    },
    tahalil: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'thalil'
    }],
    roshta: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'roshta'
    }],
    asheaa: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'asheaa'
    }],
    medicin: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'medicin'
    }],
    reservs: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Reservation'
    }],
    messages: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'message'
    }]

}, { timestamps: true })
export const userModel = mongoose.model('user', userSchema)