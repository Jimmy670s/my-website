document.addEventListener("DOMContentLoaded", () => {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const work = WORKS.find((w) => w.id === id);

  if (!work) {
    window.location.href = "index.html";
    return;
  }

  const els = {
    stage: document.querySelector("[data-viewer-stage]"),
    prevBtn: document.querySelector("[data-viewer-prev]"),
    nextBtn: document.querySelector("[data-viewer-next]"),
    title: document.querySelector("[data-work-title]"),
    meta: document.querySelector("[data-work-meta]"),
    creditsSection: document.querySelector("[data-credits-section]"),
    creditsTable: document.querySelector("[data-credits-table]")
  };

  document.title = `${work.title} — JIMMY LIU`;
  els.title.textContent = work.title;

  const isVideo = work.type === "video";
  const slideCount = isVideo ? 1 : ((work.images && work.images.length) || work.count || 1);
  let current = 0;

  if (slideCount > 1) {
    els.prevBtn.hidden = false;
    els.nextBtn.hidden = false;
    els.prevBtn.addEventListener("click", () => step(-1));
    els.nextBtn.addEventListener("click", () => step(1));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  let touchStartX = null;
  els.stage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  els.stage.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) step(dx > 0 ? -1 : 1);
    touchStartX = null;
  }, { passive: true });

  function step(direction) {
    current = ((current + direction) % slideCount + slideCount) % slideCount;
    render();
  }

  function render() {
    const oldVideo = els.stage.querySelector("video");
    if (oldVideo) oldVideo.pause();

    els.meta.textContent = slideCount > 1
      ? `${work.category} · ${work.year} · ${current + 1}/${slideCount}`
      : `${work.category} · ${work.year}`;

    if (isVideo) {
      if (work.video) {
        els.stage.innerHTML = `<video src="${work.video}" ${work.poster ? `poster="${work.poster}"` : ""} controls autoplay playsinline></video>`;
      } else {
        els.stage.innerHTML = `<div class="stage-placeholder ${work.colorClass}"><p>Video coming soon</p></div>`;
      }
    } else {
      const src = work.images && work.images[current];
      if (src) {
        els.stage.innerHTML = `<img src="${src}" alt="${work.title}">`;
      } else {
        els.stage.innerHTML = `<div class="stage-placeholder ${work.colorClass}"><p>Photo coming soon</p></div>`;
      }
    }
  }

  render();

  if (work.credits) {
    const rows = [
      ["Directed by", work.credits.directedBy],
      ["Written by", work.credits.writtenBy],
      ["Cinematography by", work.credits.cinematographyBy],
      ["Edited by", work.credits.editedBy],
      ["Colour by", work.credits.colourBy],
      ["Camera", work.credits.camera],
      ["Aspect Ratio", work.credits.aspectRatio],
      ["Runtime", work.credits.runtime],
      ["Year", work.year]
    ].filter(([, value]) => value);

    if (rows.length) {
      els.creditsSection.hidden = false;
      els.creditsTable.innerHTML = rows.map(([label, value]) => `
        <div class="credits-row">
          <span class="credits-label">${label}</span>
          <span class="credits-value">${value}</span>
        </div>
      `).join("");
    }
  }

  document.querySelector(".nav-toggle").addEventListener("click", () => {
    document.querySelector(".nav").classList.toggle("nav-open");
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Prefer browser back when we arrived from within the site, so the grid's
  // scroll position is restored; fall back to the plain index.html link otherwise.
  const backLink = document.querySelector("[data-back-link]");
  if (backLink && document.referrer && document.referrer.includes(window.location.hostname)) {
    backLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.back();
    });
  }
});
