import express from "express";
import { orders_By_UserId_Place_id, ordersById } from "../controllers/ordersController.js";
const router = express.Router();

router.route('/orders/:id').get(ordersById);
router.route('/orders/:user_id/:place_id').get(orders_By_UserId_Place_id);

export default router;