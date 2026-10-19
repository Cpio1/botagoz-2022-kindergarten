"use client";

import { ArrowUpRight, Hourglass } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Blob, Dots, Flower, MILK, POWDER, Sparkle, Sprig, TURQ, TURQ_DARK } from "./decor/Decorations";
import { Reveal } from "./Reveal";

/** Stacked papers in an open folder — the documents illustration. */
function DocumentsIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 220" className={className} aria-hidden="true" focusable="false">
      <path d="M22 70 Q22 54 38 54 L94 54 Q104 54 110 62 L118 72 L222 72 Q238 72 238 88 L238 186 Q238 202 222 202 L38 202 Q22 202 22 186 Z" fill={TURQ_DARK} />
      <g transform="rotate(-8 110 110)">
        <rect x="58" y="26" width="112" height="140" rx="14" fill="#fff" />
        <rect x="76" y="50" width="62" height="8" rx="4" fill={POWDER} />
        <rect x="76" y="70" width="76" height="6" rx="3" fill={TURQ} opacity="0.5" />
        <rect x="76" y="86" width="68" height="6" rx="3" fill={TURQ} opacity="0.5" />
        <rect x="76" y="102" width="72" height="6" rx="3" fill={TURQ} opacity="0.5" />
      </g>
      <g transform="rotate(6 160 110)">
        <rect x="102" y="34" width="112" height="140" rx="14" fill={MILK} />
        <rect x="120" y="58" width="54" height="8" rx="4" fill={TURQ} />
        <rect x="120" y="78" width="76" height="6" rx="3" fill={POWDER} opacity="0.8" />
        <rect x="120" y="94" width="66" height="6" rx="3" fill={POWDER} opacity="0.8" />
        <rect x="120" y="110" width="72" height="6" rx="3" fill={POWDER} opacity="0.8" />
        <circle cx="186" cy="146" r="13" fill="none" stroke={TURQ} strokeWidth="4" />
        <path d="M180 146 l4 4 l8 -8" fill="none" stroke={TURQ_DARK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M14 112 Q12 98 28 98 L230 98 Q246 98 244 112 L236 190 Q234 204 218 204 L42 204 Q26 204 24 190 Z" fill={TURQ} />
      <path d="M100 150 h60" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function Documents() {
  const { t } = useLanguage();
  const url = site.documentsUrl;

  return (
    <section id="documents" aria-labelledby="documents-title" className="relative scroll-mt-4 bg-milk pb-12 sm:pb-14 lg:pb-16">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem_2rem_2rem_0.75rem] bg-powder-100 px-5 py-7 sm:rounded-[2.5rem_2.5rem_2.5rem_1rem] sm:px-10 sm:py-9 lg:rounded-[3rem_3rem_7rem_1.25rem] lg:px-14 lg:py-9">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <Blob variant={1} className="absolute -top-20 -right-20 w-64 opacity-70 md:-top-24 md:w-[21rem]" color="#fff3f5" />
              <Dots className="absolute bottom-6 left-[46%] hidden w-12 opacity-40 md:block" color="#ffffff" />
              <Sparkle className="absolute top-8 left-[42%] hidden w-4 md:block" color="#ffffff" />
            </div>

            <div className="relative grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:gap-14">
              <div className="order-2 text-center md:order-1 md:text-left">
                <h2
                  id="documents-title"
                  className="text-[clamp(1.5rem,3vw,2.1rem)] leading-none font-bold tracking-tight text-ink"
                >
                  {t.documents.title}
                </h2>
                <p className="mx-auto mt-3 max-w-[26rem] text-[0.95rem] leading-relaxed text-ink/75 sm:mt-4 md:mx-0">{t.documents.text}</p>

                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary group mt-5 sm:mt-6">
                    {t.documents.button}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <p className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-white/70 py-2 pr-4 pl-2 text-left text-[0.85rem] font-medium text-ink/70 sm:mt-6">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-turq-dark">
                      <Hourglass className="size-4" aria-hidden="true" />
                    </span>
                    {t.documents.pending}
                  </p>
                )}
              </div>

              <div className="relative order-1 mx-auto w-full max-w-[10rem] sm:max-w-[12rem] md:order-2 md:max-w-[14rem]">
                <Blob variant={2} className="absolute inset-[-8%] opacity-90" color="#ffffff" />
                <DocumentsIllustration className="relative w-full drop-shadow-[0_18px_24px_rgb(35_111_107/0.18)]" />
                <Flower className="absolute -top-2 -right-1 w-9 md:w-11" petal="#ffffff" accent={TURQ} />
                <Sprig className="absolute -bottom-3 -left-2 hidden w-10 origin-bottom animate-sway md:block" color={TURQ_DARK} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
