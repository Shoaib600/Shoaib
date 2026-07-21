import React, { useState } from "react";

const OPTIONS = [
  "Answering customers (WhatsApp, calls, email)",
  "Following up on leads and quotes",
  "Manual reporting and tracking numbers",
  "Internal ops — scheduling, coordination, SOPs",
];

export default function Diagnostic() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="diagnostic" className="bg-base px-6 sm:px-16 py-24 sm:py-32">
      <div className="max-w-2xl">
        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">Operations diagnostic</p>
        <h2 className="font-display text-cream text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
          Find out where your operating layer is leaking.
        </h2>
        <p className="text-stone text-base leading-relaxed mb-10">
          A four-question, no-obligation diagnostic. I map where your
          business is losing hours, what a system would cost to install, and
          whether an AI Workforce is even the right answer for you. Reply
          within 24 hours.
        </p>

        <div className="bg-panel rounded-2xl p-8 border border-accent-muted/20">
          <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">Step 1 of 4</p>
          <p className="font-display text-cream text-lg font-medium mb-6">
            Where are you losing the most hours right now?
          </p>
          <div className="space-y-3">
            {OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-colors ${
                  selected === opt
                    ? "border-accent text-cream bg-accent/10"
                    : "border-accent-muted/20 text-stone hover:border-accent-muted/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            disabled={!selected}
            className="mt-8 w-full py-3 rounded-full bg-accent text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-light transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
