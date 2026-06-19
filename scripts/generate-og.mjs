// Generates a branded 1200×630 placeholder OG image (public/og.png) — a
// vertical Kilimanjaro-green gradient. The client can replace this PNG with a
// real photo-based card later (see README placeholders).
//
// Run with: node scripts/generate-og.mjs
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { Buffer } from "node:buffer";

const W = 1200;
const H = 630;

// gradient endpoints (forest → ink), with a soft radial-ish glow near the top
const top = [29, 99, 71]; // #1d6347
const mid = [14, 58, 42]; // #0E3A2A
const bot = [8, 35, 26]; // #08231A

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}
function colorAt(y) {
  const t = y / (H - 1);
  if (t < 0.42) {
    const k = t / 0.42;
    return [lerp(top[0], mid[0], k), lerp(top[1], mid[1], k), lerp(top[2], mid[2], k)];
  }
  const k = (t - 0.42) / 0.58;
  return [lerp(mid[0], bot[0], k), lerp(mid[1], bot[1], k), lerp(mid[2], bot[2], k)];
}

// raw image: each row is [filter=0, R,G,B, R,G,B, ...]
const raw = Buffer.alloc(H * (1 + W * 3));
let o = 0;
for (let y = 0; y < H; y++) {
  raw[o++] = 0; // filter type none
  const [r, g, b] = colorAt(y);
  for (let x = 0; x < W; x++) {
    raw[o++] = r;
    raw[o++] = g;
    raw[o++] = b;
  }
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(Buffer.concat([typeBuf, data])) >>> 0, 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type RGB
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const png = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

mkdirSync("public", { recursive: true });
writeFileSync("public/og.png", png);
console.log(`Wrote public/og.png (${png.length} bytes, ${W}x${H})`);
