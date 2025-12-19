import React, { useEffect, useRef, useState } from "react";
import { galleryImages } from "../data/gallery.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const total = galleryImages.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  const start = () => {
    if (timer.current) return;
    timer.current = setInterval(next, 3000);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative max-w-[900px] mx-auto overflow-hidden rounded-xl"
      onMouseEnter={stop}
      onMouseLeave={start}
      aria-label="Food gallery"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {galleryImages.map((img) => (
          <img
            key={img.alt}
            src={img.src}
            alt={img.alt}
            className="w-full h-[420px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full text-3xl leading-none"
        aria-label="Previous slide"
        type="button"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full text-3xl leading-none"
        aria-label="Next slide"
        type="button"
      >
        ›
      </button>
    </div>
  );
}
