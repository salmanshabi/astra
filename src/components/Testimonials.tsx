"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Isabelle M.",
    sign: "Pisces",
    text: "AstraCosmics revealed patterns in my life I had been ignoring for years. My birth chart reading was eerily accurate — it felt like the stars had been watching.",
    stars: 5,
    location: "Paris, France",
  },
  {
    name: "Marcus T.",
    sign: "Sagittarius",
    text: "I was skeptical, but the compatibility reading between my partner and I described our dynamic so perfectly. We've been using it as a guide for understanding each other.",
    stars: 5,
    location: "New York, USA",
  },
  {
    name: "Priya K.",
    sign: "Cancer",
    text: "The daily horoscopes have become part of my morning ritual. They're beautifully written and always give me something meaningful to reflect on.",
    stars: 5,
    location: "Mumbai, India",
  },
  {
    name: "Sofia A.",
    sign: "Scorpio",
    text: "The birth chart generator is stunning. I printed mine and framed it. The accuracy of my planetary placements gave me profound insight into my core self.",
    stars: 5,
    location: "Barcelona, Spain",
  },
  {
    name: "James L.",
    sign: "Aquarius",
    text: "As someone deeply interested in astronomy and symbolism, AstraCosmics strikes the perfect balance between mysticism and thoughtful interpretation.",
    stars: 5,
    location: "London, UK",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="#C9A84C" aria-hidden="true">
          <path d="M6 0.5l1.5 3 3.3.5-2.4 2.3.6 3.3L6 8l-2.9 1.5.6-3.3L1.2 4l3.3-.5L6 .5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative py-24 sm:py-44 px-4 sm:px-6" aria-labelledby="testimonials-title">
      {/* Section tint — gold bloom from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(201,168,76,0.08) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.35) 50%, transparent 95%)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif" }}>
              Cosmic Testimonies
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </motion.div>

          <motion.h2
            id="testimonials-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", lineHeight: 1.1 }}
          >
            Voices from
            <em className="block shimmer-heading" style={{ color: "#C9A84C", fontStyle: "italic" }}>the Cosmos</em>
          </motion.h2>
        </div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 sm:p-10 text-center max-w-3xl mx-auto"
              style={{
                background: "rgba(10,8,32,0.8)",
                border: "1px solid rgba(201,168,76,0.15)",
                boxShadow: "0 20px 80px rgba(107,47,191,0.1)",
              }}
            >
              {/* Quote mark */}
              <div
                className="text-6xl mb-4 leading-none"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  color: "rgba(201,168,76,0.2)",
                  lineHeight: 0.8,
                }}
                aria-hidden="true"
              >
                "
              </div>

              <p
                className="text-base sm:text-xl leading-relaxed mb-8"
                style={{
                  fontFamily: "'IM Fell English', serif",
                  color: "rgba(232,224,240,0.88)",
                  fontStyle: "italic",
                  lineHeight: 1.9,
                }}
              >
                {testimonials[current].text}
              </p>

              <div className="flex flex-col items-center gap-2">
                <StarRating count={testimonials[current].stars} />
                <p
                  className="text-base"
                  style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8" }}
                >
                  {testimonials[current].name}
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm px-2.5 py-0.5 rounded-full"
                    style={{
                      color: "#C9A84C",
                      fontFamily: "'Jost', sans-serif",
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.25)",
                      fontSize: "11px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {testimonials[current].sign.toUpperCase()}
                  </span>
                  <span style={{ color: "rgba(232,224,240,0.2)" }}>·</span>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(232,224,240,0.4)", fontFamily: "'Jost', sans-serif" }}
                  >
                    {testimonials[current].location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="cursor-pointer transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  borderRadius: i === current ? "4px" : "50%",
                  background: i === current ? "#C9A84C" : "rgba(201,168,76,0.25)",
                  border: "none",
                  padding: 0,
                }}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonial from ${testimonials[i].name}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Cards row */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="rounded-xl p-5 sm:p-6 animate-float-slow"
              style={{
                background: "rgba(10,8,32,0.6)",
                border: "1px solid rgba(201,168,76,0.1)",
                animationDelay: `${i * 2}s`,
              }}
            >
              <StarRating count={t.stars} />
              <p
                className="text-sm mt-3 mb-4 leading-relaxed"
                style={{
                  color: "rgba(232,224,240,0.7)",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                "{t.text.slice(0, 100)}…"
              </p>
              <div className="flex items-center justify-between">
                <p
                  className="text-sm"
                  style={{ color: "#F0EBF8", fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                >
                  {t.name}
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    color: "#C9A84C",
                    fontFamily: "'Jost', sans-serif",
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t.sign.slice(0, 3).toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
