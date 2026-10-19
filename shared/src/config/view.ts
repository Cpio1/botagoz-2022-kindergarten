/**
 * The site has two interfaces behind one URL: the desktop site and the mobile
 * site. Which one is rendered is stored in this cookie. The middleware makes
 * the first guess (User-Agent / client hints); <ViewSync> then corrects it by
 * the real window width, so the decision is ultimately width-based.
 */
export const VIEW_COOKIE = "botakoz-view";

/** Windows up to this width get the mobile site (matches Tailwind's `md` breakpoint). */
export const MOBILE_MAX_WIDTH = 767;

/** Internal path prefix of the mobile tree — never shown to visitors. */
export const MOBILE_PREFIX = "/mobile";

export type View = "desktop" | "mobile";
