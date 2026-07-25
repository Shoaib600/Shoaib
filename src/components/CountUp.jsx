import React, { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Animates a number counting up to its real, honest value on scroll into
// view. This is a design/motion choice, not a data claim — the FINAL number
// is always the real static value (role count, etc), never a fabricated
// usage metric.
export default function CountUp({ value, duration = 800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, shouldReduceMotion]);

  return <span ref={ref}>{display}</span>;
}
