/**
 * Layered hero background (blueprint §3): radial bg + glow + two SVG ridge
 * layers with a snow cap. Decorative, so aria-hidden.
 */
export function KilimanjaroScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="bg" />
      <div className="glow" />

      {/* distant kilimanjaro */}
      <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ opacity: 0.85 }}>
        <defs>
          <linearGradient id="kili" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a7a59" />
            <stop offset="1" stopColor="#0E3A2A" />
          </linearGradient>
        </defs>
        <path
          fill="url(#kili)"
          d="M0,420 L0,300 C160,280 300,250 460,200 C580,162 660,150 720,120 L790,150 C880,182 1000,225 1160,260 C1280,286 1370,300 1440,308 L1440,420 Z"
        />
        <path
          fill="#E8F1EA"
          opacity=".9"
          d="M690,128 L720,120 L760,138 L735,146 L716,135 L702,142 Z"
        />
      </svg>

      {/* green foreground slopes */}
      <svg viewBox="0 0 1440 260" preserveAspectRatio="none">
        <path
          fill="#0b2c20"
          d="M0,260 L0,150 C200,120 360,140 560,90 C760,42 920,70 1120,110 C1260,138 1360,150 1440,150 L1440,260 Z"
        />
        <path
          fill="#08231A"
          d="M0,260 L0,200 C220,170 420,205 640,180 C880,152 1060,200 1280,196 C1340,195 1400,194 1440,196 L1440,260 Z"
        />
      </svg>
    </div>
  );
}
