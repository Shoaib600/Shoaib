import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 bg-base border-b border-accent-muted/10">
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

      <motion.a
        href="#diagnostic"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 24px -8px rgba(0,168,232,0.6)" }}
        whileTap={{ scale: 0.95, y: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="hidden md:inline-block text-sm font-medium px-5 py-2 rounded-full bg-accent text-base"
      >
        Diagnostic
      </motion.a>

      <button
        className="md:hidden text-cream p-2 rounded-full bg-panel border border-accent-muted/40"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 md:hidden bg-panel border-t border-accent-muted/30 flex flex-col p-6 gap-4"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
