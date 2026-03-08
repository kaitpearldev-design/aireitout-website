"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../AdminContext";

type HealthData = {
  avgEntriesPerUser: number;
  avgStreak: number;
  usersWithZeroEntries: number;
  deletedAccountsThisWeek: number;
  totalUsers: number;
  topFeatures: { feature: string; count: number }[];
};

function StatCard({
  label,
  value,
  sub,
  warn,
}: {
  label: string;
  value: string | number;
  sub?: string;
  warn?: boolean;
}) {
  return (
    <div
      className="bg-white rounded-xl p-6 flex flex-col gap-2"
      style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
    >
      <p
        className="text-[11px] font-semibold tracking-[0.12em] uppercase"
        style={{
          fontFamily: "system-ui, Inter, sans-serif",
          color: warn ? "#E07A7A" : "#8A8078",
        }}
      >
        {label}
      </p>
      <p
        className={`text-[2rem] font-semibold leading-none ${warn ? "text-red-500" : "text-[#1C1A17]"}`}
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

export default function HealthPage() {
  const { refreshKey } = useAdmin();
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/admin/data/health")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const maxFeatureCount = data
    ? Math.max(...data.topFeatures.map((f) => f.count), 1)
    : 1;

  return (
    <div style={{ fontFamily: "system-ui, Inter, sans-serif" }}>
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-[#1C1A17]">App Health</h1>
        <p className="text-[13px] text-[#8A8078] mt-0.5">
          Engagement and retention signals.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
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

      {data && !loading && (
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Avg Entries / User"
              value={data.avgEntriesPerUser}
            />
            <StatCard
              label="Avg Streak"
              value={`${data.avgStreak}d`}
            />
            <StatCard
              label="Never Journaled"
              value={data.usersWithZeroEntries.toLocaleString()}
              sub={`${data.totalUsers > 0 ? ((data.usersWithZeroEntries / data.totalUsers) * 100).toFixed(1) : 0}% of users`}
              warn={data.usersWithZeroEntries / Math.max(data.totalUsers, 1) > 0.2}
            />
            <StatCard
              label="Deleted This Week"
              value={data.deletedAccountsThisWeek.toLocaleString()}
              warn={data.deletedAccountsThisWeek > 0}
            />
          </div>

          {/* Top features */}
          <div
            className="bg-white rounded-xl p-6"
            style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
          >
            <h2 className="text-[13px] font-semibold text-[#1C1A17] mb-5 uppercase tracking-[0.1em]">
              Most Used Features
            </h2>
            <div className="flex flex-col gap-4">
              {data.topFeatures.map(({ feature, count }, i) => {
                const pct = (count / maxFeatureCount) * 100;
                return (
                  <div key={feature} className="flex items-center gap-4">
                    <span className="text-[12px] text-[#8A8078] w-4 text-right">{i + 1}</span>
                    <span className="text-[13px] text-[#1C1A17] w-44 flex-shrink-0 font-medium">
                      {feature}
                    </span>
                    <div className="flex-1 h-2.5 bg-[#1C1A17]/6 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6B8F71]/65 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
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

          {/* Retention insight */}
          <div
            className="bg-white rounded-xl p-6 flex items-start gap-4"
            style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
          >
            <div className="w-8 h-8 rounded-full bg-[#6B8F71]/12 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B8F71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#1C1A17] mb-1">
                Activation rate:{" "}
                {data.totalUsers > 0
                  ? (
                      ((data.totalUsers - data.usersWithZeroEntries) /
                        data.totalUsers) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </p>
              <p className="text-[13px] text-[#8A8078] leading-relaxed">
                {data.totalUsers - data.usersWithZeroEntries} of{" "}
                {data.totalUsers} users have created at least one journal entry.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
