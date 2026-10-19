import type { Metadata } from "next";
import { site } from "@shared/config/site";
import { dictionaries } from "@shared/i18n/translations";
import { getSpecialImage } from "@shared/lib/images";
import { About } from "../../components/About";
import { Contacts } from "../../components/Contacts";
import { Info } from "../../components/Info";
import { MobileShell } from "../../components/MobileShell";

const kk = dictionaries.kk;

export const metadata: Metadata = {
  title: { absolute: kk.meta.aboutTitle },
  description: kk.about.text,
  ...(site.siteUrl && { alternates: { canonical: "/about" } }),
  openGraph: { title: kk.meta.aboutTitle, description: kk.about.text },
};

/** Mobile "About" page — served at "/about" for phone-width windows. */
export default function MobileAboutPage() {
  return (
    <MobileShell>
      <About image={getSpecialImage("main-page2")} asPage />
      <Info />
      <div className="bg-milk pb-2" />
      <Contacts />
    </MobileShell>
  );
}
