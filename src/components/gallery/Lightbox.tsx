"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";

type Props = {
  images: SiteImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ images, index, onChange }: Props) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the dialog.
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, go, onChange]);

  const image = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {image && index !== null && (
        <motion.div
          ref={dialogRef}
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.dialog}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16302e]/90 p-4 backdrop-blur-md sm:p-10"
          onClick={(e) => e.target === e.currentTarget && onChange(null)}
          onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none relative h-full max-h-[85vh] w-full max-w-6xl"
          >
            <Image
              src={image.src}
              alt={`${t.gallery.photo} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>

          <p
            className="absolute top-5 left-5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white tabular-nums sm:top-6 sm:left-6"
            aria-live="polite"
          >
            {index + 1} / {count}
          </p>

          <button
            ref={closeRef}
            type="button"
            onClick={() => onChange(null)}
            aria-label={t.gallery.close}
            className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lift transition-transform hover:scale-105 sm:top-6 sm:right-6"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.gallery.prev}
                className="absolute bottom-6 left-1/2 grid size-12 -translate-x-[calc(100%+0.5rem)] place-items-center rounded-full bg-white/90 text-ink shadow-lift transition-transform hover:scale-105 sm:top-1/2 sm:bottom-auto sm:left-6 sm:-translate-x-0 sm:-translate-y-1/2"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.gallery.next}
                className="absolute right-1/2 bottom-6 grid size-12 translate-x-[calc(100%+0.5rem)] place-items-center rounded-full bg-white/90 text-ink shadow-lift transition-transform hover:scale-105 sm:top-1/2 sm:right-6 sm:bottom-auto sm:translate-x-0 sm:-translate-y-1/2"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
