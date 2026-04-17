"use client";

import { motion, useReducedMotion } from "framer-motion";

const PLANETS = [
  { size: 120, color: "#1a0a3a", border: "rgba(107,47,191,0.3)", glow: "rgba(107,47,191,0.15)", top: "8%", left: "3%", duration: 12, delay: 0 },
  { size: 80, color: "#0a1a3a", border: "rgba(30,58,138,0.4)", glow: "rgba(30,58,138,0.2)", top: "20%", right: "2%", duration: 9, delay: -3 },
  { size: 55, color: "#2a1a05", border: "rgba(201,168,76,0.25)", glow: "rgba(201,168,76,0.1)", top: "55%", left: "1%", duration: 14, delay: -6 },
  { size: 40, color: "#0a1a1a", border: "rgba(100,181,246,0.3)", glow: "rgba(100,181,246,0.1)", top: "70%", right: "3%", duration: 10, delay: -2 },
  { size: 25, color: "#1a0a10", border: "rgba(239,83,80,0.3)", glow: "rgba(239,83,80,0.1)", top: "38%", right: "1%", duration: 8, delay: -5 },
];

export default function FloatingPlanets() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {PLANETS.map((planet, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: planet.size,
            height: planet.size,
            top: planet.top,
            left: (planet as any).left,
            right: (planet as any).right,
            background: `radial-gradient(circle at 35% 35%, ${planet.color}dd, ${planet.color}99)`,
            border: `1px solid ${planet.border}`,
            boxShadow: `0 0 ${planet.size * 0.4}px ${planet.glow}, inset 0 0 ${planet.size * 0.2}px rgba(255,255,255,0.03)`,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -planet.size * 0.25, planet.size * 0.1, 0],
                  x: [0, planet.size * 0.08, -planet.size * 0.05, 0],
                  rotate: [0, 8, -5, 0],
                }
          }
          transition={{
            duration: planet.duration,
            delay: planet.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Planet surface details */}
          <div
            className="absolute rounded-full opacity-20"
            style={{
              width: "60%",
              height: "25%",
              top: "25%",
              left: "10%",
              background: "rgba(255,255,255,0.08)",
              filter: "blur(4px)",
              transform: "rotate(-20deg)",
            }}
          />
          {/* Small moon */}
          {i < 2 && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: planet.size * 0.15,
                height: planet.size * 0.15,
                top: "50%",
                left: "50%",
                marginLeft: `-${planet.size * 0.075}px`,
                marginTop: `-${planet.size * 0.075}px`,
                background: "rgba(240,235,248,0.6)",
                boxShadow: "0 0 8px rgba(240,235,248,0.4)",
              }}
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "linear" }}
              transformTemplate={({ rotate }) =>
                `rotate(${rotate}) translateX(${planet.size * 0.7}px) rotate(-${rotate})`
              }
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
