import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const doctorInfoSchema = mongoose.Schema({

    name: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    country: {
        type: String,
    },
    title: {  
        type: String,
       
    },
    study:{
        type: String,
    },
    branches: {
        type: String,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    youtube: {
        type: String,
    },
    twitter: {
        type: String,
    },
   images:[{
    type:String
   }],
    doctorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true })


export const doctorInfoModel = mongoose.model('doctorInfo', doctorInfoSchema)