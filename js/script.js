// ------------------------------
// GALLERY SLIDER FUNCTIONALITY
// ------------------------------
let currentSlide = 0;
let autoScroll;

// Move gallery slide manually (← / → buttons)
function moveSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-scroll every 3 seconds
function startAutoScroll() {
  autoScroll = setInterval(() => moveSlide(1), 3000);
}

// Pause auto-scroll when hovering over gallery
function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Initialize gallery slider
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("gallery-slider");

  if (slider) {
    startAutoScroll();

    // Pause on hover
    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", startAutoScroll);
  }

  // ------------------------------
  // MOBILE NAVIGATION TOGGLE
  // ------------------------------
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector("nav ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      // Toggle visibility of the navigation menu
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
