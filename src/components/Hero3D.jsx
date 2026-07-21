import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import photoBlack from "../assets/photo-black.jpg";
import photoSilver from "../assets/photo-silver.jpg";

export default function Hero3D() {
  const mountRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

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
      size: 0.025,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const rimLight = new THREE.PointLight(0x6fd8ff, 2.2, 20);
    rimLight.position.set(-3, 2, 4);
    scene.add(rimLight);
    const fillLight = new THREE.AmbientLight(0x0e1c24, 1.2);
    scene.add(fillLight);

    const loader = new THREE.TextureLoader();
    const texBlack = loader.load(photoBlack);
    const texSilver = loader.load(photoSilver);
    texBlack.colorSpace = THREE.SRGBColorSpace;
    texSilver.colorSpace = THREE.SRGBColorSpace;

    const planeGeo = new THREE.PlaneGeometry(3.2, 1.8);

    const matBlack = new THREE.MeshStandardMaterial({
      map: texBlack,
      transparent: true,
      opacity: 1,
      roughness: 0.6,
      metalness: 0.1,
    });
    const matSilver = new THREE.MeshStandardMaterial({
      map: texSilver,
      transparent: true,
      opacity: 0,
      roughness: 0.3,
      metalness: 0.4,
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

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currentProgress += (targetProgress - currentProgress) * 0.08;

      const idleX = Math.sin(t * 0.3) * 0.06;
      const idleY = Math.cos(t * 0.25) * 0.04;

      planeBlack.rotation.y = idleX - currentProgress * 0.5;
      planeBlack.rotation.x = idleY;
      planeBlack.position.z = currentProgress * -1.5;
      matBlack.opacity = 1 - currentProgress;

      planeSilver.rotation.y = idleX + (1 - currentProgress) * 0.3;
      planeSilver.rotation.x = idleY;
      planeSilver.position.z = -0.3 + currentProgress * 0.3;
      matSilver.opacity = currentProgress;

      particles.rotation.y = t * 0.02;
      rimLight.position.x = -3 + Math.sin(t * 0.2) * 1.5;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      planeGeo.dispose();
      matBlack.dispose();
      matSilver.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full bg-base" style={{ height: "180vh" }}>
      <div
        ref={mountRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {reducedMotion && (
          <img
            src={photoBlack}
            alt="Shoaib — AI Solutions Architect"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}

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
          <a
            href="#diagnostic"
            className="text-sm font-medium px-6 py-3 rounded-full border border-accent-muted text-cream hover:border-accent hover:text-accent transition-colors"
          >
            Build My AI Workforce
          </a>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 text-accent-muted text-xs tracking-widest uppercase animate-pulse">
          Scroll
        </div>
      </div>
    </div>
  );
}
