import express from 'express'
import { listingAddsById, listingPostById } from '../controllers/listingController.js'
const router = express.Router()

router.route('/listingPost/:id')
.post(listingPostById)
.get(listingAddsById);

export default router;