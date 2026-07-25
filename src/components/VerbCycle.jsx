import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";

const VERBS = ["RESOLVES", "FOLLOWS UP", "REPLIES", "ROUTES", "REMINDS", "RECOVERS", "REPORTS"];

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
        if (i >= VERBS.length - 1) {
          setSettled(true);
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, 550);
    return () => clearInterval(interval);
  }, [inView, settled, shouldReduceMotion]);

  return (
    <section
      ref={ref}
      className="bg-panel/90 backdrop-blur-sm px-6 sm:px-16 py-24 sm:py-28 overflow-hidden"
    >
      <Reveal>
        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-8">
          Software waits to be used. This doesn't.
        </p>
      </Reveal>
      <div className="h-[1.3em] flex items-center">
        <AnimatePresence mode="wait">
          {!settled ? (
            <motion.span
              key={VERBS[index]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="font-display text-cream text-4xl sm:text-5xl md:text-6xl font-semibold"
            >
              {VERBS[index]}
            </motion.span>
          ) : (
            <motion.span
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="font-display text-accent text-4xl sm:text-5xl md:text-6xl font-semibold"
            >
              YOUR WORKFORCE.
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <Reveal delay={200}>
        <p className="text-stone text-base sm:text-lg mt-8 max-w-xl leading-relaxed">
          Every task above is already handled by one of the AI Workforces below —
          not a demo, not a chatbot script. Running the moment it's deployed.
        </p>
      </Reveal>
    </section>
  );
}
