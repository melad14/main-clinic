import { adminModel } from "../../../databases/models/Admin.js";
import { messageModel } from "../../../databases/models/chat.js";
import { userModel } from "../../../databases/models/user.model.js";
import { catchAsyncErr } from "../../utils/catcherr.js";


export const sendMessage = catchAsyncErr( async (req, res) => {
    const { id } = req.params

    req.body.sender = req.user._id
    req.body.receiver = id

    if (req.user.role=== 'user') {
        req.body.senderModel = 'user'
        req.body.receiverModel = 'admin'
    }
    else {
        req.body.senderModel = 'admin'
        req.body.receiverModel = 'user'
    }
   
    try {

        const message = new messageModel(req.body);
        await message.save();


        if (req.body.senderModel  === 'admin') {
            await adminModel.findByIdAndUpdate(req.body.sender, { $push: { messages: message._id } });
        } else {
            await userModel.findByIdAndUpdate(req.body.sender, { $push: { messages: message._id } });
        }

        if (req.body.receiverModel === 'admin') {
            await adminModel.findByIdAndUpdate(req.body.receiver, { $push: { messages: message._id } });
        } else {
            await userModel.findByIdAndUpdate(req.body.receiver, { $push: { messages: message._id } });
        }



        res.status(200).json({"message":"success",message});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


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

export const getAllChats = async (req, res) => {
    try {
        const messages = await messageModel.find()

        res.status(200).json({"message":"success",messages});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const adminGetChat = async (req, res) => {

    const {id}=req.params
    try {
        const messages = await messageModel.findById(id).populate('sender', 'fullName _id')  
        .populate('receiver', 'fullName _id');

        res.status(200).json({"message":"success",messages});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


