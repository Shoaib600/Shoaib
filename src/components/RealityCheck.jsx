import React from "react";

const ITEMS = [
  {
    tool: "You bought a CRM.",
    does: "It stores contacts and deals.",
    manual: "Someone still has to reply, follow up, log calls and chase quotes — by hand.",
  },
  {
    tool: "You bought a helpdesk.",
    does: "It routes tickets into a queue.",
    manual: "Every reply, every refund, every escalation is still written by a human at business hours.",
  },
  {
    tool: "You bought a POS or ERP.",
    does: "It records what happened yesterday.",
    manual: "Nobody is actually reading the numbers, spotting the leak, or acting on them today.",
  },
  {
    tool: "You have a WhatsApp Business number.",
    does: "It receives thousands of messages.",
    manual: "One or two people are drowning in it, and most customers wait hours or days.",
  },
  {
    tool: "You have SOPs in a Google Doc.",
    does: "Everyone was told to read them.",
    manual: "In practice they live in one person's head — and when that person leaves, so does the process.",
  },
];

export default function RealityCheck() {
  return (
    <section id="compare" className="bg-base px-6 sm:px-16 py-24 sm:py-32">
      <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">Reality check</p>
      <h2 className="font-display text-cream text-3xl sm:text-4xl md:text-5xl font-semibold max-w-2xl leading-tight">
        You already bought the software. The work is still manual.
      </h2>
      <p className="text-stone text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
        Most businesses aren't short on tools. They're short on people who can
        actually run those tools — consistently, at every hour, across every
        channel. So the software sits full of data while owners, managers and
        small teams keep doing the operational work by hand.
      </p>

      <div className="mt-16 grid gap-px bg-accent-muted/20 sm:grid-cols-2 lg:grid-cols-1">
        {ITEMS.map((item, i) => (
          <div key={i} className="bg-base py-8 grid sm:grid-cols-3 gap-4 sm:gap-8 lg:border-b lg:border-accent-muted/20 lg:pb-8">
            <p className="font-display text-cream text-lg font-medium">{item.tool}</p>
            <div>
              <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">What the software does</p>
              <p className="text-stone text-sm">{item.does}</p>
            </div>
            <div>
              <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">What is still manual</p>
              <p className="text-stone text-sm">{item.manual}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-cream text-lg sm:text-xl mt-16 max-w-2xl font-display">
        Adding another dashboard won't fix this. You need employees who
        actually do the work — you just don't need them to be human for every
        task.
      </p>
    </section>
  );
}
