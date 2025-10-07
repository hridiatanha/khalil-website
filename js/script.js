let currentSlide = 0;
let autoScroll = null;

// Move gallery slide manually
function moveSlide(direction) {
  const track = document.querySelector(".slides");
  if (!track) return;

  const total = track.children.length;
  currentSlide = (currentSlide + direction + total) % total;

  // Shift the flex track one full slide
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-scroll every 3 seconds
function startAutoScroll() {
  if (autoScroll) return;
  autoScroll = setInterval(() => moveSlide(1), 3000);
}

// Pause auto-scroll
function stopAutoScroll() {
  if (!autoScroll) return;
  clearInterval(autoScroll);
  autoScroll = null;
}

document.addEventListener("DOMContentLoaded", () => {
  // Slider wiring
  const slider = document.getElementById("gallery-slider");
  if (slider) {
    startAutoScroll();
    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", startAutoScroll);
  }

  // Mobile nav toggle (class-based = reliable)
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navbar");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
