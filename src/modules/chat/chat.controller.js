import { adminModel } from "../../../databases/models/Admin.js";
import { messageModel } from "../../../databases/models/chat.js";
import { userModel } from "../../../databases/models/user.model.js";
import { catchAsyncErr } from "../../utils/catcherr.js";

// Function to send a message
export const sendMessage = catchAsyncErr( async (req, res) => {
    const { id } = req.params

    req.body.senderId = req.user._id
    req.body.receiverId = id

    if (req.user._id === 'user') {
        req.body.senderModel = 'user'
        req.body.receiverModel = 'admin'
    }
    else {
        req.body.senderModel = 'admin'
        req.body.receiverModel = 'user'
    }
    console.log(req.user.role);
    try {
        const message = new messageModel(req.body);

        await message.save();

        if (req.body.senderModel  === 'admin') {
            await adminModel.findByIdAndUpdate(req.body.senderId, { $push: { messages: message._id } });
        } else {
            await userModel.findByIdAndUpdate(req.body.senderId, { $push: { messages: message._id } });
        }

        if (req.body.receiverModel === 'admin') {
            await adminModel.findByIdAndUpdate(req.body.receiverId, { $push: { messages: message._id } });
        } else {
            await userModel.findByIdAndUpdate(req.body.receiverId, { $push: { messages: message._id } });
        }

        res.status(200).json({"message":"success",message});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Function to get messages between a user and an admin
export const getMessages = async (req, res) => {
    const { userId, adminId } = req.query;
    try {
        const messages = await messageModel.find({
            $or: [
                { sender: userId, receiver: adminId },
                { sender: adminId, receiver: userId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
