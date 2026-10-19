"use client";

import { motion } from "motion/react";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { LANGS } from "@shared/i18n/translations";

const LABELS = { kk: "KZ", ru: "RU" } as const;
const FULL = { kk: "Қазақша", ru: "Русский" } as const;

export function LanguageSwitch({ id = "lang" }: { id?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className="relative inline-flex rounded-full bg-white p-0.5 shadow-soft ring-1 ring-turq/25"
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={FULL[code]}
            className={`relative min-h-8 min-w-9 rounded-full px-2.5 text-[0.72rem] font-semibold tracking-wide sm:min-w-10 transition-colors ${
              active ? "text-ink" : "text-ink/55 hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-turq"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{LABELS[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
