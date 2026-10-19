"use client";

import { useLanguage } from "@shared/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only z-[200] rounded-full bg-turq-dark px-4 py-2.5 text-[0.875rem] font-semibold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
    >
      {t.a11y.skip}
    </a>
  );
}
