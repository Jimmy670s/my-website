document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderWorkGrid();
  setupNavScroll();
  setupCardReveal();
  setupLightbox();
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

// Flattened slide list, one entry per viewable media item, in work order.
// Lets the lightbox move continuously across work boundaries.
function buildSlides() {
  const slides = [];
  WORKS.forEach((work, workIndex) => {
    if (work.type === "video") {
      slides.push({ workIndex, mediaIndex: 0 });
    } else {
      const n = (work.images && work.images.length) || work.count || 1;
      for (let i = 0; i < n; i++) slides.push({ workIndex, mediaIndex: i });
    }
  });
  return slides;
}

const SLIDES = buildSlides();

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

    const badge = !isVideo && count > 1 ? `<span class="media-badge">1/${count}</span>` : "";

    return `
      <article class="work-card" data-work-index="${index}" tabindex="0" role="button" aria-label="${work.title}">
        <div class="work-thumb-frame">
          <div class="work-thumb">
            ${thumbInner}
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
      const slideIndex = SLIDES.findIndex((s) => s.workIndex === workIndex);
      openLightbox(slideIndex);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
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

let currentSlide = 0;
let lightboxEls = {};

function setupLightbox() {
  const overlay = document.querySelector("[data-lightbox]");
  if (!overlay) return;

  lightboxEls = {
    overlay,
    stage: overlay.querySelector("[data-lightbox-stage]"),
    title: overlay.querySelector("[data-lightbox-title]"),
    meta: overlay.querySelector("[data-lightbox-meta]"),
    closeBtn: overlay.querySelector("[data-lightbox-close]"),
    prevBtn: overlay.querySelector("[data-lightbox-prev]"),
    nextBtn: overlay.querySelector("[data-lightbox-next]")
  };

  lightboxEls.closeBtn.addEventListener("click", closeLightbox);
  lightboxEls.overlay.addEventListener("click", (e) => {
    if (e.target === lightboxEls.overlay) closeLightbox();
  });
  lightboxEls.prevBtn.addEventListener("click", () => stepLightbox(-1));
  lightboxEls.nextBtn.addEventListener("click", () => stepLightbox(1));

  document.addEventListener("keydown", (e) => {
    if (!lightboxEls.overlay.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  let touchStartX = null;
  lightboxEls.stage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightboxEls.stage.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) stepLightbox(dx > 0 ? -1 : 1);
    touchStartX = null;
  }, { passive: true });
}

function openLightbox(slideIndex) {
  currentSlide = ((slideIndex % SLIDES.length) + SLIDES.length) % SLIDES.length;
  renderSlide();
  lightboxEls.overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const video = lightboxEls.stage.querySelector("video");
  if (video) video.pause();
  lightboxEls.overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function stepLightbox(direction) {
  currentSlide = ((currentSlide + direction) % SLIDES.length + SLIDES.length) % SLIDES.length;
  renderSlide();
}

function renderSlide() {
  const oldVideo = lightboxEls.stage.querySelector("video");
  if (oldVideo) oldVideo.pause();

  const { workIndex, mediaIndex } = SLIDES[currentSlide];
  const work = WORKS[workIndex];

  lightboxEls.title.textContent = work.title;
  const count = work.type === "photo" ? ((work.images && work.images.length) || work.count || 1) : 0;
  lightboxEls.meta.textContent = count > 1
    ? `${work.category} · ${work.year} · ${mediaIndex + 1}/${count}`
    : `${work.category} · ${work.year}`;

  if (work.type === "video") {
    if (work.video) {
      lightboxEls.stage.innerHTML = `<video src="${work.video}" ${work.poster ? `poster="${work.poster}"` : ""} controls autoplay playsinline></video>`;
    } else {
      lightboxEls.stage.innerHTML = `<div class="stage-placeholder ${work.colorClass}"><p>Video coming soon</p></div>`;
    }
  } else {
    const src = work.images && work.images[mediaIndex];
    if (src) {
      lightboxEls.stage.innerHTML = `<img src="${src}" alt="${work.title}">`;
    } else {
      lightboxEls.stage.innerHTML = `<div class="stage-placeholder ${work.colorClass}"><p>Photo coming soon</p></div>`;
    }
  }
}
