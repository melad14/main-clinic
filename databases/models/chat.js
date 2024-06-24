import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    
    conversation: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'conversation',
        required: true
    },
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'senderModel',
        required: true
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    },
    receiver: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'receiverModel',
        required: true
    },
    receiverModel: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const messageModel = mongoose.model('message', messageSchema);
