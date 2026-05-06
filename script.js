document.body.classList.remove("no-js");
document.body.classList.add("js-ready");

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const toast = document.querySelector("#coming-soon-toast");
const navLinks = document.querySelectorAll("[data-coming-soon]");
const yearSlot = document.querySelector("#current-year");
const revealTargets = document.querySelectorAll(".section-panel");

let toastTimer;

if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const showToast = (message) => {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
};

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageName = link.dataset.comingSoon || "This page";
    showToast(`${pageName} is the next page to build. Homepage review comes first.`);

    if (siteNav && menuToggle && siteNav.classList.contains("is-open")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealTargets.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
} else {
  revealTargets.forEach((section) => section.classList.add("is-visible"));
}
