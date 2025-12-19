import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import menuRoutes from "./src/routes/menu.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

dotenv.config();

const app = express();

// ✅ middleware (CORS + JSON)
app.use(
  cors({
    origin: "*", // OK for class project (lock down later)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// ✅ health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ routes
app.use("/api/menu", menuRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// ✅ connect + start
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Mongo error:", err);
    process.exit(1);
  });
