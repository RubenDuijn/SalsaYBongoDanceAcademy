const scheduleData = [
  {
    day: "Lunes",
    label: "Salsa y bachata",
    sessions: [
      { time: "19:00", title: "Nivel 1", detail: "Salsa Cubana & Rueda Casino", teacher: "Salva & María L.", levelClass: "level-1" },
      { time: "20:00", title: "Nivel 1", detail: "Bachata Moderna Fusión", teacher: "Salva & María L.", levelClass: "level-1" },
      { time: "21:00", title: "Nivel 0-1", detail: "Bachata Moderna", teacher: "Salva & María L.", levelClass: "level-01" },
      { time: "22:00", title: "Nivel 1", detail: "Salsa Línea ON1", teacher: "Salva & María L.", levelClass: "level-1" }
    ]
  },
  {
    day: "Martes",
    label: "Bachata",
    sessions: [
      { time: "19:00", title: "Nivel 0-1", detail: "Bachata Moderna", teacher: "Salva & María", levelClass: "level-01" },
      { time: "20:00", title: "Nivel 0", detail: "Bachata Moderna", teacher: "Salva & María", levelClass: "level-0" },
      { time: "21:00", title: "Nivel 1-2", detail: "Bachata Moderna Fusión", teacher: "Salva & María L.", levelClass: "level-12" },
      { time: "22:00", title: "—", detail: "Sin clase", teacher: "", levelClass: "level-free" }
    ]
  },
  {
    day: "Miércoles",
    label: "Salsa cubana",
    sessions: [
      { time: "19:00", title: "Nivel 1", detail: "Bachata Moderna", teacher: "Salva & María L.", levelClass: "level-1" },
      { time: "20:00", title: "Nivel 1", detail: "Salsa Cubana & Rueda Casino", teacher: "Salva & María L.", levelClass: "level-1" },
      { time: "21:00", title: "Nivel 0-1", detail: "Salsa Cubana & Rueda Casino", teacher: "Salva & María L.", levelClass: "level-01" },
      { time: "22:00", title: "Nivel 1-2", detail: "Salsa Cubana & Rueda Casino", teacher: "Salva & María L.", levelClass: "level-12" }
    ]
  },
  {
    day: "Jueves",
    label: "Kizomba y tango",
    sessions: [
      { time: "19:00", title: "Nivel 0-1", detail: "Tango Argentino", teacher: "José & Vane", levelClass: "level-01" },
      { time: "20:00", title: "Open Level", detail: "Kizomba & Bachata Lady Style", teacher: "Vanessa Adán", levelClass: "level-open" },
      { time: "21:00", title: "Open Level", detail: "Kizomba Flow", teacher: "Boni & Vane", levelClass: "level-open" },
      { time: "22:00", title: "Open Level", detail: "Bachata Zouk", teacher: "Boni & Vane", levelClass: "level-open" }
    ]
  },
  {
    day: "Viernes",
    label: "Inicio de finde",
    sessions: [
      { time: "19:00", title: "Nivel 0", detail: "Bachata Moderna", teacher: "Salva & María L.", levelClass: "level-0" },
      { time: "20:00", title: "Nivel 0-1", detail: "Salsa Cubana & Rueda Casino", teacher: "Salva & María L.", levelClass: "level-01" },
      { time: "21:00", title: "Nivel 0-1", detail: "Bachata Moderna", teacher: "Salva & María L.", levelClass: "level-01" },
      { time: "22:00", title: "Libre", detail: "Práctica libre", teacher: "", levelClass: "level-free" }
    ]
  }
];

const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const scheduleToolbar = document.querySelector(".schedule-toolbar");
const mobileSchedule = document.getElementById("mobile-schedule");
const desktopSchedule = document.getElementById("desktop-schedule");
const form = document.getElementById("contact-form");
const yearNode = document.getElementById("year");
const revealNodes = document.querySelectorAll(".reveal-up");

