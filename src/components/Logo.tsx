import { site } from "@/config/site";
import { MILK, POWDER, TURQ, TURQ_DARK } from "./decor/Decorations";

/** The flower emblem: alternating turquoise and powder petals around a milky core. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <g transform="translate(24 25)">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <path
            key={deg}
            d="M0 -3 C -7 -8, -7 -18, 0 -21 C 7 -18, 7 -8, 0 -3 Z"
            transform={`rotate(${deg})`}
            fill={i % 2 === 0 ? TURQ : POWDER}
          />
        ))}
        <circle r="6.5" fill={MILK} />
        <circle r="3" fill={TURQ_DARK} />
      </g>
    </svg>
  );
}

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
