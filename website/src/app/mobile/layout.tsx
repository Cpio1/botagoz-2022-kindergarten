import { ViewSync } from "@shared/ui/ViewSync";
import "@mobile/app/mobile.css";

/** Internal mount point of the mobile site (see src/middleware.ts). */
export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewSync view="mobile" />
      {children}
    </>
  );
}
