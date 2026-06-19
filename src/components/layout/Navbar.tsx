"use client";

import { useEffect, useState } from "react";
import { PeakLogo } from "@/components/ui/PeakLogo";

/**
 * Sticky nav (blueprint §6.2). Gains a translucent blurred background after
 * 30px of scroll. On mobile the hamburger scrolls to #packages.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToPackages = () =>
    document
      .getElementById("packages")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#top" className="brand">
        <PeakLogo />
        Kibosho&nbsp;Marathon
      </a>

      <div className="navlinks">
        <a className="lk" href="#intro">
          The race
        </a>
        <a className="lk" href="#packages">
          Packages
        </a>
        <a className="lk" href="#stories">
          Reviews
        </a>
        <a className="lk" href="#gallery">
          Gallery
        </a>
        <a className="btn btn-vital" href="#packages">
          Register
        </a>
      </div>

      <button
        className="menu-toggle"
        aria-label="Open menu"
        onClick={goToPackages}
      >
        MENU
      </button>
    </nav>
  );
}
