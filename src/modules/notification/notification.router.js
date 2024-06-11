// routes/notification.routes.js
import express from 'express';
import { sendNotification } from './notification.controller.js';

const notiRouter = express.Router();

notiRouter.post('/send', sendNotification);

export default notiRouter;
