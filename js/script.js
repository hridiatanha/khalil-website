// Mobile nav toggle
function toggleMenu(){
  document.getElementById('navbar').classList.toggle('active');
}

// Simple slider
let currentSlide = 0;
function updateSlider(){
  const slides = document.querySelector('.slides');
  const count = slides.children.length;
  currentSlide = (currentSlide + count) % count;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  const dots = document.querySelectorAll('.dots span');
  dots.forEach((d,i)=> d.classList.toggle('active', i===currentSlide));
}
function moveSlide(step){ currentSlide += step; updateSlider(); }
function goToSlide(i){ currentSlide = i; updateSlider(); }

// initialize dots state on load
window.addEventListener('load', ()=>{ updateSlider(); });
