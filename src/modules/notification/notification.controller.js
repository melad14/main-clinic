import { notificationModel } from "../../../databases/models/notifcation.js";
import { AppErr } from "../../utils/AppErr.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import cron from 'node-cron';


export const getNotifications = catchAsyncErr(async (req, res, next) => {

    const notifications = await notificationModel.find().sort({ createdAt: -1 });

    res.status(200).json({ "message": " success", notifications })

});

export const updateNotification = catchAsyncErr(async (req, res, next) => {
    try {
        const notification = await notificationModel.findById(req.params.id);
        if (!notification) {
            return next(new AppErr("Notification not found", 404));
        } else {
            notification.status ? (notification.status = "read") : notification?.status;
        }

        await notification.save();

        const notifications = await notificationModel.find().sort({ createdAt: -1 });

        res.status(201).json({ "message": " success",  notifications});
    } catch (error) {
        return next(new AppErr(error.message, 500));
    }
});

export const getOneNotification = catchAsyncErr(async (req, res, next) => {
const{id}=req.params
        const notification = await notificationModel.findById(id);
        if (!notification) {
            return next(new AppErr("Notification not found", 404));
        } else {
            notification.status ? (notification.status = "read") : notification?.status;
        }

     await notification.save();


        res.status(201).json({ "message": " success",  notification, });
 
});

cron.schedule("0 0 0 * * *", async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel.deleteMany({ status: "read", createdAt: { $lt: thirtyDaysAgo } });
});