import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Sponsor logo placeholders (blueprint §6.10). */
export function Sponsors() {
  return (
    <Section id="sponsors" className="sponsors" labelledBy="sponsors-title">
      <Reveal>
        <div className="sec-head" style={{ textAlign: "center" }}>
          <Eyebrow>Partners &amp; sponsors</Eyebrow>
          <h2 id="sponsors-title" className="display" style={{ margin: "8px auto 0" }}>
            Backed by
          </h2>
        </div>
      </Reveal>
      <Reveal>
        <div className="sp-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="sp" key={i}>
              Sponsor logo
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
