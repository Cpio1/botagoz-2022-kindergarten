import type { Metadata, Viewport } from "next";
import { Manrope, Nunito } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import { getSpecialImage } from "@/lib/images";
import { preschoolJsonLd } from "@/lib/seo";
import "./globals.css";

// cyrillic-ext covers the Kazakh letters Ә Ғ Қ Ң Ө Ұ Ү Һ І.
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const kk = dictionaries.kk;

export function generateMetadata(): Metadata {
  const hero = getSpecialImage("main-page");
  return {
    ...(site.siteUrl && { metadataBase: new URL(site.siteUrl) }),
    title: { default: kk.meta.title, template: `%s | ${site.name}` },
    description: kk.meta.description,
    applicationName: site.name,
    keywords: [
      "Ботакөз-2022",
      "балабақша",
      "балабақша Алатау",
      "Жетіген балабақша",
      "детский сад Алатау",
      "детский сад Жетиген",
      "казахский детский сад",
    ],
    ...(site.siteUrl && { alternates: { canonical: "/" } }),
    openGraph: {
      type: "website",
      siteName: site.legalName,
      title: kk.meta.title,
      description: kk.meta.description,
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      ...(site.siteUrl && { url: site.siteUrl }),
      ...(hero && { images: [{ url: hero.src, width: hero.width, height: hero.height, alt: site.legalName }] }),
    },
    twitter: {
      card: hero ? "summary_large_image" : "summary",
      title: kk.meta.title,
      description: kk.meta.description,
    },
    formatDetection: { telephone: true, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFF9EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = preschoolJsonLd(getSpecialImage("main-page"));
  return (
    <html lang="kk" className={`${nunito.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
