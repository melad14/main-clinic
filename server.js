process.on('uncaughtException', (err) => {
  console.log(err);
});


import express from 'express';
//import http from 'http';
//import { Server } from 'socket.io';
import Pusher from 'pusher';
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
// import { messageModel } from './databases/models/chat.js';
// import { conversationModel } from './databases/models/conversation.js';

const app = express();

// const server = http.createServer(app); // Create HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// }); // Create Socket.IO server instance


const port = 3000;

dotenv.config();
const pusher = new Pusher({
  appId: "1824630",
  key: "b9daf28671dfd970a45f",
  secret: "09f856628c208de135e9",
  cluster: "eu",
  useTLS: true
});
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

app.all('*', (req, res, next) => {
  next(new AppErr("this route not found", 404));
});

app.use(globalErr);

conn();


// io.on('connection', (socket) => {
//   console.log(`Socket connected: ${socket.id}`);

//   socket.on('sendMessage', async (data) => {
//     const { senderRole, senderId, receiverId, messageContent } = data;
// console.log('messageSending',data);
//     let receiverRole = senderRole === 'user' ? 'admin' : 'user';
//     try {
//       let conversation = await conversationModel.findOne({
//         participants: { $all: [senderId, receiverId] }
//       });

//       if (!conversation) {
//         conversation = new conversationModel({
//           participants: [senderId, receiverId],
//           participantModel: [senderRole, receiverRole]
//         });
//         await conversation.save();
//       }

//       const message = new messageModel({
//         conversation: conversation._id,
//         sender: senderId,
//         senderModel: senderRole,
//         receiver: receiverId,
//         receiverModel: receiverRole,
//         message: messageContent
//       });

//       await message.save();
//       let sms = await messageModel.findById(message._id)
//         .populate('sender', 'fullName _id')
//         .populate('receiver', 'fullName _id');

//       socket.emit('newMessage', sms);
//       console.log('newMessage',sms);

//       console.log("Message sent successfully");
//     } catch (error) {
//       console.error("Error sending message:", error.message);
//     }
//   });


//   socket.on('disconnect', () => {
//     console.log(`Socket disconnected: ${socket.id}`);
//   });
// });

app.listen(port, () => console.log(`Running...`));

process.on('unhandledRejection', (err) => {
  console.log(err);
});
