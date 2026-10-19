"use client";

import { useLanguage } from "@shared/i18n/LanguageProvider";
import { LANGS } from "@shared/i18n/translations";

const LABELS = { kk: "KZ", ru: "RU" } as const;
const FULL = { kk: "Қазақша", ru: "Русский" } as const;

/** KZ / RU switch: a small pill, but each half keeps a 44px-tall touch area. */
export function LangToggle() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.a11y.language} className="flex rounded-full bg-white p-0.5 ring-1 ring-turq/30">
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
            className={`relative h-8 min-w-9 rounded-full px-2 text-[0.6875rem] font-semibold tracking-wide transition-colors duration-200 after:absolute after:-inset-y-1.5 after:inset-x-0 ${
              active ? "bg-turq text-ink" : "text-ink/50"
            }`}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
