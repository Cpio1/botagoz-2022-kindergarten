import { Footer } from "./Footer";
import { MobileHeader } from "./MobileHeader";
import { SkipLink } from "./SkipLink";

export function MobileShell({ children, isHome = false }: { children: React.ReactNode; isHome?: boolean }) {
  return (
    <>
      {/* Scroll reveals hide content only when JS runs (see .js .reveal in mobile.css). */}
      <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      <SkipLink />
      <MobileHeader isHome={isHome} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
