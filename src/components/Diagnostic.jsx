import React, { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";

const OPTIONS = [
  "Answering customers (WhatsApp, calls, email)",
  "Following up on leads and quotes",
  "Manual reporting and tracking numbers",
  "Internal ops — scheduling, coordination, SOPs",
];

export default function Diagnostic() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="diagnostic" className="bg-base/90 px-6 sm:px-16 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-2xl">
        <Reveal>
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
        </Reveal>

        <Reveal delay={150}>
          <TiltCard>
            <div className="bg-panel/95 rounded-2xl p-8 border border-accent-muted/20">
              <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">Step 1 of 4</p>
              <p className="font-display text-cream text-lg font-medium mb-6">
                Where are you losing the most hours right now?
              </p>
              <div className="space-y-3">
                {OPTIONS.map((opt) => (
                  <motion.button
                    key={opt}
                    onClick={() => setSelected(opt)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-colors duration-200 ${
                      selected === opt
                        ? "border-accent text-cream bg-accent/10"
                        : "border-accent-muted/20 text-stone hover:border-accent-muted/50 hover:bg-accent-muted/5"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <motion.button
                disabled={!selected}
                whileHover={selected ? { scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0,168,232,0.5)" } : {}}
                whileTap={selected ? { scale: 0.97, y: 1 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="mt-8 w-full py-3 rounded-full bg-accent text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue
              </motion.button>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
