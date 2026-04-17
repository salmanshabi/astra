"use client";

import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  {
    color: "107, 47, 191",
    opacity: 0.16,
    size: 720,
    duration: 24,
    delay: 0,
    initialX: "12%",
    initialY: "8%",
    keyframesX: ["12%", "28%", "18%", "8%", "12%"],
    keyframesY: ["8%", "22%", "38%", "18%", "8%"],
  },
  {
    color: "30, 58, 138",
    opacity: 0.13,
    size: 900,
    duration: 32,
    delay: 6,
    initialX: "60%",
    initialY: "55%",
    keyframesX: ["60%", "72%", "55%", "65%", "60%"],
    keyframesY: ["55%", "40%", "65%", "70%", "55%"],
  },
  {
    color: "201, 168, 76",
    opacity: 0.07,
    size: 580,
    duration: 20,
    delay: 3,
    initialX: "42%",
    initialY: "75%",
    keyframesX: ["42%", "30%", "50%", "38%", "42%"],
    keyframesY: ["75%", "82%", "68%", "78%", "75%"],
  },
  {
    color: "107, 47, 191",
    opacity: 0.10,
    size: 650,
    duration: 28,
    delay: 10,
    initialX: "80%",
    initialY: "15%",
    keyframesX: ["80%", "68%", "78%", "85%", "80%"],
    keyframesY: ["15%", "28%", "10%", "20%", "15%"],
  },
];

export default function Aurora() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            marginLeft: -blob.size / 2,
            marginTop: -blob.size / 2,
            left: blob.initialX,
            top: blob.initialY,
            background: `radial-gradient(circle, rgba(${blob.color}, ${blob.opacity}) 0%, transparent 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={{
            left: blob.keyframesX,
            top: blob.keyframesY,
            scale: [1, 1.12, 0.95, 1.08, 1],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}
