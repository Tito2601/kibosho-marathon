"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  children: ReactNode;
  className?: string;
  /** render as a different element if needed (default div) */
  as?: "div" | "section";
};

/**
 * Wraps children in the `.rise` transition and adds `.in` once scrolled into
 * view (blueprint §7). No-ops under reduced motion — the hook reveals
 * immediately so content is never hidden.
 */
export function Reveal({ children, className = "" }: Props) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`rise${inView ? " in" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
