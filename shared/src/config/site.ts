/**
 * Single source of truth for the kindergarten's data.
 * Edit values here — every section of the site reads from this file.
 * Texts that differ between languages live in src/i18n/translations.ts.
 */

function cleanUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed).toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export const site = {
  name: "Ботакөз-2022",
  /** Official name — the same in both languages. */
  legalName: "ТОО «Ботакөз-2022» балабақшасы",

  phone: {
    display: "+7 707 821 59 04",
    href: "tel:+77078215904",
    e164: "+77078215904",
  },

  /**
   * WhatsApp is NOT confirmed by the owner yet.
   * Set to e.g. "77078215904" once confirmed — a WhatsApp button will appear.
   */
  whatsapp: null as string | null,

  instagram: {
    handle: "@botakoz_2022_balabakshasy",
    url: "https://www.instagram.com/botakoz_2022_balabakshasy/",
  },

  address: {
    country: "KZ",
    region: { kk: "Алматы облысы", ru: "Алматинская область" },
    city: { kk: "Алатау қаласы", ru: "город Алатау" },
    street: {
      kk: "Жетіген шағынауданы, Мақатаев көшесі, 56-үй",
      ru: "микрорайон Жетиген, улица Макатаева, дом 56",
    },
    full: {
      kk: "Алматы облысы, Алатау қаласы, Жетіген шағынауданы, Мақатаев көшесі, 56-үй",
      ru: "Алматинская область, город Алатау, микрорайон Жетиген, улица Макатаева, дом 56",
    },
  },

  map: {
    /** Text query the map searches for. */
    query: "Қазақстан, Алматы облысы, Алатау қаласы, Жетіген, Мақатаев көшесі, 56",
    /**
     * Exact coordinates are NOT confirmed yet. When the owner confirms the
     * point, set e.g. { lat: 43.6, lng: 77.0 } — the map will pin it exactly.
     */
    coordinates: null as { lat: number; lng: number } | null,
  },

  hours: {
    opens: "08:00",
    closes: "18:30",
    display: "08:00–18:30",
    /** schema.org day names for JSON-LD */
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  facts: {
    ageFrom: 2,
    ageTo: 6,
    groups: 3,
    mealsPerDay: 5,
  },

  /**
   * Google Drive folder with documents. Provide it via the
   * NEXT_PUBLIC_DOCUMENTS_URL environment variable (Vercel → Settings → Environment Variables)
   * or paste the link here. While empty, the button is hidden.
   */
  documentsUrl: cleanUrl(process.env.NEXT_PUBLIC_DOCUMENTS_URL),

  /**
   * Production domain (the EDU.KZ domain once registered), e.g. https://botakoz2022.edu.kz
   * Provide it via NEXT_PUBLIC_SITE_URL. While empty, no canonical URL is emitted.
   */
  siteUrl: cleanUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;

export function mapEmbedUrl(lang: "kk" | "ru") {
  const q = site.map.coordinates
    ? `${site.map.coordinates.lat},${site.map.coordinates.lng}`
    : site.map.query;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&hl=${lang === "kk" ? "kk" : "ru"}&z=16&output=embed`;
}

export function mapLinks() {
  const c = site.map.coordinates;
  return {
    google: c
      ? `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.map.query)}`,
    twoGis: c
      ? `https://2gis.kz/geo/${c.lng},${c.lat}`
      : `https://2gis.kz/search/${encodeURIComponent(site.map.query)}`,
  };
}
