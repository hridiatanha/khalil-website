import { useEffect, useMemo } from "react";
import { placeOrder } from "../api/orders";
import useLocalStorage from "../hooks/useLocalStorage";

function currency(n) {
  return `$${Number(n).toFixed(2)}`;
}

export default function CartDrawer({ open, onClose }) {
  const [cart, setCart] = useLocalStorage("kbiryani_cart_v1", []);

  const totalQty = useMemo(
    () => cart.reduce((sum, i) => sum + (i.qty || 0), 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + Number(i.price) * Number(i.qty || 0), 0),
    [cart]
  );

  // Expose addToCart globally so App.jsx can call window.addToCart(name, price)
  useEffect(() => {
    window.addToCart = (name, price) => {
      setCart(prev => {
        const p = Number(price);
        const idx = prev.findIndex(x => x.name === name && Number(x.price) === p);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
          return copy;
        }
        return [...prev, { name, price: p, qty: 1 }];
      });
    };

    return () => {
      // cleanup
      delete window.addToCart;
    };
  }, [setCart]);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function increment(name, price) {
    const p = Number(price);
    setCart(prev =>
      prev.map(i =>
        i.name === name && Number(i.price) === p ? { ...i, qty: i.qty + 1 } : i
      )
    );
  }

  function decrement(name, price) {
    const p = Number(price);
    setCart(prev =>
      prev
        .map(i =>
          i.name === name && Number(i.price) === p ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  }

  function removeItem(name, price) {
    const p = Number(price);
    setCart(prev => prev.filter(i => !(i.name === name && Number(i.price) === p)));
  }

  function clearCart() {
    setCart([]);
  }

  async function handleCheckout() {
    try {
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      await placeOrder(cart, total);
      clearCart();
      alert("Order placed successfully!");
      onClose?.();
    } catch (e) {
      console.error(e);
      alert("Order failed. Check backend is running.");
    }
  }

  return (
    <>
      {/* Header cart count badge helper (optional): if you have a cart badge elsewhere, you can use totalQty */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[1100] transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 w-[min(420px,90vw)] bg-white shadow-[-8px_0_24px_rgba(0,0,0,.15)] z-[1200]
        grid grid-rows-[auto_1fr_auto] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-[#7a1414]">Your Cart</h2>
          <button
            className="text-xl font-bold"
            onClick={onClose}
            aria-label="Close cart"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="p-4 overflow-auto grid gap-3">
          {cart.length === 0 ? (
            <p>Your cart is empty. Add something tasty from the menu!</p>
          ) : (
            cart.map((i) => (
              <div
                key={`${i.name}-${i.price}`}
                className="grid grid-cols-[1fr_auto_auto] gap-3 items-center p-3 border rounded-lg bg-[#fff8ee]"
              >
                <div>
                  <strong>{i.name}</strong>
                  <br />
                  <small>{currency(i.price)}</small>
                </div>

                <div className="inline-flex items-center gap-2">
                  <button
                    className="w-7 h-7 rounded-md border bg-white"
                    onClick={() => decrement(i.name, i.price)}
                    type="button"
                  >
                    −
                  </button>
                  <span className="min-w-[18px] text-center">{i.qty}</span>
                  <button
                    className="w-7 h-7 rounded-md border bg-white"
                    onClick={() => increment(i.name, i.price)}
                    type="button"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <strong>{currency(Number(i.price) * Number(i.qty))}</strong>
                  <br />
                  <button
                    className="text-[#7a1414] font-bold"
                    onClick={() => removeItem(i.name, i.price)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t grid gap-3">
          <div className="flex items-center justify-between text-lg">
            <span>Total:</span>
            <strong>{currency(total)}</strong>
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-md border-2 border-[#7a1414] text-[#7a1414] font-bold"
              onClick={clearCart}
              type="button"
            >
              Clear Cart
            </button>

            <button
              className="px-4 py-2 rounded-md bg-[#7a1414] text-white font-bold"
              onClick={handleCheckout}
              type="button"
            >
              Checkout
            </button>
          </div>

          <p className="text-xs text-gray-600">
            * Demo cart for Homework 3 (order is saved to database).
          </p>
        </div>
      </aside>
    </>
  );
}
