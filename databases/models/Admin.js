import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const adminSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: [6, 'password minLength is 6 characters'],
        required: true,
    },
   image:{
    type:String
   },
    role: {
        type: String,
        default:'admin'
    },
    messages: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'message'
    }],
   
}, { timestamps: true })

adminSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 7)
})

export const adminModel = mongoose.model('admin', adminSchema)