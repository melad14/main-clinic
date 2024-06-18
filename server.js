import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
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
import { ChatMessage } from './databases/models/chat.js';

const app = express();
const port = 3000;

dotenv.config();
mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*',  // Adjust this to match your client origin
    methods: ['GET', 'POST'],
  },
});

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/medReport', reportRouter);
app.use('/api/v1/reservations', reservRouter);
app.use('/api/v1/articles', artRouter);
app.use('/api/v1/chat', chatRouter);

app.all('*', (req, res, next) => {
  next(new AppErr("this route not found", 404));
});

app.use(globalErr);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    const { userId, message } = data;
    const chatMessage = new ChatMessage({ user: userId, message });
    await chatMessage.save();
    io.emit('receiveMessage', { user: userId, message });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

conn();
server.listen(port, () => console.log(`Running on port ${port}`));

process.on('unhandledRejection', (err) => {
  console.log(err);
});

process.on('uncaughtException', (err) => {
  console.log(err);
});
