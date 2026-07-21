document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderWorkGrid();
  setupNavScroll();
  setupCardReveal();
  setupNavToggle();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function renderHero() {
  const heroEl = document.querySelector("[data-hero]");
  if (!heroEl) return;

  const titleEl = heroEl.querySelector("[data-hero-title]");
  const subtitleEl = heroEl.querySelector("[data-hero-subtitle]");
  if (titleEl) titleEl.textContent = HERO.title;
  if (subtitleEl) subtitleEl.textContent = HERO.subtitle;

  const videoEl = heroEl.querySelector("[data-hero-video]");
  const fallbackEl = heroEl.querySelector("[data-hero-fallback]");

  if (HERO.video) {
    videoEl.src = HERO.video;
    if (HERO.poster) videoEl.poster = HERO.poster;
    videoEl.addEventListener("error", () => {
      videoEl.style.display = "none";
      fallbackEl.style.display = "block";
    });
    videoEl.style.display = "block";
    fallbackEl.style.display = "none";
  } else {
    videoEl.style.display = "none";
    fallbackEl.style.display = "block";
  }
}

function renderWorkGrid() {
  const grid = document.querySelector("[data-work-grid]");
  if (!grid) return;

  grid.innerHTML = WORKS.map((work, index) => {
    const isVideo = work.type === "video";
    const poster = isVideo ? work.poster : (work.images && work.images[0]);
    const count = !isVideo ? ((work.images && work.images.length) || work.count || 1) : 0;

    const thumbStyle = `object-position: ${work.posterPosition || "center"}; transform: scale(${work.posterScale || 1}); transform-origin: center bottom;`;
    const thumbInner = poster
      ? `<img src="${poster}" alt="${work.title}" loading="lazy" style="${thumbStyle}">`
      : `<div class="thumb-placeholder ${work.colorClass}"></div>`;

    const previewVideo = isVideo && work.video
      ? `<video class="thumb-preview-video" src="${work.video}" muted loop playsinline preload="none"></video>`
      : "";

    const badge = !isVideo && count > 1 ? `<span class="media-badge">1/${count}</span>` : "";

    return `
      <article class="work-card" data-work-index="${index}" tabindex="0" role="button" aria-label="${work.title}">
        <div class="work-thumb-frame">
          <div class="work-thumb">
            ${thumbInner}
            ${previewVideo}
            ${badge}
          </div>
        </div>
        <div class="work-meta">
          <h3>${work.title}</h3>
          <p>${work.category} · ${work.year}</p>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      const workIndex = Number(card.dataset.workIndex);
      window.location.href = `work.html?id=${WORKS[workIndex].id}`;
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });

    const previewVideoEl = card.querySelector(".thumb-preview-video");
    if (previewVideoEl) {
      card.addEventListener("mouseenter", () => {
        previewVideoEl.currentTime = 0;
        previewVideoEl.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => {
        previewVideoEl.pause();
      });
    }
  });
}

function setupNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
  });
}

function setupNavScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupCardReveal() {
  const cards = document.querySelectorAll(".work-card");
  if (!cards.length || !("IntersectionObserver" in window)) {
    cards.forEach((c) => c.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach((c) => observer.observe(c));
}

