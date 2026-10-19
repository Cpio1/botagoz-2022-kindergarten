import type { SiteImage } from "@shared/lib/images";

/**
 * Mobile gallery layout: rows instead of a mosaic.
 * - "portraits": two portrait photos side by side (3:4)
 * - "landscapes": two landscape photos side by side (4:3)
 * - "mixed": a leftover portrait + landscape, both square
 * - "wide": one panorama (or a lone leftover) across the column (16:9)
 * Pairing photos of the same shape keeps cropping small.
 */
export type RowKind = "portraits" | "landscapes" | "mixed" | "wide";
export type GalleryRow = { kind: RowKind; images: SiteImage[] };

/** The first screen shows two rows — a 2×2 grid of four photos. */
export const INITIAL_ROWS = 2;

const isPortrait = ({ width, height }: SiteImage) => width / height < 0.9;
const isPanorama = ({ width, height }: SiteImage) => width / height >= 1.6;

export function arrangeRows(images: SiteImage[]): GalleryRow[] {
  const portraits = images.filter(isPortrait);
  const panoramas = images.filter(isPanorama);
  const landscapes = images.filter((image) => !isPortrait(image) && !isPanorama(image));

  const pairs = (list: SiteImage[], kind: RowKind) => {
    const rows: GalleryRow[] = [];
    while (list.length >= 2) rows.push({ kind, images: list.splice(0, 2) });
    return rows;
  };
  const portraitRows = pairs(portraits, "portraits");
  // Panoramas pair with landscapes when there are no 4:3 photos left to pair.
  const landscapeRows = pairs(landscapes, "landscapes");

  // Interleave: portraits, landscapes, a wide shot, … — varied rhythm, balanced weight.
  const rows: GalleryRow[] = [];
  while (portraitRows.length || landscapeRows.length || panoramas.length) {
    if (portraitRows.length) rows.push(portraitRows.shift()!);
    if (landscapeRows.length) rows.push(landscapeRows.shift()!);
    if (rows.length > INITIAL_ROWS && panoramas.length) rows.push({ kind: "wide", images: [panoramas.shift()!] });
    if (!portraitRows.length && !landscapeRows.length && panoramas.length) {
      rows.push({ kind: "wide", images: [panoramas.shift()!] });
    }
  }

  // Leftovers (at most one portrait and one landscape).
  const left = [...portraits, ...landscapes];
  if (left.length === 2) rows.push({ kind: "mixed", images: left });
  else if (left.length === 1) rows.push({ kind: "wide", images: left });

  return rows;
}
