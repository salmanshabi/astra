"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { zodiacSigns, elementColors, type ZodiacSign } from "@/lib/zodiac-data";
import { ZODIAC_ICONS } from "@/components/icons/ZodiacIcons";

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });
  const glare = useSpring(useTransform(x, [-0.5, 0.5], [0, 0.15]), { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "800px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative" }}
      >
        {children}
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 35% 25%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            opacity: glare,
          }}
        />
      </motion.div>
    </div>
  );
}

function ZodiacCard({ sign, index }: { sign: ZodiacSign; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = ZODIAC_ICONS[sign.name];
  const el = elementColors[sign.element];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard>
      <motion.button
        className="w-full text-left rounded-2xl cursor-pointer overflow-hidden"
        style={{
          background: expanded
            ? `radial-gradient(ellipse at top, ${sign.color}60 0%, rgba(8,6,24,0.98) 70%)`
            : `radial-gradient(ellipse at top, ${sign.color}35 0%, rgba(8,6,24,0.92) 100%)`,
          border: expanded
            ? `1px solid ${sign.accentColor}50`
            : `1px solid rgba(255,255,255,0.06)`,
          boxShadow: expanded ? `0 12px 50px ${sign.color}30` : "none",
          transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label={`${sign.name}, ${sign.dates}`}
        whileHover={{
          border: `1px solid ${sign.accentColor}40`,
          boxShadow: `0 8px 40px ${sign.color}25`,
        }}
      >
        {/* Card top — always visible */}
        <div className="p-7 flex items-center gap-4">
          {/* Icon circle */}
          <div
            className="shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 52, height: 52,
              background: `${sign.color}45`,
              border: `1px solid ${sign.accentColor}40`,
              boxShadow: expanded ? `0 0 20px ${sign.accentColor}30` : "none",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {Icon && <Icon size={26} color={sign.accentColor} strokeWidth={1.7} />}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2 mb-0.5">
              <h3 style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", fontSize: "17px" }}>
                {sign.name}
              </h3>
              <span
                className="shrink-0 text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: el.bg,
                  border: `1px solid ${el.border}`,
                  color: el.text,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                }}
              >
                {sign.element}
              </span>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", color: "rgba(201,168,76,0.6)", fontSize: "11px" }}>
              {sign.dates}
            </p>
          </div>

          {/* Chevron */}
          <motion.svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M3 5.5L8 10.5L13 5.5" stroke="rgba(201,168,76,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="px-7 pb-7"
                style={{ borderTop: `1px solid ${sign.accentColor}15` }}
              >
                <p
                  className="mt-4 mb-4 text-sm leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", color: "rgba(232,224,240,0.65)", fontWeight: 300, lineHeight: 1.7 }}
                >
                  {sign.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sign.traits.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: `${sign.color}40`,
                        border: `1px solid ${sign.accentColor}35`,
                        color: sign.accentColor,
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "11px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "rgba(232,224,240,0.35)", fontFamily: "'Jost', sans-serif" }}>
                    Ruled by {sign.planet}
                  </span>
                  <span style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'Jost', sans-serif" }}>
                    Compatible · {sign.compatibility.join(", ")}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      </TiltCard>
    </motion.div>
  );
}

export default function ZodiacSigns() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="zodiac"
      className="relative py-24 sm:py-40 px-4 sm:px-6"
      aria-labelledby="zodiac-title"
    >
      {/* Section tint — warm purple wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(107,47,191,0.12) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(107,47,191,0.4) 40%, rgba(201,168,76,0.3) 60%, transparent 95%)" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div ref={ref} className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif" }}>
              The Twelve Signs
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </motion.div>

          <motion.h2
            id="zodiac-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl mb-5"
            style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", lineHeight: 1.05 }}
          >
            The Celestial
            <em className="block shimmer-heading" style={{ color: "#C9A84C", fontStyle: "italic" }}>Archetypes</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="max-w-lg mx-auto text-base"
            style={{ color: "rgba(232,224,240,0.6)", fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}
          >
            Each sign carries a unique constellation of qualities. Tap any sign to explore its depths.
          </motion.p>
        </div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {zodiacSigns.map((sign, i) => (
            <ZodiacCard key={sign.name} sign={sign} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
