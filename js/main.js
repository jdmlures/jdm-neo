// ==========================
// JAPAN TIME
// ==========================
function updateJapanTime() {
  const now = new Date();
  const japan = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const timeEl = document.getElementById("japan-time");
  if (timeEl) timeEl.innerText = japan.toLocaleTimeString();
}
setInterval(updateJapanTime, 1000);
updateJapanTime();

// ==========================
// HERO SLIDER
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.hero-item');
  const heroContainer = document.querySelector('.hero');
  let currentSlide = 0;
  const intervalTime = 3000;
  let slideInterval;

  if (!slides.length) return;

  slides.forEach((slide, i) => slide.classList.toggle('active', i === 0));

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  slideInterval = setInterval(nextSlide, intervalTime);

  // クリックで次スライド
  heroContainer.addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, intervalTime);
  });

  // スワイプ対応
  let startX = 0;
  heroContainer.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  heroContainer.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 50) {
      clearInterval(slideInterval);
      slides[currentSlide].classList.remove('active');
      if (endX < startX) {
        currentSlide = (currentSlide + 1) % slides.length;
      } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      }
      slides[currentSlide].classList.add('active');
      slideInterval = setInterval(nextSlide, intervalTime);
    }
  });
});