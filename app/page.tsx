"use client";
import { useEffect } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  "AI Reflection (3 per day)",
  "10 mood colors + tracking",
  "Daily streaks & achievements",
  "Time Capsules (7, 30 & 90-day locks)",
  "Entry sharing with expiring links",
  "Night Sky (limited)",
  "App Lock (PIN, Face ID)",
  "CSV export + single-entry PDF",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited AI Reflections (one per entry, permanent)",
  "Voice transcription (audio → searchable text)",
  "Star Sessions (4 prompts + AI summary)",
  "Weekly Mood Insights with AI narrative",
  "Monthly Photo Album (vintage Polaroid-style)",
  "Custom Time Capsules (any future date)",
  "Wave Breathing (3 guided patterns)",
  "Full Night Sky",
  "Memoir-style PDF + monthly PDF export",
];

const features = [
  {
    tag: "AI · PRO",
    title: "Reflections that\nactually get it.",
    body: "Every voice entry is automatically transcribed. After saving, you receive one AI-written reflection — crafted from your words, mood, and notes. Not generic. Not templated. Yours.",
    accent: "AI Reflections",
  },
  {
    tag: "MEMORY",
    title: "Your words become\nstars.",
    body: "Every entry you save appears in your personal Night Sky — a living constellation of your moments. Watch it fill in. The Pro Sky reveals everything: color, mood, constellation clusters.",
    accent: "Night Sky",
  },
  {
    tag: "GROWTH · PRO",
    title: "Go deeper with\nStar Sessions.",
    body: "Choose a theme. Answer four guided voice prompts. When you're done, receive an AI-written synthesis of your whole session. It's like therapy homework you actually want to do.",
    accent: "Star Sessions",
  },
  {
    tag: "MEMORY",
    title: "Seal it. Open it\nwhen the time comes.",
    body: "Lock an entry to your future self — 7, 30, 90 days, or any custom date with Pro. When the date arrives, your entry reappears exactly as you left it. Nothing changes. Except you.",
    accent: "Time Capsules",
  },
];

