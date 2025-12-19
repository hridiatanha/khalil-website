import React, { useEffect, useMemo } from "react";

function currency(n) {
  return `$${Number(n).toFixed(2)}`;
}

export default function CartDrawer({ open, setOpen, items, setItems }) {
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  function close() {
    setOpen(false);
  }

  function clearCart() {
    setItems([]);
  }

  function removeItem(name, price) {
    setItems((prev) => prev.filter((i) => !(i.name === name && i.price === price)));
  }

  function inc(name, price) {
    setItems((prev) =>
      prev.map((i) =>
        i.name === name && i.price === price ? { ...i, qty: i.qty + 1 } : i
      )
    );
  }

  function dec(name, price) {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.name === name && i.price === price) return { ...i, qty: i.qty - 1 };
          return i;
        })
        .filter((i) => i.qty > 0)
    );
  }

  // ESC to close (HW2)
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/35 z-[1100] ${open ? "" : "hidden"}`}
        onClick={close}
      />

      {/* Drawer */}
      <aside
        className={[
          "fixed right-0 top-0 bottom-0 z-[1200]",
          "w-[min(420px,90vw)] bg-white shadow-[-8px_0_24px_rgba(0,0,0,.15)]",
          "grid grid-rows-[auto_1fr_auto]",
          "transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 id="cart-title" className="text-2xl font-extrabold text-[#7a1414]">
            Your Cart
          </h2>
          <button
            onClick={close}
            className="text-2xl leading-none"
            aria-label="Close cart"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-auto grid gap-3">
          {items.length === 0 ? (
            <p>Your cart is empty. Add something tasty from the menu!</p>
          ) : (
            items.map((i) => (
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
                    onClick={() => dec(i.name, i.price)}
                    className="w-7 h-7 rounded-md border bg-white font-extrabold"
                    type="button"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-5 text-center font-bold">{i.qty}</span>
                  <button
                    onClick={() => inc(i.name, i.price)}
                    className="w-7 h-7 rounded-md border bg-white font-extrabold"
                    type="button"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <strong>{currency(i.price * i.qty)}</strong>
                  <br />
                  <button
                    onClick={() => removeItem(i.name, i.price)}
                    className="text-[#7a1414] font-extrabold hover:underline"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t grid gap-3">
          <div className="flex items-center justify-between text-lg">
            <span>Total:</span>
            <strong>{currency(total)}</strong>
          </div>

          <div className="flex gap-3">
            <button
              onClick={clearCart}
              className="flex-1 rounded-lg border-2 border-[#7a1414] px-4 py-2 font-extrabold text-[#7a1414]"
              type="button"
            >
              Clear Cart
            </button>
            <button
              className="flex-1 rounded-lg bg-[#7a1414] px-4 py-2 font-extrabold text-white opacity-70 cursor-not-allowed"
              type="button"
              disabled
              title="Demo only"
            >
              Checkout
            </button>
          </div>

          <p className="text-xs text-gray-600">
            * Demo cart for Homework 2 (no payment processing).
          </p>
        </div>
      </aside>
    </>
  );
}
