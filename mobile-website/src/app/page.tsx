import { getGalleryImages, getSpecialImage } from "@shared/lib/images";
import { About } from "../components/About";
import { Contacts } from "../components/Contacts";
import { Documents } from "../components/Documents";
import { Gallery } from "../components/gallery/Gallery";
import { Hero } from "../components/Hero";
import { Info } from "../components/Info";
import { MobileShell } from "../components/MobileShell";

/** Mobile home page — served at "/" for phone-width windows (see website/src/middleware.ts). */
export default function MobileHomePage() {
  return (
    <MobileShell isHome>
      <Hero image={getSpecialImage("main-page")} />
      <About image={getSpecialImage("main-page2")} />
      <Info />
      <Gallery images={getGalleryImages()} />
      <Documents />
      <Contacts />
    </MobileShell>
  );
}
