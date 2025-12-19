import dotenv from "dotenv";
import mongoose from "mongoose";
import MenuItem from "./models/MenuItem.js";

dotenv.config();

const menu = [
  { section: "🍗 Biryani Specials", name: "Chicken Biryani", price: 9.99 },
  { section: "🍗 Biryani Specials", name: "Beef Biryani", price: 11.99 },
  { section: "🍗 Biryani Specials", name: "Goat Biryani", price: 12.99 },
  { section: "🍗 Biryani Specials", name: "Shrimp Biryani", price: 13.99 },

  { section: "🥘 Curries", name: "Chicken Curry", price: 10.99 },
  { section: "🥘 Curries", name: "Beef Bhuna", price: 11.99 },
  { section: "🥘 Curries", name: "Goat Curry", price: 12.99 },
  { section: "🥘 Curries", name: "Paneer Tikka Masala", price: 11.49 },

  { section: "🍢 Grilled", name: "Chicken Tikka", price: 9.99 },
  { section: "🍢 Grilled", name: "Beef Seekh Kebab", price: 10.99 },
  { section: "🍢 Grilled", name: "Chicken Malai Tikka", price: 9.49 },
  { section: "🍢 Grilled", name: "Tandoori Chicken", price: 8.99 }
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menu);

  console.log("✅ Menu seeded successfully");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
