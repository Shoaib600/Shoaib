import React from "react";
import Reveal from "./Reveal.jsx";

const PRINCIPLES = [
  { n: "01", title: "Systems over tasks", desc: "A one-off task saves an afternoon. A system saves the next ten years of afternoons. I only ship the second one." },
  { n: "02", title: "Compounding over one-offs", desc: "Every system installed makes the next one cheaper, faster and more accurate. Your operating layer should get sharper with age, not older." },
  { n: "03", title: "Business outcomes over demos", desc: "No dashboards to impress a boardroom. If a system doesn't move revenue, cost, or hours in a measurable direction, it doesn't ship." },
  { n: "04", title: "Ownership over dependence", desc: "You own the stack, the data, the prompts, the runbook. You get an operating system — not a subscription." },
];

export default function Principles() {
  return (
    <section id="principles" className="bg-panel/90 backdrop-blur-sm px-6 sm:px-16 py-24 sm:py-32 overflow-hidden">
      <Reveal>
        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">Founder principles</p>
        <h2 className="font-display text-cream text-3xl sm:text-4xl md:text-5xl font-semibold max-w-2xl leading-tight mb-12">
          How I decide what gets built.
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <blockquote className="font-display text-cream text-xl sm:text-2xl italic max-w-2xl leading-relaxed border-l-2 border-accent pl-6 mb-16">
          "Every business already has an operating system. Most of it just
          happens to run on tired people and Post-it notes. My job is to
          replace the parts that shouldn't be human anymore."
          <footer className="text-stone text-sm not-italic mt-3">
            — Muhammad Shoaib, AI Operations Architect
          </footer>
        </blockquote>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-10">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.n} delay={i * 90}>
            <div className="group cursor-default">
              <span className="text-accent-muted text-sm font-display transition-colors group-hover:text-accent">{p.n}</span>
              <h3 className="font-display text-cream text-lg font-medium mt-2 mb-2 transition-transform duration-300 group-hover:translate-x-1">
                {p.title}
              </h3>
              <p className="text-stone text-base leading-relaxed">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
