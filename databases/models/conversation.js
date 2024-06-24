import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'participantModel',
        required: true
    }],
    participantModel: [{
        type: String,
        required: true,
        enum: ['user', 'admin']
    }],
}, { timestamps: true });

export const conversationModel = mongoose.model('conversation', conversationSchema);
