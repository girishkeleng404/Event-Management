import express from 'express';
import { orders } from '../controllers/RazorpayController.js';

const router = express.Router();

router.route('/orders').post(orders);

export default router;