"use client";

import { ArrowRight, BookOpen, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Daisy, Flower } from "@shared/decor/Decorations";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";
import { PhotoPlaceholder } from "@shared/ui/PhotoPlaceholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About({ image, asPage = false }: { image: SiteImage | null; asPage?: boolean }) {
  const { t } = useLanguage();
  const ratio = image ? image.width / image.height : 3 / 4;
  // Portrait photos sit beside the facts; landscape ones span the column above them.
  const sideBySide = ratio < 0.95;
  const facts = [
    { icon: MapPin, ...t.about.highlights.location },
    { icon: Users, ...t.about.highlights.groups },
    { icon: BookOpen, ...t.about.highlights.language },
  ];

  const photo = (
    <div className="relative" style={{ aspectRatio: ratio }}>
      <Flower className="absolute -top-2.5 -right-2.5 z-10 w-7" />
      <div className="m-frame-leaf relative size-full bg-gradient-to-br from-turq-100 to-turq-50 p-1.5 shadow-soft">
        <div className="relative size-full overflow-hidden rounded-[1.4rem_0.45rem_1.4rem_1.4rem] bg-white">
          {image ? (
            <Image src={image.src} alt={t.common.photoAlt} fill sizes="(max-width: 430px) 50vw, 220px" className="object-contain" />
          ) : (
            <PhotoPlaceholder />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="about" aria-labelledby="about-title" className="bg-white pt-4 pb-8">
      <div className="m-container">
        <Reveal>
          <SectionHeading
            id="about-title"
            as={asPage ? "h1" : "h2"}
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            icon={<Daisy className="size-3.5" />}
          />
          {asPage && <p className="mt-1.5 font-display text-[0.97rem] font-semibold text-turq-dark">{t.about.pageLead}</p>}
          <p className="m-lead mt-3">{t.about.text}</p>
        </Reveal>

        <Reveal
          delay={80}
          className={`mt-5 ${sideBySide ? "grid grid-cols-[auto_1fr] items-center gap-4" : "space-y-4"}`}
        >
          {/* Height-bound (~11–15rem) so the photo never takes the whole screen; shown uncropped. */}
          <div className={sideBySide ? "h-[clamp(10.5rem,50vw,15rem)]" : ""} style={sideBySide ? { aspectRatio: ratio } : undefined}>
            {photo}
          </div>

          <ul className={sideBySide ? "space-y-3.5" : "grid grid-cols-3 gap-2"}>
            {facts.map(({ icon: Icon, label, value }, i) => (
              <li key={label} className={sideBySide ? "flex items-start gap-2.5" : "rounded-2xl bg-turq-50 p-2.5"}>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-[0.65rem_0.65rem_0.65rem_0.2rem] ${
                    i === 1 ? "bg-powder-100 text-[#a4495d]" : "bg-turq-100 text-turq-dark"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className={sideBySide ? "min-w-0" : "mt-2 block"}>
                  <span className="m-caption block">{label}</span>
                  <span className="mt-0.5 block font-display text-[0.875rem] leading-snug font-semibold text-ink">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {!asPage && (
          <Reveal delay={120} className="mt-5">
            <Link href="/about" className="inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] font-semibold text-turq-dark">
              {t.about.more}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
