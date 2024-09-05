import express from 'express'
import { listingPostById } from '../controllers/listingController.js'
const router = express.Router()

router.route('/listingPost/:id').post(listingPostById);

export default router;