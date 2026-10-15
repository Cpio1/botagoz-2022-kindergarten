import type { Metadata } from "next";
import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { Info } from "@/components/Info";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import { getSpecialImage } from "@/lib/images";

const kk = dictionaries.kk;

export const metadata: Metadata = {
  title: { absolute: kk.meta.aboutTitle },
  description: kk.about.text,
  ...(site.siteUrl && { alternates: { canonical: "/about" } }),
  openGraph: { title: kk.meta.aboutTitle, description: kk.about.text },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <About image={getSpecialImage("main-page2")} asPage />
      <Info />
      <div className="bg-milk pb-4" />
      <Contacts />
    </SiteShell>
  );
}
