"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp, ImageIcon, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { SiteImage } from "@shared/lib/images";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { Cloud, Flower, Sparkle, Sprig } from "@shared/decor/Decorations";
import { Reveal } from "../Reveal";
import { arrangeMosaic, INITIAL_COUNT } from "./layout";
import { Lightbox } from "./Lightbox";

/** True below the `md` breakpoint, where the gallery uses its phone composition. */
function usePhoneLayout() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return phone;
}

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const tiles = useMemo(() => arrangeMosaic(images), [images]);
  const phone = usePhoneLayout();
  // The lightbox steps through photos in the order they appear on screen (phones regroup tiles).
  const sequence = useMemo(() => {
    const indices = tiles.map((_, i) => i);
    return phone ? indices.sort((a, b) => tiles[a].mobileOrder - tiles[b].mobileOrder) : indices;
  }, [tiles, phone]);
  const ordered = useMemo(() => sequence.map((i) => tiles[i].image), [sequence, tiles]);
  const visible = expanded ? tiles : tiles.slice(0, INITIAL_COUNT);
  const hasMore = images.length > INITIAL_COUNT;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="screen-fit relative bg-milk py-10 sm:py-14 lg:py-10">
      <div className="container-site relative">
        <div className="gallery-frame">
          <Reveal className="relative mb-5 flex flex-col gap-2 sm:mb-6 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <p className="eyebrow">
                <Sparkle className="size-3.5" color="#79CFC4" />
                {t.gallery.eyebrow}
              </p>
              <h2
                id="gallery-title"
                className="mt-2.5 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.15] font-bold tracking-tight text-ink"
              >
                {t.gallery.title}
              </h2>
            </div>
            <p className="max-w-[19rem] text-[0.9rem] leading-relaxed text-ink/65 md:pb-1 md:text-right">
              {t.gallery.description}
            </p>
            <Flower className="absolute -top-2 right-[40%] hidden w-7 lg:block" />
          </Reveal>

          {images.length === 0 ? (
            <Reveal>
              <div className="frame-leaf relative flex min-h-52 flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-turq-50 to-powder-50 px-5 py-10 text-center">
                <Cloud className="absolute top-5 left-6 w-20 opacity-90" />
                <Sprig className="absolute right-6 bottom-0 w-9" />
                <span className="grid size-12 place-items-center rounded-full bg-white text-turq-dark shadow-soft">
                  <ImageIcon className="size-5" aria-hidden="true" />
                </span>
                <p className="relative font-display text-base font-semibold text-ink/80">{t.gallery.empty}</p>
              </div>
            </Reveal>
          ) : (
            <>
              <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-flow-dense md:auto-rows-[var(--row)] md:grid-cols-4 lg:gap-3.5">
                <AnimatePresence initial={false}>
                  {visible.map(({ image, className, sizes, mobileOrder }, i) => (
                    <motion.li
                      key={image.src}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                      transition={{ duration: 0.4, delay: (i % INITIAL_COUNT) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative order-(--m-order) overflow-hidden md:order-none ${className}`}
                      style={{ "--m-order": mobileOrder } as React.CSSProperties}
                    >
                      <button
                        type="button"
                        onClick={() => setActive(sequence.indexOf(i))}
                        aria-label={`${t.gallery.open}: ${i + 1}`}
                        className="group relative block size-full overflow-hidden rounded-[inherit] bg-turq-100 focus-visible:outline-offset-[-3px]"
                      >
                        <Image
                          src={image.src}
                          alt={`${t.gallery.photo} ${i + 1}`}
                          fill
                          loading="lazy"
                          sizes={sizes}
                          className="object-cover object-[center_40%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-turq-darker/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute right-3 bottom-3 hidden size-8 translate-y-1.5 place-items-center rounded-full bg-white/95 text-turq-dark opacity-0 shadow-soft transition-[opacity,translate] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:grid"
                        >
                          <Maximize2 className="size-3.5" />
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {hasMore && (
                <div className="mt-5 flex justify-center sm:mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      // Collapsing removes a lot of height — bring the gallery back into view.
                      if (expanded) document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                      setExpanded(!expanded);
                    }}
                    aria-expanded={expanded}
                    className="btn btn-secondary w-full max-w-[20rem] sm:w-auto"
                  >
                    {expanded ? t.gallery.showLess : t.gallery.showAll}
                    {!expanded && (
                      <span className="rounded-full bg-powder-100 px-2 py-0.5 text-xs font-semibold text-ink tabular-nums">
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
      </div>

      <Lightbox images={ordered} index={active} onChange={setActive} />
    </section>
  );
}
