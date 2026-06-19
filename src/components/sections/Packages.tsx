"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { packages, type Pkg } from "@/data/packages";

/** Stub CTA handler — keep wiring real endpoints to a one-file change (§7). */
function handleCta(pkg: Pkg) {
  const msg =
    pkg.cta === "Register"
      ? "Connect this to your registration form / mobile-money checkout."
      : "Connect this to your package details / booking flow.";
  // eslint-disable-next-line no-alert
  alert(`${pkg.title}\n\n${msg}`);
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <Reveal>
      <article className="pkg">
        <div className="img">
          <span className="tag">{pkg.tag}</span>
          <span className="ph">Photo</span>
        </div>
        <div className="body">
          <div className="when">{pkg.when}</div>
          <h3>{pkg.title}</h3>
          <ul>
            {pkg.perks.map((perk) => (
              <li key={perk}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6FBF44" strokeWidth="2.6" aria-hidden="true">
                  <path d="M4 12l5 5L20 6" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
          <div className="foot">
            <div className="price">
              <span>{pkg.price.currency}</span> {pkg.price.amount}
            </div>
            <button
              className={`btn ${pkg.highlighted ? "btn-vital" : "btn-ghost"}`}
              onClick={() => handleCta(pkg)}
            >
              {pkg.cta}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Packages grid (blueprint §6.8). */
export function Packages() {
  return (
    <Section id="packages" className="packages" labelledBy="packages-title">
      <Reveal>
        <div className="pkg-intro">
          <div>
            <Eyebrow style={{ marginBottom: 14 }}>Unfold the experience</Eyebrow>
            <h2
              id="packages-title"
              className="display"
              style={{ fontSize: "clamp(28px,4.4vw,52px)" }}
            >
              Choose your
              <br />
              adventure
            </h2>
          </div>
          <p>
            International runners can pair their race entry with a Kilimanjaro
            stay, transfers and guided sightseeing. Local runners can grab an
            entry-only place. All packages include chip timing, a finisher medal
            and a race tee.
          </p>
        </div>
      </Reveal>

      <div className="pkgs">
        {packages.map((pkg) => (
          <PackageCard pkg={pkg} key={pkg.id} />
        ))}
      </div>
    </Section>
  );
}
