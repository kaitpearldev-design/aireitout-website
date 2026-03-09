"use client";
import React, { useState, useEffect, useRef } from "react";

/* ── Constants ─────────────────────────────────────────────────────────── */
const STEPS = [
  { id: "morning", label: "Morning",            accent: "#FFD166" },
  { id: "journal", label: "Throughout the day", accent: "#6B8F71" },
  { id: "evening", label: "Evening",            accent: "#C77DFF" },
] as const;

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
  const [active, setActive]           = useState<StepIndex>(0);
  const [paused, setPaused]           = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX                   = useRef(0);
  const headerRef                     = useRef<HTMLDivElement>(null);
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

  /* Auto-advance every 8 s */
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setActive(p => ((p + 1) % 3) as StepIndex);
      setProgressKey(k => k + 1);
    }, 8000);
    return () => clearTimeout(t);
  }, [paused, active]);

  const goTo = (i: StepIndex, manual = false) => {
    setActive(i);
    if (manual) setPaused(true);
    setProgressKey(k => k + 1);
  };

  return (
    <section
      className="py-24 px-8 border-t border-[#1C1A17]/6"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="text-center mb-12"
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
              fontSize: "clamp(26px, 5vw, 42px)",
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

        {/* ── Desktop: tabbed interface (≥680px) ── */}
        <div className="ritual-desktop">

          {/* Tab buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 28 }}>
            {STEPS.map((step, idx) => {
              const i = idx as StepIndex;
              const isActive = active === i;
              return (
                <button
                  key={step.id}
                  onClick={() => goTo(i, true)}
                  style={{
                    position: "relative",
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 9999,
                    border: isActive
                      ? `1.5px solid ${step.accent}40`
                      : "1.5px solid transparent",
                    background: isActive ? `${step.accent}1F` : "rgba(0,0,0,0.02)",
                    fontSize: 14, fontWeight: 500,
                    color: isActive ? "#2C3E2D" : "#8A8078",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ color: isActive ? step.accent : "#8A8078", display: "flex", alignItems: "center", transition: "color 0.3s ease" }}>
                    {i === 0 ? <TabSunIcon /> : i === 1 ? <TabMicIcon /> : <TabMoonIcon />}
                  </span>
                  {step.label}
                  {/* Progress bar — only when active + not paused */}
                  {isActive && !paused && (
                    <span
                      key={`prog-${progressKey}`}
                      style={{
                        position: "absolute", bottom: 0, left: 0,
                        height: 2, background: step.accent,
                        borderRadius: "0 1px 1px 0",
                        animation: "tabProgress 8s linear forwards",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content card — remount on tab change to restart fade-in */}
          <div key={active} style={{ animation: "ritualFadeIn 0.45s ease" }}>
            <RitualCard step={active} />
          </div>
        </div>

        {/* ── Mobile: swipeable carousel (<680px) ── */}
        <div className="ritual-mobile">
          <div style={{ overflow: "hidden", margin: "0 -32px" }}>
            <div
              style={{
                display: "flex", gap: 12, paddingLeft: 20,
                transform: `translateX(calc(-${active} * (100vw - 44px)))`,
                transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                willChange: "transform",
              }}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                  if (diff > 0) goTo(Math.min(active + 1, 2) as StepIndex, true);
                  else          goTo(Math.max(active - 1, 0) as StepIndex, true);
                }
              }}
            >
              {([0, 1, 2] as StepIndex[]).map((i) => (
                <div key={i} style={{ minWidth: "calc(100vw - 56px)", flexShrink: 0 }}>
                  <RitualCard step={i} mobile />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 18 }}>
            {STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx as StepIndex, true)}
                style={{
                  width: active === idx ? 24 : 8, height: 8, borderRadius: 4,
                  background: active === idx ? step.accent : "rgba(138,128,120,0.2)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Flow dots ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 36, opacity: 0.35 }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: active === i ? step.accent : "rgba(138,128,120,0.2)",
                  boxShadow: active === i ? `0 0 8px ${step.accent}80` : "none",
                  transition: "all 0.3s ease",
                }}
              />
              {i < 2 && (
                <div style={{ width: 40, height: 1, background: "rgba(138,128,120,0.15)" }} />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Card content ───────────────────────────────────────────────────────── */
function RitualCard({ step, mobile = false }: { step: StepIndex; mobile?: boolean }) {
  const pad = mobile ? "16px 18px" : "40px";
  const br  = mobile ? 16 : 24;
  const titleSize = mobile ? 18 : 28;
  const descSize  = mobile ? 12.5 : 16;

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
        <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#FFD166", marginBottom: 16 }}>
          Morning
        </span>
        <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: titleSize, color: "#2C2416", marginBottom: 12, lineHeight: 1.2, fontWeight: 400 }}>
          Set your intention
        </h3>
        <p style={{ fontSize: descSize, color: "rgba(139,115,85,0.6)", lineHeight: 1.75, marginBottom: 20, fontWeight: 300 }}>
          Before the noise begins, name one thing that matters today. A single sentence. An anchor for whatever comes next.
        </p>
        <div style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(139,115,85,0.1)", borderRadius: 12, padding: "12px 16px" }}>
          <p style={{ fontSize: mobile ? 12 : 14, color: "#8B7355", fontStyle: "italic", margin: 0 }}>
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
        <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B8F71", marginBottom: 16 }}>
          Throughout the Day
        </span>
        <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: titleSize, color: "#1C2E1D", marginBottom: 12, lineHeight: 1.2, fontWeight: 400 }}>
          Press record. Let it out.
        </h3>
        <p style={{ fontSize: descSize, color: "rgba(44,78,48,0.55)", lineHeight: 1.75, marginBottom: 20, fontWeight: 300 }}>
          Whenever something&rsquo;s on your mind, open the app and talk. Tag your mood when you&rsquo;re done.
        </p>
        {/* Waveform player */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.45)", border: "1px solid rgba(107,143,113,0.12)", borderRadius: 12, padding: "10px 16px" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#6B8F71", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <path d="M1 1L11 7L1 13V1Z" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, height: 32, overflow: "hidden" }}>
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
          <span style={{ fontSize: 12, color: "#8A8078", flexShrink: 0 }}>2:14</span>
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
        <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C77DFF", marginBottom: 16 }}>
          Evening
        </span>
        <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: titleSize, color: "#FFFFFF", marginBottom: 12, lineHeight: 1.2, fontWeight: 400 }}>
          Reflect and release
        </h3>
        <p style={{ fontSize: descSize, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 20, fontWeight: 300 }}>
          A gentle prompt to look back. What moved you? What are you carrying? What can you set down?
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 16px" }}>
          <p style={{ fontSize: mobile ? 12 : 14, color: "rgba(255,255,255,0.35)", fontStyle: "italic", margin: 0 }}>
            &ldquo;The pressure to have it all figured out&hellip;&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── SVG Tab Icons ──────────────────────────────────────────────────────── */
function TabSunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity={0.2} />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function TabMicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" fillOpacity={0.15} />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

function TabMoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity={0.15} />
    </svg>
  );
}
