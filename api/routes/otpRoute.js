import express from 'express';
import { emailOTP } from '../controllers/otpController.js';
const router = express.Router();


router.route('/otpSend').post(emailOTP);


export default router;