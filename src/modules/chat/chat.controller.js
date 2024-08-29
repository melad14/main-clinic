import { adminModel } from "../../../databases/models/Admin.js";
import { messageModel } from "../../../databases/models/chat.js";
import { conversationModel } from "../../../databases/models/conversation.js";
import { userModel } from "../../../databases/models/user.model.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import Pusher from 'pusher';
import * as dotenv from 'dotenv';
import { sendNotificationToSpecificUser } from "../notification/oneSignalPushNotification.js";

dotenv.config();

const pusher = new Pusher({
  appId: "1824630",
  key: "b9daf28671dfd970a45f",
  secret: "09f856628c208de135e9",
  cluster: "eu",
  useTLS: true
});

export const sendMessage = catchAsyncErr(async (req, res) => {

    req.body.sender = req.user._id;
    req.body.receiver = req.params.id;

    if (req.user.role === 'user') {
        req.body.senderModel = 'user';
        req.body.receiverModel = 'admin';
    } else {
        req.body.senderModel = 'admin';
        req.body.receiverModel = 'user';
    }

    try {
        
        let conversation = await conversationModel.findOne({
            participants: { $all: [req.body.sender, req.body.receiver] }
        });

        if (!conversation) {
            conversation = new conversationModel({
                participants: [req.body.sender, req.body.receiver],
                participantModel: [req.body.senderModel, req.body.receiverModel]
            });
            await conversation.save();
        }

        // Create and save the message
        const message = new messageModel({ ...req.body, conversation: conversation._id });
        await message.save();
    
        pusher.trigger('clinic', 'newMessage', message);
       
        
       if (req.body.senderModel === 'admin') {
            await adminModel.findByIdAndUpdate(req.body.sender, { $push: { messages: message._id } });
          let recevier=  await userModel.findById(req.body.receiver);
          const  title= "New message"
          const message= "you have new message "
          const playerId= recevier.subscriptionId
 
            await sendNotificationToSpecificUser(playerId,title,message)
        } else {
            await userModel.findByIdAndUpdate(req.body.sender, { $push: { messages: message._id } });
            let recevier=  await adminModel.findById(req.body.receiver);
          const  title= "New message"
          const message= "you have new message "
          const playerId= recevier.subscriptionId
 
            await sendNotificationToSpecificUser(playerId,title,message)
        }
  
        if (req.body.receiverModel === 'admin') {
            await adminModel.findByIdAndUpdate(req.body.receiver, { $push: { messages: message._id } });
        } else {
            await userModel.findByIdAndUpdate(req.body.receiver, { $push: { messages: message._id } });
        }

        res.status(200).json({ "message": "success", message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export const getMessages = async (req, res) => {
    const idd=req.user._id
    try {
        const messages = await messageModel.find({
            $or: [
                { sender: idd},
                {  receiver: idd}
            ]
        }).populate('sender', 'fullName _id')  
        .populate('receiver', 'fullName _id');

        res.status(200).json({"message":"success",messages});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllConversations = async (req, res) => {
    try {
        const conversations = await conversationModel.find().populate('participants', 'fullName _id');

        res.status(200).json({ "message": "success", conversations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const adminGetChat = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const messages = await messageModel.find({ conversation: id })
            .populate('sender', 'fullName _id')
            .populate('receiver', 'fullName _id');
        res.status(200).json({ "message": "success", messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


