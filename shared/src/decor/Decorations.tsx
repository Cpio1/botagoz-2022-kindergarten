/**
 * Hand-drawn decorative SVG motifs. All are aria-hidden — purely visual.
 * Colours are the brand palette (same values as the @theme tokens in globals.css).
 */

type DecorProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const TURQ = "#79CFC4";
export const TURQ_DARK = "#236F6B";
export const POWDER = "#F4B6C2";
export const MILK = "#FFF9EE";

/** Five soft petals around a milky centre. */
export function Flower({
  className,
  style,
  petal = POWDER,
  accent = TURQ,
}: DecorProps & { petal?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true" focusable="false">
      <g transform="translate(32 32)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-15"
            rx="10"
            ry="15"
            transform={`rotate(${deg})`}
            fill={i % 2 === 0 ? petal : accent}
            opacity={i % 2 === 0 ? 1 : 0.85}
          />
        ))}
        <circle r="8" fill={MILK} />
        <circle r="3.5" fill={TURQ_DARK} opacity="0.75" />
      </g>
    </svg>
  );
}

/** Small daisy made of thin petals — lighter than Flower. */
export function Daisy({ className, style, color = TURQ }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true" focusable="false">
      <g transform="translate(24 24)" fill={color}>
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-12" rx="4.5" ry="10" transform={`rotate(${i * 45})`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="6" fill={POWDER} />
    </svg>
  );
}

/** A curved sprig with leaves. */
export function Sprig({ className, style, color = TURQ }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 120" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M40 118 C 38 90, 44 60, 58 8"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M41 92 C 22 88, 12 74, 14 60 C 30 62, 40 74, 41 92 Z" fill={color} opacity="0.9" />
      <path d="M45 66 C 62 64, 72 50, 70 36 C 56 38, 46 50, 45 66 Z" fill={color} opacity="0.7" />
      <path d="M50 42 C 34 38, 28 26, 32 14 C 44 18, 50 28, 50 42 Z" fill={color} opacity="0.55" />
    </svg>
  );
}

/** Soft four-pointed sparkle. */
export function Sparkle({ className, style, color = POWDER }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M16 1 C 17.5 10, 22 14.5, 31 16 C 22 17.5, 17.5 22, 16 31 C 14.5 22, 10 17.5, 1 16 C 10 14.5, 14.5 10, 16 1 Z"
        fill={color}
      />
    </svg>
  );
}

/** Sun with rounded rays. */
export function Sun({ className, style, color = POWDER }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true" focusable="false">
      <g transform="translate(40 40)" stroke={color} strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1="0" y1="-25" x2="0" y2="-35" transform={`rotate(${i * 36})`} />
        ))}
      </g>
      <circle cx="40" cy="40" r="18" fill={color} />
      <circle cx="34" cy="37" r="1.8" fill={TURQ_DARK} opacity="0.6" />
      <circle cx="46" cy="37" r="1.8" fill={TURQ_DARK} opacity="0.6" />
      <path
        d="M34 44 Q 40 49 46 44"
        fill="none"
        stroke={TURQ_DARK}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function Cloud({ className, style, color = "#fff" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M22 58 C 8 58, 2 48, 6 38 C 9 30, 18 27, 25 29 C 27 15, 40 6, 54 9 C 64 11, 71 18, 73 26 C 80 19, 94 19, 101 27 C 106 33, 106 39, 104 42 C 114 43, 119 50, 116 56 C 115 57.5, 113 58, 111 58 Z"
        fill={color}
      />
    </svg>
  );
}

/** Hand-drawn underline used under headings. */
export function Squiggle({ className, style, color = POWDER }: DecorProps & { color?: string }) {
  return (
    <svg
      viewBox="0 0 220 18"
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 12 C 30 4, 52 4, 74 10 S 120 16, 146 9 S 196 3, 217 8"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Organic blob shape — used behind photos and icons. */
export function Blob({
  className,
  style,
  color = TURQ,
  variant = 0,
}: DecorProps & { color?: string; variant?: 0 | 1 | 2 }) {
  const paths = [
    "M43.4,-58.6C55.2,-50.3,63,-36.2,67.6,-21.1C72.2,-6,73.6,10.2,68.2,23.8C62.8,37.4,50.6,48.4,36.8,56.6C23,64.8,7.6,70.2,-8.8,71.1C-25.2,72,-42.7,68.5,-53.6,58C-64.6,47.5,-69,30.1,-70.6,13.1C-72.2,-3.9,-71,-20.4,-63.4,-33.1C-55.7,-45.8,-41.6,-54.7,-27.6,-62C-13.6,-69.3,0.3,-75.1,13.8,-73.2C27.4,-71.4,31.6,-66.9,43.4,-58.6Z",
    "M48.2,-61.3C61.1,-55.7,69.2,-39.7,72.4,-23.4C75.6,-7.1,73.9,9.5,67.2,23.7C60.5,37.9,48.8,49.6,35.3,57.9C21.8,66.2,6.5,71,-10.1,72.1C-26.6,73.2,-44.4,70.6,-55.9,60.4C-67.4,50.2,-72.7,32.5,-73.1,16C-73.5,-0.5,-69.1,-15.8,-61.4,-29.1C-53.8,-42.4,-43,-53.7,-30.1,-59.4C-17.2,-65.1,-2.3,-65.3,13.6,-66.5C29.6,-67.8,35.4,-66.9,48.2,-61.3Z",
    "M39.9,-49.2C52.4,-42.5,63.6,-30.6,67.7,-16.4C71.8,-2.1,68.8,14.4,61.2,28.1C53.6,41.8,41.3,52.7,26.9,59.9C12.5,67.1,-4,70.7,-19.9,67.6C-35.8,64.5,-51.1,54.8,-60.4,40.8C-69.7,26.8,-73,8.5,-69.4,-7.9C-65.8,-24.3,-55.3,-38.8,-42.1,-45.5C-28.9,-52.2,-13,-51.2,1.3,-52.8C15.7,-54.4,27.4,-55.9,39.9,-49.2Z",
  ];
  return (
    <svg viewBox="-80 -80 160 160" className={className} style={style} aria-hidden="true" focusable="false">
      <path d={paths[variant]} fill={color} />
    </svg>
  );
}

/** Dotted texture patch. */
export function Dots({ className, style, color = TURQ }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" focusable="false">
      {Array.from({ length: 25 }, (_, i) => (
        <circle key={i} cx={10 + (i % 5) * 20} cy={10 + Math.floor(i / 5) * 20} r="3" fill={color} />
      ))}
    </svg>
  );
}

/**
 * Wave divider between sections. `fill` is the colour of the section the wave
 * belongs to; place it at the top or bottom edge of that section.
 */
export function Wave({
  className,
  fill,
  flip = false,
  variant = 0,
  heightClass = "h-7 sm:h-10 lg:h-14",
}: {
  className?: string;
  fill: string;
  flip?: boolean;
  variant?: 0 | 1;
  /** Height utilities — the mobile site uses a slimmer wave. */
  heightClass?: string;
}) {
  const d =
    variant === 0
      ? "M0,64 C180,10 360,10 540,40 C720,70 900,90 1080,60 C1260,30 1350,30 1440,44 L1440,100 L0,100 Z"
      : "M0,40 C200,90 420,90 640,56 C860,22 1060,12 1240,44 C1330,60 1400,66 1440,62 L1440,100 L0,100 Z";
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={`block w-full ${heightClass} ${flip ? "rotate-180" : ""} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} fill={fill} />
    </svg>
  );
}
