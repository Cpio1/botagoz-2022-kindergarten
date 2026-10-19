"use client";

import { Baby, BookOpen, Clock, Users, Utensils } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Dictionary } from "@/i18n/translations";
import { Blob, Cloud, Daisy, Flower, Sparkle, Sprig, Sun, Wave } from "./decor/Decorations";
import { Reveal } from "./Reveal";

type CardKey = keyof Dictionary["info"]["cards"];

type CardStyle = {
  key: CardKey;
  icon: typeof Baby;
  /** grid placement */
  layout: string;
  shape: string;
  surface: string;
  iconWrap: string;
  blob: string;
  value: string;
  muted: string;
  decor: React.ReactNode;
};

const CARDS: CardStyle[] = [
  {
    key: "age",
    icon: Baby,
    layout: "lg:col-span-5",
    shape: "rounded-[1.5rem_1.5rem_1.5rem_0.6rem] sm:rounded-[2.1rem_2.1rem_2.1rem_0.75rem]",
    surface: "bg-white shadow-soft",
    iconWrap: "text-turq-dark",
    blob: "#dcf3ef",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Flower className="absolute -right-3 -bottom-4 w-16 opacity-90 lg:w-20" />,
  },
  {
    key: "groups",
    icon: Users,
    layout: "lg:col-span-3",
    shape: "rounded-[0.6rem_1.5rem_1.5rem_1.5rem] sm:rounded-[0.75rem_2.1rem_2.1rem_2.1rem]",
    surface: "bg-powder-100",
    iconWrap: "text-[#a4495d]",
    blob: "#ffffff",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Sparkle className="absolute top-5 right-5 w-5" color="#ffffff" />,
  },
  {
    key: "hours",
    icon: Clock,
    layout: "col-span-2 lg:col-span-4 lg:row-span-2",
    shape: "rounded-[1.5rem_1.5rem_3rem_1.5rem] sm:rounded-[2.1rem_2.1rem_4.5rem_2.1rem]",
    surface: "bg-turq-dark text-white shadow-lift",
    iconWrap: "text-turq-dark",
    blob: "#79CFC4",
    value: "text-white",
    muted: "text-white/75",
    decor: (
      <>
        <Sun className="absolute top-1/2 right-5 w-12 -translate-y-1/2 sm:w-14 lg:top-auto lg:right-5 lg:bottom-6 lg:w-16 lg:translate-y-0" color="#F4B6C2" />
        <Cloud className="absolute right-16 bottom-3 hidden w-20 opacity-15 lg:block" />
      </>
    ),
  },
  {
    key: "language",
    icon: BookOpen,
    layout: "lg:col-span-4",
    shape: "rounded-[1.5rem_0.6rem_1.5rem_1.5rem] sm:rounded-[2.1rem_0.75rem_2.1rem_2.1rem]",
    surface: "bg-turq-100",
    iconWrap: "text-turq-dark",
    blob: "#ffffff",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Sprig className="absolute -right-1 -bottom-3 w-10 rotate-12 lg:w-12" color="#79CFC4" />,
  },
  {
    key: "meals",
    icon: Utensils,
    layout: "lg:col-span-4",
    shape: "rounded-[1.5rem_1.5rem_0.6rem_1.5rem] sm:rounded-[2.1rem_2.1rem_0.75rem_2.1rem]",
    surface: "bg-white shadow-soft",
    iconWrap: "text-[#a4495d]",
    blob: "#fde4ea",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Daisy className="absolute right-4 bottom-4 w-9 opacity-80 lg:w-10" />,
  },
];

export function Info({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const { t } = useLanguage();
  const Heading = headingLevel;
  const CardHeading = headingLevel === "h2" ? "h3" : "h4";

  return (
    <section id="info" aria-labelledby="info-title" className="relative">
      <div className="bg-white">
        <Wave fill="#effaf8" variant={1} />
      </div>
      <div className="relative bg-turq-50 py-9 sm:py-12 lg:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Blob variant={2} className="absolute -top-16 -right-24 w-64 opacity-60 md:-top-20 md:-right-28 md:w-[22rem]" color="#dcf3ef" />
          <Blob variant={0} className="absolute -bottom-20 -left-28 hidden w-64 opacity-70 md:block" color="#fff3f5" />
        </div>

        <div className="container-site relative">
          <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">
                <Sparkle className="size-3.5" color="#F4B6C2" />
                {t.info.eyebrow}
              </p>
              <Heading
                id="info-title"
                className="mt-2.5 max-w-[28rem] text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.15] font-bold tracking-tight text-ink"
              >
                {t.info.title}
              </Heading>
            </div>
            <Flower className="hidden w-11 md:block" petal="#79CFC4" accent="#F4B6C2" />
          </Reveal>

          <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3.5 lg:grid-cols-12">
            {CARDS.map((card, i) => {
              const data = t.info.cards[card.key];
              const Icon = card.icon;
              const isFeature = card.key === "hours";
              return (
                <Reveal as="li" key={card.key} delay={0.06 * i} className={card.layout}>
                  <article
                    className={`group relative flex h-full overflow-hidden p-4 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6 ${
                      isFeature ? "min-h-[8rem] flex-col justify-between sm:min-h-[10rem] lg:min-h-full" : "min-h-[8rem] flex-col sm:min-h-[8.75rem]"
                    } ${card.shape} ${card.surface}`}
                  >
                    <div aria-hidden="true" className={`pointer-events-none ${isFeature ? "" : "hidden sm:block"}`}>
                      {card.decor}
                    </div>

                    <span className={`relative grid size-10 place-items-center sm:size-11 ${card.iconWrap}`}>
                      <Blob
                        variant={(i % 3) as 0 | 1 | 2}
                        className="absolute inset-0 size-full transition-transform duration-500 group-hover:rotate-12"
                        color={card.blob}
                      />
                      <Icon className="relative size-[1.1rem] sm:size-5" strokeWidth={2} aria-hidden="true" />
                    </span>

                    <div className={`relative ${isFeature ? "mt-4 lg:mt-8" : "mt-auto pt-4"}`}>
                      <CardHeading className={`font-sans text-[0.66rem] leading-snug font-semibold tracking-[0.06em] uppercase sm:text-[0.72rem] ${card.muted}`}>
                        {data.title}
                      </CardHeading>
                      <p
                        className={`mt-1 font-display font-bold tracking-tight ${card.value} ${
                          isFeature ? "text-[clamp(1.6rem,3.6vw,2.1rem)] leading-none" : "text-[1rem] leading-tight sm:text-[1.15rem]"
                        }`}
                      >
                        {data.value}
                      </p>
                      {data.note && <p className={`mt-1.5 text-[0.85rem] font-medium sm:text-[0.92rem] ${card.muted}`}>{data.note}</p>}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bg-milk">
        <Wave fill="#effaf8" variant={0} flip />
      </div>
    </section>
  );
}
