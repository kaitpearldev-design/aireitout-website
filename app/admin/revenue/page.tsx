"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../AdminContext";

type RevenueData = {
  mrr: number;
  arrEstimate: number;
  totalProSubscribers: number;
  monthlySubscribers: number;
  annualSubscribers: number;
  newSubsThisWeek: number;
  newSubsThisMonth: number;
  cancelledThisWeek: number;
  trialsStartedThisWeek: number;
  trialConversionsThisWeek: number;
  monthlyPrice: number;
  annualPrice: number;
  note: string;
  rcConfigured: boolean;
  rcMessage?: string;
};

function StatCard({
  label,
  value,
  sub,
  accent,
  large,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className="bg-white rounded-xl p-6 flex flex-col gap-2"
      style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
    >
      <p
        className="text-[11px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: accent ? "#6B8F71" : "#8A8078", fontFamily: "system-ui, Inter, sans-serif" }}
      >
        {label}
      </p>
      <p
        className={`font-semibold text-[#1C1A17] leading-none ${large ? "text-[2.5rem]" : "text-[2rem]"}`}
        style={{ fontFamily: "system-ui, Inter, sans-serif" }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="text-[12px] text-[#8A8078]"
          style={{ fontFamily: "system-ui, Inter, sans-serif" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="text-[13px] text-[#8A8078] w-20 flex-shrink-0 capitalize">{label}</span>
      <div className="flex-1 h-2 bg-[#1C1A17]/6 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#6B8F71]/70 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[13px] font-medium text-[#1C1A17] w-12 text-right">{value.toLocaleString()}</span>
    </div>
  );
}

export default function RevenuePage() {
  const { refreshKey } = useAdmin();
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/admin/data/revenue")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return (
    <div style={{ fontFamily: "system-ui, Inter, sans-serif" }}>
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-[#1C1A17]">Revenue</h1>
        <p className="text-[13px] text-[#8A8078] mt-0.5">
          Subscription metrics from Firestore. Exact figures in RevenueCat dashboard.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-28 animate-pulse"
              style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }} />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-[13px] text-red-600 mb-4">
          {error}
        </div>
      )}

      {data && !loading && !data.rcConfigured && data.rcMessage && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[13px] text-amber-800 mb-4 flex items-start gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {data.rcMessage}
        </div>
      )}

      {data && !loading && (
        <div className="flex flex-col gap-6">
          {/* Top stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              label="Est. MRR"
              value={`$${data.mrr.toLocaleString()}`}
              sub={`~$${data.arrEstimate.toLocaleString()} ARR`}
              accent
              large
            />
            <StatCard
              label="Pro Subscribers"
              value={data.totalProSubscribers.toLocaleString()}
              sub={`${data.monthlySubscribers} monthly · ${data.annualSubscribers} annual`}
            />
            <StatCard
              label="New Subs This Month"
              value={data.newSubsThisMonth.toLocaleString()}
              sub={`${data.newSubsThisWeek} this week`}
            />
            <StatCard
              label="Trial Conversions"
              value={data.trialConversionsThisWeek.toLocaleString()}
              sub="This week"
              accent
            />
            <StatCard
              label="Trials Started"
              value={data.trialsStartedThisWeek.toLocaleString()}
              sub="This week"
            />
            <StatCard
              label="Cancelled"
              value={data.cancelledThisWeek.toLocaleString()}
              sub="This week"
            />
          </div>

          {/* Plan breakdown */}
          <div
            className="bg-white rounded-xl p-6"
            style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
          >
            <h2 className="text-[13px] font-semibold text-[#1C1A17] mb-5 uppercase tracking-[0.1em]">
              Plan Breakdown
            </h2>
            <div className="flex flex-col gap-4">
              <Bar
                label={`Monthly ($${data.monthlyPrice})`}
                value={data.monthlySubscribers}
                max={data.totalProSubscribers}
              />
              <Bar
                label={`Annual ($${data.annualPrice})`}
                value={data.annualSubscribers}
                max={data.totalProSubscribers}
              />
            </div>
            <div className="mt-5 pt-4 border-t border-[#1C1A17]/6 flex items-start gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8A8078" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-[12px] text-[#8A8078] leading-relaxed">{data.note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
