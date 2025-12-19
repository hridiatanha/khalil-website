import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import menuRoutes from "./src/routes/menu.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

dotenv.config();

const app = express(); // ✅ MUST COME BEFORE app.use()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

import cors from "cors";

app.use(cors({
  origin: "*",  // for class demo (later you can lock it down)
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type"]
}));
