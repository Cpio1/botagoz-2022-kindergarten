/**
 * Mosaic pattern, repeated every 6 photos. With `grid-flow-dense` it tiles
 * a 4-column grid (desktop) and a 2-column grid (mobile) without holes.
 */
const SPANS = [
  "col-span-2 row-span-2", // large
  "row-span-2", // tall
  "", // small
  "row-span-2", // tall
  "col-span-2", // wide
  "", // small
];

/** Varied, harmonious corner shapes — no two neighbours alike. */
const SHAPES = [
  "rounded-[2.75rem_0.75rem_2.75rem_2.75rem]",
  "rounded-[999px_999px_1.75rem_1.75rem]",
  "rounded-[1.75rem_1.75rem_1.75rem_0.5rem]",
  "rounded-[1.75rem_0.5rem_1.75rem_1.75rem]",
  "rounded-[2.5rem_2.5rem_0.75rem_2.5rem]",
  "rounded-[0.75rem_1.75rem_1.75rem_1.75rem]",
];

export function tileClasses(index: number) {
  return `${SPANS[index % SPANS.length]} ${SHAPES[index % SHAPES.length]}`;
}

export const INITIAL_COUNT = 6;
