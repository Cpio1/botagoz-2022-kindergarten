"use client";

import { MotionConfig } from "motion/react";

/** Desktop-only providers — the mobile site doesn't ship the motion library. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
