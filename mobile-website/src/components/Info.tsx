"use client";

import { Baby, BookOpen, Clock, Users, Utensils } from "lucide-react";
import { Sparkle, Sun, Wave } from "@shared/decor/Decorations";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { Dictionary } from "@shared/i18n/translations";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type CardKey = keyof Dictionary["info"]["cards"];

/** The four small cards — each with its own corner shape, never four identical boxes. */
const SMALL: { key: CardKey; icon: typeof Baby; shape: string; surface: string; iconWrap: string }[] = [
  {
    key: "age",
    icon: Baby,
    shape: "rounded-[1.25rem_1.25rem_1.25rem_0.4rem]",
    surface: "bg-white shadow-soft",
    iconWrap: "bg-turq-100 text-turq-dark",
  },
  {
    key: "groups",
    icon: Users,
    shape: "rounded-[0.4rem_1.25rem_1.25rem_1.25rem]",
    surface: "bg-powder-100",
    iconWrap: "bg-white text-[#a4495d]",
  },
  {
    key: "language",
    icon: BookOpen,
    shape: "rounded-[1.25rem_0.4rem_1.25rem_1.25rem]",
    surface: "bg-turq-100",
    iconWrap: "bg-white text-turq-dark",
  },
  {
    key: "meals",
    icon: Utensils,
    shape: "rounded-[1.25rem_1.25rem_0.4rem_1.25rem]",
    surface: "bg-white shadow-soft",
    iconWrap: "bg-powder-100 text-[#a4495d]",
  },
];

export function Info({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const { t } = useLanguage();
  const CardHeading = headingLevel === "h2" ? "h3" : "h4";
  const hours = t.info.cards.hours;

  return (
    <section id="info" aria-labelledby="info-title" className="relative">
      <div className="bg-white">
        <Wave fill="#effaf8" variant={1} heightClass="h-5" />
      </div>
      <div className="bg-turq-50 pt-4 pb-7">
        <div className="m-container">
          <Reveal>
            <SectionHeading
              id="info-title"
              eyebrow={t.info.eyebrow}
              title={t.info.title}
              icon={<Sparkle className="size-3" color="#F4B6C2" />}
            />
          </Reveal>

          <ul className="mt-4 grid grid-cols-2 gap-2">
            {SMALL.map(({ key, icon: Icon, shape, surface, iconWrap }, i) => {
              const card = t.info.cards[key];
              return (
                <li key={key}>
                  <Reveal delay={40 * i} className="h-full">
                    <article className={`flex h-full flex-col p-3 ${shape} ${surface}`}>
                      <span className={`grid size-8 place-items-center rounded-full ${iconWrap}`}>
                        <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <CardHeading className="m-caption mt-2.5 font-sans">{card.title}</CardHeading>
                      <p className="mt-0.5 font-display text-[0.95rem] leading-snug font-semibold text-ink">{card.value}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}

            <li className="col-span-2">
              <Reveal delay={160}>
                <article className="relative flex items-center gap-3 overflow-hidden rounded-[1.25rem_1.25rem_2.25rem_1.25rem] bg-turq-dark px-4 py-3.5 text-white shadow-soft">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-turq text-turq-dark">
                    <Clock className="size-[1.1rem]" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <CardHeading className="font-sans text-[0.6875rem] font-medium tracking-wide text-white/70">
                      {hours.title}
                    </CardHeading>
                    <p className="font-display text-[1.3rem] leading-tight font-bold tracking-tight">{hours.value}</p>
                    <p className="text-[0.75rem] text-white/75">{hours.note}</p>
                  </div>
                  <Sun className="ml-auto w-10 shrink-0" color="#F4B6C2" />
                </article>
              </Reveal>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-milk">
        <Wave fill="#effaf8" variant={0} flip heightClass="h-5" />
      </div>
    </section>
  );
}
