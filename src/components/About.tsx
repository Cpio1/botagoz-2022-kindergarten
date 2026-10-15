"use client";

import { ArrowRight, BookOpen, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Blob, Daisy, Flower, Sparkle, Sprig } from "./decor/Decorations";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Reveal } from "./Reveal";

/** Tallest the photo may get on large screens, in px. */
const MAX_PHOTO_HEIGHT = 540;

function AboutPhoto({ image, alt }: { image: SiteImage | null; alt: string }) {
  const ratio = image ? image.width / image.height : 4 / 5;
  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
      <Blob variant={0} className="absolute -top-[10%] -left-[12%] w-[70%] opacity-80" color="#fde4ea" />
      <Sprig className="absolute -bottom-[2%] -left-[5%] z-10 w-[14%] origin-bottom animate-sway" />
      <Flower className="absolute -top-[3%] right-[4%] z-10 w-[14%] animate-float" />
      <Sparkle className="absolute top-[30%] -right-[3%] z-10 w-[6%]" color="#79CFC4" />

      {/* Outer organic mat; the photo inside keeps its own proportions — nothing is cropped. */}
      <div className="frame-leaf relative bg-gradient-to-br from-turq-100 to-turq-50 p-3 shadow-lift sm:p-4">
        <div
          className="relative mx-auto overflow-hidden rounded-[2.4rem_0.75rem_2.4rem_2.4rem] bg-white"
          style={{ aspectRatio: ratio, maxWidth: `min(100%, ${Math.round(MAX_PHOTO_HEIGHT * ratio)}px)` }}
        >
          {image ? (
            <Image
              src={image.src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 520px, 92vw"
              className="object-contain"
            />
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
      className={`relative bg-white ${asPage ? "pt-10 pb-20 sm:pt-14 lg:pb-28" : "py-16 sm:py-20 lg:py-24"}`}
    >
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <AboutPhoto image={image} alt={t.common.photoAlt} />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">
              <Daisy className="size-5" />
              {t.about.eyebrow}
            </p>
            <Heading
              id="about-title"
              className={`mt-4 font-extrabold tracking-tight text-ink ${
                asPage ? "text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05]" : "text-[clamp(2rem,4.2vw,3rem)] leading-[1.08]"
              }`}
            >
              {t.about.title}
            </Heading>
            {asPage && (
              <p className="mt-4 font-display text-xl font-bold text-turq-dark">{t.about.pageLead}</p>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[38rem] text-[1.05rem] leading-[1.8] text-ink/80 sm:text-[1.1rem]">
              {t.about.text}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <ul className="mt-9 grid gap-x-6 gap-y-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, label, value }, i) => (
                <li
                  key={label}
                  className={`flex items-center gap-3 sm:flex-col sm:items-start ${
                    i > 0 ? "sm:border-l sm:border-dashed sm:border-turq/40 sm:pl-6" : ""
                  }`}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-[0.9rem_0.9rem_0.9rem_0.3rem] ${
                      i === 1 ? "bg-powder-100 text-[#a4495d]" : "bg-turq-100 text-turq-dark"
                    }`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.78rem] font-semibold tracking-wide text-ink/55 uppercase">
                      {label}
                    </span>
                    <span className="block font-display text-[1.05rem] font-extrabold text-ink">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {!asPage && (
            <Reveal delay={0.2}>
              <Link href="/about" className="btn btn-secondary group mt-10">
                {t.about.more}
                <ArrowRight
                  className="size-4 text-turq-dark transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
