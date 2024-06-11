import { Payment } from "../../../databases/models/payment.js";
import { Reservation } from "../../../databases/models/reservation.js";


export const getStatistics = async (req, res, next) => {
    try {
        const totalRevenue = await Payment.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalReservations = await Reservation.countDocuments();
        res.status(200).json({ totalRevenue: totalRevenue[0]?.total || 0, totalReservations });
    } catch (error) {
        next(new AppErr('Error fetching statistics', 500));
    }
};
