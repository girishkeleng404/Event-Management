import express from 'express'
import { user_profile } from '../controllers/userController.js'
const router = express.Router()


router.route('/user_profile').get(user_profile);


export default router;