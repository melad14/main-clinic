import express from "express";

import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";
import { createSchedule, deleteSchedule, getOneSchedule, getSchedules, updateSchedule } from "./schedule.controller.js";


const scheduleRouter = express.Router();

scheduleRouter.post("/create-schedule", protectedRoutes, allowTo('admin'), createSchedule);
scheduleRouter.put("/edit-schedule/:id", protectedRoutes, allowTo('admin'), updateSchedule);
scheduleRouter.get("/get-all-schedule", protectedRoutes, allowTo('admin','user'), getSchedules);
scheduleRouter.get("/get-schedule/:id", protectedRoutes, allowTo('admin','user'), getOneSchedule);
scheduleRouter.delete("/delete-schedule/:id", protectedRoutes, allowTo('admin'), deleteSchedule);


export default scheduleRouter;
