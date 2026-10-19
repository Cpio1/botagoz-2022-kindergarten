"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { NAV_ORDER, type SectionId } from "@shared/i18n/translations";
import { LogoMark } from "@shared/ui/LogoMark";
import { LangToggle } from "./LangToggle";
import { scrollToSection, sectionHref } from "./nav";

export function MobileHeader({ isHome }: { isHome: boolean }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: SectionId) => (e: React.MouseEvent) => {
    setOpen(false);
    if (!isHome) return; // another page — let the link navigate to "/#id"
    e.preventDefault();
    // Wait one frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${
        scrolled || open ? "bg-milk/95 shadow-[0_1px_0_rgb(121_207_196/0.25),0_8px_20px_-16px_rgb(35_111_107/0.4)]" : "bg-milk/0"
      }`}
    >
      <div className="m-container flex h-14 items-center justify-between gap-2">
        <Link href="/" aria-label={t.a11y.home} onClick={go("home")} className="flex min-h-11 items-center gap-2 rounded-xl">
          <span className="grid size-8 place-items-center rounded-[0.7rem_0.7rem_0.7rem_0.25rem] bg-white shadow-soft">
            <LogoMark className="size-6" />
          </span>
          <span className="font-display text-[0.95rem] leading-none font-bold tracking-tight text-ink">
            {site.name.replace(/-\d+$/, "")}
            <span className="text-turq-dark">-{site.name.split("-").pop()}</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <LangToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="m-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="grid size-11 place-items-center rounded-full text-ink"
          >
            <span className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-turq/30">
              {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
            </span>
          </button>
        </div>
      </div>

      {/* Menu: always mounted, toggled with CSS — no animation library, no layout work on open. */}
      <div
        id="m-menu"
        inert={!open}
        className={`fixed inset-x-0 top-14 bottom-0 transition-[visibility] duration-200 ${open ? "visible" : "invisible"}`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/25 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          aria-label={t.a11y.mainNav}
          className={`relative rounded-b-[1.75rem] bg-milk pb-5 shadow-lift transition-[opacity,translate] duration-200 ease-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <ul className="m-container">
            {NAV_ORDER.map((id) => (
              <li key={id}>
                <Link
                  href={sectionHref(id)}
                  onClick={go(id)}
                  className="flex min-h-12 items-center justify-between border-b border-turq/15 font-display text-[0.98rem] font-semibold text-ink"
                >
                  {t.nav[id]}
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-powder" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="m-container mt-4">
            <a href={site.phone.href} className="m-btn m-btn-primary w-full">
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
