import type { Config } from "tailwindcss";

/**
 * Brand tokens are mirrored from globals.css CSS variables (blueprint §3).
 * Keeping them here lets us reach the palette from Tailwind utilities while
 * globals.css remains the single source of truth via var() references.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        forest: "var(--forest)",
        moss: "var(--moss)",
        vital: "var(--vital)",
        lime: "var(--lime)",
        snow: "var(--snow)",
        sky: "var(--sky)",
        mist: "var(--mist)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      maxWidth: {
        wrap: "var(--maxw)",
      },
    },
  },
  plugins: [],
};

export default config;