const privacyPoints = [
  {
    label: "AES-256 encryption at rest",
    desc: "All entries, audio, photos, and reflections encrypted with per-user keys.",
  },
  {
    label: "PIN lock & Face ID",
    desc: "Configurable auto-lock: immediate, 1, 5, or 15 minutes.",
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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(107,143,113,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(107,143,113,0.05) 0%, transparent 60%)",
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div className="max-w-6xl mx-auto px-8 pt-28 pb-20 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            {/* Left */}
            <div>
              <div className="reveal reveal-delay-1 inline-flex items-center gap-2 mb-8">
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B8F71]">
                  Voice Journal
                </span>
              </div>

              <h1 className="sr-only">Voice Journal App with AI Reflections — Aire It Out</h1>
              <p
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="reveal reveal-delay-1 text-[clamp(3.6rem,6vw,5.5rem)] font-light text-[#1C1A17] leading-[0.95] tracking-tight mb-6"
              >
                Say it.{" "}
                <em className="italic text-[#6B8F71]">Feel it.</em>
                <br />
                Let&nbsp;go.
              </p>

              <div className="reveal reveal-delay-2 mb-7">
                <WaveDecoration />
              </div>

              <p className="reveal reveal-delay-2 text-[16px] text-[#8A8078] leading-[1.85] mb-10 max-w-[380px]" style={{ fontWeight: 300 }}>
                Speak freely — receive a reflection that actually gets it.
              </p>

              <div className="reveal reveal-delay-3 mb-8">
                <StoreBadges />
              </div>

              <p className="reveal reveal-delay-3 text-[13px] text-[#8A8078]/70 tracking-wide">
                Free to download · iOS &amp; Android
              </p>
            </div>

            {/* Right — phone mockup */}
            <div className="reveal reveal-delay-2 flex justify-center lg:justify-end">
              <PhoneMockupHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── DAILY RITUALS ────────────────────────────────────────────────── */}
      <section className="py-28 px-8 border-t border-[#1C1A17]/6" style={{ backgroundColor: "#F5F2EC" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 reveal">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B8F71] mb-5">
              Daily Rituals
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[clamp(2.2rem,4vw,3.2rem)] font-light text-[#1C1A17] leading-tight"
            >
              Two quiet moments.{" "}
              <em className="italic text-[#6B8F71]">One reset.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Morning */}
            <RitualCard
              icon={<SunIcon />}
              tag="Free"
              title="Morning Intention"
              desc="Before the noise begins, name one thing that matters today. A single sentence. An anchor for whatever comes next."
              delay=""
            />
            {/* Wave Breathing — elevated center */}
            <div
              className="lift-card reveal reveal-delay-1 bg-[#1C1A17] flex flex-col gap-5 p-10 relative overflow-hidden"
              style={{
                borderRadius: 20,
                boxShadow: "0 32px 80px rgba(28,26,23,0.18)",
                transform: "translateY(-20px)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(circle, #FAF8F4 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="flex items-center justify-between relative z-10">
                <div className="relative flex items-center justify-center w-10 h-10">
                  <div className="breathing-ring absolute w-10 h-10 rounded-full bg-[#6B8F71]/20" />
                  <div className="relative w-10 h-10 rounded-full border border-[#6B8F71]/40 flex items-center justify-center text-[#6B8F71]">
                    <WaveBreathIcon />
                  </div>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#6B8F71] border border-[#6B8F71]/35 px-2.5 py-1 rounded-full">
                  Pro
                </span>
              </div>
              <div className="relative z-10">
                <h3
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-[1.4rem] font-semibold text-[#FAF8F4] mb-3"
                >
                  Wave Breathing
                </h3>
                <p className="text-[14px] text-[#FAF8F4]/55 leading-[1.85]" style={{ fontWeight: 300 }}>
                  When you need to reset, three calming patterns guide you back
                  — 4-7-8 Calm, Box Breathing, and Quick Calm.
                </p>
              </div>
            </div>
            {/* Evening */}
            <RitualCard
              icon={<MoonIcon />}
              tag="Free"
              title="Evening Reflection"
              desc="A gentle prompt to look back. What moved you? What are you carrying? What can you set down?"
              delay="reveal-delay-2"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section id="features" className="border-t border-[#1C1A17]/6" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="max-w-5xl mx-auto px-8 pt-28 pb-14 text-center reveal">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B8F71] mb-5">
            Features
          </p>
          <h2
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-light text-[#1C1A17] leading-tight mb-4"
          >
            Everything you need to{" "}
            <em className="italic text-[#6B8F71]">feel heard.</em>
          </h2>
          <p className="text-[15px] text-[#8A8078] leading-[1.8]">
            Built around privacy, calm, and the moments that matter most.
          </p>
        </div>

        {features.map((f, i) => {
          const isEven = i % 2 === 1;
          return (
            <div key={f.title} className="border-t border-[#1C1A17]/6">
              <div className="max-w-6xl mx-auto px-8 py-28">
                <div
                  className={`flex flex-col gap-16 items-center ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Text */}
                  <div className="flex-1 reveal">
                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6B8F71] mb-5 flex items-center gap-3">
                      {f.tag}
                    </p>
                    <h3
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="text-[clamp(2.2rem,4vw,3rem)] font-light text-[#1C1A17] leading-[1.1] mb-6 whitespace-pre-line"
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-[16px] text-[#8A8078] leading-[1.9] max-w-[400px] mb-8"
                      style={{ fontWeight: 300 }}
                    >
                      {f.body}
                    </p>
                    <div className="inline-flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B8F71]" />
                      <span
                        style={{ fontFamily: "var(--font-cormorant)" }}
                        className="text-[1.05rem] italic text-[#6B8F71]"
                      >
                        {f.accent}
                      </span>
                    </div>
                  </div>

                  {/* Decorative phone */}
                  <div className="reveal reveal-delay-1 flex-shrink-0 flex justify-center">
                    <PhoneMockupFeature index={i} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

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

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Free */}
            <div className="reveal border border-[#1C1A17]/10 rounded-3xl p-8 flex flex-col bg-white">
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
            <div className="reveal reveal-delay-1 bg-[#1C1A17] rounded-3xl p-8 flex flex-col relative overflow-hidden">
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

/* ── Phone mockup — Hero ──────────────────────────────────────────────── */
function PhoneMockupHero() {
  return (
    <div className="relative" style={{ width: 250 }}>
      <div className="absolute inset-[-20%] bg-[#6B8F71]/10 blur-3xl rounded-full pointer-events-none" />
      <div
        className="relative rounded-[44px] overflow-hidden border-[6px] border-[#1C1A17]"
        style={{
          aspectRatio: "9/19.5",
          background: "linear-gradient(160deg, #EDE9E2 0%, #E3DDD6 50%, #DAD4CC 100%)",
          boxShadow: "0 30px 80px rgba(28,26,23,0.14), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        {/* Status bar */}
        <div className="absolute top-4 inset-x-0 flex justify-between px-6">
          <div className="h-1.5 w-8 rounded-full bg-[#1C1A17]/15" />
          <div className="flex gap-1 items-center">
            <div className="w-1 h-1 rounded-full bg-[#1C1A17]/20" />
            <div className="w-1 h-1 rounded-full bg-[#1C1A17]/20" />
            <div className="w-3 h-1.5 rounded-full bg-[#1C1A17]/20" />
          </div>
        </div>

        <div className="absolute inset-x-5 top-11 flex flex-col gap-2.5">
          {/* Header */}
          <div className="flex justify-between items-center mb-1">
            <div className="h-2 w-20 rounded-full bg-[#1C1A17]/18" />
            <div className="w-7 h-7 rounded-full bg-[#6B8F71]/25" />
          </div>
          {/* Mood strip */}
          <div className="h-9 w-full rounded-2xl bg-[#6B8F71]/10 flex items-center px-3 gap-2">
            <div className="w-4 h-4 rounded-full bg-[#6B8F71]/35" />
            <div className="h-1.5 w-14 rounded-full bg-[#1C1A17]/12" />
            <div className="ml-auto h-1.5 w-10 rounded-full bg-[#1C1A17]/8" />
          </div>
          {/* Entry card 1 */}
          <div className="h-20 w-full rounded-2xl bg-white/40 p-3 flex flex-col gap-1.5">
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-[#6B8F71]/30" />
              <div className="h-1.5 w-16 rounded-full bg-[#1C1A17]/18" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#1C1A17]/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-[#1C1A17]/8" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#1C1A17]/6" />
          </div>
          {/* Entry card 2 */}
          <div className="h-14 w-full rounded-2xl bg-white/25 p-3 flex flex-col gap-1.5">
            <div className="flex gap-2 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#8A8078]/25" />
              <div className="h-1.5 w-12 rounded-full bg-[#1C1A17]/14" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#1C1A17]/8" />
            <div className="h-1.5 w-3/4 rounded-full bg-[#1C1A17]/6" />
          </div>
          {/* Entry card 3 */}
          <div className="h-11 w-full rounded-2xl bg-white/18 p-3 flex flex-col gap-1.5">
            <div className="h-1.5 w-14 rounded-full bg-[#1C1A17]/12" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#1C1A17]/7" />
          </div>
        </div>

        {/* Record button */}
        <div className="absolute inset-x-5 bottom-7">
          <div className="h-12 w-full rounded-2xl bg-[#6B8F71]/18 flex items-center justify-center gap-2.5 border border-[#6B8F71]/15">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6B8F71]/60" />
            <div className="flex gap-0.5 items-end">
              {[5, 9, 14, 10, 18, 12, 20, 14, 16, 8, 18, 12].map((h, i) => (
                <div key={i} className="w-1 rounded-full bg-[#6B8F71]/40" style={{ height: h }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-[#1C1A17]/8 blur-2xl rounded-full" />
    </div>
  );
}

/* ── Phone mockup — Features ──────────────────────────────────────────── */
function PhoneMockupFeature({ index }: { index: number }) {
  const themes = [
    // AI Reflections — green tint
    { bg: "linear-gradient(150deg, #E8EDE9 0%, #DDE5DE 60%, #D5DDD6 100%)", accent: "#6B8F71" },
    // Night Sky — deep dark
    { bg: "linear-gradient(160deg, #1C1A17 0%, #252220 50%, #1A1917 100%)", accent: "#6B8F71" },
    // Star Sessions — warm
    { bg: "linear-gradient(155deg, #EDE8E0 0%, #E5DDD4 55%, #DDD5CB 100%)", accent: "#8A8078" },
    // Time Capsules — cool
    { bg: "linear-gradient(165deg, #E9ECE8 0%, #E1E5DF 55%, #D9DDD7 100%)", accent: "#6B8F71" },
  ];

  const t = themes[index % themes.length];
  const isDark = index === 1;

  return (
    <div className="relative" style={{ width: 240 }}>
      <div
        className="rounded-[40px] overflow-hidden border-[6px] border-[#1C1A17]"
        style={{
          aspectRatio: "9/19.5",
          background: t.bg,
          boxShadow: "0 24px 60px rgba(28,26,23,0.12)",
        }}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-[#1C1A17]/20" />
        <div className="absolute inset-x-5 top-10 flex flex-col gap-3">
          <div
            className="h-2 w-24 rounded-full"
            style={{ background: isDark ? "rgba(250,248,244,0.15)" : "rgba(28,26,23,0.15)" }}
          />
          <div
            className="h-1.5 w-16 rounded-full"
            style={{ background: isDark ? "rgba(250,248,244,0.08)" : "rgba(28,26,23,0.08)" }}
          />

          {/* Content blocks */}
          <div className="flex flex-col gap-2 mt-2">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="rounded-2xl p-3 flex flex-col gap-1.5"
                style={{
                  background: isDark
                    ? "rgba(250,248,244,0.05)"
                    : "rgba(255,255,255,0.45)",
                  height: j === 1 ? 64 : j === 2 ? 48 : 36,
                }}
              >
                <div
                  className="h-1.5 w-full rounded-full"
                  style={{ background: isDark ? "rgba(250,248,244,0.1)" : "rgba(28,26,23,0.1)" }}
                />
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${70 + j * 8}%`,
                    background: isDark ? "rgba(250,248,244,0.07)" : "rgba(28,26,23,0.07)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Accent element */}
          <div
            className="rounded-2xl flex items-center justify-center mt-1"
            style={{
              height: 40,
              background: `${t.accent}${isDark ? "25" : "18"}`,
              border: `1px solid ${t.accent}25`,
            }}
          >
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ background: `${t.accent}50` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Ritual card ──────────────────────────────────────────────────────── */
function RitualCard({
  icon,
  tag,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode;
  tag: string;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className={`lift-card reveal ${delay} bg-white flex flex-col gap-5 p-10`}
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(28,26,23,0.06)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full border border-[#6B8F71]/25 flex items-center justify-center text-[#6B8F71]">
          {icon}
        </div>
        <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#6B8F71] border border-[#6B8F71]/30 px-2.5 py-1 rounded-full">
          {tag}
        </span>
      </div>
      <div>
        <h3
          style={{ fontFamily: "var(--font-cormorant)" }}
          className="text-[1.35rem] font-semibold text-[#1C1A17] mb-3"
        >
          {title}
        </h3>
        <p className="text-[14px] text-[#8A8078] leading-[1.85]" style={{ fontWeight: 300 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ── Waveform decoration ──────────────────────────────────────────────── */
function WaveDecoration() {
  const heights = [4, 8, 14, 10, 18, 12, 20, 14, 16, 8, 18, 12, 10, 16, 6];
  return (
    <svg
      width={heights.length * 10}
      height="28"
      viewBox={`0 0 ${heights.length * 10} 28`}
      fill="none"
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 10}
          y={(28 - h) / 2}
          width="5"
          height={h}
          rx="2.5"
          fill="#6B8F71"
          opacity={0.18 + (i / heights.length) * 0.3}
        />
      ))}
    </svg>
  );
}

/* ── Wave breath icon ────────────────────────────────────────────────── */
function WaveBreathIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12c1.5-3 3-4.5 4.5-4.5S9 9 10.5 12s3 4.5 4.5 4.5S18 15 19.5 12 21 7.5 22 7.5" />
    </svg>
  );
}

/* ── Sun icon ─────────────────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
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

/* ── Moon icon ────────────────────────────────────────────────────────── */
function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
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
