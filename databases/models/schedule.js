import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true,
    },
    name: {
        type: String,
       
    },
    times: [{time: {
        type: String,
        required: true,
    }}]
    
}, { timestamps: true });

export const Schedule = mongoose.model('schedule', scheduleSchema);
