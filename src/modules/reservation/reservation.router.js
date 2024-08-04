// routes/reservation.routes.js
import express from 'express';
import { cancelReservations, confirmReservations, createReservation,
    UserCreateReservation, getReservations, paidReservations, updateReservations, 
    webhook,
    getUserReservations,
    getReservation,

  } from './reservation.controller.js';
import { protectedRoutes, allowTo } from '../../middleware/protectedRoute.js';

const reservRouter = express.Router();

reservRouter.post('/create', protectedRoutes, allowTo('admin'),createReservation);
reservRouter.post('/user-create-reservation', protectedRoutes, allowTo('user'),UserCreateReservation);

reservRouter.post('/payment-callback', protectedRoutes,webhook);


reservRouter.get('/get-reservations', protectedRoutes,getReservations);
reservRouter.get('/get-user-reservations', protectedRoutes, allowTo('user'),getUserReservations);


reservRouter.get('/get-one-reservation/:id', protectedRoutes, allowTo('admin','user'),getReservation);

reservRouter.put('/update-reservations/:id', protectedRoutes, allowTo('admin','user'),updateReservations);
reservRouter.put('/confirm-reservations/:id', protectedRoutes, allowTo('admin','user'),confirmReservations);
reservRouter.put('/cancel-reservations/:id', protectedRoutes, allowTo('admin','user'),cancelReservations);
reservRouter.put('/paid-reservations/:id', protectedRoutes, allowTo('admin'),paidReservations);





export default reservRouter;
