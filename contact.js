document.addEventListener("DOMContentLoaded", () => {
  const emailEl = document.querySelector("[data-contact-email]");
  emailEl.textContent = SITE.email;
  emailEl.href = `mailto:${SITE.email}`;

  document.querySelector("[data-contact-social]").innerHTML = (SITE.social || [])
    .map(([label, url]) => `<li>${url
      ? `<a href="${url}" target="_blank" rel="noopener">${label}</a>`
      : `<span class="pending">${label}</span>`}</li>`)
    .join("");

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
