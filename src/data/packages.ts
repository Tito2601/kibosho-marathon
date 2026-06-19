/** Travel / entry packages (blueprint §5). PLACEHOLDER prices & inclusions. */
export type Pkg = {
  id: string;
  tag: string; // price badge on image
  when: string;
  title: string;
  perks: string[];
  price: { currency: string; amount: string };
  cta: "Register" | "View package";
  highlighted?: boolean; // local-entry card uses the vital CTA
};

export const packages: Pkg[] = [
  {
    id: "kilimanjaro",
    tag: "USD 690",
    when: "31 Jul – 3 Aug · 4 days",
    title: "Kilimanjaro Runner Package",
    perks: [
      "3 nights' lodge near Moshi",
      "Airport transfers (JRO)",
      "Race entry + medal + tee",
      "Kilimanjaro foothills day tour",
    ],
    price: { currency: "USD", amount: "690" },
    cta: "View package",
  },
  {
    id: "weekend",
    tag: "USD 290",
    when: "31 Jul – 2 Aug · 2 days",
    title: "Weekend Race Package",
    perks: [
      "1 night near the start line",
      "Race-morning shuttle",
      "Race entry + medal + tee",
      "Post-race celebration",
    ],
    price: { currency: "USD", amount: "290" },
    cta: "View package",
  },
  {
    id: "local",
    tag: "FROM TZS 10K",
    when: "Race day only · 1 Aug",
    title: "Local Runner Entry",
    perks: [
      "Entry to any distance",
      "Chip timing & live results",
      "Finisher medal + race tee",
      "Mobile-money checkout",
    ],
    price: { currency: "TZS", amount: "10K+" },
    cta: "Register",
    highlighted: true,
  },
];
