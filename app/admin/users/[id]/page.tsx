"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useAdmin } from "../../AdminContext";

type UserProfile = {
  id: string;
  email: string;
  createdAt: string | null;
  isPro: boolean;
  streak: number;
  entryCount: number;
  lastActive: string | null;
  achievements: string[];
  totalIntentions: number;
  totalEveningReflections: number;
  subscriptionType: string | null;
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
  trialStartDate: string | null;
  revenueCat: Record<string, unknown> | null;
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-[#1C1A17]/6 last:border-0 gap-4">
      <span className="text-[12px] font-medium text-[#8A8078] uppercase tracking-[0.08em] flex-shrink-0">
        {label}
      </span>
      <span className="text-[13px] text-[#1C1A17] text-right">{value}</span>
    </div>
  );
}

function fmt(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { refreshKey } = useAdmin();
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/admin/data/user/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [id, refreshKey]);

  return (
    <div style={{ fontFamily: "system-ui, Inter, sans-serif" }}>
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/users"
          className="text-[13px] text-[#8A8078] hover:text-[#1C1A17] transition-colors"
        >
          ← Users
        </Link>
        <span className="text-[#1C1A17]/20">/</span>
        <span className="text-[13px] text-[#1C1A17] font-medium truncate max-w-xs">
          {data?.email ?? id}
        </span>
      </div>

      {loading && (
        <div className="bg-white rounded-xl p-8 animate-pulse h-64"
          style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }} />
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-[13px] text-red-600">
          {error}
        </div>
      )}

      {data && !loading && (
        <div className="grid md:grid-cols-2 gap-5">
          {/* Account */}
          <div
            className="bg-white rounded-xl p-6"
            style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
          >
            <h2 className="text-[13px] font-semibold text-[#1C1A17] mb-4 uppercase tracking-[0.1em]">
              Account
            </h2>
            <Row label="Email" value={data.email} />
            <Row label="UID" value={<span className="font-mono text-[11px]">{data.id}</span>} />
            <Row label="Joined" value={fmt(data.createdAt)} />
            <Row label="Last Active" value={fmt(data.lastActive)} />
            <Row
              label="Plan"
              value={
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                    data.isPro
                      ? "bg-[#6B8F71]/12 text-[#6B8F71]"
                      : "bg-[#1C1A17]/6 text-[#8A8078]"
                  }`}
                >
                  {data.isPro ? "Pro" : "Free"}
                </span>
              }
            />
          </div>

          {/* Activity */}
          <div
            className="bg-white rounded-xl p-6"
            style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
          >
            <h2 className="text-[13px] font-semibold text-[#1C1A17] mb-4 uppercase tracking-[0.1em]">
              Activity
            </h2>
            <Row label="Total Entries" value={data.entryCount.toLocaleString()} />
            <Row label="Morning Intentions" value={data.totalIntentions.toLocaleString()} />
            <Row label="Evening Reflections" value={data.totalEveningReflections.toLocaleString()} />
            <Row
              label="Current Streak"
              value={data.streak > 0 ? `${data.streak} days` : "0 days"}
            />
            <Row
              label="Achievements"
              value={
                data.achievements.length > 0
                  ? data.achievements.join(", ")
                  : "None"
              }
            />
          </div>

          {/* Subscription */}
          <div
            className="bg-white rounded-xl p-6"
            style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
          >
            <h2 className="text-[13px] font-semibold text-[#1C1A17] mb-4 uppercase tracking-[0.1em]">
              Subscription
            </h2>
            <Row
              label="Type"
              value={
                data.subscriptionType
                  ? data.subscriptionType.charAt(0).toUpperCase() +
                    data.subscriptionType.slice(1)
                  : "—"
              }
            />
            <Row label="Trial Start" value={fmt(data.trialStartDate)} />
            <Row label="Sub Start" value={fmt(data.subscriptionStartDate)} />
            <Row label="Sub Expiry" value={fmt(data.subscriptionEndDate)} />
          </div>

          {/* RevenueCat */}
          {data.revenueCat && (
            <div
              className="bg-white rounded-xl p-6"
              style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
            >
              <h2 className="text-[13px] font-semibold text-[#1C1A17] mb-4 uppercase tracking-[0.1em]">
                RevenueCat
              </h2>
              <pre className="text-[11px] text-[#1C1A17]/70 overflow-auto max-h-48 leading-relaxed">
                {JSON.stringify(data.revenueCat, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
