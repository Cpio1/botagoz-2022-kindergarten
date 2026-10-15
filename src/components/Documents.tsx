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
    <section id="documents" aria-labelledby="documents-title" className="relative bg-milk pb-20 sm:pb-24">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3rem_3rem_3rem_1rem] bg-powder-100 px-6 py-12 sm:px-12 sm:py-14 lg:rounded-[4rem_4rem_10rem_1.5rem] lg:px-16 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <Blob variant={1} className="absolute -top-28 -right-24 w-[26rem] opacity-70" color="#fff3f5" />
              <Dots className="absolute bottom-8 left-[46%] w-16 opacity-40" color="#ffffff" />
              <Sparkle className="absolute top-10 left-[42%] w-5 animate-float" color="#ffffff" />
            </div>

            <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div className="order-2 md:order-1">
                <h2
                  id="documents-title"
                  className="text-[clamp(2.2rem,5vw,3.5rem)] leading-none font-black tracking-tight text-ink"
                >
                  {t.documents.title}
                </h2>
                <p className="mt-5 max-w-[28rem] text-[1.08rem] leading-relaxed text-ink/75">{t.documents.text}</p>

                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary group mt-8">
                    {t.documents.button}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <p className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/70 py-2.5 pr-5 pl-2.5 text-[0.95rem] font-semibold text-ink/70">
                    <span className="grid size-8 place-items-center rounded-full bg-white text-turq-dark">
                      <Hourglass className="size-4" aria-hidden="true" />
                    </span>
                    {t.documents.pending}
                  </p>
                )}
              </div>

              <div className="relative order-1 mx-auto w-full max-w-[18rem] md:order-2 md:max-w-[22rem]">
                <Blob variant={2} className="absolute inset-[-8%] opacity-90" color="#ffffff" />
                <DocumentsIllustration className="relative w-full drop-shadow-[0_18px_24px_rgb(35_111_107/0.18)]" />
                <Flower className="absolute -top-2 -right-1 w-14 animate-float" petal="#ffffff" accent={TURQ} />
                <Sprig className="absolute -bottom-3 -left-2 w-12 origin-bottom animate-sway" color={TURQ_DARK} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
