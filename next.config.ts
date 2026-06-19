import type { NextConfig } from "next";

/**
 * Static export config — see blueprint §10.
 * `output: "export"` produces a fully static ./out folder that hosts free
 * anywhere (Cloudflare Pages / GitHub Pages) with no server cost.
 * `images.unoptimized` is required because the Next image optimizer needs a
 * server; when real photos arrive use <Image> with explicit width/height.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true, // friendlier for static hosts (clean /path/ URLs)
};

export default nextConfig;
