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
    shape: "rounded-[2.75rem_2.75rem_2.75rem_0.9rem]",
    surface: "bg-white shadow-soft",
    iconWrap: "text-turq-dark",
    blob: "#dcf3ef",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Flower className="absolute -right-4 -bottom-5 w-24 opacity-90" />,
  },
  {
    key: "groups",
    icon: Users,
    layout: "lg:col-span-3",
    shape: "rounded-[0.9rem_2.75rem_2.75rem_2.75rem]",
    surface: "bg-powder-100",
    iconWrap: "text-[#a4495d]",
    blob: "#ffffff",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Sparkle className="absolute top-6 right-6 w-6 animate-float" color="#ffffff" />,
  },
  {
    key: "hours",
    icon: Clock,
    layout: "md:col-span-2 lg:col-span-4 lg:row-span-2",
    shape: "rounded-[2.75rem_2.75rem_6rem_2.75rem]",
    surface: "bg-turq-dark text-white shadow-lift",
    iconWrap: "text-turq-dark",
    blob: "#79CFC4",
    value: "text-white",
    muted: "text-white/75",
    decor: (
      <>
        <Sun className="absolute right-6 bottom-8 w-20 animate-float-slow" color="#F4B6C2" />
        <Cloud className="absolute right-20 bottom-4 w-24 opacity-15" />
      </>
    ),
  },
  {
    key: "language",
    icon: BookOpen,
    layout: "lg:col-span-4",
    shape: "rounded-[2.75rem_0.9rem_2.75rem_2.75rem]",
    surface: "bg-turq-100",
    iconWrap: "text-turq-dark",
    blob: "#ffffff",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Sprig className="absolute -right-1 -bottom-3 w-14 rotate-12" color="#79CFC4" />,
  },
  {
    key: "meals",
    icon: Utensils,
    layout: "lg:col-span-4",
    shape: "rounded-[2.75rem_2.75rem_0.9rem_2.75rem]",
    surface: "bg-white shadow-soft",
    iconWrap: "text-[#a4495d]",
    blob: "#fde4ea",
    value: "text-ink",
    muted: "text-ink/60",
    decor: <Daisy className="absolute right-5 bottom-5 w-12 opacity-80" />,
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
      <div className="relative bg-turq-50 py-16 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Blob variant={2} className="absolute -top-24 -right-32 w-[28rem] opacity-60" color="#dcf3ef" />
          <Blob variant={0} className="absolute -bottom-20 -left-28 w-80 opacity-70" color="#fff3f5" />
        </div>

        <div className="container-site relative">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">
                <Sparkle className="size-4" color="#F4B6C2" />
                {t.info.eyebrow}
              </p>
              <Heading
                id="info-title"
                className="mt-4 max-w-[34rem] text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.1] font-extrabold tracking-tight text-ink"
              >
                {t.info.title}
              </Heading>
            </div>
            <Flower className="hidden w-16 animate-float-slow md:block" petal="#79CFC4" accent="#F4B6C2" />
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
            {CARDS.map((card, i) => {
              const data = t.info.cards[card.key];
              const Icon = card.icon;
              const isFeature = card.key === "hours";
              return (
                <Reveal as="li" key={card.key} delay={0.06 * i} className={card.layout}>
                  <article
                    className={`group relative flex h-full overflow-hidden p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8 ${
                      isFeature ? "min-h-[15rem] flex-col justify-between lg:min-h-full" : "min-h-[11.5rem] flex-col"
                    } ${card.shape} ${card.surface}`}
                  >
                    <div aria-hidden="true" className="pointer-events-none">
                      {card.decor}
                    </div>

                    <span className={`relative grid size-14 place-items-center ${card.iconWrap}`}>
                      <Blob
                        variant={(i % 3) as 0 | 1 | 2}
                        className="absolute inset-0 size-full transition-transform duration-500 group-hover:rotate-12"
                        color={card.blob}
                      />
                      <Icon className="relative size-6" strokeWidth={2.1} aria-hidden="true" />
                    </span>

                    <div className={`relative ${isFeature ? "mt-10" : "mt-auto pt-6"}`}>
                      <CardHeading className={`font-sans text-[0.8rem] font-bold tracking-[0.08em] uppercase ${card.muted}`}>
                        {data.title}
                      </CardHeading>
                      <p
                        className={`mt-1.5 font-display font-black tracking-tight ${card.value} ${
                          isFeature ? "text-[clamp(2.2rem,5vw,3rem)] leading-none" : "text-[1.6rem] leading-tight"
                        }`}
                      >
                        {data.value}
                      </p>
                      {data.note && <p className={`mt-2 text-base font-semibold ${card.muted}`}>{data.note}</p>}
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
