import Stripe from 'stripe';
import { Payment } from '../../../databases/models/payment.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res, next) => {
    try {
        const { userId, amount, token } = req.body;
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token,
            description: `Payment by user ${userId}`
        });
        const payment = new Payment({ user: userId, amount, status: 'completed', transactionId: charge.id });
        await payment.save();
        res.status(200).json({ message: 'Payment successful', payment });
    } catch (error) {
        next(new AppErr('Payment failed', 500));
    }
};
