/**
 * Spinning finisher-medal badge with a circular textPath ring (blueprint §3).
 * The spin is pure CSS (.medal) and is disabled under prefers-reduced-motion
 * via globals.css. role="img" + aria-label make it meaningful to AT.
 */
export function Medal() {
  return (
    <svg
      className="medal"
      viewBox="0 0 240 240"
      role="img"
      aria-label="Kibosho Marathon finisher medal"
    >
      <defs>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9BD96A" />
          <stop offset="1" stopColor="#6FBF44" />
        </linearGradient>
        <path
          id="circ"
          d="M120,120 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0"
        />
      </defs>
      <circle cx="120" cy="120" r="112" fill="none" stroke="url(#ring)" strokeWidth="3" />
      <circle cx="120" cy="120" r="100" fill="#0E3A2A" stroke="var(--vital)" strokeWidth="2" />
      <text fontFamily="var(--font-space-mono), monospace" fontSize="12" letterSpacing="4" fill="#9BD96A">
        <textPath href="#circ" startOffset="3%">
          KIBOSHO MARATHON · KILIMANJARO · 2026 ·
        </textPath>
      </text>
      <g transform="translate(120,128)">
        <path
          d="M-44,30 L-12,-30 L4,2 L18,-22 L44,30 Z"
          fill="none"
          stroke="#6FBF44"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M-16,-22 L-12,-30 L-6,-18 L-12,-23 Z" fill="#E8F1EA" />
        <text x="0" y="52" textAnchor="middle" fontFamily="var(--font-anton), sans-serif" fontSize="20" fill="#F2F7EF">
          FINISHER
        </text>
      </g>
    </svg>
  );
}
