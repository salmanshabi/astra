"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";

function MagneticButton({
  children,
  onClick,
  className,
  style,
  whileHover,
  whileTap,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileHover?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileTap?: any;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = 90;
    if (dist < threshold) {
      const strength = (1 - dist / threshold) * 0.45;
      x.set(dx * strength);
      y.set(dy * strength);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      className={className}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.button>
  );
}

// Short 3-letter sign names — no Unicode glyphs anywhere
const SIGN_ABBRS = ["Ari","Tau","Gem","Can","Leo","Vir","Lib","Sco","Sag","Cap","Aqu","Pis"];

const r3 = (n: number) => Math.round(n * 1000) / 1000;

function ZodiacWheel() {
  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto" aria-hidden="true">
      {/* Single animated SVG — all rings, dots, labels inside one element */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
        {/* Glow filter */}
        <defs>
          <filter id="glow-gold">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer decorative ring (static) */}
        <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" />
        <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" />

        {/* Ring 1: sign labels — rotates slowly */}
        <motion.g
          style={{ transformOrigin: "160px 160px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          {SIGN_ABBRS.map((abbr, i) => {
            const angle = (i / 12) * 360 - 90;
            const rad   = (angle * Math.PI) / 180;
            const r     = 128;
            const x     = r3(160 + r * Math.cos(rad));
            const y     = r3(160 + r * Math.sin(rad));
            const isKey = i % 3 === 0;
            return (
              <g key={i}>
                {/* Tick mark */}
                <line
                  x1={r3(160 + (r - 8) * Math.cos(rad))} y1={r3(160 + (r - 8) * Math.sin(rad))}
                  x2={r3(160 + (r + 6) * Math.cos(rad))} y2={r3(160 + (r + 6) * Math.sin(rad))}
                  stroke={isKey ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.18)"} strokeWidth={isKey ? "1.2" : "0.6"}
                />
                {/* Label — counter-rotate so text stays upright */}
                <motion.text
                  x={x} y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={isKey ? "9" : "7.5"}
                  fontFamily="'Jost', sans-serif"
                  fill={isKey ? "rgba(232,201,122,0.85)" : "rgba(232,201,122,0.35)"}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                >
                  {abbr}
                </motion.text>
              </g>
            );
          })}
        </motion.g>

        {/* Ring 2: dots — rotates opposite */}
        <motion.g
          style={{ transformOrigin: "160px 160px" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="160" cy="160" r="96" fill="none" stroke="rgba(107,47,191,0.25)" strokeWidth="0.8" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const r = 96;
            const x = r3(160 + r * Math.cos(rad));
            const y = r3(160 + r * Math.sin(rad));
            const big = i % 3 === 0;
            return (
              <circle key={i} cx={x} cy={y} r={big ? 3.5 : 2}
                fill={big ? "#C9A84C" : "rgba(107,47,191,0.65)"}
                filter={big ? "url(#glow-gold)" : "none"} />
            );
          })}
        </motion.g>

        {/* Ring 3: inner circle with division lines — rotates forward */}
        <motion.g
          style={{ transformOrigin: "160px 160px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="160" cy="160" r="60" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={i}
                x1={r3(160 + 44 * Math.cos(rad))} y1={r3(160 + 44 * Math.sin(rad))}
                x2={r3(160 + 60 * Math.cos(rad))} y2={r3(160 + 60 * Math.sin(rad))}
                stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" />
            );
          })}
        </motion.g>

        {/* Center orb */}
        <circle cx="160" cy="160" r="18" fill="rgba(107,47,191,0.15)" stroke="rgba(107,47,191,0.3)" strokeWidth="0.8" />
        <circle cx="160" cy="160" r="8"
          fill="url(#center-grad)"
          filter="url(#glow-gold)"
        />
        <defs>
          <radialGradient id="center-grad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="60%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="rgba(107,47,191,0.6)" />
          </radialGradient>
        </defs>
      </svg>

      {/* Orbiting planet dots (HTML layer over SVG) */}
      {[
        { size: 10, color: "#C9A84C", orbit: 80, duration: 18, offset: 0 },
        { size: 7, color: "#9C88C8", orbit: 63, duration: 12, offset: 120 },
        { size: 5, color: "#64B5F6", orbit: 47, duration: 8, offset: 240 },
      ].map((planet, i) => {
        const r = planet.orbit / 2;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              background: planet.color,
              top: "50%",
              left: "50%",
              marginLeft: `-${planet.size / 2}px`,
              marginTop: `-${planet.size / 2}px`,
              boxShadow: `0 0 ${planet.size * 2}px ${planet.color}`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: planet.duration, repeat: Infinity, ease: "linear" }}
            transformTemplate={({ rotate }) =>
              `rotate(${rotate}) translateX(${r}%) rotate(-${rotate})`
            }
          />
        );
      })}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Default to disabled so mobile/SSR never applies parallax motion values.
  // Only enable on desktop after detecting a fine pointer (mouse).
  const [enableParallax, setEnableParallax] = useState(false);
  useEffect(() => {
    const isFinePointer =
      window.matchMedia("(pointer: fine)").matches && !("ontouchstart" in window);
    setEnableParallax(isFinePointer);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const disableParallax = prefersReducedMotion || !enableParallax;

  const subtitle = "The stars have been writing your story since the moment you drew your first breath. Let us help you read it.";

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
      aria-label="Hero section"
    >
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-7 sm:gap-10 pt-24 sm:pt-28"
        style={disableParallax ? { opacity: 1 } : { y, opacity, scale }}
        initial={{ opacity: 1 }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-6 sm:w-12 bg-gradient-to-r from-transparent to-gold" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          <span
            className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase"
            style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
          >
            Ancient Wisdom · Modern Insight
          </span>
          <div className="h-px w-6 sm:w-12" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
        </motion.div>

        {/* Main headline */}
        <h1
          className="text-center"
          style={{ fontFamily: "'Bodoni Moda', serif", lineHeight: 1 }}
        >
          {/* Supporting line — smaller, white, normal weight */}
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(1.6rem, 4.5vw, 3.5rem)",
              fontWeight: 400,
              color: "rgba(240, 235, 248, 0.82)",
              letterSpacing: "0.04em",
              marginBottom: "0.1em",
            }}
          >
            Unlock Your
          </motion.span>

          {/* Hero word — large, italic, gold — matches every other section's <em> */}
          <motion.em
            className="block"
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(3rem, 15vw, 12rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 0.9,
              background: "linear-gradient(135deg, #F5DFA0 0%, #C9A84C 45%, #A07830 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
              display: "block",
              filter: "drop-shadow(0 0 40px rgba(201,168,76,0.3))",
            }}
          >
            Destiny
          </motion.em>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-lg text-base sm:text-lg leading-relaxed px-2"
          style={{ color: "rgba(232, 224, 240, 0.65)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton
            onClick={() => {
              document.querySelector("#horoscopes")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold tracking-widest text-sm cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #8B6914, #C9A84C, #E8C97A)",
              color: "#03020A",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.1em",
              boxShadow: "0 0 30px rgba(201,168,76,0.4), 0 4px 20px rgba(0,0,0,0.3)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(201,168,76,0.6), 0 4px 30px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            READ HOROSCOPE
          </MagneticButton>
          <MagneticButton
            onClick={() => {
              document.querySelector("#birth-chart")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm tracking-widest cursor-pointer transition-all"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "#E8C97A",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.1em",
              backdropFilter: "blur(8px)",
            }}
            whileHover={{
              background: "rgba(201,168,76,0.15)",
              borderColor: "rgba(201,168,76,0.6)",
              scale: 1.03,
            }}
            whileTap={{ scale: 0.97 }}
          >
            GET YOUR CHART
          </MagneticButton>
        </motion.div>

        {/* Zodiac wheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <ZodiacWheel />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col items-center gap-2 mt-2"
        >
          <span
            className="text-xs tracking-widest"
            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Jost', sans-serif" }}
          >
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)" }}
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
