"use client";
import React, { useState, useEffect, useRef } from "react";

/* ── Constants ─────────────────────────────────────────────────────────── */
type StepIndex = 0 | 1 | 2;

/* Star positions — deterministic via modulo math */
const STARS = Array.from({ length: 15 }, (_, i) => ({
  x:       ((i * 73 + 17) % 90) + 5,
  y:       ((i * 47 + 23) % 80) + 10,
  size:    i % 3 === 0 ? 2.5 : i % 3 === 1 ? 2 : 1.5,
  opacity: 0.06 + (i % 5) * 0.016,
}));

/* Waveform bar heights: sin(i*0.6)*12+5 */
const WAVE_HEIGHTS = Array.from({ length: 32 }, (_, i) =>
  Math.max(3, Math.round(Math.sin(i * 0.6) * 12 + 5))
);

/* ── Main component ─────────────────────────────────────────────────────── */
export default function DailyRituals() {
  const headerRef                      = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.12 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="py-16 px-8 border-t border-[#1C1A17]/6"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="text-center mb-8"
          style={{
            opacity:    headerVisible ? 1 : 0,
            transform:  headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s",
          }}
        >
          <span
            style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "2px",
              textTransform: "uppercase", color: "#6B8F71",
              display: "block", marginBottom: 14,
            }}
          >
            Daily Rituals
          </span>
          <h2
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(22px, 4vw, 36px)",
              color: "#2C3E2D", lineHeight: 1.15,
              marginBottom: 12, fontWeight: 400,
            }}
          >
            Start clear. Speak freely.{" "}
            <em style={{ color: "#6B8F71" }}>End lighter.</em>
          </h2>
          <p style={{ fontSize: "clamp(13px, 2vw, 17px)", color: "rgba(44,62,45,0.4)", fontWeight: 300 }}>
            Three moments that change how your day feels.
          </p>
        </div>

        {/* ── Desktop: three cards side-by-side (≥680px) ── */}
        <div className="ritual-desktop">
          {([0, 1, 2] as StepIndex[]).map((i) => (
            <RitualCard key={i} step={i} />
          ))}
        </div>

        {/* ── Mobile: three cards stacked (<680px) ── */}
        <div className="ritual-mobile">
          {([0, 1, 2] as StepIndex[]).map((i) => (
            <RitualCard key={i} step={i} mobile />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Card content ───────────────────────────────────────────────────────── */
function RitualCard({ step, mobile = false }: { step: StepIndex; mobile?: boolean }) {
  const pad       = mobile ? "16px 18px" : "24px";
  const br        = mobile ? 16 : 24;
  const titleSize = mobile ? 18 : 20;
  const descSize  = mobile ? 12.5 : 13;
  const labelSize = mobile ? 10 : 10;
  const descMb    = mobile ? 12 : 14;
  const innerPad  = mobile ? "10px 14px" : "10px 14px";
  const innerSize = mobile ? 12 : 13;

  /* Morning */
  if (step === 0) {
    return (
      <div
        className="ritual-card"
        style={{
          background: "linear-gradient(135deg, #FAF7F2 0%, #F7EEE4 50%, #F5E6D8 100%)",
          border: "1px solid rgba(0,0,0,0.04)",
          borderRadius: br, padding: pad,
        }}
      >
        <span style={{ display: "block", fontSize: labelSize, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#FFD166", marginBottom: 16 }}>
          Morning
        </span>
        <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: titleSize, color: "#2C2416", marginBottom: 12, lineHeight: 1.2, fontWeight: 400 }}>
          Set your intention
        </h3>
        <p style={{ fontSize: descSize, color: "rgba(139,115,85,0.6)", lineHeight: 1.75, marginBottom: descMb, fontWeight: 300 }}>
          Before the noise begins, name one thing that matters today. A single sentence. An anchor for whatever comes next.
        </p>
        <div style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(139,115,85,0.1)", borderRadius: 12, padding: innerPad }}>
          <p style={{ fontSize: innerSize, color: "#8B7355", fontStyle: "italic", margin: 0 }}>
            &ldquo;Being present with my family today.&rdquo;
          </p>
        </div>
      </div>
    );
  }

  /* Journal — throughout the day */
  if (step === 1) {
    const barCount = mobile ? 22 : 32;
    return (
      <div
        className="ritual-card"
        style={{
          background: "linear-gradient(135deg, #EFF5F1 0%, #E4EDE6 50%, #DAE8DD 100%)",
          border: "1px solid rgba(0,0,0,0.04)",
          borderRadius: br, padding: pad,
        }}
      >
        <span style={{ display: "block", fontSize: labelSize, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B8F71", marginBottom: 16 }}>
          Throughout the Day
        </span>
        <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: titleSize, color: "#1C2E1D", marginBottom: 12, lineHeight: 1.2, fontWeight: 400 }}>
          Press record. Let it out.
        </h3>
        <p style={{ fontSize: descSize, color: "rgba(44,78,48,0.55)", lineHeight: 1.75, marginBottom: descMb, fontWeight: 300 }}>
          Whenever something&rsquo;s on your mind, open the app and talk. Tag your mood when you&rsquo;re done.
        </p>
        {/* Waveform player */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.45)", border: "1px solid rgba(107,143,113,0.12)", borderRadius: 12, padding: innerPad }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#6B8F71", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="11" height="12" viewBox="0 0 12 14" fill="white">
              <path d="M1 1L11 7L1 13V1Z" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, height: 28, overflow: "hidden" }}>
            {WAVE_HEIGHTS.slice(0, barCount).map((h, i) => (
              <div
                key={i}
                className="ritual-wave-bar"
                style={{
                  width: 2.5, height: h, borderRadius: 2,
                  background: "rgba(107,143,113,0.35)",
                  animationDelay: `${(i * 0.06).toFixed(2)}s`,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: innerSize, color: "#8A8078", flexShrink: 0 }}>2:14</span>
        </div>
      </div>
    );
  }

  /* Evening */
  return (
    <div
      className="ritual-card"
      style={{
        background: "linear-gradient(135deg, #1A1815 0%, #141210 50%, #0F0E0C 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: br, padding: pad,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Star field */}
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size, borderRadius: "50%",
            background: "white", opacity: s.opacity, pointerEvents: "none",
          }}
        />
      ))}
      <div style={{ position: "relative", zIndex: 1 }}>
        <span style={{ display: "block", fontSize: labelSize, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C77DFF", marginBottom: 16 }}>
          Evening
        </span>
        <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: titleSize, color: "#FFFFFF", marginBottom: 12, lineHeight: 1.2, fontWeight: 400 }}>
          Reflect and release
        </h3>
        <p style={{ fontSize: descSize, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: descMb, fontWeight: 300 }}>
          A gentle prompt to look back. What moved you? What are you carrying? What can you set down?
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: innerPad }}>
          <p style={{ fontSize: innerSize, color: "rgba(255,255,255,0.35)", fontStyle: "italic", margin: 0 }}>
            &ldquo;The pressure to have it all figured out&hellip;&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
