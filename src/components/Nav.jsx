import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Reality", href: "#compare" },
  { label: "Workforces", href: "#systems" },
  { label: "Method", href: "#method" },
  { label: "Principles", href: "#principles" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 bg-base/40 backdrop-blur-sm">
      <a href="#top" className="font-display text-cream text-lg font-semibold tracking-tight">
        Shoaib.
      </a>

      <div className="hidden md:flex items-center gap-8 text-sm text-stone">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-accent transition-colors">
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="#diagnostic"
        className="hidden md:inline-block text-sm font-medium px-5 py-2 rounded-full bg-accent text-base hover:bg-accent-light transition-colors"
      >
        Diagnostic
      </a>

      <button
        className="md:hidden text-cream p-2 rounded-full bg-panel border border-accent-muted/40"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-panel border-t border-accent-muted/30 flex flex-col p-6 gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-stone hover:text-accent transition-colors text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostic"
            onClick={() => setOpen(false)}
            className="text-sm font-medium px-5 py-2 rounded-full bg-accent text-base text-center"
          >
            Diagnostic
          </a>
        </div>
      )}
    </nav>
  );
}
