import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Headset, Database, MessageCircle, FileText } from "lucide-react";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    icon: Users,
    tool: "You bought a CRM.",
    does: "It stores contacts and deals.",
    manual: "Someone still has to reply, follow up, log calls and chase quotes — by hand.",
  },
  {
    icon: Headset,
    tool: "You bought a helpdesk.",
    does: "It routes tickets into a queue.",
    manual: "Every reply, every refund, every escalation is still written by a human at business hours.",
  },
  {
    icon: Database,
    tool: "You bought a POS or ERP.",
    does: "It records what happened yesterday.",
    manual: "Nobody is actually reading the numbers, spotting the leak, or acting on them today.",
  },
  {
    icon: MessageCircle,
    tool: "You have a WhatsApp Business number.",
    does: "It receives thousands of messages.",
    manual: "One or two people are drowning in it, and most customers wait hours or days.",
  },
  {
    icon: FileText,
    tool: "You have SOPs in a Google Doc.",
    does: "Everyone was told to read them.",
    manual: "In practice they live in one person's head — and when that person leaves, so does the process.",
  },
];

export default function RealityCheck() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
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
      className="bg-base/90 backdrop-blur-sm px-6 sm:px-16 py-24 sm:py-32 overflow-hidden"
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

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={i} delay={i * 80}>
              <div ref={(el) => (itemRefs.current[i] = el)}>
                <TiltCard>
                  <div className="bg-panel/95 rounded-2xl p-6 sm:p-7 border border-accent-muted/10 lg:grid lg:grid-cols-[auto_1fr_1fr] lg:items-start lg:gap-8">
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-accent" strokeWidth={1.75} />
                      </div>
                      <p className="font-display text-cream text-lg font-medium">{item.tool}</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">What the software does</p>
                      <p className="text-stone text-base">{item.does}</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">What is still manual</p>
                      <p className="text-stone text-base">{item.manual}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          );
        })}
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
