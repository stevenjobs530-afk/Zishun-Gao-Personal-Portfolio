export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToConceptSection(id: string) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}
