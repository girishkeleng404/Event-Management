import express from "express";
import { bookingById, bookingEditById } from "../controllers/bookingController.js";
const router = express.Router();

router.route('/booking/:id').post(bookingById);
router.route('/bookingEdit/:id').put(bookingEditById);

export default router;