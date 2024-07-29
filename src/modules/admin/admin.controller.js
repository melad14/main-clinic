import { adminModel } from "../../../databases/models/Admin.js";
import { userModel } from "../../../databases/models/user.model.js";
import { AppErr } from "../../utils/AppErr.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const create_admin = catchAsyncErr(async (req, res, next) => {
    const { userName, password } = req.body
    let user = await adminModel.findOne({ userName });

    if (user) return next(new AppErr("already exist", 200))

    let result = new adminModel({ userName, password })
    await result.save()
    res.status(200).json({ "message": " success", result })




});

export const signIn_admin = catchAsyncErr(async (req, res, next) => {
    const { userName, password } = req.body
    let user = await adminModel.findOne({ userName })
    if (!user || !await bcrypt.compare(password, user.password)) {
        return next(new AppErr("incorrect email or password", 200))
    }
    let token = jwt.sign({ user }, `${process.env.TOKEN_SK}`)
    res.json({ "message": "success", token })

});

export const upload_pic = catchAsyncErr(async (req, res, next) => {
    let id = req.user._id
    req.body.image = req.files['image']?.[0]?.path;
    let admin = await adminModel.findByIdAndUpdate(id, { image: req.body.image }, { new: true })
    if (!admin) return next(new AppErr("account not found", 200))
    res.json({ "message": "success",image: admin.image  })

});

export const get_pic = catchAsyncErr(async (req, res, next) => {
    let id = req.user._id

    let admin = await adminModel.findById(id)
    if (!admin) return next(new AppErr("account not found", 200))
    res.json({ "message": "success", image: admin.image })

});

export const createUser = catchAsyncErr(async (req, res, next) => {
    const { phone, fullName } = req.body;
    let find = await userModel.findOne({ phone });

    if (find) return next(new AppErr("already exist", 200))

    const user = new userModel({ phone, fullName })
    await user.save()
    res.status(200).json({ message: "user created ", user });



});

export const getUsers = catchAsyncErr(async (req, res, next) => {

    const users = await userModel.find({blocked:false})
        .populate('tahalil')
        .populate('roshta')
        .populate('asheaa')
        .populate('medicin')
        .populate('reservs')

    res.status(200).json({ message: "success", users });

});
export const specificUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const users = await userModel.findById(id)
        .populate('tahalil')
        .populate('roshta')
        .populate('asheaa')
        .populate('medicin')
        .populate('reservs');

    res.status(200).json({ message: "success", users });

});
export const updateUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id,req.body,{new:true})
     
    res.status(200).json({ message: "success", user });

});

export const blockUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
  
    user.blocked = true;
    await user.save();
  
    res.status(200).json({ "message": "User blocked" });
  });
  
export const unblockUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
  
    user.blocked = false;
    await user.save();
  
    res.status(200).json({ "message": "User unblocked"});
  });
  