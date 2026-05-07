document.body.classList.remove("no-js");
document.body.classList.add("js-ready");

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navOverlay = document.querySelector("#mobile-nav-overlay");
const yearSlot = document.querySelector("#current-year");
const revealTargets = document.querySelectorAll(".section-panel");
const mobileMedia = window.matchMedia("(max-width: 900px)");
let mobileNavPanel = null;

if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

if (siteNav && navOverlay) {
  mobileNavPanel = siteNav.cloneNode(true);
  mobileNavPanel.classList.remove("site-nav");
  mobileNavPanel.classList.add("mobile-nav-panel");
  mobileNavPanel.id = "mobile-navigation";
  mobileNavPanel.setAttribute("aria-label", "Mobile navigation");
  navOverlay.appendChild(mobileNavPanel);
}

if (menuToggle && mobileNavPanel) {
  menuToggle.setAttribute("aria-controls", "mobile-navigation");
}

const closeMobileNav = () => {
  if (!menuToggle || !navOverlay || !mobileNavPanel) {
    return;
  }

  mobileNavPanel.classList.remove("is-open");
  navOverlay.classList.remove("is-open");
  navOverlay.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

const openMobileNav = () => {
  if (!menuToggle || !navOverlay || !mobileNavPanel) {
    return;
  }

  mobileNavPanel.classList.add("is-open");
  navOverlay.hidden = false;
  navOverlay.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("nav-open");
};

if (menuToggle && siteNav && navOverlay && mobileNavPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navOverlay.classList.contains("is-open");

    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  navOverlay.addEventListener("click", (event) => {
    if (event.target === navOverlay) {
      closeMobileNav();
    }
  });

  mobileNavPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNav();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navOverlay.classList.contains("is-open")) {
      closeMobileNav();
    }
  });

  const handleViewportChange = (event) => {
    if (!event.matches) {
      closeMobileNav();
    }
  };

  if (typeof mobileMedia.addEventListener === "function") {
    mobileMedia.addEventListener("change", handleViewportChange);
  } else if (typeof mobileMedia.addListener === "function") {
    mobileMedia.addListener(handleViewportChange);
  }
}

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
