import React from "react";

export default function Footer() {
  return (
    <footer className="bg-base/90 px-6 sm:px-16 py-10 border-t border-accent-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-display text-cream text-sm">Shoaib. — AI Operations · Est. 2024</span>
      <p className="text-stone text-xs text-center sm:text-right">
        © {new Date().getFullYear()} Shoaib · AI Operations Architect · An operating system for modern businesses
      </p>
    </footer>
  );
}
