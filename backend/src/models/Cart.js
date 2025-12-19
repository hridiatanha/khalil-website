import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    cartId: { type: String, required: true, unique: true }, // stored in localStorage
    items: { type: [CartItemSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
