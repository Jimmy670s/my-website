document.addEventListener("DOMContentLoaded", () => {
  // [label, value, link] — link omitted means the value is shown as plain text.
  const entries = [
    ["Email", SITE.email, SITE.email ? `mailto:${SITE.email}` : ""]
  ];

  (SITE.phones || []).forEach(([region, display, dial]) => {
    entries.push([`Phone — ${region}`, display, dial ? `tel:${dial}` : ""]);
  });

  document.querySelector("[data-contact-list]").innerHTML = entries
    .map(([label, value, link]) => `
      <div class="contact-row">
        <p class="about-label">(${label})</p>
        ${value
          ? (link
              ? `<a class="contact-value" href="${link}">${value}</a>`
              : `<span class="contact-value">${value}</span>`)
          : `<span class="contact-value pending">Coming soon</span>`}
      </div>
    `).join("")
    + `
      <div class="contact-row">
        <p class="about-label">(WeChat)</p>
        ${SITE.wechat
          ? `<button class="contact-value contact-wechat" data-wechat-toggle aria-expanded="false">${SITE.wechat}</button>
             ${SITE.wechatQR ? `<div class="wechat-qr" data-wechat-qr hidden><img src="${SITE.wechatQR}" alt="WeChat QR code"></div>` : ""}`
          : `<span class="contact-value pending">Coming soon</span>`}
      </div>
    `;

  const wechatBtn = document.querySelector("[data-wechat-toggle]");
  const wechatQR = document.querySelector("[data-wechat-qr]");
  if (wechatBtn && wechatQR) {
    wechatBtn.addEventListener("click", () => {
      const open = wechatQR.hidden;
      wechatQR.hidden = !open;
      wechatBtn.setAttribute("aria-expanded", String(open));
    });
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
