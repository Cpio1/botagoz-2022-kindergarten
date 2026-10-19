import { site } from "@shared/config/site";
import { LogoMark } from "@shared/ui/LogoMark";

type LogoProps = {
  tone?: "dark" | "light";
  subtitle: string;
};

export function Logo({ tone = "dark", subtitle }: LogoProps) {
  const light = tone === "light";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`grid size-8 shrink-0 min-[360px]:size-9 place-items-center rounded-[0.8rem_0.8rem_0.8rem_0.3rem] lg:size-10 ${
          light ? "bg-white/10" : "bg-white shadow-soft"
        }`}
      >
        <LogoMark className="size-6 min-[360px]:size-7 lg:size-8" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[0.95rem] font-bold min-[360px]:text-[1.05rem] tracking-tight lg:text-[1.15rem] ${light ? "text-white" : "text-ink"}`}
        >
          {site.name.replace(/-\d+$/, "")}
          <span className={light ? "text-powder" : "text-turq-dark"}>-{site.name.split("-").pop()}</span>
        </span>
        <span className={`mt-0.5 text-[0.6rem] font-medium tracking-[0.14em] uppercase ${light ? "text-white/70" : "text-ink/55"}`}>
          {subtitle}
        </span>
      </span>
    </span>
  );
}
