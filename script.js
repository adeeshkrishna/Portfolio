function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("click", () => {
    console.log("Work experience card clicked!");
  });
});
