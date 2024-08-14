
import { adminModel } from '../../../databases/models/Admin.js';
import { doctorInfoModel } from '../../../databases/models/doctorinfo.js';
import { userModel } from '../../../databases/models/user.model.js';
import { sendSMSTest } from '../../emails/user.sms.js';
import { AppErr } from '../../utils/AppErr.js';
import { catchAsyncErr } from './../../utils/catcherr.js';
import jwt from "jsonwebtoken"
import { thalilModel } from './../../../databases/models/tahalil.js';
import { roshtaModel } from './../../../databases/models/roshtat.js';
import { medicinModel } from '../../../databases/models/medicin.js';
import { asheaaModel } from '../../../databases/models/asheaa.js';
import { conversationModel } from '../../../databases/models/conversation.js';

// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
// };

const signIn = catchAsyncErr(async (req, res, next) => {

    const { phone } = req.body;
    let user = await userModel.findOne({ phone });
    if (user && user.blocked) {
        return next(new AppErr("User is blocked", 403));
    }
    if (!user) {
        const user = new userModel({ phone, fullName: '' })
        await user.save()
        const otp = '555666'
        // const otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
         await userModel.updateOne({ phone }, { otp });
        // await sendSMSTest(phone, `Your OTP is ${otp}`);

        res.status(200).json({ "message": "user created and OTP sent" });
    }
    else {
        // const otp = generateOTP();
        // const otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
        // await userModel.updateOne({ phone }, { otp, otpExpires });

        // await sendSMSTest(phone, `Your OTP is ${otp}`);

        res.status(200).json({ "message": "OTP sent" });
    }

});
const verifyOTP = catchAsyncErr(async (req, res, next) => {
    const { phone, otp } = req.body;
    let user = await userModel.findOne({ phone });
//|| new Date() > new Date(user.otpExpires)
    if (!user || user.otp !== otp ) {
        return next(new AppErr("Invalid or expired OTP", 200));
    }

   // await userModel.updateOne({ phone }, { otp: null, otpExpires: null });

    let token = jwt.sign({ user }, `${process.env.TOKEN_SK}`);
    res.status(200).json({ "message": "success", token });
});

const completeProfile = catchAsyncErr(async (req, res, next) => {

    const result = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true });
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

export const deleteAcc = catchAsyncErr(async (req, res, next) => {
    const userId = req.user._id;


    await thalilModel.deleteMany({ userid: userId });
    await roshtaModel.deleteMany({ userid: userId });
    await medicinModel.deleteMany({ userid: userId });
    await asheaaModel.deleteMany({ userid: userId });
    await conversationModel.deleteMany({ participants: userId });
    // Delete the user
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "success" });

});

export const getDoctor = catchAsyncErr(async (req, res, next) => {
    const doctor = await adminModel.find()

    res.status(200).json({ message: "success", doctor });

});
export const getDoctorInfo = catchAsyncErr(async (req, res, next) => {
    const doctorInfo = await doctorInfoModel.find()

    res.status(200).json({ message: "success", doctorInfo });

});


export {
    signIn, verifyOTP, completeProfile
}