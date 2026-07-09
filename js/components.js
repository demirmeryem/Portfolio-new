document.documentElement.style.opacity = "0";
document.documentElement.style.transition = "opacity 0.25s ease";

document.addEventListener("DOMContentLoaded", () => {
  // Inject cursor, tooltip, contact widget
  document.body.insertAdjacentHTML("afterbegin", `
    <div id="cursor"></div>
    <div class="tooltip" id="tooltip"></div>
    <div class="contact-widget">
      <div class="contact-card">
        <div class="contact-group">
          <p class="contact-title">chat with me</p>
          <a href="mailto:meryemdemir.ui@gmail.com" class="contact-link">Email</a>
          <a href="#" class="contact-link">Instagram</a>
          <a href="https://www.linkedin.com/in/meryem-demir-96bb6a253/" target="_blank" class="contact-link">LinkedIn</a>
          <a href="https://dribbble.com/meryem2786" target="_blank" class="contact-link">Dribbble</a>
        </div>
        <span class="contact-bottom">Contact</span>
      </div>
    </div>
  `);

  // Inject header into .page
  const pageEl = document.querySelector(".page");
  if (pageEl) {
    const activePage = document.body.dataset.page || "";
    pageEl.insertAdjacentHTML("afterbegin", `
      <header class="header">
        <nav class="nav">
          <a href="anasayfa.html" class="nav-link${activePage === "home" ? " active" : ""}">home</a>
          <a href="about.html" class="nav-link${activePage === "about" ? " active" : ""}">about</a>
        </nav>
      </header>
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
