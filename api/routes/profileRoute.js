import express from 'express';
import { profileDetailsById } from '../config/profileController.js';
const router = express.Router();

router.route('/profileDetails/:id')
.post(profileDetailsById)


export default router;