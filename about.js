document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-about-bio]").textContent = ABOUT.bio;

  const photoEl = document.querySelector("[data-about-photo]");
  if (ABOUT.avatar) {
    photoEl.style.backgroundImage = `url(${ABOUT.avatar})`;
  } else {
    photoEl.classList.add("about-photo-placeholder");
  }

  const socialLinks = [
    ["Instagram", SITE.instagram],
    ["Twitter", SITE.twitter],
    ["LinkedIn", SITE.linkedin]
  ].filter(([, url]) => url);
  socialLinks.push(["Email", `mailto:${SITE.email}`]);

  document.querySelector("[data-about-social]").innerHTML = socialLinks
    .map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
    .join(", ");

  if (ABOUT.awards && ABOUT.awards.length) {
    const awardsEl = document.querySelector("[data-about-awards]");
    awardsEl.hidden = false;
    awardsEl.innerHTML = ABOUT.awards.map(([client, show, award, year]) => `
      <div class="about-award-row">
        <span>${client}</span>
        <span>${show}</span>
        <span>${award}</span>
        <span>${year}</span>
      </div>
    `).join("");
  }

  if (ABOUT.services && ABOUT.services.length) {
    document.querySelector("[data-about-services]").innerHTML = ABOUT.services
      .map((s, i) => `<h2${i > 0 ? ' class="dim"' : ""}>${s}</h2>`)
      .join("");
  }

  function updateClock() {
    const clockEl = document.querySelector("[data-about-clock]");
    if (!clockEl || !ABOUT.clockTimeZone) return;
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: ABOUT.clockTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(new Date());
    clockEl.textContent = `${ABOUT.clockCity} — ${time}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelector(".nav-toggle").addEventListener("click", () => {
    document.querySelector(".nav").classList.toggle("nav-open");
  });
});
