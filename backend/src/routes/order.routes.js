import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

// POST /api/orders -> save order
router.post("/", async (req, res) => {
  try {
    const { items, customer } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must include items." });
    }

    const normalized = items.map((i) => ({
      name: String(i.name || ""),
      price: Number(i.price || 0),
      qty: Math.max(1, Number(i.qty || 1)),
    }));

    // validate
    if (normalized.some((i) => !i.name || i.price <= 0)) {
      return res.status(400).json({ message: "Invalid item in order." });
    }

    const total = normalized.reduce((sum, i) => sum + i.price * i.qty, 0);

    const order = await Order.create({
      items: normalized,
      total,
      customer: {
        name: customer?.name || "",
        email: customer?.email || "",
      },
      status: "placed",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders -> list orders (demo)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;