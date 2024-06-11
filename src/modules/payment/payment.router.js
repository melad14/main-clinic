// routes/payment.routes.js
import express from 'express';
import { processPayment } from './payment.controller.js';

const payRouter = express.Router();

payRouter.post('/process', processPayment);

export default payRouter;
