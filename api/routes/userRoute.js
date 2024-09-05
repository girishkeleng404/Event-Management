import express from 'express'
import { user_detailByIid, user_profile } from '../controllers/userController.js'
const router = express.Router()


router.route('/user_profile').get(user_profile);

router.route('/user_detail/:iid').get(user_detailByIid);

export default router;