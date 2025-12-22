let currentSlide = 0;
let autoScroll = null;

/* --------------------- Gallery (manual buttons) --------------------- */
function moveSlide(direction) {
  const track = document.querySelector(".slides");
  if (!track) return;

  const slides = track.children;
  const total = slides.length;

  currentSlide = (currentSlide + direction + total) % total;
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoScroll(slideNextFn) {
  if (autoScroll) return;
  autoScroll = setInterval(() => slideNextFn(), 3000);
}

function stopAutoScroll() {
  if (autoScroll) {
    clearInterval(autoScroll);
    autoScroll = null;
  }
}

/* --------------------- Cart State --------------------- */
const Cart = (() => {
  const storeKey = "kbiryani_cart_v1";
  let items = [];

  function load() {
    try {
      items = JSON.parse(localStorage.getItem(storeKey)) || [];
    } catch {
      items = [];
    }
  }

  function save() {
    localStorage.setItem(storeKey, JSON.stringify(items));
  }

  function add(name, price) {
    const p = parseFloat(price);
    const found = items.find(i => i.name === name && i.price === p);
    if (found) found.qty += 1;
    else items.push({ name, price: p, qty: 1 });
    save();
  }

  function remove(name, price) {
    const p = parseFloat(price);
    items = items.filter(i => !(i.name === name && i.price === p));
    save();
  }

  function increment(name, price) {
    const p = parseFloat(price);
    const it = items.find(i => i.name === name && i.price === p);
    if (it) {
      it.qty += 1;
      save();
    }
  }

  function decrement(name, price) {
    const p = parseFloat(price);
    const it = items.find(i => i.name === name && i.price === p);
    if (it) {
      it.qty -= 1;
      if (it.qty <= 0) remove(name, price);
      else save();
    }
  }

  function clear() {
    items = [];
    save();
  }

  function list() {
    return items.slice();
  }

  function total() {
    return items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  load();
  return { add, remove, increment, decrement, clear, list, total };
})();

/* --------------------- Cart UI --------------------- */
function currency(n) {
  return `$${n.toFixed(2)}`;
}

function updateCartUI() {
  const container = document.getElementById("cart-items");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");
  if (!container || !countEl || !totalEl) return;

  const items = Cart.list();
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p>Your cart is empty. Add something tasty from the menu!</p>`;
  } else {
    items.forEach(i => {
      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <div class="cart-name">
          <strong>${i.name}</strong><br>
          <small>${currency(i.price)}</small>
        </div>

        <div class="qty-controls" aria-label="Quantity controls">
          <button class="qty-btn" data-action="dec" data-name="${i.name}" data-price="${i.price}" type="button">−</button>
          <span aria-live="polite">${i.qty}</span>
          <button class="qty-btn" data-action="inc" data-name="${i.name}" data-price="${i.price}" type="button">+</button>
        </div>

        <div class="cart-right">
          <strong>${currency(i.price * i.qty)}</strong><br>
          <button class="remove-btn" data-action="remove" data-name="${i.name}" data-price="${i.price}" type="button">
            Remove
          </button>
        </div>
      `;
      container.appendChild(row);
    });
  }

  const totalQty = items.reduce((n, i) => n + i.qty, 0);
  countEl.textContent = String(totalQty);
  totalEl.textContent = currency(Cart.total());
}

function openCart() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.add("open");
  backdrop.hidden = false;
}

function closeCart() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.remove("open");
  backdrop.hidden = true;
}

/* --------------------- Init --------------------- */
document.addEventListener("DOMContentLoaded", () => {
  /* Gallery auto-loop */
  const track = document.querySelector(".slides");
  const slider = document.getElementById("gallery-slider");

  if (track && slider) {
    const slides = track.children;
    const total = slides.length;

    // Clone first slide for smooth loop
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    let index = 0;

    function slideNext() {
      index++;
      track.style.transition = "transform 0.6s ease-in-out";
      track.style.transform = `translateX(-${index * 100}%)`;

      if (index === total) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = "translateX(0)";
        }, 600);
      }
    }

    // Buttons (no inline onclick needed)
    document.querySelector(".next")?.addEventListener("click", slideNext);
    document.querySelector(".prev")?.addEventListener("click", () => {
      index = (index - 1 + total) % total;
      track.style.transition = "transform 0.6s ease-in-out";
      track.style.transform = `translateX(-${index * 100}%)`;
    });

    // Auto-scroll + pause on hover
    autoScroll = setInterval(slideNext, 3000);
    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", () => startAutoScroll(slideNext));
  }

  // Mobile nav toggle
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navbar");
  hamburger?.addEventListener("click", () => nav?.classList.toggle("open"));

  // Order Online opens cart
  document.getElementById("order-btn")?.addEventListener("click", () => {
    updateCartUI();
    openCart();
  });

  /* Cart wiring */
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price") || "0");
      if (!name) return;

      Cart.add(name, price);
      updateCartUI();
      openCart();
    });
  });

  document.getElementById("cart-toggle")?.addEventListener("click", () => {
    updateCartUI();
    openCart();
  });

  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-backdrop")?.addEventListener("click", closeCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  const itemsContainer = document.getElementById("cart-items");
  itemsContainer?.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    const action = t.getAttribute("data-action");
    const name = t.getAttribute("data-name");
    const price = parseFloat(t.getAttribute("data-price") || "0");
    if (!action || !name) return;

    if (action === "inc") Cart.increment(name, price);
    if (action === "dec") Cart.decrement(name, price);
    if (action === "remove") Cart.remove(name, price);

    updateCartUI();
  });

  document.getElementById("clear-cart")?.addEventListener("click", () => {
    Cart.clear();
    updateCartUI();
  });

  // Initial paint
  updateCartUI();
});

/* Optional: expose for console checks */
window.Cart = Cart;
window.updateCartUI = updateCartUI;
window.openCart = openCart;
