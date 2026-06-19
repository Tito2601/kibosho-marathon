"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { reviews } from "@/data/reviews";

const AUTO_MS = 5500;

// Decorative mountain placeholders — one swap point per slide for real photos.
const mountainPaths = [
  "M0,300 L0,180 L140,90 L210,150 L290,70 L400,170 L400,300Z",
  "M0,300 L0,160 L120,110 L220,60 L300,140 L400,110 L400,300Z",
  "M0,300 L0,200 L100,120 L180,170 L280,80 L400,150 L400,300Z",
];

/** Runner reviews carousel (blueprint §6.7). Auto-advances; dots reset timer. */
export function Stories() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = reviews.length;

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % count), AUTO_MS);
  }, [count]);

  useEffect(() => {
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [start]);

  const go = (n: number) => {
    setIdx(n);
    start(); // reset the auto-advance timer on manual interaction
  };

  return (
    <Section id="stories" className="stories" labelledBy="stories-title">
      <Reveal>
        <div className="sec-head">
          <Eyebrow>Reviews</Eyebrow>
          <h2 id="stories-title" className="display">
            From the runners
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="carousel">
          <div className="slides">
            {reviews.map((r, i) => (
              <div
                className={`slide${i === idx ? " active" : ""}`}
                key={r.who}
                aria-hidden={i !== idx}
              >
                <div className="photo">
                  <svg
                    className="mountain"
                    viewBox="0 0 400 300"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path fill="#0b2c20" d={mountainPaths[i % mountainPaths.length]} />
                  </svg>
                </div>
                <div className="quote">
                  <div className="mark" aria-hidden="true">
                    &#8220;
                  </div>
                  <p>{r.quote}</p>
                  <div className="who">— {r.who}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="dots">
            {reviews.map((r, i) => (
              <button
                key={r.who}
                className={`dot${i === idx ? " active" : ""}`}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === idx}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
