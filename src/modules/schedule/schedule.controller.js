import { Schedule } from "../../../databases/models/schedule.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import { AppErr } from "../../utils/AppErr.js";



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
    const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });

    if (!schedule) return next(new AppErr('Schedule not found', 404));

    res.status(200).json({ "message": 'Schedule updated successfully', schedule });
});


export const deleteSchedule = catchAsyncErr(async (req, res, next) => {
 
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndDelete(id);

    if (!schedule) return next(new AppErr('Schedule not found', 404));

    res.status(200).json({ "message": 'Schedule deleted successfully' });
});
