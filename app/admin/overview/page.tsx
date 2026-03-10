"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../AdminContext";

type OverviewData = {
  totalUsers: number;
  proUsers: number;
  totalEntries: number;
  newUsersThisWeek: number;
  activeUsersLast7Days: number;
  estimatedMrr: number;
  adminAccountCount: number;
};

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
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
          color: accent ? "#6B8F71" : "#8A8078",
        }}
      >
        {label}
      </p>
      <p
        className="text-[2rem] font-semibold text-[#1C1A17] leading-none"
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

function Skeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 h-28 animate-pulse"
          style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
        />
      ))}
    </div>
  );
}

export default function OverviewPage() {
  const { refreshKey } = useAdmin();
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/admin/data/overview")
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
        <h1 className="text-[20px] font-semibold text-[#1C1A17]">Overview</h1>
        <p className="text-[13px] text-[#8A8078] mt-0.5">
          High-level snapshot of Aire It Out.
        </p>
      </div>

      {loading && <Skeleton />}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-[13px] text-red-600">
          {error}
        </div>
      )}

      {data && !loading && (
        <>
        {data.adminAccountCount > 0 && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-amber-50 border border-amber-100 text-[12px] text-amber-700 inline-flex items-center gap-1.5">
            <span>⚠</span>
            <span>
              Excluding {data.adminAccountCount} admin/test account{data.adminAccountCount !== 1 ? "s" : ""} from all stats.
            </span>
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Total Users" value={data.totalUsers.toLocaleString()} />
          <StatCard
            label="Pro Subscribers"
            value={data.proUsers.toLocaleString()}
            sub={`${data.totalUsers > 0 ? ((data.proUsers / data.totalUsers) * 100).toFixed(1) : 0}% of users`}
            accent
          />
          <StatCard
            label="Est. MRR"
            value={`$${data.estimatedMrr.toLocaleString()}`}
            sub="Based on Pro × $4.99/mo"
            accent
          />
          <StatCard
            label="Total Entries"
            value={data.totalEntries.toLocaleString()}
          />
          <StatCard
            label="New Users This Week"
            value={data.newUsersThisWeek.toLocaleString()}
          />
          <StatCard
            label="Active Last 7 Days"
            value={data.activeUsersLast7Days.toLocaleString()}
            sub={`${data.totalUsers > 0 ? ((data.activeUsersLast7Days / data.totalUsers) * 100).toFixed(1) : 0}% of users`}
          />
        </div>
        </>
      )}
    </div>
  );
}
