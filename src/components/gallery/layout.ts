import type { SiteImage } from "@/lib/images";

type Kind = "large" | "tall" | "small" | "wide" | "banner";
type Orientation = "portrait" | "square" | "landscape" | "panorama";

/**
 * Desktop mosaic, repeated every 6 photos. With `grid-flow-dense` it tiles
 * a 4-column grid three rows high without holes.
 */
const PATTERN: Kind[] = ["large", "tall", "small", "tall", "wide", "small"];

/** Patterns for a final, incomplete group of photos that still leave no holes. */
const TAIL: Record<number, Kind[]> = {
  1: ["banner"],
  2: ["large", "large"],
  3: ["large", "tall", "tall"],
  4: ["large", "tall", "small", "small"],
  5: ["large", "small", "small", "small", "small"],
};

/** Desktop (md+) spans; each resets whatever the phone layout set. */
const SPANS: Record<Kind, string> = {
  large: "md:col-span-2 md:row-span-2",
  tall: "md:col-span-1 md:row-span-2",
  small: "md:col-span-1 md:row-span-1",
  wide: "md:col-span-2 md:row-span-1",
  banner: "md:col-span-4 md:row-span-2",
};

/**
 * Phone composition — its own rhythm rather than a shrunken mosaic:
 * a hero photo, then portraits and landscapes in matched pairs, then a wide
 * closing photo. Tiles use aspect ratios (no fixed rows), and `order` regroups
 * them on phones only.
 */
const MOBILE = {
  hero: "col-span-2 aspect-[4/3]",
  portrait: "col-span-1 aspect-[3/4]",
  landscape: "col-span-1 aspect-[4/3]",
  wide: "col-span-2 aspect-[16/9]",
} as const;

/** Phone slot (and its order inside the group) for each position of a full PATTERN group. */
const MOBILE_FULL: { slot: keyof typeof MOBILE; order: number }[] = [
  { slot: "hero", order: 0 },
  { slot: "portrait", order: 1 },
  { slot: "landscape", order: 3 },
  { slot: "portrait", order: 2 },
  { slot: "wide", order: 5 },
  { slot: "landscape", order: 4 },
];

/** Which photo shapes suit each tile best (first = best), so little gets cropped. */
const PREFERENCE: Record<Kind, Orientation[]> = {
  tall: ["portrait"],
  wide: ["panorama", "landscape"],
  banner: ["panorama", "landscape"],
  large: ["landscape", "square", "panorama"],
  small: ["landscape", "square", "portrait", "panorama"],
};

/** Tiles with the strictest needs pick their photos first. */
const FILL_ORDER: Kind[] = ["tall", "wide", "banner", "large", "small"];

/** Varied, harmonious corner shapes — no two neighbours alike. */
const SHAPES = [
  "rounded-[1.5rem_0.5rem_1.5rem_1.5rem] md:rounded-[2rem_0.6rem_2rem_2rem]",
  "rounded-[999px_999px_1rem_1rem] md:rounded-[999px_999px_1.25rem_1.25rem]",
  "rounded-[1rem_1rem_1rem_0.4rem] md:rounded-[1.25rem_1.25rem_1.25rem_0.4rem]",
  "rounded-[1rem_0.4rem_1rem_1rem] md:rounded-[1.25rem_0.4rem_1.25rem_1.25rem]",
  "rounded-[1.4rem_1.4rem_0.5rem_1.4rem] md:rounded-[1.8rem_1.8rem_0.6rem_1.8rem]",
  "rounded-[0.5rem_1rem_1rem_1rem] md:rounded-[0.6rem_1.25rem_1.25rem_1.25rem]",
];

/** Rendered tile width per desktop kind and phone slot, so phones never download desktop-sized photos. */
const DESKTOP_SIZES: Record<Kind, string> = {
  large: "(min-width: 1024px) 480px, (min-width: 768px) 50vw",
  wide: "(min-width: 1024px) 480px, (min-width: 768px) 50vw",
  banner: "(min-width: 1024px) 980px, (min-width: 768px) 100vw",
  tall: "(min-width: 1024px) 240px, (min-width: 768px) 25vw",
  small: "(min-width: 1024px) 240px, (min-width: 768px) 25vw",
};

export const INITIAL_COUNT = 6;

function orientation({ width, height }: SiteImage): Orientation {
  const ratio = width / height;
  if (ratio < 0.85) return "portrait";
  if (ratio < 1.2) return "square";
  if (ratio < 1.6) return "landscape";
  return "panorama";
}

function kinds(count: number): Kind[] {
  const full = count - (count % PATTERN.length);
  return Array.from({ length: count }, (_, i) =>
    i < full ? PATTERN[i % PATTERN.length] : TAIL[count - full][i - full],
  );
}

/** Phone slots for a trailing group: hero first, then pairs; a lone last tile goes wide. */
function tailSlots(group: Kind[], images: SiteImage[]): (keyof typeof MOBILE)[] {
  const slots = group.map((kind, i): keyof typeof MOBILE => {
    if (i === 0) return kind === "banner" ? "wide" : "hero";
    return orientation(images[i]) === "portrait" ? "portrait" : "landscape";
  });
  const singles = slots.length - 1;
  if (singles % 2 === 1) slots[slots.length - 1] = "wide";
  return slots;
}

export type MosaicTile = {
  image: SiteImage;
  className: string;
  sizes: string;
  /** Position on phones, where tiles are regrouped with CSS `order`. */
  mobileOrder: number;
};

/**
 * Orders photos so each one lands in a tile of a similar shape
 * (portraits in tall tiles, wide shots in wide ones) and returns
 * the tile classes. The resulting order is also used by the lightbox.
 */
export function arrangeMosaic(images: SiteImage[]): MosaicTile[] {
  const slots = kinds(images.length);
  const assigned: (SiteImage | undefined)[] = new Array(slots.length);
  const free = images.map((image) => ({ image, orientation: orientation(image), used: false }));

  for (const kind of FILL_ORDER) {
    slots.forEach((slotKind, slot) => {
      if (slotKind !== kind) return;
      for (const wanted of PREFERENCE[kind]) {
        const match = free.find((item) => !item.used && item.orientation === wanted);
        if (match) {
          match.used = true;
          assigned[slot] = match.image;
          return;
        }
      }
    });
  }

  // Whatever is left fills the remaining tiles in original order.
  const rest = free.filter((item) => !item.used).map((item) => item.image);
  const ordered = slots.map((_, i) => assigned[i] ?? rest.shift()!);

  const fullCount = images.length - (images.length % PATTERN.length);
  const tail = tailSlots(slots.slice(fullCount), ordered.slice(fullCount));

  return slots.map((kind, i) => {
    const group = Math.floor(i / PATTERN.length);
    const inFull = i < fullCount;
    const slot = inFull ? MOBILE_FULL[i % PATTERN.length].slot : tail[i - fullCount];
    const order = inFull ? MOBILE_FULL[i % PATTERN.length].order : i - fullCount;
    const phoneWidth = MOBILE[slot].startsWith("col-span-2") ? "100vw" : "50vw";
    return {
      image: ordered[i],
      className: `${MOBILE[slot]} md:aspect-auto ${SPANS[kind]} ${SHAPES[i % SHAPES.length]}`,
      sizes: `${DESKTOP_SIZES[kind]}, ${phoneWidth}`,
      mobileOrder: group * PATTERN.length + order,
    };
  });
}
