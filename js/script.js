let currentSlide = 0;
let autoScroll = null;

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
  autoScroll = setInterval(() => {
    moveSlide(1);
  }, 3000);
}

// Pause auto-scroll
function stopAutoScroll() {
  if (autoScroll) {
    clearInterval(autoScroll);
    autoScroll = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
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
});
