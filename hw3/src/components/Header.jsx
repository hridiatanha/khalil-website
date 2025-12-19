import React, { useState } from "react";

export default function Header({ logoSrc, cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#menu", label: "Menu" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#111] text-white px-6 py-2">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Khalil Biryani House Logo"
            className="h-[45px] w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-7 m-0 p-0 list-none font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a className="hover:text-[#f4b400]" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="bg-[#f4b400] text-[#111] font-semibold px-5 py-2 rounded-full hover:bg-[#ffc107] transition"
            type="button"
          >
            Order Online
          </button>

          <button
            onClick={onOpenCart}
            className="border-2 border-[#f4b400] text-[#f4b400] px-3 py-2 rounded-full font-extrabold"
            type="button"
            aria-label="Open cart"
          >
            🛒{" "}
            <span className="ml-2 bg-[#f4b400] text-[#111] px-2 py-[2px] rounded-full font-extrabold">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            type="button"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <div className={open ? "md:hidden mt-2" : "hidden"}>
        <ul className="flex flex-col gap-3 bg-[#111] px-2 py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                className="hover:text-[#f4b400]"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
