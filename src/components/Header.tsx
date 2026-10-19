"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { NAV_ORDER, type SectionId } from "@/i18n/translations";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export function sectionHref(id: SectionId) {
  return id === "home" ? "/" : `/#${id}`;
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    if (!enabled) return;
    const sections = NAV_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const observed = useActiveSection(isHome);
  const active: SectionId | null = isHome ? observed : pathname.startsWith("/about") ? "about" : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? "bg-milk/95 shadow-[0_6px_24px_-16px_rgb(35_111_107/0.35)] lg:bg-milk/80 lg:backdrop-blur-xl lg:backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-14 items-center justify-between gap-3 lg:h-16">
        <Link href="/" aria-label={t.a11y.home} className="shrink-0 rounded-2xl">
          <Logo subtitle={t.common.logoSubtitle} />
        </Link>

        <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {NAV_ORDER.map((id) => {
              const current = active === id;
              return (
                <li key={id}>
                  <Link
                    href={sectionHref(id)}
                    aria-current={current ? (id === "about" && !isHome ? "page" : "location") : undefined}
                    className={`relative rounded-full px-2.5 py-2 text-[0.84rem] font-medium whitespace-nowrap transition-colors xl:px-3 ${
                      current ? "text-turq-dark" : "text-ink/75 hover:text-ink"
                    }`}
                  >
                    {current && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-powder"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {t.nav[id]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <LanguageSwitch id="lang-header" />
          <a href={site.phone.href} className="btn btn-primary hidden min-h-10 px-4 text-[0.84rem] whitespace-nowrap xl:inline-flex">
            <Phone className="size-4" aria-hidden="true" />
            {t.common.call}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-turq/25 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain bg-milk will-change-transform lg:hidden"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <nav aria-label={t.a11y.mainNav} className="container-site pt-2 pb-8">
              <ul className="flex flex-col">
                {NAV_ORDER.map((id) => (
                  <li key={id}>
                    <Link
                      href={sectionHref(id)}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center justify-between border-b border-turq/15 font-display text-[1.05rem] font-semibold ${
                        active === id ? "text-turq-dark" : "text-ink"
                      }`}
                    >
                      {t.nav[id]}
                      <span
                        aria-hidden="true"
                        className={`size-2 rounded-full ${active === id ? "bg-powder" : "bg-turq/30"}`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a href={site.phone.href} className="btn btn-primary w-full min-[400px]:w-auto">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
