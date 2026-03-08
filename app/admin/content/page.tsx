"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../AdminContext";

type MoodEntry = { mood: string; count: number };
type ContentData = {
  totalEntries: number;
  totalVoiceRecordings: number;
  totalTranscriptions: number;
  totalAiReflections: number;
  totalPhotos: number;
  totalShareLinks: number;
  totalMorningIntentions: number;
  totalEveningReflections: number;
  moodDistribution: MoodEntry[];
};

const MOOD_COLORS: Record<string, string> = {
  Happy: "#F6C94E",
  Calm: "#6B8F71",
  Grateful: "#E8A87C",
  Reflective: "#8E9CC0",
  Hopeful: "#88C9A1",
  Neutral: "#A9A9A9",
  Tired: "#B0A3D4",
  Stressed: "#E07A7A",
  Sad: "#7EA8BE",
  Anxious: "#D4956A",
};

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      className="bg-white rounded-xl p-5 flex flex-col gap-1.5"
      style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
    >
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8A8078]">
        {label}
      </p>
      <p className="text-[1.75rem] font-semibold text-[#1C1A17] leading-none">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && <p className="text-[12px] text-[#8A8078]">{sub}</p>}
    </div>
  );
}

export default function ContentPage() {
  const { refreshKey } = useAdmin();
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/admin/data/content")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const maxMoodCount = data
    ? Math.max(...data.moodDistribution.map((m) => m.count), 1)
    : 1;

  return (
    <div style={{ fontFamily: "system-ui, Inter, sans-serif" }}>
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-[#1C1A17]">Content</h1>
        <p className="text-[13px] text-[#8A8078] mt-0.5">
          All-time content creation stats.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 h-24 animate-pulse"
              style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }} />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-[13px] text-red-600 mb-4">
          {error}
        </div>
      )}

      {data && !loading && (
        <div className="flex flex-col gap-6">
          {/* Stat grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Entries" value={data.totalEntries} />
            <StatCard
              label="Voice Recordings"
              value={data.totalVoiceRecordings}
              sub={`${data.totalEntries > 0 ? ((data.totalVoiceRecordings / data.totalEntries) * 100).toFixed(0) : 0}% of entries`}
            />
            <StatCard
              label="Transcriptions"
              value={data.totalTranscriptions}
              sub="Pro feature"
            />
            <StatCard
              label="AI Reflections"
              value={data.totalAiReflections}
              sub="Pro feature"
            />
            <StatCard label="Photos Attached" value={data.totalPhotos} />
            <StatCard label="Share Links Created" value={data.totalShareLinks} />
            <StatCard
              label="Morning Intentions"
              value={data.totalMorningIntentions}
            />
            <StatCard
              label="Evening Reflections"
              value={data.totalEveningReflections}
            />
          </div>

          {/* Mood distribution */}
          <div
            className="bg-white rounded-xl p-6"
            style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
          >
            <h2 className="text-[13px] font-semibold text-[#1C1A17] mb-5 uppercase tracking-[0.1em]">
              Mood Distribution
            </h2>
            <div className="flex flex-col gap-3">
              {data.moodDistribution.map(({ mood, count }, i) => {
                const pct = maxMoodCount > 0 ? (count / maxMoodCount) * 100 : 0;
                const color = MOOD_COLORS[mood] ?? "#6B8F71";
                return (
                  <div key={mood} className="flex items-center gap-4">
                    <span className="text-[12px] text-[#1C1A17] w-5 text-right text-[#8A8078]">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-[#1C1A17] w-24 flex-shrink-0 font-medium">
                      {mood}
                    </span>
                    <div className="flex-1 h-2.5 bg-[#1C1A17]/6 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: color, opacity: 0.75 }}
                      />
                    </div>
                    <span className="text-[13px] text-[#1C1A17] w-14 text-right font-medium">
                      {count.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
