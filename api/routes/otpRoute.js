import express from 'express';
import { emailOTP, verifyOTP } from '../controllers/otpController.js';
const router = express.Router();


router.route('/otpSend').post(emailOTP);
router.route('/auth/verify-otp').post(verifyOTP);

export default router;