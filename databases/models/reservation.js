
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
   
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending'
    },
    reserv_type: {
        type: String,
    },
    price: {
        type: Number,
      
    },
    paid: {
        type: String,
        enum: ['true', 'false'],
        default: 'false'
    },
    paidType: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash'
    }
}, { timestamps: true });

export const Reservation = mongoose.model('Reservation', reservationSchema);
