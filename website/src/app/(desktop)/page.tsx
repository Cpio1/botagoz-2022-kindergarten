import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { Documents } from "@/components/Documents";
import { Gallery } from "@/components/gallery/Gallery";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { SiteShell } from "@/components/SiteShell";
import { getGalleryImages, getSpecialImage } from "@shared/lib/images";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero image={getSpecialImage("main-page")} />
      <About image={getSpecialImage("main-page2")} />
      <Info />
      <Gallery images={getGalleryImages()} />
      <Documents />
      <Contacts />
    </SiteShell>
  );
}
