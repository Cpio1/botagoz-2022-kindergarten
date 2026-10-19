import type { SectionId } from "@shared/i18n/translations";

/** Public URL of a section (the /mobile prefix is internal). */
export function sectionHref(id: SectionId) {
  return id === "home" ? "/" : `/#${id}`;
}

/**
 * Smoothly scrolls to a section on the current page; returns false when the
 * section isn't on this page (the caller then navigates normally).
 */
export function scrollToSection(id: SectionId) {
  const target = id === "home" ? document.body : document.getElementById(id);
  if (!target) return false;
  if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
  return true;
}
