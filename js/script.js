// ----------------------
// 📱 Mobile Menu Toggle
// ----------------------
function toggleMenu() {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('active');
}

// ----------------------
// 🎞️ Gallery Slider
// ----------------------
let currentSlide = 0;
let autoScroll; // for auto-scrolling control

function updateSlider() {
  const slides = document.querySelector('.slides');
  const count = slides.children.length;
  currentSlide = (currentSlide + count) % count; // keep it in range
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update active dots if they exist
  const dots = document.querySelectorAll('.dots span');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function moveSlide(step) {
  currentSlide += step;
  updateSlider();
}

function goToSlide(i) {
  currentSlide = i;
  updateSlider();
}

// ----------------------
// 🌀 Auto-scroll + Pause on Hover
// ----------------------
function startAutoScroll() {
  autoScroll = setInterval(() => moveSlide(1), 3000); // every 3s
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

// ----------------------
// 🚀 Initialize
// ----------------------
window.addEventListener('load', () => {
  updateSlider();
  startAutoScroll();

  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
  }

  // Mobile nav toggle button (hamburger)
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('nav ul');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
