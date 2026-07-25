import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import photoBlack from "../assets/photo-black.jpg";
import photoSilver from "../assets/photo-silver.jpg";
import { isWebGLAvailable } from "../utils/webgl.js";

// CSS-only fallback: still animated (Ken Burns + scroll crossfade + parallax),
// used when WebGL is unavailable, blocked, or throws — so there is never a
// dead, static hero.
function FallbackHero({ progress }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${1.08 - progress * 0.03}) translateY(${progress * -20}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        <img
          src={photoBlack}
          alt="Shoaib — AI Solutions Architect"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1 - progress, transition: "opacity 0.15s linear" }}
        />
        <img
          src={photoSilver}
          alt="Shoaib — AI Solutions Architect, alternate"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: progress, transition: "opacity 0.15s linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/75 to-base/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-base/40" />
      </div>
      <style>{`
        @keyframes heroDrift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #00A8E8 0%, transparent 45%)",
          backgroundSize: "200% 200%",
          animation: "heroDrift 8s ease-in-out infinite",
        }}
      />
    </>
  );
}

export default function Hero3D() {
  const mountRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [fallbackProgress, setFallbackProgress] = useState(0);
  const outerRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (!isWebGLAvailable()) {
      setWebglFailed(true);
    }
  }, []);

  // Fallback scroll progress tracker (used when WebGL path is off)
  useEffect(() => {
    if (!webglFailed && !reducedMotion) return;
    const el = outerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setFallbackProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [webglFailed, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || webglFailed) return;
    const mount = mountRef.current;
    if (!mount) return;

    let cleanupFns = [];
    let rafId = null;

    // Defer init one frame so layout (100dvh / sticky) has settled —
    // reading clientWidth/clientHeight too early can yield 0 on some
    // mobile browsers, which breaks camera aspect and renderer size.
    rafId = requestAnimationFrame(() => {
      try {
        const width = mount.clientWidth || window.innerWidth;
        const height = mount.clientHeight || window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 6);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);

        const particleCount = 140;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 14;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
        }
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
          color: 0x00a8e8,
          size: 0.035,
          transparent: true,
          opacity: 0.7,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        const rimLight = new THREE.PointLight(0x6fd8ff, 1.2, 20);
        rimLight.position.set(-3, 2, 4);
        scene.add(rimLight);

        const loader = new THREE.TextureLoader();
        const texBlack = loader.load(photoBlack);
        const texSilver = loader.load(photoSilver);
        texBlack.colorSpace = THREE.SRGBColorSpace;
        texSilver.colorSpace = THREE.SRGBColorSpace;

        const planeGeo = new THREE.PlaneGeometry(3.2, 1.8);

        // MeshBasicMaterial, not MeshStandardMaterial: this is a flat photo,
        // not a physically-lit surface. Standard material multiplies the
        // texture by scene light — with a dim ambient that rendered the
        // photo nearly black. Basic material shows the texture at its
        // true brightness regardless of scene lighting.
        const matBlack = new THREE.MeshBasicMaterial({
          map: texBlack,
          transparent: true,
          opacity: 1,
        });
        const matSilver = new THREE.MeshBasicMaterial({
          map: texSilver,
          transparent: true,
          opacity: 0,
        });

        const planeBlack = new THREE.Mesh(planeGeo, matBlack);
        const planeSilver = new THREE.Mesh(planeGeo, matSilver);
        planeSilver.position.z = -0.3;
        scene.add(planeBlack);
        scene.add(planeSilver);

        let animId;
        let targetProgress = 0;
        let currentProgress = 0;

        const onScroll = () => {
          const rect = mount.getBoundingClientRect();
          const total = rect.height;
          const scrolled = Math.min(Math.max(-rect.top, 0), total);
          targetProgress = total > 0 ? scrolled / total : 0;
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        const clock = new THREE.Clock();
        let lostContext = false;

        const onContextLost = (e) => {
          e.preventDefault();
          lostContext = true;
          setWebglFailed(true);
        };
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);

        const animate = () => {
          if (lostContext) return;
          animId = requestAnimationFrame(animate);
          if (!isVisibleRef.current) return;
          const t = clock.getElapsedTime();

          currentProgress += (targetProgress - currentProgress) * 0.08;

          const idleX = Math.sin(t * 0.3) * 0.14;
          const idleY = Math.cos(t * 0.25) * 0.08;
          const breathe = 1 + Math.sin(t * 0.4) * 0.015;

          planeBlack.rotation.y = idleX - currentProgress * 0.5;
          planeBlack.rotation.x = idleY;
          planeBlack.position.z = currentProgress * -1.5;
          planeBlack.scale.setScalar(breathe);
          matBlack.opacity = 1 - currentProgress;

          planeSilver.rotation.y = idleX + (1 - currentProgress) * 0.3;
          planeSilver.rotation.x = idleY;
          planeSilver.position.z = -0.3 + currentProgress * 0.3;
          planeSilver.scale.setScalar(breathe);
          matSilver.opacity = currentProgress;

          particles.rotation.y = t * 0.035;
          particles.rotation.x = Math.sin(t * 0.15) * 0.05;
          rimLight.position.x = -3 + Math.sin(t * 0.2) * 1.5;

          renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          if (!w || !h) return;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        cleanupFns.push(() => {
          cancelAnimationFrame(animId);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
          if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
          planeGeo.dispose();
          matBlack.dispose();
          matSilver.dispose();
          particleGeo.dispose();
          particleMat.dispose();
          renderer.dispose();
        });
      } catch (err) {
        // Any failure in WebGL setup (blocked context, driver issue,
        // out-of-memory on low-end devices) falls back to the animated
        // CSS version instead of leaving a blank hero.
        setWebglFailed(true);
      }
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      cleanupFns.forEach((fn) => fn());
    };
  }, [reducedMotion, webglFailed]);

  const useFallback = reducedMotion || webglFailed;

  return (
    <div ref={outerRef} className="relative w-full bg-base" style={{ height: "180vh" }}>
      <div
        ref={mountRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {useFallback && <FallbackHero progress={fallbackProgress} />}

        {/* Scrim: text sits on the left, photo interest is center-right.
            Without this, bright/light areas of the photo (visible now that
            the lighting bug is fixed) make the text unreadable where they
            overlap. */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-base via-base/75 to-base/10" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-base/90 via-transparent to-base/30" />

        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-16 z-40 max-w-xl pointer-events-none">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">
            AI Solutions Architect
          </p>
          <h1 className="font-display text-cream text-5xl sm:text-6xl md:text-7xl leading-[0.98] font-semibold tracking-tight">
            You don't need
            <br />
            more software.
          </h1>
          <p className="text-stone text-base sm:text-lg mt-5 leading-relaxed max-w-md">
            I design and deploy AI Workforces — teams of specialized AI
            employees that run sales, support and operations inside your
            business, while you stay in charge of every decision that
            matters.
          </p>
        </div>

        <div className="absolute bottom-14 right-6 sm:right-16 z-40 flex flex-col items-end gap-3">
          <p className="text-stone text-xs text-right max-w-[220px]">
            Scroll to see the shift — operator to system.
          </p>
          <motion.a
            href="#diagnostic"
            whileHover={{
              scale: 1.05,
              borderColor: "#00A8E8",
              boxShadow: "0 12px 30px -10px rgba(0,168,232,0.5)",
            }}
            whileTap={{ scale: 0.95, y: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="text-sm font-medium px-6 py-3 rounded-full border border-accent-muted text-cream pointer-events-auto"
          >
            Build My AI Workforce
          </motion.a>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 text-accent-muted text-xs tracking-widest uppercase animate-pulse">
          Scroll
        </div>
      </div>
    </div>
  );
}
