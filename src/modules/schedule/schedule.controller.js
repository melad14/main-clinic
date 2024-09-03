import { Schedule } from "../../../databases/models/schedule.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import { AppErr } from "../../utils/AppErr.js";
import { notificationModel } from "../../../databases/models/notifcation.js";
import { sendNotificationToAll } from "../notification/oneSignalPushNotification.js";

export const createSchedule = catchAsyncErr(async (req, res, next) => {

    const schedule = new Schedule(req.body);
    await schedule.save();

    const  title= "New Schedule Assigned"
    const message= `New Schedule Assigned . Schedule date: ${schedule.date}
  Schedule name: ${schedule.name}
  Schedule times: ${schedule.times}
    `
    let notid='admin'

    const notification = new notificationModel({title,message,notid});
      await notification.save();
  
      await sendNotificationToAll(title,message)

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

      
    const  title= "Schedule updated"
    const message= `Schedule updated . Schedule date: ${schedule.date}
    Schedule name: ${schedule.name}
    Schedule times: ${schedule.times}
      `
   
    const notid="admin"

    const notification = new notificationModel({title,message,notid});
      await notification.save();
  
      await sendNotificationToAll(title,message)
    res.status(200).json({ "message": 'Schedule updated successfully', schedule });
});


export const deleteSchedule = catchAsyncErr(async (req, res, next) => {
 
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndDelete(id);

    if (!schedule) return next(new AppErr('Schedule not found', 404));

    res.status(200).json({ "message": 'Schedule deleted successfully' });
});
