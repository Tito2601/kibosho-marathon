"use client";

import { useEffect, useState } from "react";

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the client has mounted — gate live numbers behind this to
   *  avoid a hydration mismatch (the value differs every render). §7 */
  mounted: boolean;
};

/**
 * Live countdown to `targetISO`. Renders `mounted: false` on the server and
 * the first client paint, then ticks every second. Consumers should show
 * "--" placeholders until `mounted` is true.
 */
export function useCountdown(targetISO: string): Countdown {
  const target = new Date(targetISO).getTime();
  const calc = () => Math.max(0, target - Date.now());

  const [ms, setMs] = useState(calc);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMs(calc());
    const id = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(id);
    // target is derived from a stable prop; intentionally run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);

  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
    mounted,
  };
}
