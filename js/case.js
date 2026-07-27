document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("caseContent");
  if (!panel) return;

  let pTarget = 0, pCurrent = 0, pRaf = null;

  if (window.innerWidth > 768) {
    panel.addEventListener("wheel", (e) => {
      e.preventDefault();
      e.stopPropagation();
      pTarget += e.deltaY * 0.75;
      pTarget = Math.max(0, Math.min(pTarget, panel.scrollHeight - panel.clientHeight));
      if (!pRaf) pTick();
    }, { passive: false });
  }

  function pTick() {
    pCurrent += (pTarget - pCurrent) * 0.1;
    panel.scrollTop = pCurrent;
    if (Math.abs(pTarget - pCurrent) > 0.5) { pRaf = requestAnimationFrame(pTick); }
    else { panel.scrollTop = pTarget; pRaf = null; }
  }

  // Nav smooth scroll
  document.querySelectorAll(".case-nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute("href"));
      if (!target) return;
      const targetPos = target.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop;
      const startPos = panel.scrollTop;
      const distance = targetPos - startPos;
      const duration = 600;
      let start = null;
      function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
      function step(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        panel.scrollTop = startPos + distance * ease(progress);
        pTarget = panel.scrollTop;
        pCurrent = panel.scrollTop;
        if (elapsed < duration) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  });

  // Scrollspy
  const sections = document.querySelectorAll(".case-section");
  const navItems = document.querySelectorAll(".case-nav-item");

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((n) => n.classList.remove("active"));
        const active = document.querySelector(`.case-nav-item[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { root: panel, rootMargin: "-40% 0px -55% 0px" });

  sections.forEach((s) => spy.observe(s));
});
