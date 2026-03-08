"use client";

import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

/* ── Types ────────────────────────────────────────────────────────────── */
interface EntryData {
  title?: string;
  date?: { seconds: number } | string;
  mood?: string;
  audioUrl?: string;
  transcript?: string;
  notes?: string;
}

interface Drop {
  expiresAt?: { seconds: number };
  view_once?: boolean;
  viewCount?: number;
  entryData?: EntryData;
}

type State = "loading" | "valid" | "expired";

/* ── Mood colours ─────────────────────────────────────────────────────── */
const moodColors: Record<string, string> = {
  Happy:      "#F6C84B",
  Calm:       "#7BB5C8",
  Grateful:   "#6B8F71",
  Reflective: "#9B8BB4",
  Hopeful:    "#E8A87C",
  Neutral:    "#A8A49E",
  Tired:      "#8FA3B1",
  Stressed:   "#D4856A",
  Sad:        "#7A9CC4",
  Anxious:    "#C4906A",
};

/* ── Helpers ──────────────────────────────────────────────────────────── */
function formatDate(raw?: { seconds: number } | string): string {
  if (!raw) return "";
  const ms = typeof raw === "string" ? Date.parse(raw) : raw.seconds * 1000;
  return new Date(ms).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

function expiryLabel(drop: Drop): string {
  if (drop.view_once) return "View once link";
  if (!drop.expiresAt) return "";
  const ms = drop.expiresAt.seconds * 1000 - Date.now();
  const hours = Math.floor(ms / 36e5);
  if (hours < 1) return "Expires in less than an hour";
  if (hours < 24) return `Expires in ${hours} hour${hours !== 1 ? "s" : ""}`;
  const days = Math.floor(hours / 24);
  return `Expires in ${days} day${days !== 1 ? "s" : ""}`;
}

/* ── Audio player ─────────────────────────────────────────────────────── */
function AudioPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    playing ? a.pause() : a.play();
    setPlaying(!playing);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-4 py-4">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />

      {/* Play / pause */}
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity duration-150 hover:opacity-80"
        style={{ backgroundColor: "#6B8F71" }}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Progress */}
      <div className="flex-1 flex flex-col gap-1.5">
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={progress}
          onChange={seek}
          className="audio-slider w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: "#6B8F71" }}
        />
        <div className="flex justify-between text-[11px] text-[#8A8078]/60">
          <span>{fmt(progress)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [state, setState] = useState<State>("loading");
  const [drop, setDrop] = useState<Drop | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const ref = doc(db, "drops", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) { setState("expired"); return; }

        const data = snap.data() as Drop;

        // Check expiry
        if (data.expiresAt && data.expiresAt.seconds * 1000 < Date.now()) {
          setState("expired"); return;
        }

        // Check view_once
        if (data.view_once && (data.viewCount ?? 0) >= 1) {
          setState("expired"); return;
        }

        // Increment view count
        await updateDoc(ref, { viewCount: increment(1) });

        setDrop(data);
        setState("valid");
      } catch {
        setState("expired");
      }
    }
    load();
  }, [id]);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start px-5 py-12"
      style={{ backgroundColor: "#FAF8F4", fontFamily: "'Jost', sans-serif" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-10">
        <Image src="/aire-logo.png" alt="Aire It Out" width={28} height={28} className="object-contain" />
        <span
          className="text-[20px] font-medium tracking-wide text-[#1C1A17]"
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
        >
          Aire It Out
        </span>
      </Link>

      {state === "loading" && <LoadingState />}
      {state === "expired" && <ExpiredState />}
      {state === "valid" && drop && <ValidState drop={drop} />}
    </main>
  );
}

/* ── Loading ──────────────────────────────────────────────────────────── */
function LoadingState() {
  return (
    <div className="w-full max-w-[480px] flex flex-col gap-3 animate-pulse">
      <div className="bg-white rounded-[20px] p-8" style={{ boxShadow: "0 4px 24px rgba(28,26,23,0.07)" }}>
        <div className="h-3 w-24 rounded-full bg-[#1C1A17]/8 mb-6" />
        <div className="h-7 w-3/4 rounded-full bg-[#1C1A17]/8 mb-3" />
        <div className="h-3 w-1/3 rounded-full bg-[#1C1A17]/6 mb-8" />
        <div className="h-3 w-full rounded-full bg-[#1C1A17]/6 mb-2" />
        <div className="h-3 w-4/5 rounded-full bg-[#1C1A17]/5" />
      </div>
    </div>
  );
}