function getInitialSelectedDay() {
  const currentWeekday = new Date().getDay();

  if (currentWeekday >= 1 && currentWeekday <= 5) {
    return currentWeekday - 1;
  }

  return 0;
}

let selectedDay = getInitialSelectedDay();

function toggleMenu() {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav.classList.toggle("is-open", !expanded);
}

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
}

function renderDayChips() {
  scheduleToolbar.innerHTML = scheduleData
    .map((item, index) => {
      const activeClass = index === selectedDay ? "day-chip is-active" : "day-chip";
      return `<button class="${activeClass}" type="button" data-day-index="${index}" role="tab" aria-selected="${index === selectedDay}">${item.day}</button>`;
    })
    .join("");
}

function renderMobileSchedule() {
  const activeDay = scheduleData[selectedDay];
  const sessionsMarkup = activeDay.sessions
    .map(
      (session) => `
        <article class="mobile-session ${session.levelClass}">
          <div class="schedule-time">${session.time}</div>
          <div>
            <strong>${session.title}</strong>
            <p>${session.detail}${session.teacher ? ` · ${session.teacher}` : ""}</p>
          </div>
        </article>
      `
    )
    .join("");

  mobileSchedule.innerHTML = `
    <div class="mobile-day-card">
      <div>
        <p class="eyebrow">${activeDay.label}</p>
        <h3>${activeDay.day}</h3>
      </div>
      ${sessionsMarkup}
    </div>
  `;
}

function renderDesktopSchedule() {
  const timeSlots = ["19:00", "20:00", "21:00", "22:00"];
  const headMarkup = scheduleData
    .map((item) => `<div class="schedule-head"><strong>${item.day}</strong><span>${item.label}</span></div>`)
    .join("");

  const rowMarkup = timeSlots
    .map((slot) => {
      const cells = scheduleData
        .map((day) => {
          const session = day.sessions.find((entry) => entry.time === slot);
          if (!session) {
            return '<div class="schedule-cell level-free"></div>';
          }

          return `
            <div class="schedule-cell ${session.levelClass}">
              <div class="desktop-entry">
                <strong>${session.title}</strong>
                <span>${session.detail}</span>
                <small>${session.teacher || ""}</small>
              </div>
            </div>
          `;
        })
        .join("");

      return `<div class="schedule-cell time-cell">${slot}</div>${cells}`;
    })
    .join("");

  desktopSchedule.innerHTML = `<div class="desktop-grid"><div class="schedule-corner"></div>${headMarkup}${rowMarkup}</div>`;
}

function buildWhatsAppMessage(formData) {
  const fields = [
    "Hola, me interesa Salsa & Bongó Dance Academy.",
    `Nombre: ${formData.get("name")}`,
    `Teléfono: ${formData.get("phone")}`,
    `Email: ${formData.get("email") || "No indicado"}`,
    `Estilo de interés: ${formData.get("style")}`,
    `Nivel: ${formData.get("level")}`,
    `Mensaje: ${formData.get("message") || "Sin mensaje adicional"}`
  ];

  return encodeURIComponent(fields.join("\n"));
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", toggleMenu);
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

if (scheduleToolbar && mobileSchedule && desktopSchedule) {
  renderDayChips();
  renderMobileSchedule();
  renderDesktopSchedule();

  scheduleToolbar.addEventListener("click", (event) => {
    const target = event.target.closest("[data-day-index]");
    if (!target) {
      return;
    }

    selectedDay = Number(target.dataset.dayIndex);
    renderDayChips();
    renderMobileSchedule();
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const message = buildWhatsAppMessage(formData);
    const url = `https://wa.me/34651458741?text=${message}`;
    window.open(url, "_blank", "noopener");
  });
}

if (revealNodes.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealNodes.forEach((node) => {
    revealObserver.observe(node);
  });
} else {
  revealNodes.forEach((node) => {
    node.classList.add("is-visible");
  });
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
