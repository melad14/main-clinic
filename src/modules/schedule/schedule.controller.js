import { Schedule } from "../../../databases/models/schedule.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import { AppErr } from "../../utils/AppErr.js";
import { notificationModel } from "../../../databases/models/notifcation.js";
import Pusher from 'pusher';

const pusher = new Pusher({
    appId: "1824630",
    key: "b9daf28671dfd970a45f",
    secret: "09f856628c208de135e9",
    cluster: "eu",
    useTLS: true
  });
  
export const createSchedule = catchAsyncErr(async (req, res, next) => {

    const schedule = new Schedule(req.body);
    await schedule.save();
    const notification = new notificationModel({
        title: "New Schedule Assigned",
        message: `New Schedule Assigned . Schedule ID: ${schedule._id}`,
      });
      await notification.save();
    
      pusher.trigger('clinic', 'newSchedule', {
        message: 'New Schedule created',
        notification
      });
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
    const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });

    if (!schedule) return next(new AppErr('Schedule not found', 404));

      
    const notification = new notificationModel({
        title: "update Schedule Assigned",
        message: `update Schedule Assigned . Schedule ID: ${schedule._id}`,

      });
      await notification.save();
    
      pusher.trigger('clinic', 'newSchedule', {
        message: 'New Schedule created',
        notification
      });  
    res.status(200).json({ "message": 'Schedule updated successfully', schedule });
});


export const deleteSchedule = catchAsyncErr(async (req, res, next) => {
 
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndDelete(id);

    if (!schedule) return next(new AppErr('Schedule not found', 404));

    res.status(200).json({ "message": 'Schedule deleted successfully' });
});
