import { Router } from "express";
import Cart from "../models/Cart.js";

const router = Router();

// GET cart
router.get("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;
  const cart = await Cart.findOne({ cartId });
  res.json(cart || { cartId, items: [] });
});

// PUT cart (replace items)
router.put("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;
  const items = Array.isArray(req.body.items) ? req.body.items : [];

  const cart = await Cart.findOneAndUpdate(
    { cartId },
    { cartId, items },
    { upsert: true, new: true }
  );

  res.json(cart);
});

// DELETE cart (clear)
router.delete("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;

  await Cart.findOneAndUpdate(
    { cartId },
    { cartId, items: [] },
    { upsert: true }
  );

  res.json({ ok: true });
});

export default router;
