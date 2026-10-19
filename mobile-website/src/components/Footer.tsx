"use client";

import Link from "next/link";
import { site } from "@shared/config/site";
import { Wave } from "@shared/decor/Decorations";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { NAV_ORDER } from "@shared/i18n/translations";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { LogoMark } from "@shared/ui/LogoMark";
import { sectionHref } from "./nav";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-turq-50">
      <Wave fill="#236F6B" variant={0} heightClass="h-5" className="-mb-px" />
      <div className="bg-turq-dark pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-white">
        <div className="m-container">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" aria-label={t.a11y.home} className="flex min-h-11 items-center gap-2">
              <span className="grid size-8 place-items-center rounded-[0.7rem_0.7rem_0.7rem_0.25rem] bg-white/10">
                <LogoMark className="size-6" />
              </span>
              <span className="font-display text-[0.95rem] font-bold">
                {site.name.replace(/-\d+$/, "")}
                <span className="text-powder">-{site.name.split("-").pop()}</span>
              </span>
            </Link>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contacts.openInstagram}
              className="grid size-11 place-items-center rounded-full bg-white/10"
            >
              <InstagramIcon className="size-[1.1rem] text-powder" />
            </a>
          </div>
          <p className="mt-2 font-display text-[0.9rem] font-semibold text-white/85">{t.footer.tagline}</p>

          <nav aria-label={t.footer.sections} className="mt-4 border-t border-white/15 pt-3">
            <ul className="grid grid-cols-2 gap-x-4">
              {NAV_ORDER.map((id) => (
                <li key={id}>
                  <Link href={sectionHref(id)} className="flex min-h-10 items-center text-[0.8125rem] text-white/80">
                    {t.nav[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-3 border-t border-white/15 pt-3 text-[0.6875rem] leading-relaxed text-white/60">
            © {year} {site.legalName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
