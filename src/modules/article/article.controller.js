
import { notificationModel } from '../../../databases/models/notifcation.js';
import { AppErr } from '../../utils/AppErr.js';
import { catchAsyncErr } from '../../utils/catcherr.js';
import { sendNotificationToAll } from '../notification/oneSignalPushNotification.js';
import { articleModel } from './../../../databases/models/article.js';

  

export const uploadArticle = catchAsyncErr(async (req, res, next) => {

    req.body.author = req.user._id
    req.body.image = req.files['image']?.[0]?.path;
    const article = new articleModel(req.body);
    if (!article) return next(new AppErr('Error uploading article', 200));
    await article.save();

    
    const  title= "New Schedule Assigned"
    const message= "New Schedule Assigned "
   
    const notid="admin"

    const notification = new notificationModel({title,message,notid});
      await notification.save();
  
      await sendNotificationToAll(title,message)

    res.status(200).json({ message: 'Article uploaded successfully', article });

})

export const editArticle = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;

    const result = await articleModel.findByIdAndUpdate( id , req.body, { new: true });
    if (!result) return next(new AppErr('Error editing Article', 200));
    res.status(200).json({ message: "success", result });

})

export const getArticles = catchAsyncErr(async (req, res, next) => {

    const Articles = await articleModel.find().populate('author');
    if (!Articles) return next(new AppErr('Error fetching Articles', 200));

    res.status(200).json({ message: "success", Articles });

})
export const getArticle = catchAsyncErr(async (req, res, next) => {

    const { id } = req.params;
    const Article = await articleModel.findById(id).populate('author');
    if (!Article) return next(new AppErr('Error fetching Article', 200));
    res.status(200).json({ message: "success", Article });

})
export const deleteArticle = catchAsyncErr(async (req, res, next) => {

    const { id } = req.params;
   await articleModel.findByIdAndDelete(id)
    res.status(200).json({ message: "success" });

})
