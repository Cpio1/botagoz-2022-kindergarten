"use client";

import { useEffect, useRef } from "react";

let observer: IntersectionObserver | null = null;

/** One observer for the whole page; each element is revealed once. */
function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms. */
  delay?: number;
};

/** Fades its content in on scroll — CSS transition only (see .reveal in mobile.css). */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? observe(ref.current) : undefined), []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
