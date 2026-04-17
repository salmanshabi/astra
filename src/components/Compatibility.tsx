"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { zodiacSigns } from "@/lib/zodiac-data";
import { ZODIAC_ICONS, SparkIcon } from "@/components/icons/ZodiacIcons";

const COMPATIBILITY_MATRIX: Record<string, Record<string, number>> = {
  Aries:       { Aries:72,Taurus:48,Gemini:88,Cancer:55,Leo:95,Virgo:42,Libra:70,Scorpio:58,Sagittarius:92,Capricorn:46,Aquarius:80,Pisces:60 },
  Taurus:      { Aries:48,Taurus:78,Gemini:52,Cancer:90,Leo:62,Virgo:94,Libra:65,Scorpio:88,Sagittarius:50,Capricorn:92,Aquarius:44,Pisces:82 },
  Gemini:      { Aries:88,Taurus:52,Gemini:68,Cancer:58,Leo:84,Virgo:60,Libra:92,Scorpio:48,Sagittarius:85,Capricorn:50,Aquarius:90,Pisces:55 },
  Cancer:      { Aries:55,Taurus:90,Gemini:58,Cancer:80,Leo:60,Virgo:85,Libra:52,Scorpio:95,Sagittarius:45,Capricorn:82,Aquarius:48,Pisces:92 },
  Leo:         { Aries:95,Taurus:62,Gemini:84,Cancer:60,Leo:75,Virgo:52,Libra:88,Scorpio:60,Sagittarius:90,Capricorn:55,Aquarius:72,Pisces:58 },
  Virgo:       { Aries:42,Taurus:94,Gemini:60,Cancer:85,Leo:52,Virgo:80,Libra:62,Scorpio:88,Sagittarius:48,Capricorn:92,Aquarius:55,Pisces:78 },
  Libra:       { Aries:70,Taurus:65,Gemini:92,Cancer:52,Leo:88,Virgo:62,Libra:72,Scorpio:58,Sagittarius:85,Capricorn:55,Aquarius:94,Pisces:92 },
  Scorpio:     { Aries:58,Taurus:88,Gemini:48,Cancer:95,Leo:60,Virgo:88,Libra:58,Scorpio:76,Sagittarius:52,Capricorn:85,Aquarius:48,Pisces:92 },
  Sagittarius: { Aries:92,Taurus:50,Gemini:85,Cancer:45,Leo:90,Virgo:48,Libra:85,Scorpio:52,Sagittarius:78,Capricorn:50,Aquarius:88,Pisces:60 },
  Capricorn:   { Aries:46,Taurus:92,Gemini:50,Cancer:82,Leo:55,Virgo:92,Libra:55,Scorpio:85,Sagittarius:50,Capricorn:80,Aquarius:60,Pisces:78 },
  Aquarius:    { Aries:80,Taurus:44,Gemini:90,Cancer:48,Leo:72,Virgo:55,Libra:94,Scorpio:48,Sagittarius:88,Capricorn:60,Aquarius:75,Pisces:65 },
  Pisces:      { Aries:60,Taurus:82,Gemini:55,Cancer:92,Leo:58,Virgo:78,Libra:92,Scorpio:92,Sagittarius:60,Capricorn:78,Aquarius:65,Pisces:82 },
};

function label(score: number): { text: string; color: string } {
  if (score >= 90) return { text: "Cosmic Soulmates", color: "#E8C97A" };
  if (score >= 80) return { text: "Deeply Aligned", color: "#C9A84C" };
  if (score >= 70) return { text: "Strong Connection", color: "#80C880" };
  if (score >= 60) return { text: "Compatible", color: "#64B5F6" };
  if (score >= 50) return { text: "Complementary", color: "#9C88C8" };
  return { text: "Challenging Growth", color: "#EF5350" };
}

