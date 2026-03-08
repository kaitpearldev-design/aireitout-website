"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ── Data ─────────────────────────────────────────────────────────────── */
const sections = [
  {
    title: "Recording & Entries",
    items: [
      {
        q: "How do I record a voice entry?",
        a: "Tap the microphone button on the home screen to start recording. Speak freely — there's no time limit, on Free or Pro. When you're done, tap the stop button. Your entry is saved with the date, time, and any mood you choose. Pro users will see their audio automatically transcribed into searchable text.",
      },
      {
        q: "Can I edit an entry after saving?",
        a: "You can edit the written notes attached to any entry at any time. Voice recordings themselves can't be re-recorded after saving, but Pro users can manually trigger a fresh transcription of the audio from the entry detail screen whenever they like.",
      },
      {
        q: "How do I add a photo to an entry?",
        a: "Open any entry and tap the photo icon to attach a photo. Each entry supports one photo. To swap it out, remove the existing one and add a new one. Photos are stored securely and are visible only to you — unless you choose to share the entry. Photos are never processed by AI.",
      },
      {
        q: "How do favorites work?",
        a: "Tap the heart icon on any entry to favorite it. Favorited entries are easy to find and, importantly, they're protected from Auto-Wipe — so the entries that matter most to you stay safe.",
      },
      {
        q: "Can I change the playback speed?",
        a: "Yes. While playing back a voice entry, tap the speed button to cycle through 1×, 1.5×, and 2× playback speeds.",
      },
      {
        q: "Can I log an entry for a different date?",
        a: "Yes. Use the date picker when creating an entry to log it for any past or future date — not just today.",
      },
    ],
  },
  {
    title: "Daily Check-ins",
    items: [
      {
        q: "What are Morning Intention and Evening Reflection?",
        a: "These are two daily guided check-ins built into every account, free and Pro. Morning Intention gives you a gentle prompt to set your tone for the day. Evening Reflection invites you to look back at how it went. Both are voice-first, and both count toward your daily streak.",
      },
      {
        q: "Can I set reminders for my check-ins?",
        a: "Yes. Go to Settings → Notifications to choose separate reminder times for your Morning Intention and Evening Reflection. You can also customize your overall reminder frequency and message style.",
      },
    ],
  },
  {
    title: "Mood & Streaks",
    items: [
      {
        q: "What moods can I log?",
        a: "There are 10 mood colors to choose from: Happy, Calm, Grateful, Reflective, Hopeful, Neutral, Tired, Stressed, Sad, and Anxious. Each mood has its own color, and your choices build into a visual mood history over time.",
      },
      {
        q: "Can I change an entry's mood after saving?",
        a: "Yes — open the entry, tap the mood badge, and pick a new one. You can update an entry's mood at any time.",
      },
      {
        q: "How does the streak work?",
        a: "Your streak counts consecutive days where you've saved at least one entry. Morning Intention entries count. Miss a day and your streak resets to zero — but your entries and history stay exactly where they are.",
      },
      {
        q: "What are Achievements?",
        a: "Achievements are milestones you earn as you journal — things like total entries logged, streak length, mood variety, breathing sessions, and full journaling months. Each one has a progress bar so you can see how close you are.",
      },
    ],
  },
  {
    title: "Free vs Pro",
    items: [
      {
        q: "What's included for free?",
        a: "Quite a lot. Free includes: unlimited voice recordings · Morning Intention and Evening Reflection daily check-ins · AI Reflection (3 per day, based on your words, mood, and notes) · 10 mood colors and tracking · Daily streaks and achievements · Time Capsules (7, 30, and 90-day locks) · Entry sharing with expiring links · Night Sky (limited view) · App Lock (PIN, Face ID, fingerprint) · Photos on entries · Favorites · Daily reminders · CSV export and single-entry PDF.",
      },
      {
        q: "What does Pro unlock?",
        a: "Pro ($4.99/month or $39.99/year, with a 7-day free trial) gives you everything in Free, plus: unlimited AI Reflections — one permanent reflection per entry · Voice transcription (audio becomes searchable text) · Star Sessions (choose a theme, answer 4 guided voice prompts, receive an AI-written synthesis) · Weekly Mood Insights (an AI narrative of your emotional week with stats) · Guided Reflection Prompts (30 prompts across 6 themes) · Wave Breathing (3 guided patterns) · Monthly Photo Album (vintage Polaroid-style, shareable) · Custom Time Capsules (any future date you choose) · Full Night Sky · Memoir-style full PDF export · Monthly PDF export with mood-colored entry pages.",
      },
      {
        q: "Is there a free trial for Pro?",
        a: "Yes — Pro comes with a 7-day free trial. You can cancel before the trial ends and you won't be charged.",
      },
      {
        q: "How do I manage my subscription?",
        a: "On iOS: go to Settings → Apple ID → Subscriptions → Aire It Out. On Android: go to Google Play → Profile → Payments & Subscriptions → Subscriptions → Aire It Out. You can cancel anytime. Your Pro access continues until the end of the current billing period.",
      },
    ],
  },
  {
    title: "Pro Features",
    items: [
      {
        q: "What is Voice Transcription?",
        a: "Voice Transcription automatically converts your recorded audio into text when you save an entry. The text becomes searchable and is what the AI uses when generating reflections. Pro users can also manually re-transcribe any entry at any time from the entry detail screen. Your audio is not retained by our transcription provider after processing.",
      },
      {
        q: "What are AI Reflections?",
        a: "After saving an entry, Aire It Out generates a short, thoughtful reflection based on your words, mood, and notes. On the free plan, you get 3 AI Reflections per day. With Pro, you get one permanent AI Reflection per entry — it lives on the entry detail screen and is always there when you want to look back. Photos and raw audio are never sent to the AI.",
      },
      {
        q: "What are Star Sessions?",
        a: "Star Sessions are guided deep-reflection experiences. Choose a theme, then answer 4 voice prompts one at a time. When you finish, Aire It Out weaves everything you said into an AI-written synthesis. They're ideal for working through something difficult, marking a milestone, or going somewhere deeper than a regular entry.",
      },
      {
        q: "What are Weekly Mood Insights?",
        a: "Each week, Aire It Out puts together a mood breakdown — your emotional patterns, top moods, streak data, and an AI-written narrative of how your week felt. Morning Intention data is included alongside your regular entries. You can refresh your Insights up to 2 times per week.",
      },
      {
        q: "What are Guided Reflection Prompts?",
        a: "30 thoughtfully written prompts across 6 themes to help you find something to say when you're not sure where to start: Gratitude · Shadow Work · Processing Emotions · Self-Awareness · Looking Forward · Relationships.",
      },
      {
        q: "What is Wave Breathing?",
        a: "Wave Breathing is a guided breathwork feature with three patterns: 4-7-8 Calm (inhale 4 seconds, hold 7, exhale 8 — good for anxiety and winding down before sleep), Box Breathing (inhale 4, hold 4, exhale 4, hold 4 — good for focus and stress), and Quick Calm (a shorter pattern for moments when you need fast relief).",
      },
      {
        q: "What is the Monthly Photo Album?",
        a: "A dedicated gallery that collects all photos attached to your entries, displayed in a vintage Polaroid-style grid. Browse by month and tap any photo to open the entry it belongs to. The album is shareable.",
      },
      {
        q: "Is Aire It Out a therapy app?",
        a: "No. Aire It Out is a personal journaling tool for reflection and processing your thoughts. It's not a licensed mental health service, doesn't provide medical advice, and isn't a substitute for professional therapy or treatment. If you're in crisis or need support, please see the resources below.",
      },
    ],
  },
  {
    title: "Time Capsules",
    items: [
      {
        q: "What are Time Capsules?",
        a: "Time Capsules let you seal an entry so it's locked and hidden until a future date — like writing a letter to your future self. Free users can seal entries for 7, 30, or 90 days. Pro users can choose any custom future date they like.",
      },
      {
        q: "What happens when a Time Capsule unlocks?",
        a: "When the unlock date arrives, you'll get a notification that your capsule is ready. Open it to read your past entry. From there you can save it to your journal, reseal it for another period, or let it go.",
      },
      {
        q: "Are Time Capsules protected from Auto-Wipe?",
        a: "Yes. Sealed Time Capsules are safe from Auto-Wipe, alongside your Favorited entries. They'll be waiting for you when they open.",
      },
    ],
  },
  {
    title: "Night Sky",
    items: [
      {
        q: "What is the Night Sky?",
        a: "The Night Sky is a visual map of your journal — each entry becomes a star, forming a personal constellation that grows with you over time. Free users see a limited view. Pro unlocks the full sky: every entry, every star, the complete picture of everything you've written.",
      },
    ],
  },
  {
    title: "Sharing & Export",
    items: [
      {
        q: "How do I share an entry?",
        a: "Open any entry and tap the Share button. Aire It Out generates a secure, expiring link you can send to anyone. You choose how long the link is valid: view once, 1 hour, 24 hours, or 7 days.",
      },
      {
        q: "Can I revoke a shared link?",
        a: "Yes. Go to the entry, tap Share, and revoke the link at any time. Once revoked, it stops working for anyone who has it.",
      },
      {
        q: "How do I export my entries?",
        a: "Single Entry PDF (Free) — open any entry and tap Export to save a formatted PDF of that entry. CSV Export (Free) — download all your entries as a spreadsheet including date, mood, transcript, and notes. Memoir-style Full PDF Export (Pro) — export your entire journal as a beautifully formatted document with a cover page, chapter dividers, photos, transcripts, and AI reflections. Monthly PDF Export (Pro) — export a single month as a formatted PDF with a cover page and mood-colored entry pages.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        q: "Is my data private?",
        a: "Yes. Your journal entries are encrypted at rest using AES-256 encryption with per-user keys. Everything travels over TLS/SSL. Your entries are never sold, shared with advertisers, or used for anything beyond operating the app. There are no ads and no tracking.",
      },
      {
        q: "How does App Lock work?",
        a: "Set a PIN in Settings to lock the app. You can also enable Face ID or fingerprint unlock. You can configure how long the app waits before locking: immediately, after 1 minute, after 5 minutes, or after 15 minutes.",
      },
      {
        q: "What is Auto-Wipe?",
        a: "Auto-Wipe automatically erases your journal data after a period of inactivity you define — 7, 30, or 90 days. Favorited entries and sealed Time Capsules are always protected. You'll receive a warning before any wipe occurs.",
      },
      {
        q: "Are my photos ever used by AI?",
        a: "Never. Photos are stored securely and are only ever visible to you (or someone you choose to share an entry with). They are not processed by, sent to, or used by any AI system.",
      },
      {
        q: "What happens when I delete my account?",
        a: "Deleting your account permanently removes all your entries, recordings, photos, Time Capsules, and account data. Deletion is processed within 30 days and cannot be undone.",
      },
    ],
  },
  {
    title: "Reminders & Account",
    items: [
      {
        q: "How do daily reminders work?",
        a: "Go to Settings → Notifications to set a daily reminder time. You can set your reminder frequency, message style, and separate times for your Morning Intention prompt and Evening Reflection notification.",
      },
      {
        q: "How do I change my password?",
        a: "Go to Settings → Account → Change Password. You'll receive a password reset email at your registered address.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings → Account → Delete Account. This permanently removes all your data. It cannot be undone.",
      },
      {
        q: "What platforms is Aire It Out available on?",
        a: "Aire It Out is available on iOS 16.0 and later, and Android 8.0 and later.",
      },
    ],
  },
];

