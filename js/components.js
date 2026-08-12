// Lucide
const lucideScript = document.createElement("script");
lucideScript.src = "https://unpkg.com/lucide@latest";
lucideScript.onload = () => lucide.createIcons({ attrs: { "stroke-width": 1.8, width: 16, height: 16 } });
document.head.appendChild(lucideScript);

// Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Caveat:wght@600&display=swap";
document.head.prepend(fontLink);

document.documentElement.style.opacity = "0";
document.documentElement.style.transition = "opacity 0.25s ease";

document.addEventListener("DOMContentLoaded", () => {
  const activePage = document.body.dataset.page || "";

  // Inject cursor, tooltip, contact widget
  document.body.insertAdjacentHTML("afterbegin", `
    <div id="cursor"></div>
    <div class="tooltip" id="tooltip"></div>
    <div class="contact-widget">
      <div class="contact-card">
        <div class="contact-group">
          <p class="contact-title">Bana ulaşın</p>
          <a href="mailto:meryemdemir.ui@gmail.com" class="contact-link">E-posta <i data-lucide="arrow-up-right"></i></a>
          <a href="https://www.instagram.com/studio26home/" target="_blank" class="contact-link">Instagram <i data-lucide="arrow-up-right"></i></a>
          <a href="https://www.linkedin.com/in/meryem-demir-96bb6a253/" target="_blank" class="contact-link">LinkedIn <i data-lucide="arrow-up-right"></i></a>
        </div>
        <span class="contact-bottom">İletişim</span>
      </div>
    </div>
  `);

  // Inject header into .page
  const pageEl = document.querySelector(".page");
  if (pageEl) {
    pageEl.insertAdjacentHTML("afterbegin", `
      <header class="header">
        <nav class="nav">
          <a href="index.html" class="nav-link${activePage === "home" ? " active" : ""}">Anasayfa</a>
          <a href="about.html" class="nav-link${activePage === "about" ? " active" : ""}">Hakkımda</a>
        </nav>
      </header>
    `);
  }

  // Footer
  if (activePage === "home") {
    pageEl.insertAdjacentHTML("beforeend", `
      <footer class="case-footer case-footer--inline">
        <a href="index.html" class="name">meryem</a>
        <span class="copyright">©2026</span>
      </footer>
    `);
  }

  document.documentElement.style.opacity = "1";

  // Page transitions
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("http") || link.target === "_blank") return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.documentElement.style.opacity = "0";
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });

  // Cursor
  const cursor = document.getElementById("cursor");
  cursor.style.opacity = "0";
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    if (!document.body.classList.contains("tooltip-active")) {
      cursor.style.opacity = "1";
    } else {
      cursor.style.opacity = "0";
    }
  });

  // Tooltip
  const tooltip = document.getElementById("tooltip");
  document.querySelectorAll("[data-tooltip]").forEach((el) => {
    el.style.cursor = "none";
    el.addEventListener("click", () => {
      window.location.href = "mailto:meryemdemir.ui@gmail.com";
    });
    el.addEventListener("mouseenter", () => {
      tooltip.textContent = el.dataset.tooltip;
      tooltip.classList.add("visible");
      document.body.classList.add("tooltip-active");
    });
    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
      document.body.classList.remove("tooltip-active");
    });
    el.addEventListener("mousemove", (e) => {
      tooltip.style.left = e.clientX + "px";
      tooltip.style.top = e.clientY + "px";
    });
  });
});

window.addEventListener("pageshow", () => {
  document.documentElement.style.opacity = "1";
});

// Toolkit ikonları
function initToolkitIcons(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const icons = [
    { src: "photo/my-toolkit/figma.svg",  alt: "Figma" },
    { src: "photo/my-toolkit/framer.svg", alt: "Framer" },
    { src: "photo/my-toolkit/ps.svg",     alt: "Photoshop" },
    { src: "photo/my-toolkit/claude.svg", alt: "Claude" },
  ];
  container.innerHTML = icons.map(ic =>
    `<img class="toolkit-icon-img" src="${ic.src}" width="46" height="46" alt="${ic.alt}" />`
  ).join("");
}

// Foto galerisi — initPhotoGallery("elementId", ["foto1.jpg", ...])
function initPhotoGallery(id, photos) {
  let current = 0;
  const card = document.getElementById(id);
  if (!card) return;
  const img = card.querySelector("img");
  card.addEventListener("click", () => {
    current = (current + 1) % photos.length;
    img.style.opacity = "0";
    setTimeout(() => { img.src = photos[current]; img.style.opacity = "1"; }, 200);
  });
}
