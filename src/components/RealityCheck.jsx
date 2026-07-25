import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal.jsx";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    // GSAP ScrollTrigger pinned/scrubbed sequence — desktop only (min-width
    // 768px). On mobile, pinning eats scroll budget and tends to feel
    // sticky/janky on touch, so smaller screens keep the lighter Motion
    // whileInView reveal instead. This is a deliberate scope choice, not
    // an oversight — "smooth on mobile" and "pinned scroll scrub" pull
    // against each other, and mobile wins that tradeoff here.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const items = itemRefs.current.filter(Boolean);
      if (!items.length) return;

      gsap.set(items, { opacity: 0.15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=80",
          end: `+=${items.length * 260}`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
        },
      });

      items.forEach((el, i) => {
        tl.to(
          el,
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          i * 0.6
        ).to(
          el,
          { opacity: 0.25, duration: 0.3, ease: "power2.in" },
          i * 0.6 + 0.9
        );
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="compare"
      ref={sectionRef}
      className="bg-base/90 px-6 sm:px-16 py-24 sm:py-32 overflow-hidden"
    >
      <Reveal>
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
      </Reveal>

      <div className="mt-16 grid gap-px bg-accent-muted/20 sm:grid-cols-2 lg:grid-cols-1">
        {ITEMS.map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              ref={(el) => (itemRefs.current[i] = el)}
              className="bg-base py-8 grid sm:grid-cols-3 gap-4 sm:gap-8 lg:border-b lg:border-accent-muted/20 lg:pb-8 group hover:bg-panel/40 transition-colors duration-300 px-4 -mx-4 rounded-lg"
            >
              <p className="font-display text-cream text-lg font-medium group-hover:text-accent-light transition-colors">{item.tool}</p>
              <div>
                <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">What the software does</p>
                <p className="text-stone text-sm">{item.does}</p>
              </div>
              <div>
                <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">What is still manual</p>
                <p className="text-stone text-sm">{item.manual}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="text-cream text-lg sm:text-xl mt-16 max-w-2xl font-display">
          Adding another dashboard won't fix this. You need employees who
          actually do the work — you just don't need them to be human for every
          task.
        </p>
      </Reveal>
    </section>
  );
}
