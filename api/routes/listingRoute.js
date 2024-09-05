import express from 'express'
import { getListingById, listingAddsById, listingPostById, listings, putListingById } from '../controllers/listingController.js'
const router = express.Router()

router.route('/listingPost/:id')
.post(listingPostById)
.get(listingAddsById);

router.route('/listing/:id').get(getListingById).put(putListingById);

// currently not in use
router.route('/listings').get(listings);
export default router;