import express from 'express';
import { profileDetailsById, updateProfileDetailsById } from '../config/profileController.js';
const router = express.Router();


// ProfileForm.jsx client file uses the following routes:
router.route('/profileDetails/:id')
.post(profileDetailsById)
.put(updateProfileDetailsById);


export default router;