// Window smooth scroll (anasayfa only)
(() => {
  let target = window.scrollY;
  let current = window.scrollY;
  let rafId = null;

  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    target += e.deltaY * 0.75;
    target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
    if (!rafId) animate();
  }, { passive: false });

  function animate() {
    current += (target - current) * 0.1;
    window.scrollTo(0, current);
    if (Math.abs(target - current) > 0.5) {
      rafId = requestAnimationFrame(animate);
    } else {
      window.scrollTo(0, target);
      rafId = null;
    }
  }
})();

// Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
