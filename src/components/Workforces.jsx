import React from "react";

const WORKFORCES = [
  {
    industry: "Hospitality · Workforce 01",
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
    industry: "Ecommerce · Workforce 02",
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
    industry: "Education · Workforce 03",
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
    industry: "Manufacturing · Workforce 04",
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
    industry: "Healthcare · Workforce 05",
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
    <section id="systems" className="bg-base px-6 sm:px-16 py-24 sm:py-32">
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

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {WORKFORCES.map((wf) => (
          <div key={wf.title} className="bg-panel rounded-2xl p-8 border border-accent-muted/10">
            <p className="text-accent-muted text-xs uppercase tracking-wide mb-2">{wf.industry}</p>
            <h3 className="font-display text-cream text-2xl font-semibold mb-2">{wf.title}</h3>
            <p className="text-stone text-sm mb-6">{wf.desc}</p>
            <ul className="space-y-3">
              {wf.roles.map((role) => {
                const [name, ...rest] = role.split(" — ");
                return (
                  <li key={name} className="text-sm">
                    <span className="text-cream font-medium">{name}</span>
                    <span className="text-stone"> — {rest.join(" — ")}</span>
                  </li>
                );
              })}
            </ul>
            <a
              href="#diagnostic"
              className="inline-block mt-6 text-sm text-accent hover:text-accent-light transition-colors"
            >
              Deploy this workforce →
            </a>
          </div>
        ))}
      </div>

      <p className="text-stone text-sm mt-10">
        Don't see your industry? I design custom workforces on request.
      </p>
    </section>
  );
}
