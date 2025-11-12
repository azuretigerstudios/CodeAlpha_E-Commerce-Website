import express from "express";
import Order from "../models/orderModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { items, totalPrice } = req.body;
  const order = await Order.create({ user: req.user.id, items, totalPrice });
  res.json(order);
});

export default router;
