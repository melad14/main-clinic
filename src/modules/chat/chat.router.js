import express from 'express';
import { sendMessage, getMessages } from './chat.controller.js'; // Update the path as needed
import { allowTo, protectedRoutes } from '../../middleware/protectedRoute.js';

const chatRouter = express.Router();

chatRouter.post('/send-message/:id',protectedRoutes, allowTo('user','admin'), sendMessage);
chatRouter.get('/messages', getMessages);

export default chatRouter;
