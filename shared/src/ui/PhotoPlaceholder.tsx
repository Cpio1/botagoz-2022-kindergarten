import { Cloud, Daisy, Flower, POWDER, Sprig, Sun, TURQ } from "../decor/Decorations";

/**
 * Illustrated stand-in shown when a photo file has not been added yet,
 * so the layout never shows a broken image.
 */
export function PhotoPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-b from-turq-100 via-turq-50 to-powder-50 ${className}`}
      aria-hidden="true"
    >
      <Sun className="absolute top-[10%] right-[12%] w-[22%]" />
      <Cloud className="absolute top-[18%] left-[8%] w-[30%] opacity-90" />
      <Cloud className="absolute top-[34%] right-[20%] w-[20%] opacity-70" />
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[42%] w-full">
        <path d="M0 90 C 90 40, 170 50, 240 80 C 310 110, 360 70, 400 60 L400 200 L0 200 Z" fill={TURQ} opacity="0.55" />
        <path d="M0 130 C 80 100, 160 110, 230 135 C 300 160, 360 120, 400 115 L400 200 L0 200 Z" fill={TURQ} opacity="0.8" />
      </svg>
      <Sprig className="absolute bottom-[8%] left-[10%] w-[12%]" color="#236F6B" />
      <Flower className="absolute bottom-[14%] left-[30%] w-[13%]" />
      <Daisy className="absolute right-[16%] bottom-[10%] w-[11%]" color="#fff" />
      <Flower className="absolute right-[34%] bottom-[22%] w-[8%]" petal="#fff" accent={POWDER} />
    </div>
  );
}
