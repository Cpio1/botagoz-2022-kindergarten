import type { SiteImage } from "@/lib/images";

type Kind = "large" | "tall" | "small" | "wide" | "banner";
type Orientation = "portrait" | "square" | "landscape" | "panorama";

/**
 * Mosaic pattern, repeated every 6 photos. With `grid-flow-dense` it tiles
 * a 4-column grid (desktop) and a 2-column grid (mobile) without holes.
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

const SPANS: Record<Kind, string> = {
  large: "col-span-2 row-span-2",
  tall: "row-span-2",
  small: "",
  wide: "col-span-2",
  banner: "col-span-2 row-span-2 md:col-span-4",
};

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
  "rounded-[2.75rem_0.75rem_2.75rem_2.75rem]",
  "rounded-[999px_999px_1.75rem_1.75rem]",
  "rounded-[1.75rem_1.75rem_1.75rem_0.5rem]",
  "rounded-[1.75rem_0.5rem_1.75rem_1.75rem]",
  "rounded-[2.5rem_2.5rem_0.75rem_2.5rem]",
  "rounded-[0.75rem_1.75rem_1.75rem_1.75rem]",
];

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

export type MosaicTile = { image: SiteImage; className: string };

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
  return slots.map((kind, i) => ({
    image: assigned[i] ?? rest.shift()!,
    className: `${SPANS[kind]} ${SHAPES[i % SHAPES.length]}`,
  }));
}
