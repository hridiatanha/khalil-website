import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({ items, total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

export default router;
