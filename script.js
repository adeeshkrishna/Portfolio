const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Reveal sections and cards as they enter the viewport.
const revealTargets = document.querySelectorAll(
  ".heading, .experience, .service-grid article, .skill-grid > div, .projects article, .contact"
);
revealTargets.forEach((element) => element.classList.add("reveal"));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

// Highlight the current section in the navigation.
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const observedSections = navAnchors
  .map((anchor) => document.querySelector(anchor.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((anchor) => {
        if (anchor.getAttribute("href") === `#${entry.target.id}`) {
          anchor.setAttribute("aria-current", "location");
        } else {
          anchor.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  observedSections.forEach((section) => sectionObserver.observe(section));
}
