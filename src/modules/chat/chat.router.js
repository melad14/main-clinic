
// routes/chat.routes.js
import express from 'express';
import { ChatMessage } from '../../../databases/models/chat.js';
import { AppErr } from '../../utils/AppErr.js';

const chatRouter = express.Router();

// Get chat history
chatRouter.get('/history', async (req, res, next) => {
    try {
        const messages = await ChatMessage.find().populate('user', 'fullName').sort('timestamp');
        res.status(200).json(messages);
    } catch (error) {
        next(new AppErr('Error fetching chat history', 200));
    }
});

export default chatRouter;
