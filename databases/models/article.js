
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
         required: true
    },
    link:{
      type:String
    },
    image:{
        type:String
    }
},{ timestamps: true });

export const articleModel = mongoose.model('Article', articleSchema);
