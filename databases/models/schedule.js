import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({

    sunday: {
        times: [{
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        }],
    },
    monday: {
          times: [{
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        }],
    },
    tuesday: {
          times: [{
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        }],
    },
    wednesday: {
          times: [{
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        }],
    },
    thursday: {
          times: [{
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        }],
    },
    friday: {
          times: [{
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        }],
    },
    saturday: {
          times: [{
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        }],
    },
}, { timestamps: true });

export const Schedule = mongoose.model('schedule', scheduleSchema);
