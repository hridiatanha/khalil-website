import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    section: { type: String, required: true }, // "🍗 Biryani Specials"
    name: { type: String, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", MenuItemSchema);