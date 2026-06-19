import { facts } from "@/data/facts";

/** Forest quick-facts strip (blueprint §6.4). */
export function QuickFacts() {
  return (
    <section className="facts" aria-label="Race quick facts">
      <div className="row">
        {facts.map((f) => (
          <div className="fact" key={f.k}>
            <span className="k">{f.k}</span>
            <span className="v">{f.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
