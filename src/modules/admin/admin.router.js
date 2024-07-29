import express from 'express'
import { addDoctorInfo, blockUser, createUser, create_admin, deleteDoctorInfo, editDoctorInfo, getUsers, get_pic, signIn_admin, specificUser, unblockUser, updateUser, upload_pic } from './admin.controller.js';
import { protectedRoutes, allowTo } from '../../middleware/protectedRoute.js';
import { upload } from '../../utils/fileUp.js';

const adminRouter = express.Router();

adminRouter.post('/create_admin', create_admin);
adminRouter.post('/signin_admin', signIn_admin);
adminRouter.post('/create-user',  protectedRoutes, allowTo('admin'),createUser);
adminRouter.put('/upload-image',  protectedRoutes, allowTo('admin'),upload.fields([{ name: 'image', maxCount: 1 }]),upload_pic);
adminRouter.get('/get-image', protectedRoutes, allowTo('admin'), get_pic);
adminRouter.get('/get-allUsers', protectedRoutes, allowTo('admin'), getUsers);
adminRouter.get('/get-user/:id', protectedRoutes, allowTo('admin'), specificUser);
adminRouter.put('/update-user/:id', protectedRoutes, allowTo('admin'), updateUser);

adminRouter.put('/block-user/:id', protectedRoutes, allowTo('admin'), blockUser);
adminRouter.get('/get-blocked', protectedRoutes, allowTo('admin'), getUsers);
adminRouter.put('/unblock-user/:id', protectedRoutes, allowTo('admin'), unblockUser );

// Routes for managing doctor information
adminRouter.post('/add-info', protectedRoutes, allowTo('admin'),upload.fields([{ name: 'images', maxCount: 5}]), addDoctorInfo);
adminRouter.put('/edit-doctor-info/:id', protectedRoutes, allowTo('admin'), upload.fields([{ name: 'images', maxCount: 5}]),editDoctorInfo);
adminRouter.delete('/delete-doctor-info/:id', protectedRoutes, allowTo('admin'), deleteDoctorInfo);


export default adminRouter