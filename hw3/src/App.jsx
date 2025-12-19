import React, { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Gallery from "./components/Gallery.jsx";
import Locations from "./components/Locations.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { menuSections } from "./data/menu.js";

import heroImg from "./assets/hero.jpg";
import logoImg from "./assets/cropped-cropped-Icon-logo_.png.webp";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  // HW2 key exactly
  const [cart, setCart] = useLocalStorage("kbiryani_cart_v1", []);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);

  function openCart() {
    setCartOpen(true);
  }

  function addToCart(name, price) {
    setCart((prev) => {
      const p = Number(price);
      const found = prev.find((i) => i.name === name && i.price === p);
      if (found) {
        return prev.map((i) =>
          i.name === name && i.price === p ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { name, price: p, qty: 1 }];
    });
    setCartOpen(true);
  }

  return (
    <div>
      <Header logoSrc={logoImg} cartCount={cartCount} onOpenCart={openCart} />

      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
        items={cart}
        setItems={setCart}
      />

      {/* HERO */}
      <section id="home" className="relative text-white text-center">
        <img
          src={heroImg}
          alt="Restaurant banner"
          className="w-full h-[60vh] object-cover brightness-75"
        />
        <div className="absolute inset-0 grid place-content-center gap-3 px-4 drop-shadow">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Khalil Biryani House
          </h1>
          <p className="font-semibold">
            Authentic Bengali &amp; Halal Delicacies in New York
          </p>
          <a
            href="#menu"
            className="mx-auto inline-block rounded-lg bg-[#f4b400] px-6 py-3 font-extrabold text-[#7a1414]"
          >
            View Menu
          </a>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-12 px-5">
        <h2 className="text-center text-3xl font-extrabold text-[#7a1414] mb-7">
          Our Menu
        </h2>

        <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuSections.map((sec) => (
            <article
              key={sec.title}
              className="bg-white rounded-xl p-5 shadow-lg shadow-black/5"
            >
              <h3 className="text-lg font-extrabold mb-4">{sec.title}</h3>

              <ul className="grid gap-3">
                {sec.items.map((it) => (
                  <li
                    key={it.name}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3"
                  >
                    <span className="font-medium">{it.name}</span>
                    <span className="font-extrabold text-[#7a1414]">
                      ${it.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(it.name, it.price)}
                      className="rounded-md bg-[#7a1414] px-3 py-1.5 text-white font-extrabold hover:opacity-95"
                      type="button"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-12 px-5">
        <h2 className="text-center text-3xl font-extrabold text-[#7a1414] mb-7">
          Gallery
        </h2>
        <Gallery />
      </section>

      {/* ABOUT */}
      <section id="about" className="py-12 px-5">
        <h2 className="text-center text-3xl font-extrabold text-[#7a1414] mb-7">
          About Us
        </h2>
        <div className="mx-auto max-w-[900px] bg-white rounded-xl p-6 shadow-lg shadow-black/5 leading-7">
          <p className="mb-4">
            Khalil&apos;s Food began operations in July 2017. We began our journey
            to provide authentic Indian and Asian cuisine through community
            service in the Bronx, New York.
          </p>
          <p>
            Our multi-cuisine eatery is segmented into{" "}
            <strong>Khalil Biryani House</strong>,{" "}
            <strong>Khalil Halal Chinese</strong>, and{" "}
            <strong>Khalil Catering</strong>. Over the years, we have received
            love and appreciation from the community for our satisfactory and
            pleasant dining services. Today, the establishment is truly a success
            story, with branches in the Bronx and Jackson Heights.
          </p>
        </div>
      </section>

      {/* LOCATIONS (exists in page like HW2; not required in top nav) */}
      <Locations />

      {/* CONTACT */}
      <section id="contact" className="py-12 px-5">
        <h2 className="text-center text-3xl font-extrabold text-[#7a1414] mb-7">
          Contact Us
        </h2>

        <form className="mx-auto max-w-[700px] grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="border rounded-lg p-3 text-base"
              placeholder="Name"
              required
            />
            <input
              className="border rounded-lg p-3 text-base"
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <textarea
            className="border rounded-lg p-3 text-base"
            rows={5}
            placeholder="Message"
            required
          />
          <button
            className="rounded-lg bg-[#7a1414] text-white font-extrabold py-3"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] text-white text-center py-10 px-4">
        <p className="mb-3">
          Follow Us:{" "}
          <a
            className="text-[#f4b400] font-extrabold hover:underline"
            href="https://www.facebook.com/orderkhalilsfood/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>{" "}
          |{" "}
          <a
            className="text-[#f4b400] font-extrabold hover:underline"
            href="https://www.instagram.com/orderkhalilsfood/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>{" "}
          |{" "}
          <a
            className="text-[#f4b400] font-extrabold hover:underline"
            href="https://www.linkedin.com/company/khalils-food/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>

        <h3 className="font-extrabold text-lg">Business Hours</h3>
        <p>Monday – Sunday: 8 AM – 2 AM</p>
        <p className="mt-3">© 2025 Khalil Biryani House. All rights reserved.</p>
      </footer>
    </div>
  );
}
