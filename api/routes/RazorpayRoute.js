import express from 'express';
import { orders, orderValidate, paymentByPaymentId } from '../controllers/RazorpayController.js';

const router = express.Router();

router.route('/orders').post(orders);
router.route('/payment/:paymentId').get(paymentByPaymentId);
router.route('/order/validate').post(orderValidate);

export default router;