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
          className="pointer-events-none absolute -right-10 -bottom-12 w-56 opacity-[0.08]"
          petal="#ffffff"
          accent="#ffffff"
        />
        <Sparkle className="pointer-events-none absolute top-14 left-[45%] w-5 opacity-40" color="#F4B6C2" />

        <div className="container-site relative grid gap-12 pt-12 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={t.a11y.home} className="inline-block rounded-2xl">
              <Logo tone="light" subtitle={t.common.logoSubtitle} />
            </Link>
            <p className="mt-5 max-w-[20rem] font-display text-lg leading-snug font-bold text-white/90">
              {t.footer.tagline}
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/10 py-2 pr-4 pl-2 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              <span className="grid size-8 place-items-center rounded-full bg-powder text-ink">
                <InstagramIcon className="size-4" />
              </span>
              {site.instagram.handle}
            </a>
          </div>

          <nav aria-label={t.footer.sections} className="lg:col-span-3">
            <h2 className="font-sans text-[0.8rem] font-bold tracking-[0.1em] text-powder uppercase">
              {t.footer.sections}
            </h2>
            <ul className="mt-5 grid gap-1">
              {NAV_ORDER.map((id) => (
                <li key={id}>
                  <Link
                    href={sectionHref(id)}
                    className="inline-flex min-h-10 items-center text-[0.98rem] text-white/85 transition-colors hover:text-white"
                  >
                    {t.nav[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-5">
            <h2 className="font-sans text-[0.8rem] font-bold tracking-[0.1em] text-powder uppercase">
              {t.footer.contacts}
            </h2>
            <ul className="mt-5 space-y-4 text-[0.98rem] text-white/85">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-turq" aria-hidden="true" />
                <address className="not-italic">{site.address.full[lang]}</address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-turq" aria-hidden="true" />
                <a href={site.phone.href} className="font-semibold text-white hover:underline">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-turq" aria-hidden="true" />
                <span>
                  {site.hours.display}, {t.contacts.days}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-site relative">
          <p className="border-t border-white/15 py-6 text-sm text-white/65">
            © {year} {site.legalName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
