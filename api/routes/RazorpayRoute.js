import express from 'express';
import { orders, paymentByPaymentId } from '../controllers/RazorpayController.js';

const router = express.Router();

router.route('/orders').post(orders);
router.route('/payment/:paymentId').get(paymentByPaymentId);

export default router;