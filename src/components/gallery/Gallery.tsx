"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp, ImageIcon, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Cloud, Flower, Sparkle, Sprig } from "../decor/Decorations";
import { Reveal } from "../Reveal";
import { arrangeMosaic, INITIAL_COUNT } from "./layout";
import { Lightbox } from "./Lightbox";

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const tiles = useMemo(() => arrangeMosaic(images), [images]);
  const ordered = useMemo(() => tiles.map((tile) => tile.image), [tiles]);
  const visible = expanded ? tiles : tiles.slice(0, INITIAL_COUNT);
  const hasMore = images.length > INITIAL_COUNT;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-milk py-16 sm:py-20 lg:py-24">
      <div className="container-site relative">
        <Reveal className="relative mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">
              <Sparkle className="size-4" color="#79CFC4" />
              {t.gallery.eyebrow}
            </p>
            <h2
              id="gallery-title"
              className="mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] font-extrabold tracking-tight text-ink"
            >
              {t.gallery.title}
            </h2>
          </div>
          <p className="max-w-[20rem] text-[1.02rem] leading-relaxed text-ink/70 md:text-right">
            {t.gallery.description}
          </p>
          <Flower className="absolute -top-4 right-[38%] hidden w-10 animate-float lg:block" />
        </Reveal>

        {images.length === 0 ? (
          <Reveal>
            <div className="frame-leaf relative flex min-h-64 flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-br from-turq-50 to-powder-50 px-6 py-14 text-center">
              <Cloud className="absolute top-6 left-8 w-28 opacity-90" />
              <Sprig className="absolute right-8 bottom-0 w-12" />
              <span className="grid size-16 place-items-center rounded-full bg-white text-turq-dark shadow-soft">
                <ImageIcon className="size-7" aria-hidden="true" />
              </span>
              <p className="relative font-display text-lg font-bold text-ink/80">{t.gallery.empty}</p>
            </div>
          </Reveal>
        ) : (
          <>
            <ul className="grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-4 lg:auto-rows-[13.5rem] lg:gap-5">
              <AnimatePresence initial={false}>
                {visible.map(({ image, className }, i) => (
                  <motion.li
                    key={image.src}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 0.5, delay: (i % INITIAL_COUNT) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative ${className} overflow-hidden`}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`${t.gallery.open}: ${i + 1}`}
                      className="group relative block size-full overflow-hidden rounded-[inherit] bg-turq-100 focus-visible:outline-offset-[-3px]"
                    >
                      <Image
                        src={image.src}
                        alt={`${t.gallery.photo} ${i + 1}`}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-[center_40%] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-turq-darker/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute right-4 bottom-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white/95 text-turq-dark opacity-0 shadow-soft transition-[opacity,translate] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                      >
                        <Maximize2 className="size-4" />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="btn btn-secondary"
                >
                  {expanded ? t.gallery.showLess : t.gallery.showAll}
                  {!expanded && (
                    <span className="rounded-full bg-powder-100 px-2 py-0.5 text-xs font-extrabold text-ink tabular-nums">
                      {images.length}
                    </span>
                  )}
                  {expanded ? (
                    <ChevronUp className="size-4 text-turq-dark" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="size-4 text-turq-dark" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox images={ordered} index={active} onChange={setActive} />
    </section>
  );
}
