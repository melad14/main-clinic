
import express from 'express';
import { getStatistics } from './statistics.controller.js';
const statRouter = express.Router();

statRouter.get('/insights', getStatistics);

export default statRouter;
