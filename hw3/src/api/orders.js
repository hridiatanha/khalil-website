import { api } from "./client";

export function placeOrder(cartItems, total) {
  return api("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      items: cartItems.map((i) => ({
        name: i.name,
        price: Number(i.price),
        qty: Number(i.qty || 1),
      })),
      customer: { name: "", email: "" },
    }),
  });
}
