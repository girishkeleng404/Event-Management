import express from "express";
import { booking_details_By_Place_id, bookingById, bookingEditById } from "../controllers/bookingController.js";
const router = express.Router();

router.route('/booking/:id').post(bookingById);
router.route('/bookingEdit/:id').put(bookingEditById);
router.route('/booking_details/:place_id').get(booking_details_By_Place_id)
export default router;