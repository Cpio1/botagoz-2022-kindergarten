"use client";

import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Sparkle } from "@shared/decor/Decorations";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Lightbox } from "./Lightbox";
import { arrangeRows, INITIAL_ROWS, type RowKind } from "./rows";

const ASPECT: Record<RowKind, string> = {
  portraits: "aspect-[3/4]",
  landscapes: "aspect-[4/3]",
  mixed: "aspect-square",
  wide: "col-span-2 aspect-[16/9]",
};

/** Organic corners that alternate tile by tile. */
const SHAPES = [
  "rounded-[1.25rem_0.4rem_1.25rem_1.25rem]",
  "rounded-[999px_999px_1rem_1rem]",
  "rounded-[1rem_1rem_1rem_0.4rem]",
  "rounded-[0.4rem_1.25rem_1.25rem_1.25rem]",
  "rounded-[1.25rem_1.25rem_0.4rem_1.25rem]",
];

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const rows = useMemo(() => arrangeRows(images), [images]);
  // Lightbox order = reading order of the tiles.
  const ordered = useMemo(() => rows.flatMap((row) => row.images), [rows]);
  const visibleRows = expanded ? rows : rows.slice(0, INITIAL_ROWS);
  const hasMore = rows.length > INITIAL_ROWS;

  const toggle = () => {
    const button = toggleRef.current;
    if (!expanded || !button) {
      setExpanded((v) => !v);
      return;
    }
    // Collapsing removes the rows above the button: keep the button where the
    // finger is, so the page doesn't jump.
    const before = button.getBoundingClientRect().top;
    flushSync(() => setExpanded(false));
    window.scrollBy({ top: button.getBoundingClientRect().top - before, behavior: "instant" });
  };

  let index = 0;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-milk pt-6 pb-5">
      <div className="m-container">
        <Reveal className="flex items-end justify-between gap-3">
          <SectionHeading
            id="gallery-title"
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            icon={<Sparkle className="size-3" color="#79CFC4" />}
          />
          {images.length > 0 && (
            <span className="mb-1 shrink-0 rounded-full bg-turq-100 px-2.5 py-1 text-[0.6875rem] font-semibold text-turq-dark tabular-nums">
              {images.length}
            </span>
          )}
        </Reveal>

        {images.length === 0 ? (
          <div className="m-frame-leaf mt-4 flex flex-col items-center gap-2 bg-gradient-to-br from-turq-50 to-powder-50 px-5 py-8 text-center">
            <span className="grid size-10 place-items-center rounded-full bg-white text-turq-dark shadow-soft">
              <ImageIcon className="size-4" aria-hidden="true" />
            </span>
            <p className="text-[0.875rem] font-medium text-ink/75">{t.gallery.empty}</p>
          </div>
        ) : (
          <>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {visibleRows.flatMap((row, r) =>
                row.images.map((image) => {
                  const i = index++;
                  const fresh = r >= INITIAL_ROWS;
                  return (
                    <li
                      key={image.src}
                      className={`${ASPECT[row.kind]} ${SHAPES[i % SHAPES.length]} overflow-hidden ${fresh ? "animate-fade-up" : ""}`}
                      style={fresh ? { animationDelay: `${Math.min(r - INITIAL_ROWS, 4) * 60}ms` } : undefined}
                    >
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`${t.gallery.open}: ${i + 1}`}
                        className="relative block size-full overflow-hidden rounded-[inherit] bg-turq-100 transition-[scale] duration-150 active:scale-[0.98]"
                      >
                        <Image
                          src={image.src}
                          alt={`${t.gallery.photo} ${i + 1}`}
                          fill
                          sizes={row.kind === "wide" ? "(max-width: 512px) 92vw, 480px" : "(max-width: 512px) 46vw, 240px"}
                          className="object-cover object-[center_35%]"
                        />
                      </button>
                    </li>
                  );
                }),
              )}
            </ul>

            {hasMore && (
              <button
                ref={toggleRef}
                type="button"
                onClick={toggle}
                aria-expanded={expanded}
                className="m-btn m-btn-ghost mx-auto mt-4 flex w-full max-w-[17rem]"
              >
                {expanded ? t.gallery.showLess : t.gallery.showAll}
                {expanded ? (
                  <ChevronUp className="size-4 text-turq-dark" aria-hidden="true" />
                ) : (
                  <ChevronDown className="size-4 text-turq-dark" aria-hidden="true" />
                )}
              </button>
            )}
          </>
        )}
      </div>

      <Lightbox images={ordered} index={active} onChange={setActive} />
    </section>
  );
}
