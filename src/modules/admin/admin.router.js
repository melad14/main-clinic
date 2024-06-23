import express from 'express'
import { createUser, create_admin, getUsers, get_pic, signIn_admin, specificUser, upload_pic } from './admin.controller.js';
import { protectedRoutes, allowTo } from '../../middleware/protectedRoute.js';
import { upload } from '../../utils/fileUp.js';

const adminRouter = express.Router();

adminRouter.post('/create_admin', create_admin);
adminRouter.post('/signin_admin', signIn_admin);
adminRouter.post('/create-user',  protectedRoutes, allowTo('admin','user'),createUser);
adminRouter.put('/upload-image',  protectedRoutes, allowTo('admin','user'),upload.fields([{ name: 'image', maxCount: 1 }]),upload_pic);
adminRouter.get('/get-image', protectedRoutes, allowTo('admin','user'), get_pic);
adminRouter.get('/get-allUsers', protectedRoutes, allowTo('admin','user'), getUsers);
adminRouter.get('/get-user/:id', protectedRoutes, allowTo('admin','user'), specificUser);

export default adminRouter