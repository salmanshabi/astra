"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { zodiacSigns, horoscopes } from "@/lib/zodiac-data";
import { ZODIAC_ICONS } from "@/components/icons/ZodiacIcons";

const PARTICLE_COUNT = 10;

function SparkleEffect({ color, active }: { color: string; active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <>
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const angle = (i / PARTICLE_COUNT) * 360;
            const rad = (angle * Math.PI) / 180;
            const dist = 28 + Math.random() * 18;
            const dx = Math.cos(rad) * dist;
            const dy = Math.sin(rad) * dist;
            const size = 2.5 + Math.random() * 2.5;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: size,
                  height: size,
                  background: color,
                  top: "50%",
                  left: "50%",
                  marginLeft: -size / 2,
                  marginTop: -size / 2,
                  zIndex: 20,
                }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: dx, y: dy, scale: 0 }}
                exit={{}}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            );
          })}
        </>
      )}
    </AnimatePresence>
  );
}

function TypewriterText({ text, trigger }: { text: string; trigger: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, ++i)); }
      else { setDone(true); clearInterval(id); }
    }, 20);
    return () => clearInterval(id);
  }, [text, trigger]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ color: "#C9A84C", fontStyle: "normal" }}
        >|</motion.span>
      )}
    </span>
  );
}

