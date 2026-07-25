import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";

// Cycles through real role names pulled from your actual workforces, not
// abstract borrowed verbs — "explaining the workforce" using what you
// actually built, not generic action words.
const ROLES = [
  "AI HOST",
  "AI ORDER MANAGER",
  "AI FEE REMINDER AGENT",
  "AI RETURNS SPECIALIST",
  "AI APPOINTMENT MANAGER",
  "AI QUALITY INSPECTOR",
];

export default function VerbCycle() {
  const [index, setIndex] = useState(0);
  const [settled, setSettled] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || settled || shouldReduceMotion) {
      if (shouldReduceMotion) setSettled(true);
      return;
    }
    const interval = setInterval(() => {
      setIndex((i) => {
        if (i >= ROLES.length - 1) {
          setSettled(true);
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, 650);
    return () => clearInterval(interval);
  }, [inView, settled, shouldReduceMotion]);

  return (
    <section
      ref={ref}
      className="relative bg-panel/90 backdrop-blur-sm px-6 sm:px-16 py-28 sm:py-36 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <Reveal>
        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-8 relative z-10">
          Software waits to be used. This doesn't.
        </p>
      </Reveal>

      <div className="h-[2.4em] sm:h-[1.3em] flex items-center relative z-10">
        <AnimatePresence mode="wait">
          {!settled ? (
            <motion.span
              key={ROLES[index]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="font-display text-cream text-4xl sm:text-6xl md:text-7xl font-bold leading-none drop-shadow-[0_0_25px_rgba(0,168,232,0.35)]"
            >
              {ROLES[index]}
            </motion.span>
          ) : (
            <motion.span
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-display text-accent text-4xl sm:text-6xl md:text-7xl font-bold leading-none drop-shadow-[0_0_35px_rgba(0,168,232,0.6)]"
            >
              ONE WORKFORCE.
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <Reveal delay={200}>
        <p className="text-stone text-base sm:text-lg mt-10 max-w-xl leading-relaxed relative z-10">
          Every role above is real — pulled from the workforces below, not a
          demo script. Each one already running the moment it's deployed.
        </p>
      </Reveal>
    </section>
  );
}
