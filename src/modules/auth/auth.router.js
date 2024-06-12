import express from 'express'
import { completeProfile, profile, signIn, verifyOTP } from './auth.controller.js';
import { allowTo, protectedRoutes } from '../../middleware/protectedRoute.js';




const userRouter = express.Router();


userRouter.post('/signin', signIn);
userRouter.post('/verify-otp', verifyOTP);
userRouter.put('/complete-profile',protectedRoutes, allowTo('user') ,completeProfile);
userRouter.get('/profile',protectedRoutes, allowTo('user'), profile);
export default userRouter