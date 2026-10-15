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
          ? "bg-milk/80 shadow-[0_8px_30px_-18px_rgb(35_111_107/0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
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
                    className={`relative rounded-full px-3 py-2 text-[0.9rem] font-semibold whitespace-nowrap transition-colors xl:px-3.5 ${
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

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitch id="lang-header" />
          </div>
          <a href={site.phone.href} className="btn btn-primary hidden min-h-11 px-5 whitespace-nowrap xl:inline-flex">
            <Phone className="size-4" aria-hidden="true" />
            {t.common.call}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-turq/25 lg:hidden"
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto bg-milk lg:hidden"
          >
            <nav aria-label={t.a11y.mainNav} className="container-site pt-4 pb-10">
              <ul className="flex flex-col">
                {NAV_ORDER.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      href={sectionHref(id)}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-14 items-center justify-between border-b border-turq/20 font-display text-xl font-bold ${
                        active === id ? "text-turq-dark" : "text-ink"
                      }`}
                    >
                      {t.nav[id]}
                      <span
                        aria-hidden="true"
                        className={`size-2 rounded-full ${active === id ? "bg-powder" : "bg-turq/30"}`}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <LanguageSwitch id="lang-mobile" />
                <a href={site.phone.href} className="btn btn-primary">
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
