import { MILK, POWDER, TURQ, TURQ_DARK } from "../decor/Decorations";

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
