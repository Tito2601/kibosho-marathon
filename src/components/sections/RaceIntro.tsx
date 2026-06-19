import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Medal } from "@/components/ui/Medal";

/** Race intro copy + spinning medal (blueprint §6.5). */
export function RaceIntro() {
  return (
    <Section id="intro" className="intro" labelledBy="intro-title">
      <div className="intro-grid">
        <Reveal>
          <div className="intro-copy">
            <Eyebrow>The race</Eyebrow>
            <h2 id="intro-title" className="display">
              One of the most beautiful marathons you&apos;ll ever run
            </h2>
            <p>
              The Kibosho Marathon climbs the lush southern face of Mount
              Kilimanjaro, winding through terraced coffee farms, banana groves
              and the cool stone furrows that have carried mountain spring water
              for generations. You start in the cool of sunrise, climb steadily
              into thin highland air, then let the mountain carry you home.
            </p>
            <p>
              Open to seasoned marathoners and first-time fun-runners alike,
              it&apos;s a race built around the village it runs through — with a
              Chagga cultural welcome, local food and Kilimanjaro coffee waiting
              at the finish. Join runners from across Tanzania and around the
              world for a morning on the roof of Africa.
            </p>
            <Button variant="vital" href="#packages" style={{ marginTop: 8 }}>
              See distances &amp; packages
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <Medal />
        </Reveal>
      </div>
    </Section>
  );
}
