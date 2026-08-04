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
        els.stage.innerHTML = videoPlayerMarkup(work);
        setupVideoPlayer(els.stage.querySelector("[data-video-player]"));
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

  if (work.credits && work.credits.length) {
    els.creditsSection.hidden = false;
    els.creditsTable.innerHTML = work.credits.map(([label, value]) => `
      <div class="credits-row">
        <span class="credits-label">${label}</span>
        <span class="credits-value">${value}</span>
      </div>
    `).join("");
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

// 封面 + 播放按钮。preload="none" 是关键:不点击就一个字节的视频都不下载,
// 国内访客打开作品页的成本只有一张封面图。控制条等按下播放后才交给浏览器。
function videoPlayerMarkup(work) {
  const ratio = work.videoAspect || 16 / 9;
  const poster = work.videoPoster || work.poster;
  return `
    <div class="video-player" style="--ar:${ratio}" data-video-player>
      <video src="${work.video}" ${poster ? `poster="${poster}"` : ""} preload="none" playsinline></video>
      <button class="video-play" type="button" aria-label="Play ${work.title}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5v11l9-5.5z"/></svg>
      </button>
    </div>`;
}

function setupVideoPlayer(player) {
  if (!player) return;
  const video = player.querySelector("video");
  const button = player.querySelector(".video-play");

  // preload="none" 时视频还没有尺寸,先用 data.js 里的 videoAspect 占位;
  // 元数据一到就用真实比例校正,所以比例填错也不会裁到画面。
  video.addEventListener("loadedmetadata", () => {
    if (video.videoWidth && video.videoHeight) {
      player.style.setProperty("--ar", (video.videoWidth / video.videoHeight).toFixed(4));
    }
  }, { once: true });

  const start = () => {
    if (player.classList.contains("is-playing")) return;
    player.classList.add("is-playing");
    video.controls = true;
    video.play().catch(() => {});
  };

  button.addEventListener("click", start);
  video.addEventListener("click", () => {
    if (!video.controls) start();
  });
}
