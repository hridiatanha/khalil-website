let currentSlide = 0;
let autoScroll;

// Move gallery slide manually
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

// Pause on hover
function stopAutoScroll() {
  clearInterval(autoScroll);
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("gallery-slider");
  if (slider) {
    startAutoScroll();
    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", startAutoScroll);
  }

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector("nav ul");
  hamburger.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
    navMenu.style.flexDirection = "column";
  });
});
