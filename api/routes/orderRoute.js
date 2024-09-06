import express from "express";
import { checkOrderForHostByplaceId, orders_By_UserId_Place_id, ordersById } from "../controllers/ordersController.js";
const router = express.Router();

router.route('/orders/:id').get(ordersById);
router.route('/orders/:user_id/:place_id').get(orders_By_UserId_Place_id);
router.route('/checkOrderForHost/:placeId').get(checkOrderForHostByplaceId);

export default router;