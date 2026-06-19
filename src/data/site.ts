/**
 * Single source of truth for event-wide config (blueprint §5).
 * ⚠️ Several values are PLACEHOLDERS the client must confirm — see README.
 */
export const site = {
  name: "Kibosho Marathon",
  tagline: "Run the green slopes of Kilimanjaro",
  description:
    "A sunrise road race through the coffee highlands of Kibosho, in the shadow of Africa's highest peak. Four distances, one extraordinary mountain.",
  // ⚠️ PLACEHOLDER — confirm real date with client
  raceDateISO: "2026-08-01T06:00:00+03:00", // EAT (UTC+3)
  raceDateLabel: "Sat 1 August 2026",
  location: "Kibosho, Kilimanjaro, Tanzania",
  altitude: "1,420 – 2,180 m",
  surface: "Tarmac & gravel",
  email: "hello@kiboshomarathon.co.tz", // PLACEHOLDER
  phone: "+255 000 000 000", // PLACEHOLDER
  instagram: "#", // PLACEHOLDER
  builtBy: "Angatech",
  // Used for metadata / OG canonical — update to the live domain post-sale.
  url: "https://kibosho-marathon.pages.dev",
} as const;
