"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";

type Props = {
  images: SiteImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Distance in px a swipe must travel to change the photo. */
const SWIPE = 60;

export function Lightbox({ images, index, onChange }: Props) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number; dx: number } | null>(null);
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
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
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
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, go, onChange]);

  if (index === null || !images[index]) return null;

  // The photo follows the finger directly (no re-render per touchmove).
  const setOffset = (dx: number, animate: boolean) => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.transition = animate ? "transform 0.2s ease-out" : "none";
    stage.style.transform = dx ? `translateX(${dx}px)` : "";
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return; // pinch-zoom stays with the browser
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dx: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const start = touch.current;
    if (!start || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - start.x;
    const dy = e.touches[0].clientY - start.y;
    if (Math.abs(dy) > Math.abs(dx)) return;
    start.dx = dx;
    setOffset(dx, false);
  };
  const onTouchEnd = () => {
    const dx = touch.current?.dx ?? 0;
    touch.current = null;
    setOffset(0, true);
    if (Math.abs(dx) > SWIPE && count > 1) go(dx < 0 ? 1 : -1);
  };

  const neighbours = count > 1 ? [images[(index + 1) % count], images[(index - 1 + count) % count]] : [];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialog}
      className="fixed inset-0 z-[100] flex animate-fade-in flex-col bg-[#132a28]"
    >
      <div className="flex h-14 shrink-0 items-center justify-between px-3">
        <p className="rounded-full bg-white/10 px-3 py-1 text-[0.75rem] font-medium text-white tabular-nums" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onChange(null)}
          aria-label={t.gallery.close}
          className="grid size-11 place-items-center rounded-full bg-white text-ink"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-pinch-zoom overflow-hidden"
        onClick={(e) => e.target === e.currentTarget && onChange(null)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {/* Outer layer moves with the finger; inner layer fades each new photo in. */}
        <div ref={stageRef} className="pointer-events-none absolute inset-2">
          <div key={images[index].src} className="absolute inset-0 animate-fade-in">
            <Image
              src={images[index].src}
              alt={`${t.gallery.photo} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
        {/* Preload the neighbours so swiping feels instant. */}
        {neighbours.map((image) => (
          <Image key={image.src} src={image.src} alt="" fill sizes="100vw" loading="eager" className="invisible object-contain" />
        ))}
      </div>

      {count > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.gallery.prev}
            className="grid size-11 place-items-center rounded-full bg-white/90 text-ink"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.gallery.next}
            className="grid size-11 place-items-center rounded-full bg-white/90 text-ink"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
