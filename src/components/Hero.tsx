"use client";

import { motion } from "motion/react";
import { ArrowRight, Baby, MessageCircleHeart, Users, Utensils } from "lucide-react";
import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Blob, Dots, Flower, Sparkle, Sprig, Squiggle, Sun, Wave } from "./decor/Decorations";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const ease = [0.22, 1, 0.36, 1] as const;

/** The frame follows the photo's proportions (within 4:5…5:4) so faces at the edges are not cropped. */
const heroRatio = (image: SiteImage | null) =>
  image ? Math.min(5 / 4, Math.max(4 / 5, image.width / image.height)) : 4 / 5;

function Chip({
  icon: Icon,
  label,
  className,
  tone,
  delay,
}: {
  icon: typeof Baby;
  label: string;
  className: string;
  tone: "turq" | "powder";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease }}
      className={`absolute z-20 ${className}`}
    >
      <div className="flex items-center gap-2 rounded-full bg-white/95 py-1.5 pr-4 pl-1.5 shadow-lift ring-1 ring-white backdrop-blur sm:gap-2.5 sm:py-2 sm:pl-2">
        <span
          className={`grid size-8 place-items-center rounded-full sm:size-9 ${
            tone === "turq" ? "bg-turq-100 text-turq-dark" : "bg-powder-100 text-[#a4495d]"
          }`}
        >
          <Icon className="size-4 sm:size-[1.15rem]" aria-hidden="true" />
        </span>
        <span className="font-display text-[0.85rem] font-extrabold whitespace-nowrap text-ink sm:text-[0.95rem]">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const [first, ...rest] = site.name.split("-");

  return (
    <section id="home" aria-labelledby="hero-title" className="relative -mt-[4.5rem] overflow-x-clip pt-[4.5rem] lg:-mt-20 lg:pt-20">
      {/* Soft background washes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[38rem] rounded-full bg-turq-100/80 blur-3xl" />
        <div className="absolute top-1/3 -left-48 size-[26rem] rounded-full bg-powder-100/70 blur-3xl" />
      </div>

      <div className="container-site relative grid items-center gap-12 pt-8 pb-16 sm:pt-12 md:pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-14 lg:pb-24">
        {/* Text */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/80 py-2 pr-4 pl-2 text-[0.82rem] font-semibold text-turq-dark shadow-soft ring-1 ring-turq/20 sm:text-sm"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-powder-100">
              <Sparkle className="size-3.5" color="#e0899c" />
            </span>
            <span>{t.hero.eyebrow}</span>
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="relative mt-6 font-display text-[clamp(2.3rem,10.5vw,4.75rem)] leading-[0.95] font-black whitespace-nowrap tracking-[-0.02em] text-ink"
          >
            <span className="relative inline-block">
              {first}
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full sm:-bottom-3 sm:h-4" />
            </span>
            <span className="text-turq-dark">-{rest.join("-")}</span>
            <Sparkle className="absolute -top-3 -right-2 hidden size-6 animate-float sm:block lg:right-8" color="#79CFC4" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mt-7 max-w-[30rem] font-display text-[clamp(1.3rem,3vw,1.75rem)] leading-snug font-extrabold text-turq-dark"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease }}
            className="mt-4 max-w-[32rem] text-[1.02rem] leading-relaxed text-ink/75 sm:text-[1.08rem]"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
          >
            <a href="#about" className="btn btn-primary group">
              {t.hero.primary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#contacts" className="btn btn-secondary">
              <MessageCircleHeart className="size-4 text-turq-dark" aria-hidden="true" />
              {t.hero.secondary}
            </a>
          </motion.div>
        </div>

        {/* Photo composition */}
        <div className="relative mx-auto w-full max-w-[25rem] sm:max-w-[28rem] lg:col-span-6 lg:mr-0 lg:max-w-[30rem] xl:max-w-[32rem]">
          <Blob
            variant={1}
            className="absolute -top-[8%] -right-[10%] w-[78%] animate-float-slow opacity-90"
            color="#bde7e0"
          />
          <Blob variant={2} className="absolute -bottom-[6%] -left-[12%] w-[46%] opacity-90" color="#fde4ea" />
          <Dots className="absolute top-[6%] -left-[6%] w-[18%] opacity-50" />
          <Sun className="absolute -top-[4%] left-[10%] z-10 w-[17%] animate-float" />
          <Sprig className="absolute -right-[4%] bottom-[10%] z-10 w-[13%] origin-bottom animate-sway" color="#236F6B" />
          <Flower className="absolute right-[18%] -bottom-[3%] z-10 w-[12%]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="relative z-[5] p-2.5"
            style={{ aspectRatio: heroRatio(image) }}
          >
            <div className="frame-hero relative h-full w-full overflow-hidden bg-white shadow-lift ring-[10px] ring-white">
              {image ? (
                <Image
                  src={image.src}
                  alt={t.common.photoAlt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 512px, (min-width: 1024px) 480px, (min-width: 640px) 448px, 90vw"
                  className="object-cover object-[center_35%]"
                />
              ) : (
                <PhotoPlaceholder />
              )}
            </div>
          </motion.div>

          <Chip icon={Baby} label={t.hero.chips.age} tone="turq" delay={0.55} className="top-[14%] -left-1 sm:-left-8" />
          <Chip icon={Users} label={t.hero.chips.groups} tone="powder" delay={0.68} className="top-[46%] -right-1 sm:-right-6" />
          <Chip icon={Utensils} label={t.hero.chips.meals} tone="turq" delay={0.8} className="bottom-[9%] left-0 sm:-left-10" />
        </div>
      </div>

      <Wave fill="#ffffff" className="relative" />
    </section>
  );
}
