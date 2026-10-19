import { MOBILE_MAX_WIDTH, VIEW_COOKIE, type View } from "../config/view";

/**
 * Inline, render-blocking check: if the window width belongs to the other
 * interface, remember that in the cookie and reload once (same URL, same hash).
 * Also switches when the window is resized across the breakpoint.
 * The reload only happens if the cookie was actually stored — no loops when
 * cookies are blocked.
 */
export function ViewSync({ view }: { view: View }) {
  const script = `(function(){try{var m=matchMedia("(max-width:${MOBILE_MAX_WIDTH}px)");function s(){var w=m.matches?"mobile":"desktop";if(w==="${view}")return;document.cookie="${VIEW_COOKIE}="+w+";path=/;max-age=31536000;samesite=lax";if(document.cookie.indexOf("${VIEW_COOKIE}="+w)>-1)location.reload()}s();m.addEventListener("change",s)}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