export default function DailyHoroscopes() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selected, setSelected] = useState("Aries");
  const [sparkleSign, setSparkleSign] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    setTodayLabel(
      new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    );
  }, []);

  const selectedSign = zodiacSigns.find((s) => s.name === selected)!;
  const horoscope = horoscopes[selected];

  return (
    <section id="horoscopes" className="relative py-24 sm:py-44 px-4 sm:px-6" aria-labelledby="horoscopes-title">
      {/* Section tint — deep navy from left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 20% 50%, rgba(30,58,138,0.18) 0%, transparent 60%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(30,58,138,0.5) 40%, rgba(201,168,76,0.25) 60%, transparent 95%)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <div ref={ref} className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif" }}>
              Celestial Forecasts
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </motion.div>
          <motion.h2
            id="horoscopes-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", lineHeight: 1.05 }}
            className="text-4xl sm:text-5xl md:text-6xl"
          >
            Daily
            <em className="block shimmer-heading" style={{ color: "#C9A84C", fontStyle: "italic" }}>Horoscopes</em>
          </motion.h2>
        </div>

        {/* ── Sign selector ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-12"
        >
          <div
            className="rounded-2xl p-4 sm:p-6 md:p-8"
            style={{ background: "rgba(10,8,32,0.7)", border: "1px solid rgba(201,168,76,0.1)" }}
          >
            <p className="text-center text-xs tracking-[0.4em] uppercase mb-6"
               style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Jost', sans-serif" }}>
              Select Your Sign
            </p>
            {/* 4 col mobile → 6 col tablet → 12 col on wide */}
            <div
              className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 sm:gap-3"
              role="listbox"
              aria-label="Zodiac sign selector"
            >
              {zodiacSigns.map((sign) => {
                const Icon = ZODIAC_ICONS[sign.name];
                const active = selected === sign.name;
                return (
                  <motion.button
                    key={sign.name}
                    onClick={() => {
                      setSelected(sign.name);
                      setTrigger(t => t + 1);
                      setSparkleSign(sign.name);
                      setTimeout(() => setSparkleSign(null), 600);
                    }}
                    className="relative flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer overflow-visible"
                    style={{
                      minHeight: "64px",
                      background: active ? `${sign.color}65` : "rgba(255,255,255,0.03)",
                      border: active ? `1px solid ${sign.accentColor}55` : "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.2s ease",
                    }}
                    whileHover={{ scale: 1.06, background: `${sign.color}35` }}
                    whileTap={{ scale: 0.94 }}
                    role="option"
                    aria-selected={active}
                    aria-label={`${sign.name}, ${sign.dates}`}
                  >
                    <SparkleEffect color={sign.accentColor} active={sparkleSign === sign.name} />
                    <div style={{
                      opacity: active ? 1 : 0.55,
                      filter: active ? `drop-shadow(0 0 6px ${sign.accentColor})` : "none",
                    }}>
                      {Icon && <Icon size={24} color={active ? sign.accentColor : "rgba(232,224,240,0.75)"} strokeWidth={1.8} />}
                    </div>
                    <span style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: active ? sign.accentColor : "rgba(232,224,240,0.35)",
                    }}>
                      {sign.name.slice(0, 3).toUpperCase()}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Horoscope reading ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at top left, ${selectedSign.color}35 0%, rgba(8,6,24,0.97) 55%)`,
              border: `1px solid ${selectedSign.accentColor}25`,
              boxShadow: `0 24px 80px ${selectedSign.color}18`,
            }}
          >
            {/* Top bar */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-8 py-5 sm:py-7"
              style={{ borderBottom: `1px solid ${selectedSign.accentColor}18` }}
            >
              {/* Sign identity */}
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 52, height: 52,
                    background: `${selectedSign.color}55`,
                    border: `1px solid ${selectedSign.accentColor}45`,
                    boxShadow: `0 0 20px ${selectedSign.accentColor}30`,
                  }}
                >
                  {(() => { const I = ZODIAC_ICONS[selectedSign.name]; return I ? <I size={26} color={selectedSign.accentColor} strokeWidth={1.3} /> : null; })()}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", fontSize: "22px", lineHeight: 1.1 }}>
                    {name ? `${name}'s ` : ""}{selectedSign.name}
                  </h3>
                  <p style={{ fontFamily: "'Jost', sans-serif", color: "rgba(201,168,76,0.65)", fontSize: "12px", marginTop: "3px" }}>
                    {selectedSign.dates} · {selectedSign.planet}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="text-center sm:text-right" suppressHydrationWarning>
                <p style={{ fontFamily: "'Jost', sans-serif", color: "rgba(232,224,240,0.3)", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>Today's Reading</p>
                <p style={{ fontFamily: "'Jost', sans-serif", color: selectedSign.accentColor, fontSize: "11px", letterSpacing: "0.05em" }}>
                  {todayLabel}
                </p>
              </div>
            </div>

            {/* Reading content */}
            <div className="px-5 sm:px-8 py-7 sm:py-10">
              <p style={{
                fontFamily: "'IM Fell English', serif",
                color: "rgba(232,224,240,0.9)",
                fontSize: "clamp(15px, 4.4vw, 19px)",
                lineHeight: 1.85,
                fontStyle: "italic",
              }}>
                <TypewriterText text={horoscope} trigger={trigger} />
              </p>
            </div>

            {/* Bottom stats */}
            <div
              className="grid grid-cols-3 divide-x"
              style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, borderColor: "rgba(255,255,255,0.05)" }}
            >
              {[
                { label: "Lucky Number", value: String(((selectedSign.name.length * 7) % 9) + 1) },
                { label: "Ruling Planet", value: selectedSign.planet },
                { label: "Element", value: selectedSign.element },
              ].map((item, i) => (
                <div key={i} className="py-7 text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", color: "rgba(201,168,76,0.5)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Jost', sans-serif", color: "#F0EBF8", fontSize: "15px", fontWeight: 500 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Optional personalisation ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 rounded-2xl p-5 sm:p-8"
          style={{ background: "rgba(107,47,191,0.06)", border: "1px solid rgba(107,47,191,0.15)" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-center"
             style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Jost', sans-serif" }}>
            Personalise Your Reading
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div>
              <label htmlFor="reader-name" className="block text-xs tracking-widest mb-2"
                     style={{ color: "rgba(232,224,240,0.4)", fontFamily: "'Jost', sans-serif" }}>
                NAME (OPTIONAL)
              </label>
              <input
                id="reader-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name…"
                className="cosmic-input w-full px-4 py-3 rounded-xl text-sm"
                style={{ fontFamily: "'Jost', sans-serif" }}
              />
            </div>
            <div>
              <label htmlFor="reader-dob" className="block text-xs tracking-widest mb-2"
                     style={{ color: "rgba(232,224,240,0.4)", fontFamily: "'Jost', sans-serif" }}>
                DATE OF BIRTH
              </label>
              <input
                id="reader-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="cosmic-input w-full px-4 py-3 rounded-xl text-sm"
                style={{ fontFamily: "'Jost', sans-serif", colorScheme: "dark" }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
