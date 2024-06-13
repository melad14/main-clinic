process.on('uncaughtException', (err) => {
    console.log(err);
})

import express from 'express'
import { conn } from './databases/dbConnection/db.connection.js'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import { AppErr } from './src/utils/AppErr.js';
import { globalErr } from './src/middleware/globalErr.js';
import cors from "cors"
import userRouter from './src/modules/auth/auth.router.js';
// import http from 'http';
// import { Server } from 'socket.io';
import reservRouter from './src/modules/reservation/reservation.router.js';
import artRouter from './src/modules/article/article.router.js';
import reportRouter from './src/modules/medicalReports/medicalReport.router.js';
import adminRouter from './src/modules/admin/admin.router.js';

const app = express()
const port = 3000

dotenv.config()
mongoose.set('strictQuery', true);

app.use(cors())

app.use(express.json())

// const server = http.createServer(app);
// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//     socket.on('emergency message', (msg) => {
//         io.emit('emergency message', msg);
//     });
// });


app.use('/api/v1/auth', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/medReport', reportRouter);
app.use('/api/v1/reservations', reservRouter);
app.use('/api/v1/articles', artRouter);



app.all('*', (req, res, next) => {
    next(new AppErr("this route not found", 404))
});



app.use(globalErr)

conn();
app.listen(process.env.PORT || port, () => console.log(`runing.....`))

process.on('unhandledRejection', (err) => {
    console.log(err);
})