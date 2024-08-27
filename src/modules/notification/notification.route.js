import express from "express";

import { createNotifications, getNotifications, getOneNotification, updateNotification } from "./notification.controller.js";
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";
import { validation } from './../../middleware/validation.js';
import { getNotSchema } from './notification.validation.js';

const notificationRouter = express.Router();
notificationRouter.post("/create-notification", createNotifications);
notificationRouter.get("/get-all-notifications", protectedRoutes, allowTo('user'), getNotifications);
notificationRouter.put("/update-notification/:id", protectedRoutes, allowTo('user'),  validation(getNotSchema), updateNotification);
notificationRouter.get("/get-notification/:id", protectedRoutes, allowTo('user'), validation(getNotSchema), getOneNotification);

export default notificationRouter;
