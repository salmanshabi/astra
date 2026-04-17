"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SparkIcon } from "@/components/icons/ZodiacIcons";

const SIGN_NAMES = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const SIGN_SYMBOLS = ["Ari","Tau","Gem","Can","Leo","Vir","Lib","Sco","Sag","Cap","Aqu","Pis"];

const r3 = (n: number) => Math.round(n * 1000) / 1000;

const PLANETS = [
  { name: "Sun",     label: "S",  color: "#FFB347", angle: 45  },
  { name: "Moon",    label: "Mo", color: "#9C88C8", angle: 120 },
  { name: "Rising",  label: "As", color: "#64B5F6", angle: 0   },
  { name: "Mercury", label: "Me", color: "#80C880", angle: 75  },
  { name: "Venus",   label: "Ve", color: "#E8C97A", angle: 160 },
  { name: "Mars",    label: "Ma", color: "#EF5350", angle: 220 },
  { name: "Jupiter", label: "Ju", color: "#C9A84C", angle: 290 },
  { name: "Saturn",  label: "Sa", color: "#90A4AE", angle: 330 },
];

interface ChartData {
  sun: string; moon: string; rising: string; mercury: string;
  venus: string; mars: string; jupiter: string; saturn: string;
}

function BirthChartSVG({ chart }: { chart: ChartData | null }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const cx = 160, cy = 160, R = 140;

  return (
    <div className="relative">
      <svg viewBox="0 0 320 320" className="w-full max-w-xs mx-auto" role="img" aria-label="Natal birth chart wheel">
        {/* Rings */}
        <circle cx={cx} cy={cy} r={R}       fill="rgba(3,2,10,0.6)"   stroke="rgba(201,168,76,0.18)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={R*.80}   fill="none"               stroke="rgba(107,47,191,0.18)" strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r={R*.58}   fill="none"               stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r={R*.30}   fill="rgba(107,47,191,0.07)" stroke="rgba(107,47,191,0.25)" strokeWidth="0.5" />

        {/* 12 house divisions + sign symbols */}
        {Array.from({ length: 12 }).map((_, i) => {
          const ang   = (i / 12) * 360 - 90;
          const rad   = (ang * Math.PI) / 180;
          const x1    = r3(cx + R * .30 * Math.cos(rad));
          const y1    = r3(cy + R * .30 * Math.sin(rad));
          const x2    = r3(cx + R * Math.cos(rad));
          const y2    = r3(cy + R * Math.sin(rad));
          const mAng  = ((i + .5) / 12) * 360 - 90;
          const mRad  = (mAng * Math.PI) / 180;
          const lx    = r3(cx + R * .90 * Math.cos(mRad));
          const ly    = r3(cy + R * .90 * Math.sin(mRad));
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontFamily="'Jost', sans-serif" fill="rgba(201,168,76,0.5)">
                {SIGN_SYMBOLS[i]}
              </text>
            </g>
          );
        })}

        {/* Planets */}
        {chart && PLANETS.map((planet, i) => {
          const rad = ((planet.angle - 90) * Math.PI) / 180;
          const r   = R * .65;
          const px  = r3(cx + r * Math.cos(rad));
          const py  = r3(cy + r * Math.sin(rad));
          const hov = hoveredIdx === i;
          return (
            <motion.g key={planet.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.09, duration: 0.4, ease: [0.22,1,0.36,1] }}
            >
              <line x1={cx} y1={cy} x2={px} y2={py} stroke={`${planet.color}20`} strokeWidth="0.5" strokeDasharray="2 3" />
              <circle cx={px} cy={py} r={hov ? 9 : 6} fill={planet.color} opacity={hov ? 1 : 0.9}
                style={{ cursor:"pointer", filter: hov ? `drop-shadow(0 0 6px ${planet.color})` : "none" }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              <text x={px} y={py} textAnchor="middle" dominantBaseline="middle"
                fontSize="5" fontFamily="'Jost',sans-serif" fill={hov ? "#03020A" : planet.color}
                style={{ pointerEvents:"none", fontWeight: 600 }}>
                {planet.label}
              </text>
            </motion.g>
          );
        })}

        {/* Center ornament */}
        <circle cx={cx} cy={cy} r="10" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.35)" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r="4"  fill="#C9A84C" opacity={chart ? 1 : 0.3} />
      </svg>

      {/* Planet tooltip */}
      <AnimatePresence>
        {hoveredIdx !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap"
            style={{ background: "rgba(10,8,32,0.95)", border: `1px solid ${PLANETS[hoveredIdx].color}40`, fontFamily: "'Jost',sans-serif", color: PLANETS[hoveredIdx].color }}
          >
            {PLANETS[hoveredIdx].name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BirthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState({ name: "", dob: "", time: "", place: "" });
  const [chart, setChart] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const generate = () => {
    if (!form.dob) return;
    setLoading(true);
    setChart(null);
    setTimeout(() => {
      const h = form.dob.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      setChart({
        sun: SIGN_NAMES[h % 12],       moon:    SIGN_NAMES[(h+3) % 12],
        rising: SIGN_NAMES[(h+7) % 12], mercury: SIGN_NAMES[(h+1) % 12],
        venus: SIGN_NAMES[(h+5) % 12], mars:    SIGN_NAMES[(h+9) % 12],
        jupiter: SIGN_NAMES[(h+2) % 12], saturn: SIGN_NAMES[(h+11) % 12],
      });
      setLoading(false);
    }, 1800);
  };

  const results = chart ? [
    { planet: "Sun",     sign: chart.sun,     meaning: "Core identity" },
    { planet: "Moon",    sign: chart.moon,    meaning: "Emotions" },
    { planet: "Rising",  sign: chart.rising,  meaning: "First impression" },
    { planet: "Mercury", sign: chart.mercury, meaning: "Communication" },
    { planet: "Venus",   sign: chart.venus,   meaning: "Love & beauty" },
    { planet: "Mars",    sign: chart.mars,    meaning: "Drive & desire" },
    { planet: "Jupiter", sign: chart.jupiter, meaning: "Expansion" },
    { planet: "Saturn",  sign: chart.saturn,  meaning: "Discipline" },
  ] : [];

  return (
    <section id="birth-chart" className="relative py-24 sm:py-44 px-4 sm:px-6" aria-labelledby="chart-title">
      {/* Section tint — warm gold from right */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 80% 40%, rgba(201,168,76,0.1) 0%, transparent 60%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.4) 40%, rgba(107,47,191,0.25) 60%, transparent 95%)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">

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
              Natal Astrology
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </motion.div>
          <motion.h2
            id="chart-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", lineHeight: 1.05 }}
          >
            Your Birth
            <em className="block shimmer-heading" style={{ color: "#C9A84C", fontStyle: "italic" }}>Chart</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="max-w-md mx-auto mt-4 text-base"
            style={{ color: "rgba(232,224,240,0.5)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
          >
            A natal chart maps the sky at the moment of your birth — the blueprint of your soul.
          </motion.p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="rounded-2xl p-5 sm:p-8"
            style={{ background: "rgba(10,8,32,0.8)", border: "1px solid rgba(201,168,76,0.12)" }}
          >
            <h3 className="text-xl mb-7" style={{ fontFamily: "'Bodoni Moda', serif", color: "#E8C97A" }}>
              Enter Your Details
            </h3>

            <div className="flex flex-col gap-5">
              {([
                { id: "chart-name",  label: "Full Name",      key: "name",  type: "text",  placeholder: "Your full name…" },
                { id: "chart-dob",   label: "Date of Birth *", key: "dob",  type: "date",  placeholder: "" },
                { id: "chart-time",  label: "Time of Birth (optional)", key: "time", type: "time",  placeholder: "" },
                { id: "chart-place", label: "Place of Birth",  key: "place",type: "text",  placeholder: "City, Country…" },
              ] as { id:string; label:string; key:keyof typeof form; type:string; placeholder:string }[]).map(({ id, label, key, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs tracking-widest mb-2"
                         style={{ color: "rgba(232,224,240,0.4)", fontFamily: "'Jost', sans-serif" }}>
                    {label.toUpperCase()}
                  </label>
                  <input
                    id={id} type={type} value={form[key]}
                    onChange={set(key)}
                    placeholder={placeholder}
                    required={key === "dob"}
                    className="cosmic-input w-full px-4 py-3.5 rounded-xl text-sm"
                    style={{ fontFamily: "'Jost', sans-serif", colorScheme: type === "date" || type === "time" ? "dark" : undefined }}
                  />
                </div>
              ))}

              <motion.button
                onClick={generate}
                disabled={!form.dob || loading}
                className="w-full py-4 rounded-xl text-sm tracking-widest mt-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: form.dob ? "linear-gradient(135deg, #8B6914, #C9A84C, #E8C97A)" : "rgba(201,168,76,0.15)",
                  color: form.dob ? "#03020A" : "rgba(201,168,76,0.3)",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  boxShadow: form.dob ? "0 0 28px rgba(201,168,76,0.28)" : "none",
                  transition: "all 0.3s ease",
                }}
                whileHover={form.dob ? { scale: 1.02, boxShadow: "0 0 40px rgba(201,168,76,0.45)" } : {}}
                whileTap={form.dob ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ display:"inline-flex" }}>
                      <SparkIcon size={13} color="#03020A" />
                    </motion.span>
                    READING THE STARS…
                  </span>
                ) : (
                  "GENERATE MY CHART"
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Chart display */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-5"
          >
            {/* SVG wheel */}
            <div className="rounded-2xl p-4 sm:p-6"
                 style={{ background: "rgba(10,8,32,0.7)", border: "1px solid rgba(107,47,191,0.18)" }}>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-16">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
                      <SparkIcon size={44} color="#C9A84C" />
                    </motion.div>
                    <p className="text-xs tracking-[0.3em] uppercase"
                       style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'Jost', sans-serif" }}>
                      Reading the stars…
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <BirthChartSVG chart={chart} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Planet grid */}
            <AnimatePresence>
              {chart && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-2.5"
                >
                  {results.map((item, i) => (
                    <motion.div key={item.planet}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="rounded-xl px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(201,168,76,0.08)" }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs" style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'Jost',sans-serif", letterSpacing:"0.08em" }}>
                          {item.planet.toUpperCase()}
                        </p>
                        <p className="text-xs" style={{ color: "rgba(232,224,240,0.3)", fontFamily: "'Jost',sans-serif", fontSize:"10px" }}>
                          {item.meaning}
                        </p>
                      </div>
                      <p className="text-base mt-1" style={{ fontFamily: "'Bodoni Moda',serif", color: "#F0EBF8" }}>
                        {item.sign}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
