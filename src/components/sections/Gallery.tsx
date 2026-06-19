import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

// One big hero tile + 7 standard tiles; each is a future <Image> slot (§6.9).
const tiles = ["Add hero photo", "Photo", "Photo", "Photo", "Photo", "Photo", "Photo", "Photo"];

/** Photo gallery grid (blueprint §6.9). */
export function Gallery() {
  return (
    <Section id="gallery" className="gallery" labelledBy="gallery-title">
      <Reveal>
        <div className="sec-head">
          <Eyebrow>On the mountain</Eyebrow>
          <h2 id="gallery-title" className="display">
            Gallery
          </h2>
        </div>
      </Reveal>
      <Reveal>
        <div className="grid-gal">
          {tiles.map((label, i) => (
            <div className={`tile${i === 0 ? " big" : ""}`} key={i}>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
