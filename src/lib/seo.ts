import { site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import type { SiteImage } from "./images";

/** schema.org Preschool markup — only confirmed data. */
export function preschoolJsonLd(image: SiteImage | null) {
  const kk = dictionaries.kk;
  return {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: site.legalName,
    alternateName: [site.name, "Детский сад «Ботакөз-2022»"],
    description: kk.meta.description,
    telephone: site.phone.e164,
    sameAs: [site.instagram.url],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street.kk,
      addressLocality: site.address.city.kk,
      addressRegion: site.address.region.kk,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    ...(site.map.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.map.coordinates.lat,
        longitude: site.map.coordinates.lng,
      },
    }),
    ...(site.siteUrl && { url: site.siteUrl }),
    ...(site.siteUrl && image && { image: `${site.siteUrl}${image.src}` }),
  };
}