/* ── Expired / invalid ────────────────────────────────────────────────── */
function ExpiredState() {
  return (
    <div className="w-full max-w-[480px]">
      <div
        className="bg-white rounded-[20px] p-8 flex flex-col items-center text-center gap-5"
        style={{ boxShadow: "0 4px 24px rgba(28,26,23,0.07)" }}
      >
        <div className="w-12 h-12 rounded-full border border-[#1C1A17]/10 flex items-center justify-center text-[#8A8078]/50">
          <LockIcon />
        </div>
        <div>
          <p
            className="text-[1.25rem] font-semibold text-[#1C1A17] mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            This entry is no longer available
          </p>
          <p className="text-[13px] text-[#8A8078] leading-[1.8]">
            This link has expired or has already been viewed.
          </p>
        </div>
        <div className="w-full pt-2 border-t border-[#1C1A17]/6">
          <CTABlock />
        </div>
      </div>
    </div>
  );
}

/* ── Valid entry ──────────────────────────────────────────────────────── */
function ValidState({ drop }: { drop: Drop }) {
  const entry = drop.entryData ?? {};
  const moodColor = moodColors[entry.mood ?? ""] ?? "#A8A49E";
  const label = expiryLabel(drop);

  return (
    <div className="w-full max-w-[480px] flex flex-col gap-4">
      {/* Entry card */}
      <div
        className="bg-white rounded-[20px] p-8 flex flex-col gap-5"
        style={{ boxShadow: "0 4px 24px rgba(28,26,23,0.07)" }}
      >
        {/* Expiry notice */}
        {label && (
          <div className="flex items-center gap-2 text-[11px] text-[#8A8078]/60 tracking-wide">
            <ClockIcon />
            <span>{label}</span>
          </div>
        )}

        {/* Title */}
        {entry.title && (
          <h1
            className="text-[28px] font-semibold text-[#1C1A17] leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {entry.title}
          </h1>
        )}

        {/* Date */}
        {entry.date && (
          <p className="text-[13px] text-[#8A8078] -mt-3" style={{ fontWeight: 300 }}>
            {formatDate(entry.date)}
          </p>
        )}

        {/* Mood */}
        {entry.mood && (
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: moodColor }} />
            <span className="text-[13px] text-[#1C1A17] tracking-wide">{entry.mood}</span>
          </div>
        )}

        {/* Audio player */}
        {entry.audioUrl && (
          <>
            <div className="border-t border-[#1C1A17]/6" />
            <AudioPlayer url={entry.audioUrl} />
          </>
        )}

        {/* Transcript */}
        {entry.transcript && (
          <>
            <div className="border-t border-[#1C1A17]/6" />
            <p
              className="text-[15px] text-[#1C1A17] leading-[1.8]"
              style={{ fontWeight: 300 }}
            >
              {entry.transcript}
            </p>
          </>
        )}

        {/* Notes */}
        {entry.notes && (
          <>
            {!entry.transcript && <div className="border-t border-[#1C1A17]/6" />}
            <p
              className="text-[14px] text-[#8A8078] leading-[1.8] italic"
              style={{ fontWeight: 300 }}
            >
              {entry.notes}
            </p>
          </>
        )}

        {/* Divider + CTA */}
        <div className="border-t border-[#1C1A17]/6 pt-2">
          <CTABlock />
        </div>
      </div>
    </div>
  );
}

/* ── CTA block ────────────────────────────────────────────────────────── */
function CTABlock() {
  return (
    <div className="flex flex-col items-center gap-3 pt-2">
      <Link
        href="/"
        className="w-full text-center text-[14px] font-medium text-white py-3.5 rounded-full transition-opacity duration-200 hover:opacity-85 tracking-wide"
        style={{ backgroundColor: "#6B8F71" }}
      >
        Start your own journal
      </Link>
      <p className="text-[11px] text-[#8A8078]/50 tracking-wide">Available on iOS and Android</p>
    </div>
  );
}

/* ── Icons ────────────────────────────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <rect x="5" y="3" width="4" height="18" rx="1" />
      <rect x="15" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
