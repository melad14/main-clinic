// models/chatMessage.model.js
import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
