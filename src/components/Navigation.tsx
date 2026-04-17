"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { label: "Signs", href: "#zodiac" },
  { label: "Horoscopes", href: "#horoscopes" },
  { label: "Birth Chart", href: "#birth-chart" },
  { label: "Compatibility", href: "#compatibility" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    setScrolled(val > 0.02);
  });

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[9999] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #8B6914, #C9A84C, #E8C97A)",
        }}
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="max-w-7xl mx-auto rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-500"
          animate={{
            background: scrolled
              ? "rgba(3, 2, 10, 0.85)"
              : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
            borderColor: scrolled
              ? "rgba(201, 168, 76, 0.15)"
              : "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="AstraCosmics home"
          >
            <div className="w-9 h-9 relative shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <defs>
                  <radialGradient id="nav-orb" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#F5DFA0" />
                    <stop offset="55%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#7B5C18" />
                  </radialGradient>
                  <filter id="nav-glow">
                    <feGaussianBlur stdDeviation="1.2" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Outer thin ring */}
                <circle cx="24" cy="24" r="22" stroke="#C9A84C" strokeWidth="0.6" opacity="0.3" />

                {/* 8-pointed star — 4 long cardinal points + 4 short diagonal points */}
                {/* Cardinal points (N/S/E/W) — tall narrow diamond */}
                <path d="M24 3 L26 22 L24 24 L22 22 Z" fill="#C9A84C" opacity="0.9" />
                <path d="M24 45 L26 26 L24 24 L22 26 Z" fill="#C9A84C" opacity="0.9" />
                <path d="M3 24 L22 22 L24 24 L22 26 Z" fill="#C9A84C" opacity="0.9" />
                <path d="M45 24 L26 22 L24 24 L26 26 Z" fill="#C9A84C" opacity="0.9" />
                {/* Diagonal points — shorter */}
                <path d="M8.1 8.1 L21.5 21.5 L24 19 L21.5 16.5 Z" fill="#C9A84C" opacity="0.45" />
                <path d="M39.9 8.1 L26.5 21.5 L24 19 L26.5 16.5 Z" fill="#C9A84C" opacity="0.45" />
                <path d="M8.1 39.9 L21.5 26.5 L24 29 L21.5 31.5 Z" fill="#C9A84C" opacity="0.45" />
                <path d="M39.9 39.9 L26.5 26.5 L24 29 L26.5 31.5 Z" fill="#C9A84C" opacity="0.45" />

                {/* Inner ring */}
                <circle cx="24" cy="24" r="9" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 3" />

                {/* Center orb */}
                <circle cx="24" cy="24" r="4.5" fill="url(#nav-orb)" filter="url(#nav-glow)" />
                <circle cx="24" cy="24" r="4.5" stroke="#E8C97A" strokeWidth="0.4" opacity="0.6" />
              </svg>
            </div>
            <span
              className="font-display text-lg tracking-widest"
              style={{ color: "#C9A84C", fontFamily: "'Bodoni Moda', serif", letterSpacing: "0.2em" }}
            >
              ASTRA
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-sm tracking-widest text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: "0.12em" }}
              >
                {link.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("#birth-chart")}
              className="px-5 py-2 rounded-full text-sm tracking-widest transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #8B6914, #C9A84C)",
                color: "#03020A",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.08em",
                boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
              }}
            >
              GET YOUR CHART
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-px w-6 bg-gold-light origin-center"
                style={{ background: "#E8C97A" }}
                animate={
                  mobileOpen
                    ? i === 0
                      ? { rotate: 45, y: 5 }
                      : i === 1
                      ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -5 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 sm:px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ background: "rgba(3, 2, 10, 0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-2xl sm:text-3xl tracking-wider cursor-pointer"
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    color: "rgba(232, 201, 122, 0.85)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("#birth-chart")}
                className="mt-4 px-8 py-4 rounded-full text-lg tracking-widest cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #8B6914, #C9A84C)",
                  color: "#03020A",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                GET YOUR CHART
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
