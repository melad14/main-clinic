process.on('uncaughtException', (err) => {
  console.log(err);
});


import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { conn } from './databases/dbConnection/db.connection.js';
import { AppErr } from './src/utils/AppErr.js';
import { globalErr } from './src/middleware/globalErr.js';
import userRouter from './src/modules/auth/auth.router.js';
import reservRouter from './src/modules/reservation/reservation.router.js';
import artRouter from './src/modules/article/article.router.js';
import reportRouter from './src/modules/medicalReports/medicalReport.router.js';
import adminRouter from './src/modules/admin/admin.router.js';
import chatRouter from './src/modules/chat/chat.router.js';
import notificationRouter from './src/modules/notification/notification.route.js';
import scheduleRouter from './src/modules/schedule/schedule.router.js';

const app = express();



const port = 3000;

dotenv.config();

mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/medReport', reportRouter);
app.use('/api/v1/reservations', reservRouter);
app.use('/api/v1/articles', artRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/schedule', scheduleRouter);

// New Time Route
app.get('/api/v1/time', (req, res) => {
  const now = new Date();
  res.json({
    currentDateTime: now.toISOString(),
  });
});

app.all('*', (req, res, next) => {
  next(new AppErr("this route not found", 404));
});

app.use(globalErr);

conn();



app.listen(port, () => console.log(`Running...`));

process.on('unhandledRejection', (err) => {
  console.log(err);
});
