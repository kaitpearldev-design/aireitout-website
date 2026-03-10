"use client";
import { useEffect } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DailyRituals from "@/components/DailyRituals";
import FeaturesInteractive from "@/components/FeaturesInteractive";

/* ── Scroll reveal ────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.06 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Data ─────────────────────────────────────────────────────────────── */
const freeFeatures = [
  "Unlimited voice recordings",
  "Morning Intention & Evening Reflection",
  "Mood tracking & calendar",
  "Streak counter & achievements",
  "Time Capsules (3, 6, or 12 months)",
  "Photos, notes & favorites",
  "App Lock (PIN, Face ID) & auto-wipe",
  "Daily reminders",
  "CSV export & single-entry PDF",
  "Share links with expiring access",
];

const proFeatures = [
  "Everything in Free",
  "Night Sky (monthly constellation, AI reflection & final thoughts)",
  "AI Reflections on every entry",
  "Voice transcription (audio → searchable text)",
  "Calm Breathing (3 guided patterns)",
  "Weekly AI Mood Insights with narrative",
  "Star Sessions (guided reflection + AI summary)",
  "Photo Album (flip through memories)",
  "Custom Time Capsules (any future date)",
  "Monthly memoir-style PDF export",
];


const privacyPoints = [
  {
    label: "AES-256 encryption at rest",
    desc: "All entries, audio, photos, and reflections encrypted with per-user keys.",
  },
  {
    label: "App Lock (PIN, Face ID)",
    desc: "Configurable lock timeout with biometric unlock. Auto-wipe deletes old entries on your schedule.",
  },
  {
    label: "Delete anytime",
    desc: "Delete your account and every trace of your data is permanently removed.",
  },
  {
    label: "Photos stay private",
    desc: "Your photos are never processed by AI — ever.",
  },
  {
    label: "No ads. No tracking.",
    desc: "Your journal is not a product. You are not the revenue.",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function Home() {
  useReveal();

  return (
    <>
      <Nav />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "92vh", paddingTop: 80 }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Orb */}
        <HeroOrb />

        {/* Text */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-6"
          style={{ maxWidth: 600 }}
        >
          <h1 className="sr-only">Voice Journal App with AI Reflections — Aire It Out</h1>

          <span
            className="hero-eyebrow block mb-5 font-semibold uppercase text-[#6B8F71]"
            style={{ fontSize: 13, letterSpacing: "2px" }}
          >
            Voice Journal
          </span>

          <p
            className="hero-headline mb-6"
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(42px, 7vw, 64px)",
              lineHeight: 1.1,
              color: "#2C3E2D",
            }}
          >
            Say it.{" "}
            <em style={{ color: "#4A7A52" }}>Feel it.</em>
            {" "}Let&nbsp;go.
          </p>

          <p
            className="hero-sub mb-10 leading-[1.8]"
            style={{
              fontSize: "clamp(16px, 2.5vw, 19px)",
              color: "rgba(44,62,45,0.65)",
              maxWidth: 460,
              fontWeight: 300,
            }}
          >
            A journal that starts with your voice. Everything else follows.
          </p>

          <div className="hero-badges mb-5">
            <StoreBadges centered />
          </div>

          <p
            className="hero-free"
            style={{ fontSize: 13, color: "rgba(138,128,120,0.7)", letterSpacing: "0.04em" }}
          >
            Free to download · iOS &amp; Android
          </p>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" aria-hidden="true">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── DAILY RITUALS ────────────────────────────────────────────────── */}
      <DailyRituals />

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <div id="features">
        <FeaturesInteractive />
      </div>

      {/* ── PRIVACY ─────────────────────────────────────────────────────── */}
      <section
        id="privacy"
        className="py-28 px-8 border-t border-[#1C1A17]/6"
        style={{ backgroundColor: "#1C1A17" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B8F71] mb-5">
              Privacy
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[clamp(2rem,4vw,3rem)] font-light text-[#FAF8F4] leading-tight mb-4"
            >
              Your journal.{" "}
              <em className="italic text-[#6B8F71]">Your rules.</em>
            </h2>
            <p className="text-[15px] text-[#FAF8F4]/45 leading-[1.8] max-w-lg mx-auto" style={{ fontWeight: 300 }}>
              Aire It Out is built to protect your thoughts — quietly, and by
              default. No opt-outs required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#FAF8F4]/6 reveal">
            {privacyPoints.map((p) => (
              <div
                key={p.label}
                className="bg-[#1C1A17] p-8 flex flex-col gap-3 hover:bg-[#242220] transition-colors duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#6B8F71] mb-1" />
                <p className="text-[13px] font-semibold text-[#FAF8F4] tracking-wide leading-snug">
                  {p.label}
                </p>
                <p className="text-[13px] text-[#FAF8F4]/40 leading-[1.75]" style={{ fontWeight: 300 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 px-8 border-t border-[#1C1A17]/6" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 reveal text-center">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B8F71] mb-5">
              Pricing
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[clamp(2rem,4vw,3.2rem)] font-light text-[#1C1A17] leading-tight mb-4"
            >
              Simple. Honest.{" "}
              <em className="italic text-[#6B8F71]">No surprises.</em>
            </h2>
            <p className="text-[15px] text-[#8A8078] leading-[1.8]" style={{ fontWeight: 300 }}>
              Start free. Upgrade when it feels right.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Free */}
            <div className="reveal border border-[#1C1A17]/10 rounded-3xl p-8 flex flex-col h-full bg-white">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#8A8078] mb-4">
                Free
              </p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-[3.8rem] font-light text-[#1C1A17] leading-none"
                >
                  $0
                </span>
                <span className="text-[#8A8078] text-[13px]">forever</span>
              </div>
              <p className="text-[13px] text-[#8A8078] mb-8" style={{ fontWeight: 300 }}>
                Everything you need to start speaking your truth.
              </p>
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] text-[#1C1A17]">
                    <CheckMark />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/#download"
                className="block text-center text-[13px] font-medium text-[#1C1A17] border border-[#1C1A17]/15 py-3.5 rounded-full hover:border-[#1C1A17]/30 hover:bg-[#FAF8F4] transition-all duration-200 tracking-wide"
              >
                Download Free
              </a>
            </div>

            {/* Pro */}
            <div className="reveal reveal-delay-1 bg-[#1C1A17] rounded-3xl p-8 flex flex-col h-full relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle, #FAF8F4 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#6B8F71]">
                  Pro
                </p>
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#6B8F71] border border-[#6B8F71]/35 px-3 py-1 rounded-full">
                  7-day free trial
                </span>
              </div>

              <div className="mb-2 relative z-10">
                <div className="flex items-baseline gap-1.5">
                  <span
                    style={{ fontFamily: "var(--font-cormorant)" }}
                    className="text-[3.8rem] font-light text-[#FAF8F4] leading-none"
                  >
                    $4.99
                  </span>
                  <span className="text-[#8A8078] text-[13px]">/month</span>
                </div>
                <p className="text-[13px] text-[#8A8078] mt-1.5">
                  or{" "}
                  <span className="text-[#FAF8F4] font-medium">$39.99/year</span>
                  <span className="ml-2 text-[11px] bg-[#6B8F71]/15 text-[#6B8F71] px-2 py-0.5 rounded-full">
                    save 33%
                  </span>
                </p>
              </div>

              <p className="text-[13px] text-[#FAF8F4]/35 mb-8 relative z-10" style={{ fontWeight: 300 }}>
                Unlimited reflections, deeper features, full Night Sky.
              </p>

              <ul className="flex flex-col gap-3 flex-1 mb-8 relative z-10">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] text-[#FAF8F4]">
                    <CheckMark light />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/#download"
                className="block text-center text-[13px] font-medium text-[#1C1A17] bg-[#FAF8F4] py-3.5 rounded-full hover:bg-white transition-all duration-200 tracking-wide relative z-10"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD CTA ────────────────────────────────────────────────── */}
      <section
        id="download"
        className="py-36 px-8 border-t border-[#1C1A17]/6 relative overflow-hidden"
        style={{ backgroundColor: "#F5F2EC" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(107,143,113,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="reveal">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B8F71] mb-6">
              Download
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[clamp(3rem,6vw,5rem)] font-light text-[#1C1A17] leading-[1.0] tracking-tight mb-6"
            >
              Ready to{" "}
              <em className="italic text-[#6B8F71]">Aire&nbsp;it&nbsp;out?</em>
            </h2>
            <p className="text-[16px] text-[#8A8078] leading-[1.85] mb-12" style={{ fontWeight: 300 }}>
              Your thoughts deserve a safe space. Free to download — always.
            </p>
          </div>

          <div className="reveal reveal-delay-1 flex justify-center mb-4">
            <StoreBadges centered />
          </div>

          <p className="reveal reveal-delay-1 text-[11px] text-[#8A8078]/45 tracking-wide mb-12">
            Requires iOS 16.0 or later · Android 8.0 or later
          </p>

          <p className="reveal reveal-delay-2 text-[11px] text-[#8A8078]/50 leading-[1.9] max-w-xl mx-auto">
            Aire It Out is a personal journaling tool and is not a medical
            device. AI-powered features are for reflection and awareness only
            and do not constitute mental health advice, diagnosis, or treatment.
            If you are in crisis, please contact the{" "}
            <strong className="font-medium">988 Suicide &amp; Crisis Lifeline</strong>{" "}
            (call or text 988) or your local emergency services. Subscriptions
            auto-renew unless cancelled at least 24 hours before the end of the
            current period.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ── Hero orb ─────────────────────────────────────────────────────────── */
function HeroOrb() {
  const waveHeights = Array.from({ length: 28 }, (_, i) =>
    Math.round(Math.sin(i * 0.5) * 8 + 10)
  );

  const particles: {
    top: string; left: string; size: number;
    type: "a" | "b"; dur: number; del: number;
  }[] = [
    { top: "15%", left: "20%", size: 4, type: "a", dur: 9,  del: 0   },
    { top: "25%", left: "78%", size: 3, type: "b", dur: 11, del: 1.5 },
    { top: "60%", left: "12%", size: 5, type: "a", dur: 8,  del: 0.8 },
    { top: "70%", left: "82%", size: 3, type: "b", dur: 10, del: 2.3 },
    { top: "10%", left: "55%", size: 4, type: "a", dur: 7,  del: 3.1 },
    { top: "80%", left: "40%", size: 3, type: "b", dur: 9,  del: 1.0 },
    { top: "45%", left: "5%",  size: 5, type: "a", dur: 11, del: 4.2 },
    { top: "88%", left: "65%", size: 4, type: "b", dur: 8,  del: 2.8 },
  ];

  return (
    <div
      className="absolute pointer-events-none"
      style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 700 }}
    >
      {/* Layer 1: Outer glow with clay crossfade */}
      <div className="orb-outer">
        <div className="orb-clay" />
      </div>

      {/* Layer 2: Blur glow */}
      <div className="orb-blur" />

      {/* Layer 3: Mid glow */}
      <div className="orb-mid" />

      {/* Ripple rings */}
      <div className="orb-ring orb-ring-1" />
      <div className="orb-ring orb-ring-2" />
      <div className="orb-ring orb-ring-3" />

      {/* Waveform */}
      <div className="orb-waveform">
        {waveHeights.map((h, i) => (
          <div
            key={i}
            className={`orb-wave-bar${i >= 18 ? " orb-wave-bar-extra" : ""}`}
            style={{ height: h, animationDelay: `${(i * 0.07).toFixed(2)}s` }}
          />
        ))}
      </div>

      {/* Layer 4: Core + specular */}
      <div className="orb-core">
        <div className="orb-specular" />
      </div>

      {/* Ambient particles (hidden on mobile via CSS) */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={`orb-particle orb-particle-${p.type}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            "--dur": `${p.dur}s`,
            "--del": `${p.del}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}



/* ── Store badges ─────────────────────────────────────────────────────── */
function StoreBadges({ centered }: { centered?: boolean }) {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 ${
        centered ? "items-center justify-center" : "items-start sm:items-center"
      }`}
    >
      <a
        href="https://apps.apple.com/app/aire-it-out-voice-journal/id6759711606"
        aria-label="Download on the App Store"
        className="inline-block transition-opacity duration-200 hover:opacity-75"
        style={{ lineHeight: 0 }}
      >
        <Image
          src="/badges/app-store-badge.svg"
          alt="Download on the App Store"
          width={144}
          height={48}
          style={{ height: 48, width: "auto" }}
          priority
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.aireitout.app"
        aria-label="Get it on Google Play"
        className="inline-block transition-opacity duration-200 hover:opacity-75"
        style={{ lineHeight: 0 }}
      >
        <Image
          src="/badges/google-play-badge.png"
          alt="Get it on Google Play"
          width={162}
          height={48}
          style={{ height: 48, width: "auto" }}
          priority
        />
      </a>
    </div>
  );
}

/* ── Check mark ───────────────────────────────────────────────────────── */
function CheckMark({ light }: { light?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle cx="7" cy="7" r="6.5" fill={light ? "rgba(107,143,113,0.15)" : "rgba(28,26,23,0.06)"} />
      <path
        d="M4.5 7l1.8 1.8 3.2-3.6"
        stroke={light ? "#6B8F71" : "#6B8F71"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
