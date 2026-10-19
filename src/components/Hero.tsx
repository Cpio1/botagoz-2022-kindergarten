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

type ChipData = { icon: typeof Baby; label: string; tone: "turq" | "powder" };

function ChipBody({ icon: Icon, label, tone }: ChipData) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/95 py-1 pr-3 pl-1 shadow-soft ring-1 ring-white md:gap-2 md:py-1.5 md:pr-3.5 md:pl-1.5 md:shadow-lift">
      <span
        className={`grid size-7 place-items-center rounded-full md:size-8 ${
          tone === "turq" ? "bg-turq-100 text-turq-dark" : "bg-powder-100 text-[#a4495d]"
        }`}
      >
        <Icon className="size-3.5 md:size-4" aria-hidden="true" />
      </span>
      <span className="font-display text-[0.8rem] font-semibold whitespace-nowrap text-ink md:text-[0.85rem]">{label}</span>
    </div>
  );
}

/** Floating chip around the photo (tablet and up). */
function FloatingChip({ className, delay, ...chip }: ChipData & { className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease }}
      className={`absolute z-20 hidden md:block ${className}`}
    >
      <ChipBody {...chip} />
    </motion.div>
  );
}

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const [first, ...rest] = site.name.split("-");
  const chips: ChipData[] = [
    { icon: Baby, label: t.hero.chips.age, tone: "turq" },
    { icon: Users, label: t.hero.chips.groups, tone: "powder" },
    { icon: Utensils, label: t.hero.chips.meals, tone: "turq" },
  ];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative -mt-14 overflow-x-clip pt-14 lg:-mt-16 lg:pt-16">
      {/* Soft background washes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 size-[20rem] rounded-full bg-turq-100/80 blur-3xl md:-top-32 md:-right-32 md:size-[30rem]" />
        <div className="absolute top-1/3 -left-32 hidden size-[20rem] rounded-full bg-powder-100/70 blur-3xl md:block" />
      </div>

      <div className="container-site relative grid items-center gap-y-5 pt-4 pb-7 text-center sm:gap-y-7 sm:pt-8 md:pb-10 lg:min-h-[min(calc(100svh-var(--header-h)-3.5rem),36rem)] lg:grid-cols-12 lg:content-center lg:gap-x-12 lg:gap-y-6 lg:py-8 lg:text-left">
        {/* Title block */}
        <div className="relative lg:col-span-6 lg:self-end">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="hidden max-w-full items-center gap-2 rounded-full bg-white/80 py-1.5 sm:inline-flex pr-3.5 pl-1.5 text-left text-[0.74rem] font-medium text-turq-dark shadow-soft ring-1 ring-turq/20 sm:text-[0.8rem]"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-powder-100">
              <Sparkle className="size-3" color="#e0899c" />
            </span>
            <span>{t.hero.eyebrow}</span>
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="relative mt-2 font-display text-[clamp(1.9rem,8.2vw,3.25rem)] leading-[1] font-bold whitespace-nowrap tracking-[-0.015em] text-ink sm:mt-5"
          >
            <span className="relative inline-block">
              {first}
              <Squiggle className="absolute -bottom-1.5 left-0 h-2.5 w-full sm:-bottom-2 sm:h-3" />
            </span>
            <span className="relative text-turq-dark">
              -{rest.join("-")}
              <Sparkle className="absolute -top-3 -right-5 hidden size-4 lg:block" color="#79CFC4" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mx-auto mt-4 max-w-[24rem] font-display text-[clamp(1rem,2vw,1.25rem)] leading-snug font-semibold text-turq-dark sm:mt-6 lg:mx-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease }}
            className="mx-auto mt-2.5 hidden max-w-[27rem] text-[0.93rem] leading-relaxed text-ink/70 sm:block lg:mx-0"
          >
            {t.hero.description}
          </motion.p>
        </div>

        {/* Photo composition */}
        <div className="relative mx-auto w-[76%] max-w-[17.5rem] sm:max-w-[19rem] lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mr-auto lg:w-full lg:max-w-[21rem] xl:max-w-[22.5rem]">
          <Blob
            variant={1}
            className="absolute -top-[7%] -right-[9%] w-[70%] animate-float-slow opacity-90 md:w-[76%]"
            color="#bde7e0"
          />
          <Blob variant={2} className="absolute -bottom-[5%] -left-[10%] hidden w-[42%] opacity-90 md:block" color="#fde4ea" />
          <Dots className="absolute top-[6%] -left-[6%] hidden w-[16%] opacity-50 lg:block" />
          <Sun className="absolute -top-[5%] left-[4%] z-10 w-[14%] animate-float md:left-[10%] md:w-[15%]" />
          <Sprig className="absolute -right-[4%] bottom-[10%] z-10 hidden w-[12%] origin-bottom animate-sway md:block" color="#236F6B" />
          <Flower className="absolute -bottom-[3%] right-[10%] z-10 w-[11%] md:right-[18%]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative z-[5] p-1.5 sm:p-2"
            style={{ aspectRatio: heroRatio(image) }}
          >
            <div className="frame-hero relative h-full w-full overflow-hidden bg-white shadow-lift ring-[6px] ring-white sm:ring-8">
              {image ? (
                <Image
                  src={image.src}
                  alt={t.common.photoAlt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 360px, (min-width: 640px) 336px, 76vw"
                  className="object-cover object-[center_35%]"
                />
              ) : (
                <PhotoPlaceholder />
              )}
            </div>
          </motion.div>

          <FloatingChip {...chips[0]} delay={0.55} className="top-[14%] -left-8" />
          <FloatingChip {...chips[1]} delay={0.68} className="top-[46%] -right-6 lg:-right-3 xl:-right-6" />
          <FloatingChip {...chips[2]} delay={0.8} className="bottom-[9%] -left-10" />
        </div>

        {/* Chips as a tidy row on phones */}
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="-mt-1 flex flex-wrap justify-center gap-2 md:hidden"
        >
          {chips.map((chip) => (
            <li key={chip.label}>
              <ChipBody {...chip} />
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease }}
          className="mx-auto grid w-full max-w-[18rem] gap-2.5 min-[430px]:max-w-[26rem] min-[430px]:grid-cols-2 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-center lg:col-span-6 lg:row-start-2 lg:mx-0 lg:justify-start lg:self-start"
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

      <Wave fill="#ffffff" className="relative" />
    </section>
  );
}
