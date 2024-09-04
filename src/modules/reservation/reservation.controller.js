import { notificationModel } from "../../../databases/models/notifcation.js";
import { Reservation } from "../../../databases/models/reservation.js";
import { userModel } from "../../../databases/models/user.model.js";
import { AppErr } from "../../utils/AppErr.js";
import { catchAsyncErr } from "../../utils/catcherr.js";

export const createReservation = catchAsyncErr(async (req, res, next) => {
    const { fullName, date, time, price, reserv_type } = req.body;

    const user = await userModel.findOne({ fullName });
    if (!user) return next(new AppErr('User not found', 404));

    const reservation = new Reservation({ user: user._id, date, time, reserv_type, price, paid: true });

    await userModel.findOneAndUpdate({ fullName: user.fullName }, { $addToSet: { reservs: reservation._id } }, { new: true });
    await reservation.save();

    
    res.status(201).json({ message: 'Reservation created successfully', reservation });
});

export const UserCreateReservation = catchAsyncErr(async (req, res, next) => {
    const { date, time, price, reserv_type } = req.body;

    const user = await userModel.findById({ _id: req.user._id });

    if (!user) return next(new AppErr('User not found', 404));

    const reservation = new Reservation({ user: user._id, date, time, reserv_type, price });

    await userModel.findOneAndUpdate({ fullName: user.fullName }, { $addToSet: { reservs: reservation._id } }, { new: true });
    await reservation.save();

    res.status(200).json({ message: 'Reservation created successfully', reservation });

});

export const adminGetUserReservations = catchAsyncErr(async (req, res, next) => {

    const { userid } = req.body
    const reservations = await Reservation.find({ user: userid })
    if (!reservations) return next(new AppErr('Error fetching reservation', 200));
    res.status(200).json({ message: "success", reservations });

})

export const createCheckOut = catchAsyncErr(async (req, res, next) => {
    const { reservationId } = req.body;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) return next(new AppErr('Reservation not found', 404));

    const user = await userModel.findById(req.user._id);

    if (!user) return next(new AppErr('User not found', 404));

    const paymentKey = await generatePaymobPaymentKey(user, reservation.price);

    res.status(200).json({
        message: 'Checkout initialized successfully',
        paymentKey,
        reservationId: reservation._id
    });
});

async function generatePaymobPaymentKey(user, amount) {
    try {
        const authResponse = await axios.post('https://accept.paymobsolutions.com/api/auth/tokens', {
            api_key: 'YOUR_PAYMOB_API_KEY'
        });

        const token = authResponse.data.token;

        const orderResponse = await axios.post('https://accept.paymobsolutions.com/api/ecommerce/orders', {
            auth_token: token,
            delivery_needed: "false",
            amount_cents: amount * 100,
            currency: "EGP",
            items: []
        });

        const orderId = orderResponse.data.id;

        const paymentKeyResponse = await axios.post('https://accept.paymobsolutions.com/api/acceptance/payment_keys', {
            auth_token: token,
            amount_cents: amount * 100,
            expiration: 3600,
            order_id: orderId,
            billing_data: {
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                phone_number: user.phoneNumber,
                // other required billing data
            },
            currency: "EGP",
            integration_id: 'YOUR_INTEGRATION_ID'
        });

        return paymentKeyResponse.data.token;

    } catch (error) {
        console.error('Error generating payment key', error);
        throw new AppErr('Payment initiation failed', 500);
    }
}
export const webhook = catchAsyncErr(async (req, res) => {
    const { reservationId, success } = req.body;

    if (success) {
        await Reservation.findByIdAndUpdate(reservationId, { paid: 'true' });
        res.status(200).json({ message: 'Payment successful ' });
    } else {
        await Reservation.findByIdAndUpdate(reservationId, { paid: 'false' });
        res.status(400).json({ message: 'Payment failed ' });
    }
});

export const getReservations = catchAsyncErr(async (req, res, next) => {

    const reservations = await Reservation.find().populate({
        path: 'user',
        select: 'fullName _id'
    });
    if (!reservations) return next(new AppErr('Error fetching reservation', 200));
    res.status(200).json({ message: "success", reservations });

})

export const getReservation = catchAsyncErr(async (req, res, next) => {

    const { id } = req.params;
    const reservation = await Reservation.findById(id).populate('user');
    if (!reservation) return next(new AppErr('Error fetching reservation', 200));
    res.status(200).json({ message: "success", reservation });

})

export const getUserReservations = catchAsyncErr(async (req, res, next) => {

    const reservations = await Reservation.find({ user: req.user._id })
    if (!reservations) return next(new AppErr('Error fetching reservation', 200));
    res.status(200).json({ message: "success", reservations });

})

export const confirmReservations = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndUpdate(id, { status: 'confirmed' }, { new: true });

    if (!reservation) return next(new AppErr('Reservation not found', 200));

    res.status(200).json({ message: 'Reservation confirmed', reservation });
})

export const cancelReservations = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndUpdate(id, { status: 'canceled' ,eventCreater:req.user.role}, { new: true });

    if (!reservation) return next(new AppErr('Reservation not found', 200));

    res.status(200).json({ message: 'Reservation canceled', reservation });
})

export const paidReservations = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndUpdate(id, { paid: 'true' }, { new: true });

    if (!reservation) return next(new AppErr('Reservation not found', 200));

    res.status(200).json({ message: 'Reservation paid', reservation });
})

export const updateReservations = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { date, time } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(id, { date, time }, { new: true });

    if (!reservation) return next(new AppErr('Reservation not found', 404));

    res.status(200).json({ message: 'Reservation updated', reservation });
})

