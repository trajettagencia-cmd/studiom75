const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  const opened = navLinks.classList.contains('open');

  menuBtn.setAttribute('aria-expanded', opened);
  menuBtn.innerHTML = opened
    ? '<i class="fas fa-xmark"></i>'
    : '<i class="fas fa-bars"></i>';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');

    menuBtn?.setAttribute('aria-expanded', 'false');

    if (menuBtn) {
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});


/* ---------- Formas da hero em movimento ---------- */

const heroSection = document.querySelector('.hero');
const heroCircle = document.querySelector('.hero-shape.circle');
const heroSquare = document.querySelector('.hero-shape.square');
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (heroSection && heroCircle && heroSquare && !reduceMotion) {

  let targetX = 0;
  let targetY = 0;

  let mouseX = 0;
  let mouseY = 0;

  let start = null;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();

    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  heroSection.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animateShapes(timestamp) {

    if (!start) {
      start = timestamp;
    }

    const t = (timestamp - start) / 1000;

    // Suaviza o movimento em direção ao mouse
    mouseX += (targetX - mouseX) * 0.04;
    mouseY += (targetY - mouseY) * 0.04;

    // Flutuação contínua e independente para cada forma
    const circleX = Math.sin(t * 0.5) * 16 + mouseX * 20;
    const circleY = Math.cos(t * 0.4) * 12 + mouseY * 20;

    const squareX = Math.cos(t * 0.45) * 14 - mouseX * 24;
    const squareY = Math.sin(t * 0.55) * 16 - mouseY * 24;

    const squareRotate = 14 + Math.sin(t * 0.3) * 10;

    heroCircle.style.transform =
      `translate3d(${circleX}px, ${circleY}px, 0)`;

    heroSquare.style.transform =
      `translate3d(${squareX}px, ${squareY}px, 0) rotate(${squareRotate}deg)`;

    requestAnimationFrame(animateShapes);
  }

  requestAnimationFrame(animateShapes);
}


/* ---------- Ano atual ---------- */

const anoAtual = new Date().getFullYear();
const anoElemento = document.getElementById('anoAtual');

if (anoElemento) {
  anoElemento.textContent = anoAtual;
}