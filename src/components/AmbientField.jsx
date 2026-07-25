import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "../utils/webgl.js";

// Single persistent Three.js canvas that runs behind every section past the
// hero — one shared WebGL context for the whole page instead of one per
// section, which is what keeps this smooth on mid-range mobile GPUs.
// Static (precomputed) node connections instead of per-frame nearest-
// neighbor search, kept deliberately low-poly.

const NODE_COUNT = 90;
const MAX_LINK_DIST = 3.2;

export default function AmbientField() {
  const mountRef = useRef(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setAvailable(isWebGLAvailable());
  }, []);

  useEffect(() => {
    if (!available) return;
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup = () => {};
    let rafId = requestAnimationFrame(() => {
      try {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.set(0, 0, 9);

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        mount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        // Nodes
        const nodePositions = [];
        for (let i = 0; i < NODE_COUNT; i++) {
          nodePositions.push(
            new THREE.Vector3(
              (Math.random() - 0.5) * 14,
              (Math.random() - 0.5) * 16,
              (Math.random() - 0.5) * 6
            )
          );
        }

        const pointsGeo = new THREE.BufferGeometry();
        const posArray = new Float32Array(NODE_COUNT * 3);
        nodePositions.forEach((v, i) => {
          posArray[i * 3] = v.x;
          posArray[i * 3 + 1] = v.y;
          posArray[i * 3 + 2] = v.z;
        });
        pointsGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
        const pointsMat = new THREE.PointsMaterial({
          color: 0x00a8e8,
          size: 0.06,
          transparent: true,
          opacity: 0.4,
        });
        const points = new THREE.Points(pointsGeo, pointsMat);
        group.add(points);

        // Precomputed static links (one pass, not per-frame)
        const linkPositions = [];
        for (let i = 0; i < NODE_COUNT; i++) {
          let linked = 0;
          for (let j = i + 1; j < NODE_COUNT && linked < 2; j++) {
            if (nodePositions[i].distanceTo(nodePositions[j]) < MAX_LINK_DIST) {
              linkPositions.push(
                nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
                nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
              );
              linked++;
            }
          }
        }
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(linkPositions), 3)
        );
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x1b4a5e,
          transparent: true,
          opacity: 0.35,
        });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        group.add(lines);

        let targetScrollY = window.scrollY;
        let currentScrollY = window.scrollY;
        const onScroll = () => {
          targetScrollY = window.scrollY;
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        const clock = new THREE.Clock();
        let animId;
        let paused = document.hidden;

        const onVisibility = () => {
          paused = document.hidden;
          if (!paused) animate();
        };
        document.addEventListener("visibilitychange", onVisibility);

        const animate = () => {
          if (paused) return;
          animId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          currentScrollY += (targetScrollY - currentScrollY) * 0.05;

          group.rotation.y = t * 0.015 + currentScrollY * 0.00012;
          group.rotation.x = Math.sin(t * 0.1) * 0.05;
          group.position.y = currentScrollY * 0.0015;

          renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        cleanup = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          document.removeEventListener("visibilitychange", onVisibility);
          if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
          pointsGeo.dispose();
          pointsMat.dispose();
          lineGeo.dispose();
          lineMat.dispose();
          renderer.dispose();
        };
      } catch (err) {
        setAvailable(false);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanup();
    };
  }, [available]);

  if (!available) return null;

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
