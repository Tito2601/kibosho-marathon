"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Newsletter capture (blueprint §6.11). Stub: validates a non-empty email and
 * shows an alert. Swap the handler body for a real mailing-list call later.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");

  const subscribe = () => {
    // eslint-disable-next-line no-alert
    alert(
      email
        ? "Thanks! Connect this form to your mailing list or CRM."
        : "Enter an email address. (Connect this form to your mailing list.)"
    );
  };

  return (
    <Section id="news" className="news" labelledBy="news-title">
      <div className="news-grid">
        <Reveal>
          <div>
            <Eyebrow style={{ marginBottom: 12 }}>Stay on the trail</Eyebrow>
            <h2 id="news-title" className="display">
              Be first to the start line
            </h2>
            <p>
              Subscribe for entry openings, training tips for altitude, and
              race-day news from the slopes of Kilimanjaro.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault();
              subscribe();
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-vital">
              Subscribe
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
