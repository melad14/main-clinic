
import { adminModel } from '../../../databases/models/Admin.js';
import { userModel } from '../../../databases/models/user.model.js';
import { sendSMSTest } from '../../emails/user.sms.js';
import { AppErr } from '../../utils/AppErr.js';
import { catchAsyncErr } from './../../utils/catcherr.js';
import jwt from "jsonwebtoken"

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

const signIn = catchAsyncErr(async (req, res, next) => {
    const { phone } = req.body;
    let user = await userModel.findOne({ phone });

    if (!user) {
        const user = new userModel({ phone })
        await user.save()

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
        await userModel.updateOne({ phone }, { otp, otpExpires });
        await sendSMSTest(phone, `Your OTP is ${otp}`);
    
        res.status(200).json({ "message": "user created and OTP sent" });
    }
else{
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
    await userModel.updateOne({ phone }, { otp, otpExpires });

    await sendSMSTest(phone, `Your OTP is ${otp}`);

    res.status(200).json({ "message": "OTP sent" });
}
   
});
const verifyOTP = catchAsyncErr(async (req, res, next) => {
    const { phone, otp } = req.body;
    let user = await userModel.findOne({ phone });

    if (!user || user.otp !== otp || new Date() > new Date(user.otpExpires)) {
        return next(new AppErr("Invalid or expired OTP", 200));
    }

    await userModel.updateOne({ phone }, { otp: null, otpExpires: null });

    let token = jwt.sign({ user }, `${process.env.TOKEN_SK}`);
    res.status(200).json({ "message": "success", token });
});

const completeProfile = catchAsyncErr(async (req, res, next) => {

    const result = await userModel.findByIdAndUpdate( req.user._id , req.body, { new: true });
    if (!result) return next(new AppErr('Error complete profile', 200));
    res.status(200).json({ message: "success", result });

});


export const profile = catchAsyncErr(async (req, res, next) => {
  

    const users = await userModel.findById(req.user._id)
        .populate('tahalil')
        .populate('roshta')
        .populate('asheaa')
        .populate('medicin')
        .populate('reservs');

    res.status(200).json({ message: "success", users });

});

export const getDoctor = catchAsyncErr(async (req, res, next) => {
    const doctor=await adminModel.find()
  
    res.status(200).json({ message: "success", doctor });

});


export {
    signIn,verifyOTP,completeProfile
}