import express from 'express'
import { completeProfile, deleteAcc, getDoctor, getDoctorInfo, profile, signIn, verifyOTP } from './auth.controller.js';
import { allowTo, protectedRoutes } from '../../middleware/protectedRoute.js';
import { validation } from './../../middleware/validation.js';
import { signInSchema, verifySchema } from './auth.validation.js';




const userRouter = express.Router();


userRouter.post('/signin', validation(signInSchema),signIn);
userRouter.post('/verify-otp',validation(verifySchema), verifyOTP);
userRouter.put('/complete-profile',protectedRoutes, allowTo('user') ,completeProfile);
userRouter.get('/profile',protectedRoutes, allowTo('user'), profile);
userRouter.delete('/delete-account',protectedRoutes, allowTo('user'), deleteAcc);

userRouter.get('/get-doctor',protectedRoutes, allowTo('user','admin'), getDoctor);
userRouter.get('/get-doctor-info', getDoctorInfo);
export default userRouter