function SignGrid({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3" role="listbox" aria-labelledby={id}>
      {zodiacSigns.map((sign) => {
        const Icon = ZODIAC_ICONS[sign.name];
        const active = value === sign.name;
        return (
          <motion.button
            key={sign.name}
            onClick={() => onChange(sign.name)}
            className="flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer"
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
            aria-label={sign.name}
          >
            <div style={{ opacity: active ? 1 : 0.55, filter: active ? `drop-shadow(0 0 6px ${sign.accentColor})` : "none" }}>
              {Icon && <Icon size={24} color={active ? sign.accentColor : "rgba(232,224,240,0.7)"} strokeWidth={1.8} />}
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
  );
}

function SignDisplay({ signName }: { signName: string }) {
  const sign = zodiacSigns.find((s) => s.name === signName);
  const Icon = sign ? ZODIAC_ICONS[sign.name] : null;
  if (!sign || !Icon) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-4" style={{ opacity: 0.3 }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="13" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="16" cy="16" r="3" fill="#C9A84C" />
        </svg>
        <span style={{ fontFamily: "'Jost', sans-serif", color: "#C9A84C", fontSize: "10px", letterSpacing: "0.1em" }}>
          CHOOSE A SIGN
        </span>
      </div>
    );
  }
  return (
    <motion.div
      key={signName}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3"
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 64, height: 64,
          background: `${sign.color}55`,
          border: `1px solid ${sign.accentColor}50`,
          boxShadow: `0 0 28px ${sign.accentColor}35`,
        }}
      >
        <Icon size={32} color={sign.accentColor} strokeWidth={1.3} />
      </div>
      <div className="text-center">
        <p style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", fontSize: "18px", lineHeight: 1.1 }}>{sign.name}</p>
        <p style={{ fontFamily: "'Jost', sans-serif", color: "rgba(201,168,76,0.55)", fontSize: "10px", marginTop: "3px" }}>{sign.dates}</p>
      </div>
    </motion.div>
  );
}

