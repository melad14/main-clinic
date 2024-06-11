import jwt from "jsonwebtoken";
import { AppErr } from "../utils/AppErr.js";
import { catchAsyncErr } from "../utils/catcherr.js";
import { userModel } from "../../databases/models/user.model.js";
import { adminModel } from "../../databases/models/admin.js";

export const protectedRoutes = catchAsyncErr(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next(new AppErr('Token not provided', 401));

    let decoded;
    try {
        decoded = jwt.verify(token, `${process.env.TOKEN_SK}`);
    } catch (err) {
        return next(new AppErr('Invalid token', 401));
    }

    let user = await userModel.findById(decoded.user._id) || await adminModel.findById(decoded.user._id);
    if (!user) return next(new AppErr('User not found', 401));

    req.user = user;
    next();
});



export const allowTo=(...roles)=>{
    return catchAsyncErr(async (req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppErr('you are not authorized to access this route . you are '+req.user.role,401))
        
        next()
    })
}


