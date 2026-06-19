import { PeakLogo } from "@/components/ui/PeakLogo";
import { site } from "@/data/site";

/** Site footer (blueprint §6.12). */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a href="#top" className="brand">
              <PeakLogo />
              Kibosho&nbsp;Marathon
            </a>
            <p className="addr">
              Kibosho, Moshi Rural District,
              <br />
              Kilimanjaro Region, Tanzania.
              <br />
              On the green southern slopes of Mount Kilimanjaro.
            </p>
          </div>

          <div className="foot-col">
            <h4>Event</h4>
            <a href="#intro">The race</a>
            <a href="#packages">Packages &amp; entry</a>
            <a href="#stories">Reviews</a>
            <a href="#gallery">Gallery</a>
          </div>

          <div className="foot-col">
            <h4>Visit</h4>
            <a href="#">Getting to Kibosho</a>
            <a href="#">Where to stay</a>
            <a href="#">Kilimanjaro tours</a>
            <a href="#">Travel partners</a>
          </div>

          <div className="foot-col">
            <h4>Contact</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
            <a href={site.instagram}>Instagram</a>
            <a href="#">Become a sponsor</a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <span>
            Built on the slopes of Kilimanjaro by <b>{site.builtBy}</b>
          </span>
        </div>
      </div>
    </footer>
  );
}
