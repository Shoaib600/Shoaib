import React, { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";

// All roles are stacked and visible simultaneously (not one at a time).
// A single scroll listener finds whichever item sits closest to the
// viewport's vertical center and lights just that one up in cyan with a
// glow, dimming the rest — the highlight scrubs down the list as you
// scroll, matching LanceMart's actual effect. No pinning, no GSAP: plain
// scroll + getBoundingClientRect on 6 elements is cheap and low-risk.
const ROLES = [
  "AI HOST",
  "AI ORDER MANAGER",
  "AI FEE REMINDER AGENT",
  "AI RETURNS SPECIALIST",
  "AI APPOINTMENT MANAGER",
  "AI QUALITY INSPECTOR",
];

export default function VerbCycle() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveIndex(ROLES.length - 1);
      return;
    }

    let rafId = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const viewportCenter = window.innerHeight / 2;
        let closestIndex = null;
        let closestDist = Infinity;

        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const dist = Math.abs(itemCenter - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        });

        // Only count as "active" if reasonably close to center — avoids
        // locking one item active before the section is actually in view.
        if (closestDist < window.innerHeight * 0.6) {
          setActiveIndex(closestIndex);
        } else {
          setActiveIndex(null);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      className="relative bg-panel/90 backdrop-blur-sm px-6 sm:px-16 py-20 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <Reveal>
        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4 relative z-10">
          Software waits to be used. This doesn't.
        </p>
        <p className="text-stone text-base sm:text-lg mb-16 max-w-xl leading-relaxed relative z-10">
          Every role below is real — pulled from the workforces further down
          this page, not a demo script.
        </p>
      </Reveal>

      <div className="relative z-10 space-y-10 sm:space-y-14 py-[20vh]">
        {ROLES.map((role, i) => {
          const isActive = activeIndex === i;
          return (
            <p
              key={role}
              ref={(el) => (itemRefs.current[i] = el)}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-none text-center transition-all duration-300"
              style={{
                color: isActive ? "#00A8E8" : "#3A4750",
                textShadow: isActive ? "0 0 40px rgba(0,168,232,0.6)" : "none",
                transform: isActive ? "scale(1.08)" : "scale(1)",
              }}
            >
              {role}
            </p>
          );
        })}
      </div>
    </section>
  );
}
