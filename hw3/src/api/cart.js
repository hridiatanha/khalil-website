const API_URL = "http://localhost:5001/api/cart";

export async function getCart() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addToCart(item) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateCart(item) {
  const res = await fetch(`${API_URL}/${item._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function clearCart() {
  await fetch(API_URL, { method: "DELETE" });
}
