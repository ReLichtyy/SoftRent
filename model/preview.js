document.querySelectorAll("[data-focus-chat]").forEach((button) => {
  button.addEventListener("click", () => {
    const demo = document.querySelector("#live-demo");
    demo.scrollIntoView({
      block: "center",
      behavior: motionPaused || matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    demo.contentDocument
      ?.querySelector('[role="tab"][aria-selected="true"]')
      ?.focus({ preventScroll: true });
  });
});

const menu = document.querySelector("#navigation");
const menuToggle = document.querySelector(".menu-toggle");
function closeMenu(returnFocus = false) {
  menu.removeAttribute("data-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menu.toggleAttribute("data-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  if (open) menu.querySelector("a").focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.hasAttribute("data-open")) closeMenu(true);
});
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".nav-pill")) closeMenu();
});
matchMedia("(min-width: 701px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

// Pause visual motion in both documents without interrupting the demo's data flow.
const motionButton = document.querySelector('#motion-toggle');
const demoFrame = document.querySelector('#live-demo');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = false;
let sceneVisible = true;
function syncMotion() {
  const paused = motionPaused || motionPreference.matches || document.hidden || !sceneVisible;
  const value = paused ? 'paused' : 'running';
  document.documentElement.dataset.motion = value;
  if (demoFrame.contentDocument) demoFrame.contentDocument.documentElement.dataset.motion = value;
  motionButton.disabled = motionPreference.matches;
  motionButton.setAttribute('aria-pressed', String(motionPaused || motionPreference.matches));
  const label = motionPreference.matches ? 'Animaciones reducidas' : motionPaused ? 'Activar animaciones' : 'Pausar animaciones';
  motionButton.setAttribute('aria-label', label);
  motionButton.title = label;
}
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; syncMotion(); });
demoFrame.addEventListener('load', syncMotion);
motionPreference.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', syncMotion);
const sceneObserver = new IntersectionObserver(entries => {
  sceneVisible = entries[0].isIntersecting;
  syncMotion();
}, { threshold: 0 });
sceneObserver.observe(document.querySelector('.workspace'));
syncMotion();
