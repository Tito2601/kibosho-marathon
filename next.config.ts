import type { NextConfig } from "next";

/**
 * Static export config — see blueprint §10.
 * `output: "export"` produces a fully static ./out folder that hosts free
 * anywhere (Cloudflare Pages / GitHub Pages) with no server cost.
 * `images.unoptimized` is required because the Next image optimizer needs a
 * server; when real photos arrive use <Image> with explicit width/height.
 */
// GitHub Pages project sites serve from /<repo>, so assets need a basePath.
// The deploy workflow sets PAGES_BASE_PATH=/<repo-name>; left empty, the site
// builds for the root (local dev, Cloudflare Pages, a custom domain).
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true, // friendlier for static hosts (clean /path/ URLs)
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
