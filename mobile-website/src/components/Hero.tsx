"use client";

import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { site } from "@shared/config/site";
import { Blob, Flower, Sparkle, Squiggle, Sun, Wave } from "@shared/decor/Decorations";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { PhotoPlaceholder } from "@shared/ui/PhotoPlaceholder";

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const [first, ...rest] = site.name.split("-");
  const ratio = image ? Math.min(5 / 4, Math.max(4 / 5, image.width / image.height)) : 1;
  const stats = [t.mobile.stats.age, t.mobile.stats.groups, t.mobile.stats.meals];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative -mt-14 overflow-x-clip pt-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-turq-50 via-milk to-milk" />

      <div className="m-container relative pt-3 pb-5 text-center">
        <p className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-turq-dark">
          <MapPin className="size-3.5" aria-hidden="true" />
          {t.about.highlights.location.value}
        </p>

        <h1
          id="hero-title"
          className="mt-1.5 font-display text-[clamp(1.6rem,8vw,2rem)] leading-[1.1] font-bold tracking-[-0.015em] whitespace-nowrap text-ink"
        >
          <span className="relative inline-block">
            {first}
            <Squiggle className="absolute -bottom-1 left-0 h-2 w-full" />
          </span>
          <span className="text-turq-dark">-{rest.join("-")}</span>
        </h1>

        <p className="mx-auto mt-2.5 max-w-[19rem] font-display text-[0.97rem] leading-snug font-semibold text-turq-dark">
          {t.hero.subtitle}
        </p>

        {/*
         * Photo: ~78% of the column, but never so large that the stats and
         * buttons fall below the first screen on short phones (svh term).
         */}
        <div
          className="relative mx-auto mt-4 w-[max(11.5rem,min(78%,18.5rem,calc(100svh-23.5rem)))]"
          style={{ aspectRatio: ratio }}
        >
          <Blob variant={1} className="absolute -top-[6%] -right-[12%] w-[58%] opacity-90" color="#dcf3ef" />
          <Blob variant={2} className="absolute -bottom-[5%] -left-[12%] w-[34%] opacity-90" color="#fde4ea" />
          <Sun className="absolute -top-[7%] left-[2%] z-10 w-[15%]" />
          <Flower className="absolute right-[4%] -bottom-[5%] z-10 w-[12%]" />
          <Sparkle className="absolute top-[38%] -left-[9%] w-[6%]" color="#79CFC4" />

          <div className="m-frame-hero relative size-full overflow-hidden bg-white shadow-soft ring-[5px] ring-white">
            {image ? (
              <Image
                src={image.src}
                alt={t.common.photoAlt}
                fill
                priority
                sizes="(max-width: 430px) 78vw, 300px"
                className="object-cover object-[center_35%]"
              />
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
        </div>

        <ul className="mx-auto mt-5 grid max-w-[21rem] grid-cols-3 rounded-[1.1rem_1.1rem_1.1rem_0.4rem] bg-white py-2 shadow-soft ring-1 ring-turq/15">
          {stats.map(({ value, label }, i) => (
            <li key={label} className={`px-1.5 ${i > 0 ? "border-l border-dashed border-turq/35" : ""}`}>
              <span className={`block font-display text-[1.05rem] leading-tight font-bold ${i === 1 ? "text-[#b4566b]" : "text-turq-dark"}`}>
                {value}
              </span>
              <span className="m-caption block">{label}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-4 flex max-w-[21rem] gap-2">
          <a href={site.phone.href} className="m-btn m-btn-primary flex-1">
            <Phone className="size-4" aria-hidden="true" />
            {t.common.call}
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contacts.openInstagram}
            className="m-btn m-btn-ghost w-11 px-0"
          >
            <InstagramIcon className="size-[1.1rem] text-turq-dark" />
          </a>
        </div>
      </div>

      <Wave fill="#ffffff" heightClass="h-5" className="relative" />
    </section>
  );
}
