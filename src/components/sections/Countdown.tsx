"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { useCountdown } from "@/hooks/useCountdown";
import { pad } from "@/lib/format";
import { site } from "@/data/site";

/** Live countdown band (blueprint §6.6). Hydration-safe via `mounted`. */
export function Countdown() {
  const { days, hours, minutes, seconds, mounted } = useCountdown(
    site.raceDateISO
  );

  // Render "--" on the server + first paint to avoid a hydration mismatch.
  const units = mounted
    ? [
        { n: String(days), l: "Days" },
        { n: pad(hours), l: "Hours" },
        { n: pad(minutes), l: "Minutes" },
        { n: pad(seconds), l: "Seconds" },
      ]
    : [
        { n: "--", l: "Days" },
        { n: "--", l: "Hours" },
        { n: "--", l: "Minutes" },
        { n: "--", l: "Seconds" },
      ];

  return (
    <section id="countdown" className="countdown pad" aria-labelledby="countdown-title">
      <div className="wrap">
        <Eyebrow>The countdown is on</Eyebrow>
        <h2 id="countdown-title" className="display">
          Race day — {site.raceDateLabel.replace(/^\w+\s/, "")}
        </h2>
        <div className="clock">
          {units.map((u) => (
            <div className="unit" key={u.l}>
              <div className="n">{u.n}</div>
              <div className="l">{u.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
