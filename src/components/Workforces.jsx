import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";
import CountUp from "./CountUp.jsx";

const WORKFORCES = [
  {
    code: "W-01",
    industry: "Hospitality",
    title: "Restaurant Workforce",
    desc: "Runs the floor, the phone and the WhatsApp orders — every shift, every hour.",
    roles: [
      "AI Host — Greets guests, answers menu & timing questions, captures walk-in waitlist.",
      "AI Waiter Assistant — Suggests pairings, upsells specials, flags allergies to the kitchen.",
      "AI Reservation Manager — Takes bookings on WhatsApp, confirms, reminds, reseats no-shows.",
      "AI Kitchen Coordinator — Sequences tickets, warns on prep bottlenecks, tracks 86'd items.",
      "AI WhatsApp Ordering Specialist — Handles delivery & pickup orders end-to-end with human approval on refunds.",
      "AI Customer Support — Resolves complaints, issues vouchers within policy, escalates the rest.",
      "AI Daily Sales Reporter — Sends the owner a daily P&L snapshot with wins, leaks and tomorrow's plan.",
    ],
  },
  {
    code: "W-02",
    industry: "Ecommerce",
    title: "Ecommerce Workforce",
    desc: "A full store team — sales, support, ops, returns, marketing — always on.",
    roles: [
      "AI Sales Assistant — Recovers abandoned carts, answers pre-purchase objections, closes on chat.",
      "AI Product Advisor — Recommends the right SKU by budget, use-case and stock in real time.",
      "AI Customer Support — Handles WISMO, delivery updates, sizing, exchanges — 24/7.",
      "AI Order Manager — Verifies orders, flags fraud, coordinates fulfillment with your 3PL.",
      "AI Returns Specialist — Runs the return flow: reason capture, label, refund — inside policy.",
      "AI Inventory Coordinator — Watches stock, forecasts reorders, warns before you run out.",
      "AI Marketing Assistant — Segments buyers, drafts campaigns, prepares creative for approval.",
    ],
  },
  {
    code: "W-03",
    industry: "Education",
    title: "School Workforce",
    desc: "The admin office, parent desk and student help desk — running on their own.",
    roles: [
      "AI Admission Officer — Answers admission queries, collects documents, books campus visits.",
      "AI Parent Support — Replies to parents on WhatsApp about fees, results, events, transport.",
      "AI Fee Reminder Agent — Sends structured reminders, handles installment questions, logs promises.",
      "AI Attendance Assistant — Notifies parents of absences, flags patterns for the coordinator.",
      "AI Timetable Coordinator — Communicates changes, handles substitution requests, updates all channels.",
      "AI Exam Assistant — Shares datesheets, guidelines, results and rechecking flow.",
      "AI Student Help Desk — Answers routine student questions and hands off to counselors when needed.",
    ],
  },
  {
    code: "W-04",
    industry: "Manufacturing",
    title: "Manufacturing Workforce",
    desc: "A control room team for production, purchasing, inventory and quality.",
    roles: [
      "AI Production Planner — Turns orders into shift plans and highlights capacity risks early.",
      "AI Purchase Assistant — Compares vendors, prepares POs, chases quotes and deliveries.",
      "AI Inventory Manager — Tracks raw materials & WIP, triggers reorders before stockouts.",
      "AI Quality Inspector — Logs defects, spots trends across batches, alerts on threshold breaches.",
      "AI Maintenance Coordinator — Schedules preventive maintenance, opens tickets, follows up on downtime.",
      "AI Daily Operations Reporter — Sends a plant-wide morning briefing and end-of-day performance report.",
    ],
  },
  {
    code: "W-05",
    industry: "Healthcare",
    title: "Healthcare Workforce",
    desc: "A patient-first front desk — bookings, records, follow-ups and billing.",
    roles: [
      "AI Appointment Manager — Books, reschedules and reminds — across WhatsApp, calls and web.",
      "AI Patient Support — Answers pre-visit questions, prep instructions and post-visit care.",
      "AI Medical Records Assistant — Retrieves records, prepares summaries for doctors, respects access rules.",
      "AI Follow-up Coordinator — Runs structured follow-ups after procedures, escalates red-flag replies.",
      "AI Billing Assistant — Explains invoices, coordinates insurance queries, chases open balances.",
    ],
  },
];

export default function Workforces() {
  return (
    <section id="systems" className="bg-base/90 backdrop-blur-sm px-6 sm:px-16 py-24 sm:py-32 overflow-hidden">
      <Reveal>
        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">AI Workforces I build</p>
        <h2 className="font-display text-cream text-3xl sm:text-4xl md:text-5xl font-semibold max-w-2xl leading-tight">
          Not one AI tool. An entire department.
        </h2>

        <div className="mt-8 inline-flex flex-wrap gap-x-6 gap-y-2 text-xs text-accent-muted border border-accent-muted/30 rounded-full px-5 py-3">
          <span>Shared memory</span>
          <span>·</span>
          <span>Business SOPs</span>
          <span>·</span>
          <span>Human approvals</span>
          <span>·</span>
          <span>Dashboards</span>
          <span className="text-stone">— applies to every workforce below</span>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {WORKFORCES.map((wf, i) => (
          <Reveal key={wf.title} delay={(i % 2) * 100}>
            <TiltCard className="h-full">
              <div className="relative bg-panel/95 rounded-2xl border border-accent/20 h-full overflow-hidden shadow-[0_0_25px_-8px_rgba(0,168,232,0.35)]">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                {/* Agent-ID header */}
                <div className="px-8 pt-8 pb-6 border-b border-accent-muted/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-accent-muted text-xs uppercase tracking-wide mb-1">
                        {wf.industry} · Badge {wf.code}
                      </p>
                      <h3 className="font-display text-cream text-2xl font-semibold">{wf.title}</h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent border border-accent/40 rounded-full px-2.5 py-1 whitespace-nowrap">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                      </span>
                      Live
                    </span>
                  </div>
                  <p className="text-stone text-base mb-5">{wf.desc}</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-base/60 rounded-lg py-2.5">
                      <p className="text-cream font-display text-lg font-semibold"><CountUp value={wf.roles.length} /></p>
                      <p className="text-accent-muted text-[10px] uppercase tracking-wide mt-0.5">Roles</p>
                    </div>
                    <div className="bg-base/60 rounded-lg py-2.5">
                      <p className="text-cream font-display text-lg font-semibold">24/7</p>
                      <p className="text-accent-muted text-[10px] uppercase tracking-wide mt-0.5">Always on</p>
                    </div>
                    <div className="bg-base/60 rounded-lg py-2.5">
                      <p className="text-cream font-display text-lg font-semibold">✓</p>
                      <p className="text-accent-muted text-[10px] uppercase tracking-wide mt-0.5">Human approved</p>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <ul className="space-y-3">
                    {wf.roles.map((role) => {
                      const [name, ...rest] = role.split(" — ");
                      return (
                        <li key={name} className="text-[15px] leading-relaxed">
                          <span className="text-cream font-medium">{name}</span>
                          <span className="text-stone"> — {rest.join(" — ")}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <motion.a
                    href="#diagnostic"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block mt-6 text-sm text-accent hover:text-accent-light transition-colors"
                  >
                    Deploy this workforce →
                  </motion.a>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <p className="text-stone text-sm mt-10">
        Don't see your industry? I design custom workforces on request.
      </p>
    </section>
  );
}
