let currentSlide = 0;
let autoScroll;

// Move gallery slide manually
function moveSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// 🌀 Auto-scroll every 3 seconds
function startAutoScroll() {
  autoScroll = setInterval(() => moveSlide(1), 3000);
}

// ⏸️ Pause on hover
function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("gallery-slider");

  if (slider) {
    startAutoScroll();
    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", startAutoScroll);
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector("nav ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      if (navMenu.style.display === "flex") {
        navMenu.style.display = "none";
      } else {
        navMenu.style.display = "flex";
        navMenu.style.flexDirection = "column";
        navMenu.style.alignItems = "center";
      }
    });
  }
});
