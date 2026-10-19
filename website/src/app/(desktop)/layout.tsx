import { Providers } from "@/components/Providers";
import { ViewSync } from "@shared/ui/ViewSync";
import "./desktop.css";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewSync view="desktop" />
      <Providers>{children}</Providers>
    </>
  );
}
