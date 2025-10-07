let currentSlide = 0;
let autoScroll;

function moveSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoScroll() {
  autoScroll = setInterval(() => moveSlide(1), 3000);
}

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
