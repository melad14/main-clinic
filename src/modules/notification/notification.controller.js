// controllers/notification.controller.js
import admin from 'firebase-admin';


import { userModel } from '../../../databases/models/user.model.js';
import { AppErr } from '../../utils/AppErr.js';

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

export const sendNotification = async (req, res, next) => {
    try {
        const { userId, message } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return next(new AppErr('User not found', 404));
        }

        const payload = {
            notification: {
                title: 'Custom Notification',
                body: message
            }
        };

        await admin.messaging().sendToDevice(user.deviceToken, payload);
        res.status(200).json({ message: 'Notification sent' });
    } catch (error) {
        next(new AppErr('Error sending notification', 500));
    }
};
