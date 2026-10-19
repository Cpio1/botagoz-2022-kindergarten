"use client";

import { ArrowRight, BookOpen, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Blob, Daisy, Flower, Sparkle, Sprig } from "./decor/Decorations";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Reveal } from "./Reveal";

function AboutPhoto({ image, alt }: { image: SiteImage | null; alt: string }) {
  const ratio = image ? image.width / image.height : 4 / 5;
  return (
    // The frame width follows the photo's ratio, so the whole photo shows and its height stays
    // at ~17rem on phones, 20rem on tablets and 26rem on desktop.
    <div
      className="relative mx-auto w-full max-w-[min(100%,calc(var(--ratio)*17rem+1rem))] sm:max-w-[calc(var(--ratio)*20rem+1.5rem)] lg:max-w-[calc(var(--ratio)*26rem+1.5rem)]"
      style={{ "--ratio": ratio } as React.CSSProperties}
    >
      <Blob variant={0} className="absolute -top-[7%] -left-[16%] w-[70%] opacity-80 lg:-left-[22%] lg:w-[80%]" color="#fde4ea" />
      <Sprig className="absolute -bottom-[2%] -left-[9%] z-10 hidden w-[18%] origin-bottom animate-sway md:block" />
      <Flower className="absolute -top-[4%] -right-[6%] z-10 w-[18%]" />
      <Sparkle className="absolute top-[34%] -right-[7%] z-10 hidden w-[7%] md:block" color="#79CFC4" />

      {/* Organic mat around the photo; object-contain — nothing is cropped. */}
      <div className="frame-leaf relative bg-gradient-to-br from-turq-100 to-turq-50 p-2 shadow-lift sm:p-3">
        <div
          className="relative w-full overflow-hidden rounded-[1.5rem_0.5rem_1.5rem_1.5rem] bg-white sm:rounded-[2rem_0.6rem_2rem_2rem]"
          style={{ aspectRatio: ratio }}
        >
          {image ? (
            <Image src={image.src} alt={alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 240px, 200px" className="object-contain" />
          ) : (
            <PhotoPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}

export function About({ image, asPage = false }: { image: SiteImage | null; asPage?: boolean }) {
  const { t } = useLanguage();
  const Heading = asPage ? "h1" : "h2";
  const highlights = [
    { icon: MapPin, ...t.about.highlights.location },
    { icon: Users, ...t.about.highlights.groups },
    { icon: BookOpen, ...t.about.highlights.language },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={`screen-fit relative bg-white ${asPage ? "pt-6 pb-12 sm:pt-10 lg:py-12" : "py-10 sm:py-14 lg:py-12"}`}
    >
      <div className="container-site grid items-center gap-y-7 sm:gap-y-9 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-6">
        {/* 1 — heading and text (phones: first; desktop: right column, top) */}
        <Reveal className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-end">
          <p className="eyebrow">
            <Daisy className="size-3.5" />
            {t.about.eyebrow}
          </p>
          <Heading
            id="about-title"
            className={`mt-2.5 font-bold tracking-tight text-ink ${
              asPage ? "text-[clamp(1.65rem,3.6vw,2.4rem)] leading-[1.12]" : "text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.15]"
            }`}
          >
            {t.about.title}
          </Heading>
          {asPage && (
            <p className="mt-2.5 font-display text-[1.02rem] font-semibold text-turq-dark sm:text-[1.15rem]">{t.about.pageLead}</p>
          )}
          <p className="mt-3.5 max-w-[34rem] text-[0.93rem] leading-[1.75] text-ink/75 sm:mt-4 sm:text-[0.98rem]">
            {t.about.text}
          </p>
        </Reveal>

        {/* 2 — photo (desktop: left column, both rows) */}
        <Reveal delay={0.06} className="px-6 sm:px-0 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <AboutPhoto image={image} alt={t.common.photoAlt} />
        </Reveal>

        {/* 3 — key facts and link */}
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:self-start">
          <ul className="grid gap-2 rounded-[1.25rem_1.25rem_1.25rem_0.4rem] bg-turq-50 p-3 sm:grid-cols-3 sm:gap-x-5 sm:bg-transparent sm:p-0">
            {highlights.map(({ icon: Icon, label, value }, i) => (
              <li
                key={label}
                className={`flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2.5 ${
                  i > 0 ? "sm:border-l sm:border-dashed sm:border-turq/40 sm:pl-5" : ""
                }`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-[0.75rem_0.75rem_0.75rem_0.25rem] ${
                    i === 1 ? "bg-powder-100 text-[#a4495d]" : "bg-white text-turq-dark sm:bg-turq-100"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.66rem] font-medium tracking-wide text-ink/55 uppercase">{label}</span>
                  <span className="block font-display text-[0.93rem] font-semibold text-ink">{value}</span>
                </span>
              </li>
            ))}
          </ul>

          {!asPage && (
            <Link href="/about" className="btn btn-secondary group mt-6 sm:mt-7">
              {t.about.more}
              <ArrowRight
                className="size-4 text-turq-dark transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