/* ── Component ────────────────────────────────────────────────────────── */
export default function HelpPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <Nav />
      <main className="pt-28 pb-28 px-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6B8F71] mb-5 block">
              Help Center
            </span>
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[clamp(3rem,7vw,5rem)] font-light text-[#1C1A17] leading-[0.95] tracking-tight mb-6"
            >
              How can we help?
            </h1>
            <p className="text-[15px] text-[#8A8078] leading-relaxed">
              Browse answers below or{" "}
              <a href="mailto:support@aireitout.app" className="text-[#1C1A17] underline underline-offset-2 decoration-[#1C1A17]/20 hover:decoration-[#1C1A17]/60 transition-all">
                email us
              </a>{" "}
              — we typically respond within 1–2 business days.
            </p>
          </div>

          {/* Section nav */}
          <div className="flex flex-wrap gap-2 mb-14">
            {sections.map((s) => (
              <button
                key={s.title}
                onClick={() => {
                  const el = document.getElementById(slugify(s.title));
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="text-[12px] text-[#8A8078] hover:text-[#1C1A17] border border-[#1C1A17]/10 hover:border-[#1C1A17]/25 px-3.5 py-1.5 rounded-full transition-all duration-200"
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-14">
            {sections.map((section) => (
              <div key={section.title} id={slugify(section.title)}>
                <h2
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-[1.6rem] font-semibold text-[#1C1A17] mb-4 pb-4 border-b border-[#1C1A17]/8"
                >
                  {section.title}
                </h2>
                <div className="flex flex-col">
                  {section.items.map((item) => (
                    <Accordion
                      key={item.q}
                      question={item.q}
                      answer={item.a}
                      isOpen={activeSection === item.q}
                      onToggle={() => setActiveSection(activeSection === item.q ? null : item.q)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Crisis Resources */}
            <div id="crisis-resources">
              <h2
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-[1.6rem] font-semibold text-[#1C1A17] mb-4 pb-4 border-b border-[#1C1A17]/8"
              >
                Crisis Resources
              </h2>
              <div className="bg-[#1C1A17] rounded-2xl p-8 flex flex-col gap-6">
                <p className="text-[14px] text-[#8A8078] leading-relaxed">
                  If you&apos;re struggling, please reach out. You don&apos;t have to carry it alone.
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      name: "988 Suicide & Crisis Lifeline",
                      detail: "Call or text 988 — available 24/7 in the US",
                    },
                    {
                      name: "Crisis Text Line",
                      detail: "Text HOME to 741741 — available 24/7",
                    },
                    {
                      name: "International Resources",
                      detail: "Visit findahelpline.com to find crisis support in your country",
                    },
                    {
                      name: "Emergency Services",
                      detail: "If you or someone else is in immediate danger, call 911 (US) or your local emergency number.",
                    },
                  ].map((r) => (
                    <div key={r.name} className="flex gap-4">
                      <div className="w-px bg-[#6B8F71]/40 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#FAF8F4] mb-0.5">{r.name}</p>
                        <p className="text-[13px] text-[#8A8078] leading-relaxed">{r.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Still need help */}
            <div className="border-t border-[#1C1A17]/8 pt-12 text-center">
              <p
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-[1.35rem] text-[#1C1A17] mb-3"
              >
                Still need help?
              </p>
              <p className="text-[14px] text-[#8A8078] mb-6 leading-relaxed">
                We typically respond within 1–2 business days.
              </p>
              <a
                href="mailto:support@aireitout.app"
                className="inline-flex text-sm font-medium text-[#FAF8F4] bg-[#1C1A17] px-6 py-3 rounded-full hover:bg-[#2e2b26] transition-all duration-200 tracking-wide"
              >
                support@aireitout.app
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── Accordion ────────────────────────────────────────────────────────── */
function Accordion({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#1C1A17]/8 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
      >
        <span className="text-[14.5px] text-[#1C1A17] leading-snug font-medium group-hover:text-[#1C1A17] transition-colors">
          {question}
        </span>
        <span
          className="flex-shrink-0 mt-0.5 transition-transform duration-300 text-[#8A8078]"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "600px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-[13.5px] text-[#8A8078] leading-[1.8] pb-6 pr-8">{answer}</p>
      </div>
    </div>
  );
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
