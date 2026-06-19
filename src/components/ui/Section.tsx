import type { ReactNode } from "react";

type Props = {
  id?: string;
  /** extra class on the <section> (e.g. the bg class: "intro", "countdown") */
  className?: string;
  /** apply the standard 104px vertical padding */
  pad?: boolean;
  /** id of the heading element for aria-labelledby (a11y, §8) */
  labelledBy?: string;
  children: ReactNode;
};

/**
 * Section wrapper: handles the bg class, vertical padding and the centered
 * max-width `.wrap` (blueprint §4). Uses aria-labelledby for landmark a11y.
 */
export function Section({ id, className = "", pad = true, labelledBy, children }: Props) {
  const cls = `${className}${pad ? " pad" : ""}`.trim();
  return (
    <section id={id} className={cls} aria-labelledby={labelledBy}>
      <div className="wrap">{children}</div>
    </section>
  );
}
