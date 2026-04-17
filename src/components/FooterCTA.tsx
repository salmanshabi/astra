"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FOOTER_LINKS = {
  Readings: ["Birth Chart", "Daily Horoscope", "Compatibility", "Year Ahead"],
  Learn: ["Zodiac Signs", "Planets", "Houses", "Aspects"],
  Company: ["About", "Astrologers", "Blog", "Contact"],
};

export default function FooterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section id="cta" className="relative" aria-labelledby="cta-title">
      {/* CTA Banner */}
      <div className="relative overflow-hidden py-20 sm:py-32 px-4 sm:px-6">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(107,47,191,0.2) 0%, rgba(10,8,32,0.95) 60%)",
          }}
          aria-hidden="true"
        />

        {/* Decorative orbital rings */}
        {[300, 450, 600].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: `1px solid rgba(201,168,76,${0.06 - i * 0.015})`,
            }}
            aria-hidden="true"
          />
        ))}

        <div ref={ref} className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif" }}>
              Begin Your Journey
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </motion.div>

          <motion.h2
            id="cta-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6"
            style={{ fontFamily: "'Bodoni Moda', serif", color: "#F0EBF8", lineHeight: 1.05 }}
          >
            The Stars Are
            <em
              className="block"
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #E8C97A, #C9A84C, #9F7AEA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Calling You
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto text-base sm:text-lg mb-10"
            style={{ color: "rgba(232,224,240,0.6)", fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.7 }}
          >
            Book a personal consultation with one of our master astrologers. One hour that could illuminate decades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              className="px-7 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base tracking-widest cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #8B6914, #C9A84C, #E8C97A)",
                color: "#03020A",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.12em",
                boxShadow: "0 0 40px rgba(201,168,76,0.4), 0 8px 30px rgba(0,0,0,0.4)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(201,168,76,0.6), 0 8px 40px rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              BOOK CONSULTATION
            </motion.button>
            <motion.button
              className="px-7 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base tracking-widest cursor-pointer"
              style={{
                background: "rgba(107,47,191,0.1)",
                border: "1px solid rgba(107,47,191,0.35)",
                color: "#9C88C8",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.1em",
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ background: "rgba(107,47,191,0.2)", borderColor: "rgba(107,47,191,0.6)" }}
              whileTap={{ scale: 0.97 }}
            >
              EXPLORE READINGS
            </motion.button>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(232,224,240,0.45)", fontFamily: "'Jost', sans-serif", letterSpacing: "0.05em" }}
            >
              Receive weekly cosmic insights in your inbox
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address…"
                  required
                  className="cosmic-input flex-1 px-5 py-3.5 rounded-full text-sm"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3.5 rounded-full text-sm tracking-widest whitespace-nowrap cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #8B6914, #C9A84C)",
                    color: "#03020A",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 600,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  SUBSCRIBE
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 text-center"
                style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif" }}
              >
                ✦ The stars have received your message
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="border-t px-4 sm:px-6 py-12 sm:py-16"
        style={{ borderColor: "rgba(201,168,76,0.08)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
                    <circle cx="16" cy="16" r="3" fill="#C9A84C" />
                    <circle cx="16" cy="4" r="2" fill="#E8C97A" />
                  </svg>
                </div>
                <span
                  className="text-base tracking-widest"
                  style={{ color: "#C9A84C", fontFamily: "'Bodoni Moda', serif" }}
                >
                  ASTRA
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(232,224,240,0.4)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
              >
                Ancient wisdom illuminated by modern insight. Your cosmic guide since 2020.
              </p>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3
                  className="text-xs tracking-widest mb-4 uppercase"
                  style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif" }}
                >
                  {category}
                </h3>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-200 hover:text-white"
                        style={{ color: "rgba(232,224,240,0.45)", fontFamily: "'Jost', sans-serif" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="cosmic-divider mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-xs"
              style={{ color: "rgba(232,224,240,0.25)", fontFamily: "'Jost', sans-serif" }}
            >
              © 2025 AstraCosmics. All rights reserved. For entertainment purposes.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Cookies"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: "rgba(232,224,240,0.25)", fontFamily: "'Jost', sans-serif" }}
                  onClick={(e) => e.preventDefault()}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