export default function Compatibility() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [signA, setSignA] = useState("");
  const [signB, setSignB] = useState("");

  const score = signA && signB ? (COMPATIBILITY_MATRIX[signA]?.[signB] ?? 70) : null;
  const compat = score !== null ? label(score) : null;
  const signAData = zodiacSigns.find((s) => s.name === signA);
  const signBData = zodiacSigns.find((s) => s.name === signB);

  return (
    <section id="compatibility" className="relative py-24 sm:py-44 px-4 sm:px-6" aria-labelledby="compat-title">
      {/* Section tint — purple bloom from bottom-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 90%, rgba(107,47,191,0.16) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.3) 40%, rgba(107,47,191,0.4) 60%, transparent 95%)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif" }}>
              Celestial Bonds
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </motion.div>
          <motion.h2
            id="compat-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", lineHeight: 1.05 }}
          >
            Love &amp;
            <em className="block shimmer-heading" style={{ color: "#C9A84C", fontStyle: "italic" }}>Compatibility</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="max-w-md mx-auto mt-4 text-base"
            style={{ color: "rgba(232,224,240,0.5)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
          >
            Discover the cosmic chemistry between two signs.
          </motion.p>
        </div>

        {/* ── Pickers + Result ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-5 sm:gap-8 mb-10"
        >
          {[
            { label: "First Sign", value: signA, onChange: setSignA, pid: "sign-a-label" },
            { label: "Second Sign", value: signB, onChange: setSignB, pid: "sign-b-label" },
          ].map(({ label: lbl, value, onChange, pid }) => (
            <div
              key={pid}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(10,8,32,0.75)", border: "1px solid rgba(201,168,76,0.1)" }}
            >
              {/* Selected sign display */}
              <div
                className="flex items-center justify-center py-9"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", minHeight: 136 }}
              >
                <SignDisplay signName={value} />
              </div>
              {/* Label */}
              <p id={pid} className="text-center py-3 text-xs tracking-[0.3em] uppercase"
                 style={{ color: "rgba(201,168,76,0.45)", fontFamily: "'Jost', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {lbl}
              </p>
              {/* Grid */}
              <div className="p-3 sm:p-5">
                <SignGrid value={value} onChange={onChange} id={pid} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Result ── */}
        <AnimatePresence mode="wait">
          {score !== null && compat && signAData && signBData && (
            <motion.div
              key={`${signA}-${signB}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-5 sm:p-8 text-center"
              style={{
                background: `radial-gradient(ellipse at center, ${signAData.color}28 0%, rgba(8,6,24,0.97) 60%)`,
                border: `1px solid ${compat.color}25`,
                boxShadow: `0 24px 80px ${signAData.color}12`,
              }}
            >
              {/* Signs + connection */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="flex flex-col items-center gap-2">
                  {(() => {
                    const I = ZODIAC_ICONS[signAData.name];
                    return I ? (
                      <div className="flex items-center justify-center rounded-full"
                        style={{ width:60,height:60,background:`${signAData.color}50`,border:`1px solid ${signAData.accentColor}45`,boxShadow:`0 0 24px ${signAData.accentColor}35` }}>
                        <I size={30} color={signAData.accentColor} strokeWidth={1.3} />
                      </div>
                    ) : null;
                  })()}
                  <p style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", fontSize: "16px" }}>{signA}</p>
                </div>

                <div className="flex items-center gap-3 flex-1 max-w-28">
                  <motion.div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${signAData.accentColor},${compat.color})`, originX: 0 }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} />
                  <motion.div animate={{ scale:[1,1.35,1], rotate:[0,45,0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <SparkIcon size={12} color={compat.color} />
                  </motion.div>
                  <motion.div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${compat.color},${signBData.accentColor})`, originX: 0 }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} />
                </div>

                <div className="flex flex-col items-center gap-2">
                  {(() => {
                    const I = ZODIAC_ICONS[signBData.name];
                    return I ? (
                      <div className="flex items-center justify-center rounded-full"
                        style={{ width:60,height:60,background:`${signBData.color}50`,border:`1px solid ${signBData.accentColor}45`,boxShadow:`0 0 24px ${signBData.accentColor}35` }}>
                        <I size={30} color={signBData.accentColor} strokeWidth={1.3} />
                      </div>
                    ) : null;
                  })()}
                  <p style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", fontSize: "16px" }}>{signB}</p>
                </div>
              </div>

              {/* Score */}
              <motion.p className="text-6xl sm:text-7xl md:text-8xl font-bold mb-2"
                style={{ fontFamily: "'Bodoni Moda', serif", color: compat.color }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 180 }}>
                {score}%
              </motion.p>
              <p className="text-xl mb-6" style={{ fontFamily: "'IM Fell English', serif", color: "rgba(232,224,240,0.75)", fontStyle: "italic" }}>
                {compat.text}
              </p>

              {/* Score bar */}
              <div className="rounded-full overflow-hidden mb-8 max-w-xs mx-auto"
                style={{ height: "5px", background: "rgba(255,255,255,0.07)" }}
                role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
                <motion.div className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${signAData.accentColor}, ${compat.color}, ${signBData.accentColor})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} />
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                {[
                  { area: "Love", val: Math.min(100, score + 5) },
                  { area: "Friendship", val: Math.max(0, score - 3) },
                  { area: "Growth", val: Math.min(100, score + 8) },
                ].map((item) => (
                  <div key={item.area} className="text-center">
                    <p style={{ fontFamily:"'Jost',sans-serif", color:"rgba(201,168,76,0.5)", fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"6px" }}>{item.area}</p>
                    <div className="rounded-full overflow-hidden mb-1.5 mx-auto" style={{ height:"3px", background:"rgba(255,255,255,0.07)", maxWidth:"80px" }}>
                      <motion.div className="h-full rounded-full" style={{ background: compat.color }}
                        initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ duration: 0.9, delay: 0.55 }} />
                    </div>
                    <p style={{ fontFamily:"'Jost',sans-serif", color:"#F0EBF8", fontSize:"13px" }}>{item.val}%</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!signA && !signB && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm mt-4"
            style={{ color: "rgba(201,168,76,0.35)", fontFamily: "'Jost', sans-serif" }}
          >
            Select two signs above to reveal your cosmic compatibility
          </motion.p>
        )}
      </div>
    </section>
  );
}
