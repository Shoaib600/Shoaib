import React from "react";
import Nav from "./components/Nav.jsx";
import Hero3D from "./components/Hero3D.jsx";
import RealityCheck from "./components/RealityCheck.jsx";
import Ingredients from "./components/Ingredients.jsx";
import Workforces from "./components/Workforces.jsx";
import Principles from "./components/Principles.jsx";
import Diagnostic from "./components/Diagnostic.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div id="top" className="bg-base min-h-screen">
      <Nav />
      <Hero3D />
      <RealityCheck />
      <Ingredients />
      <Workforces />
      <Principles />
      <Diagnostic />
      <Footer />
    </div>
  );
}
