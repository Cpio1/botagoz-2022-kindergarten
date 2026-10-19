"use client";

import { ArrowUpRight, Hourglass } from "lucide-react";
import { site } from "@shared/config/site";
import { MILK, POWDER, Sparkle, TURQ, TURQ_DARK } from "@shared/decor/Decorations";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { Reveal } from "./Reveal";

/** Small folder-with-papers mark. */
function FolderMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden="true" focusable="false">
      <path d="M6 16 Q6 10 12 10 L24 10 Q27 10 29 13 L31 16 L52 16 Q58 16 58 22 L58 46 Q58 52 52 52 L12 52 Q6 52 6 46 Z" fill={TURQ_DARK} />
      <rect x="15" y="5" width="26" height="32" rx="4" fill="#fff" transform="rotate(-8 28 21)" />
      <rect x="24" y="8" width="26" height="32" rx="4" fill={MILK} transform="rotate(6 37 24)" />
      <rect x="29" y="15" width="13" height="3" rx="1.5" fill={POWDER} transform="rotate(6 37 24)" />
      <rect x="29" y="21" width="16" height="2.5" rx="1.25" fill={TURQ} opacity="0.6" transform="rotate(6 37 24)" />
      <path d="M4 27 Q4 23 8 23 L56 23 Q60 23 60 27 L57 48 Q56 52 52 52 L12 52 Q8 52 7 48 Z" fill={TURQ} />
    </svg>
  );
}

export function Documents() {
  const { t } = useLanguage();
  const url = site.documentsUrl;

  return (
    <section id="documents" aria-labelledby="documents-title" className="bg-milk pt-3 pb-8">
      <div className="m-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.6rem_1.6rem_2.75rem_0.6rem] bg-powder-100 p-4">
            <Sparkle className="absolute top-3 right-4 w-3.5" color="#ffffff" />
            <div className="flex items-center gap-3.5">
              <span className="grid size-[4.25rem] shrink-0 place-items-center rounded-[1.25rem_1.25rem_1.25rem_0.4rem] bg-white/70">
                <FolderMark className="w-12" />
              </span>
              <div className="min-w-0">
                <h2 id="documents-title" className="font-display text-[clamp(1.3rem,6vw,1.6rem)] leading-tight font-bold text-ink">
                  {t.documents.title}
                </h2>
                <p className="mt-1 text-[0.8125rem] leading-snug text-ink/70">{t.documents.text}</p>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-btn m-btn-primary mt-2.5 px-4 text-[0.8125rem]"
                  >
                    {t.documents.button}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {!url && (
              <p className="mt-3.5 flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-3 pl-1.5 text-[0.75rem] font-medium text-ink/65">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-turq-dark">
                  <Hourglass className="size-3" aria-hidden="true" />
                </span>
                {t.documents.pending}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
