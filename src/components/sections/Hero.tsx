import { KilimanjaroScene } from "@/components/ui/KilimanjaroScene";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

/** Hero (blueprint §6.3). The single <h1> on the page. */
export function Hero() {
  return (
    <header className="hero" id="top">
      <KilimanjaroScene />

      <div className="hero-content">
        <div className="wrap">
          <Eyebrow>
            {site.name} &nbsp;·&nbsp;{" "}
            <span className="dim">{site.raceDateLabel.toUpperCase()}</span>
          </Eyebrow>
          <h1 className="display">
            Run the green slopes
            <br />
            of <span className="accent">Kilimanjaro</span>
          </h1>
          <p className="lead">{site.description}</p>
          <div className="hero-cta">
            <Button variant="vital" href="#packages">
              Register now
            </Button>
            <Button variant="ghost" href="#intro">
              Discover the race
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
