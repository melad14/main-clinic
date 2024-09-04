import { Schedule } from "../../../databases/models/schedule.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import { AppErr } from "../../utils/AppErr.js";
import { notificationModel } from "../../../databases/models/notifcation.js";
import { sendNotificationToAll, sendNotificationToSpecificUser } from "../notification/oneSignalPushNotification.js";
import { Reservation } from "../../../databases/models/reservation.js";
import { userModel } from "../../../databases/models/user.model.js";

export const createSchedule = catchAsyncErr(async (req, res, next) => {

    const schedule = new Schedule(req.body);
    await schedule.save();

  

    res.status(201).json({ "message": 'success', schedule });
});


export const getSchedules = catchAsyncErr(async (req, res, next) => {

    const schedules = await Schedule.find()
    if (!schedules) return next(new AppErr('Schedules not found', 404));

    res.status(200).json({ "message": 'success', schedules });
});
export const getOneSchedule = catchAsyncErr(async (req, res, next) => {

    const {id}=req.params
    const schedule = await Schedule.findById(id)
    if (!schedule) return next(new AppErr('Schedule not found', 404));

    res.status(200).json({ "message": 'success', schedule });
});


export const updateSchedule = catchAsyncErr(async (req, res, next) => {
 
    const { id } = req.params;
    const finded = await Schedule.findByIdAndUpdate(id);

        // Find all reservations that match the updated schedule's date and time
        const reservations = await Reservation.find({ date: finded.date, time: finded.times.map(t => t.time) });

        // Send notifications to each user who has a reservation at the updated schedule's date and time
        for (const reservation of reservations) {
            const user = await userModel.findById(reservation.user);
            if (user && user.subscriptionId) {
                await sendNotificationToSpecificUser(user.subscriptionId, 'Schedule Updated', `The schedule on ${finded.date} at ${finded.times.map(t => t.time).join(', ')} has been updated.`);
            }
        }
        const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ "message": 'Schedule updated successfully', schedule });
});


export const deleteSchedule = catchAsyncErr(async (req, res, next) => {
 
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndDelete(id);

    if (!schedule) return next(new AppErr('Schedule not found', 404));

    res.status(200).json({ "message": 'Schedule deleted successfully' });
});
