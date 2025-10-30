let currentSlide = 0;
let autoScroll = null;

/* --------------------- Gallery (existing) --------------------- */
// Move gallery slide manually
function moveSlide(direction) {
  const track = document.querySelector(".slides");
  if (!track) return;
  const slides = track.children;
  const total = slides.length;

  currentSlide = (currentSlide + direction + total) % total;
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-scroll every 3 seconds looping through all images
function startAutoScroll() {
  if (autoScroll) return;
  autoScroll = setInterval(() => { moveSlide(1); }, 3000);
}

// Pause auto-scroll
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
    try { items = JSON.parse(localStorage.getItem(storeKey)) || []; }
    catch { items = []; }
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
    if (it) { it.qty += 1; save(); }
  }

  function decrement(name, price) {
    const p = parseFloat(price);
    const it = items.find(i => i.name === name && i.price === p);
    if (it) {
      it.qty -= 1;
      if (it.qty <= 0) remove(name, p);
      else save();
    }
  }

  function clear() {
    items = [];
    save();
  }

  function list() { return items.slice(); }

  function total() {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
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
        <div class="cart-name"><strong>${i.name}</strong><br><small>${currency(i.price)}</small></div>
        <div class="qty-controls" aria-label="Quantity controls">
          <button class="qty-btn" data-action="dec" data-name="${i.name}" data-price="${i.price}">−</button>
          <span aria-live="polite">${i.qty}</span>
          <button class="qty-btn" data-action="inc" data-name="${i.name}" data-price="${i.price}">+</button>
        </div>
        <div class="cart-right">
          <strong>${currency(i.price * i.qty)}</strong><br>
          <button class="remove-btn" data-action="remove" data-name="${i.name}" data-price="${i.price}">Remove</button>
        </div>
      `;
      container.appendChild(row);
    });
  }

  const totalQty = items.reduce((n, i) => n + i.qty, 0);
  countEl.textContent = totalQty;
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
  /* Gallery (existing) */
  const track = document.querySelector(".slides");
  const slider = document.getElementById("gallery-slider");

  if (track && slider) {
    const slides = track.children;
    const total = slides.length;

    // Duplicate first slide for infinite looping
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    let index = 0;

    function slideNext() {
      index++;
      track.style.transition = "transform 0.6s ease-in-out";
      track.style.transform = `translateX(-${index * 100}%)`;

      // When reaching clone, reset to start instantly (no flicker)
      if (index === total) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = "translateX(0)";
        }, 600);
      }
    }

    autoScroll = setInterval(slideNext, 3000);

    // Manual nav buttons
    document.querySelector(".next").addEventListener("click", slideNext);
    document.querySelector(".prev").addEventListener("click", () => {
      index = (index - 1 + total) % total;
      track.style.transition = "transform 0.6s ease-in-out";
      track.style.transform = `translateX(-${index * 100}%)`;
    });

    // Pause on hover
    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", () => {
      if (!autoScroll) autoScroll = setInterval(slideNext, 3000);
    });
  }

  // Mobile nav toggle
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navbar");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  /* --------------------- Cart wiring --------------------- */
  // Add-to-cart buttons
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      Cart.add(name, price);
      updateCartUI();
      openCart(); // nice feedback
    });
  });

  // Drawer open/close
  const cartToggle = document.getElementById("cart-toggle");
  const cartClose = document.getElementById("cart-close");
  const cartBackdrop = document.getElementById("cart-backdrop");

  cartToggle?.addEventListener("click", () => { updateCartUI(); openCart(); });
  cartClose?.addEventListener("click", closeCart);
  cartBackdrop?.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  // Cart actions (event delegation)
  const itemsContainer = document.getElementById("cart-items");
  itemsContainer?.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.getAttribute("data-action");
    const name = target.getAttribute("data-name");
    const price = parseFloat(target.getAttribute("data-price") || "0");

    if (!action || !name) return;

    switch (action) {
      case "inc": Cart.increment(name, price); break;
      case "dec": Cart.decrement(name, price); break;
      case "remove": Cart.remove(name, price); break;
    }
    updateCartUI();
  });

  // Clear cart
  document.getElementById("clear-cart")?.addEventListener("click", () => {
    Cart.clear();
    updateCartUI();
  });

  // Initial paint
  updateCartUI();
});
