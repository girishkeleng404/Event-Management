import express from 'express';
import { profile_detailByID, profileDetailsById, updateProfileDetailsById } from '../controllers/profileController.js';
const router = express.Router();


// ProfileForm.jsx client file uses the following routes:
router.route('/profileDetails/:id')
.post(profileDetailsById)
.put(updateProfileDetailsById);

router.route('/profile_detail/:id').get(profile_detailByID);

export default router;