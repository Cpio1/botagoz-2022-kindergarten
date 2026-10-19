"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { NAV_ORDER } from "@/i18n/translations";
import { Flower, Sparkle, Wave } from "./decor/Decorations";
import { sectionHref } from "./Header";
import { InstagramIcon } from "./InstagramIcon";
import { Logo } from "./Logo";

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-turq-50">
      <Wave fill="#236F6B" variant={0} className="-mb-px" />
      <div className="relative overflow-hidden bg-turq-dark text-white">
        <Flower
          className="pointer-events-none absolute -right-8 -bottom-10 w-32 opacity-[0.08] md:w-44"
          petal="#ffffff"
          accent="#ffffff"
        />
        <Sparkle className="pointer-events-none absolute top-12 left-[45%] hidden w-4 opacity-40 md:block" color="#F4B6C2" />

        <div className="container-site relative grid grid-cols-2 gap-x-8 gap-y-7 pt-7 pb-7 lg:grid-cols-12 lg:gap-10 lg:pt-10">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" aria-label={t.a11y.home} className="inline-block rounded-2xl">
              <Logo tone="light" subtitle={t.common.logoSubtitle} />
            </Link>
            <p className="mt-4 max-w-[20rem] font-display text-[1rem] leading-snug font-semibold text-white/90">
              {t.footer.tagline}
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 py-1.5 pr-3.5 pl-1.5 text-[0.84rem] font-medium transition-colors hover:bg-white/20"
            >
              <span className="grid size-7 place-items-center rounded-full bg-powder text-ink">
                <InstagramIcon className="size-4" />
              </span>
              {site.instagram.handle}
            </a>
          </div>

          <nav aria-label={t.footer.sections} className="col-span-2 md:col-span-1 lg:col-span-3">
            <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.1em] text-powder uppercase">
              {t.footer.sections}
            </h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-1">
              {NAV_ORDER.map((id) => (
                <li key={id}>
                  <Link
                    href={sectionHref(id)}
                    className="inline-flex min-h-9 items-center text-[0.88rem] text-white/85 transition-colors hover:text-white"
                  >
                    {t.nav[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1 lg:col-span-5">
            <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.1em] text-powder uppercase">
              {t.footer.contacts}
            </h2>
            <ul className="mt-3 space-y-3 text-[0.88rem] text-white/85">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-turq" aria-hidden="true" />
                <address className="not-italic">{site.address.full[lang]}</address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-turq" aria-hidden="true" />
                <a href={site.phone.href} className="font-semibold text-white hover:underline">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-turq" aria-hidden="true" />
                <span>
                  {site.hours.display}, {t.contacts.days}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-site relative">
          <p className="border-t border-white/15 py-5 text-[0.8rem] text-white/65">
            © {year} {site.legalName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
