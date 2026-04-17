"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 2 + 0.5,
    delay: rand() * 5,
    duration: rand() * 3 + 2,
    opacity: rand() * 0.6 + 0.2,
  }));
}

const stars = generateStars(180, 1);
const brightStars = generateStars(30, 2);

export default function StarField() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #110B2E 0%, #0A0820 40%, #03020A 100%)",
        }}
      />

      {/* Nebula clouds */}
      <div
        className="absolute animate-nebula"
        style={{
          width: "60vw",
          height: "60vw",
          top: "-10%",
          left: "20%",
          background: "radial-gradient(ellipse, rgba(107,47,191,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDuration: "30s",
        }}
      />
      <div
        className="absolute animate-nebula"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "10%",
          right: "-10%",
          background: "radial-gradient(ellipse, rgba(30,58,138,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDuration: "25s",
          animationDelay: "-10s",
        }}
      />
      <div
        className="absolute animate-nebula"
        style={{
          width: "40vw",
          height: "40vw",
          top: "40%",
          left: "-5%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDuration: "35s",
          animationDelay: "-15s",
        }}
      />

      {/* Background stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `rgba(240, 235, 248, ${star.opacity})`,
            ...(prefersReducedMotion ? {} : {
              animation: `star-twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }),
          }}
        />
      ))}

      {/* Bright stars with glow */}
      {brightStars.map((star, i) => (
        <div
          key={`bright-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size + 1}px`,
            height: `${star.size + 1}px`,
            background: `rgba(232, 201, 122, ${star.opacity})`,
            boxShadow: `0 0 ${(star.size + 1) * 4}px rgba(232, 201, 122, 0.6)`,
            ...(prefersReducedMotion ? {} : {
              animation: `star-twinkle ${star.duration + 1}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }),
          }}
        />
      ))}
    </div>
  );
}

// Shooting stars component
export function ShootingStars() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: "120px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(232, 201, 122, 0.9), transparent)",
            top: `${20 + i * 25}%`,
            left: "-120px",
            borderRadius: "50%",
          }}
          animate={{
            x: ["0vw", "120vw"],
            y: [0, 80],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 3 + i * 7,
            repeat: Infinity,
            repeatDelay: 15 + i * 8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
