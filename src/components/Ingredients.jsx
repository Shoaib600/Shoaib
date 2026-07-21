import React from "react";

const INGREDIENTS = [
  { n: "01", title: "Specialized AI Employees", desc: "Each role — sales, support, reporting, operations — is a distinct AI employee trained for that job. No generic one-bot-does-all." },
  { n: "02", title: "Shared Memory", desc: "Every employee remembers every customer, every conversation and every decision — across channels and across time." },
  { n: "03", title: "Business Knowledge", desc: "Trained on your products, your policies, your prices — so answers sound like your business, not a chatbot." },
  { n: "04", title: "Your SOPs, Enforced", desc: "Your standard operating procedures become the workforce's actual behaviour — followed the same way, every single time." },
  { n: "05", title: "Human Approvals", desc: "You decide what the workforce can do on its own and where a human must sign off — refunds, high-value deals, sensitive replies." },
  { n: "06", title: "Owner Dashboards", desc: "One clean view of what the workforce did today: conversations, sales, tickets, exceptions, decisions waiting for you." },
  { n: "07", title: "Works Inside Your Tools", desc: "Deployed on top of what you already own — WhatsApp, CRM, POS, ERP, inbox — so nothing needs to be replaced." },
  { n: "08", title: "Continuous Reporting", desc: "Daily, weekly and monthly reports sent to owners and managers — with wins, leaks and the next action, in plain language." },
];

export default function Ingredients() {
  return (
    <section id="method" className="bg-panel px-6 sm:px-16 py-24 sm:py-32">
      <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">What is an AI Workforce</p>
      <h2 className="font-display text-cream text-3xl sm:text-4xl md:text-5xl font-semibold max-w-2xl leading-tight">
        Think of it as hiring a team — not buying software.
      </h2>
      <p className="text-stone text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
        An AI Workforce is a group of specialized AI employees working
        together inside your business. They share memory, follow your
        playbooks, and hand the important decisions back to you.
      </p>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {INGREDIENTS.map((item) => (
          <div key={item.n}>
            <span className="text-accent-muted text-sm font-display">{item.n}</span>
            <h3 className="font-display text-cream text-lg font-medium mt-2 mb-2">{item.title}</h3>
            <p className="text-stone text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
