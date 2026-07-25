import React, { Suspense, lazy } from "react";
import Nav from "./components/Nav.jsx";
import RealityCheck from "./components/RealityCheck.jsx";
import VerbCycle from "./components/VerbCycle.jsx";
import Ingredients from "./components/Ingredients.jsx";
import Workforces from "./components/Workforces.jsx";
import Principles from "./components/Principles.jsx";
import Diagnostic from "./components/Diagnostic.jsx";
import Footer from "./components/Footer.jsx";

// Three.js-dependent components are the heaviest part of the bundle —
// code-split so the critical text/layout content isn't blocked behind
// three.js + framer-motion + gsap downloading first.
const Hero3D = lazy(() => import("./components/Hero3D.jsx"));
const AmbientField = lazy(() => import("./components/AmbientField.jsx"));

export default function App() {
  return (
    <div id="top" className="bg-base min-h-screen relative">
      <div className="grain-overlay" />
      <Suspense fallback={null}>
        <AmbientField />
      </Suspense>
      <Nav />
      <Suspense fallback={<div className="w-full bg-base" style={{ height: "100dvh" }} />}>
        <Hero3D />
      </Suspense>
      <div className="relative z-10">
        <RealityCheck />
        <VerbCycle />
        <Ingredients />
        <Workforces />
        <Principles />
        <Diagnostic />
        <Footer />
      </div>
    </div>
  );
}
