import { Router } from "express";
import MenuItem from "../models/MenuItem.js";

const router = Router();

// GET all menu items
router.get("/", async (req, res) => {
  const items = await MenuItem.find().sort({ section: 1, name: 1 });
  res.json(items);
});

export default router;