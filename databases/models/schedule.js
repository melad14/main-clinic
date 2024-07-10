import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    times: [{time: {
        type: String,
        required: true,
    }}]
    
}, { timestamps: true });

export const Schedule = mongoose.model('schedule', scheduleSchema);
