// routes/article.routes.js
import express from 'express';
import { deleteArticle, editArticle, getArticle, getArticles, uploadArticle } from './article.controller.js';
import { protectedRoutes, allowTo } from '../../middleware/protectedRoute.js';
import { upload } from './../../utils/fileUp.js';

const artRouter = express.Router();

artRouter.post('/upload', protectedRoutes, allowTo('admin'),  upload.fields([{ name: 'image', maxCount: 1 }]),uploadArticle);
artRouter.put('/edit/:id', protectedRoutes, allowTo('admin'),  upload.fields([{ name: 'image', maxCount: 1 }]),editArticle);

artRouter.get('/get-all-articles', protectedRoutes, allowTo('admin','user'),getArticles);
artRouter.get('/get-one-article/:id', protectedRoutes, allowTo('admin','user'),getArticle);
artRouter.delete('/delete-article/:id', protectedRoutes, allowTo('admin'),deleteArticle);

export default artRouter;
