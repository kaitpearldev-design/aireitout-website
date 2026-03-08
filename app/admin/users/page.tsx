"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdmin } from "../AdminContext";

type User = {
  id: string;
  email: string;
  createdAt: string | null;
  isPro: boolean;
  streak: number;
  entryCount: number;
  lastActive: string | null;
};

function fmt(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function UsersPage() {
  const { refreshKey } = useAdmin();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ filter, limit: "300" });
    fetch(`/api/admin/data/users?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setUsers(d.users);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [refreshKey, filter]);

  const filtered = search
    ? users.filter((u) =>
        u.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  return (
    <div style={{ fontFamily: "system-ui, Inter, sans-serif" }}>
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-[#1C1A17]">Users</h1>
        <p className="text-[13px] text-[#8A8078] mt-0.5">
          {users.length.toLocaleString()} users loaded · Click a row to view profile.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-[#1C1A17]/10 text-[13px] text-[#1C1A17] placeholder:text-[#8A8078]/50 focus:outline-none focus:border-[#6B8F71]/50 bg-white transition-colors"
        />
        <div className="flex gap-2">
          {(["all", "free", "pro"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-[12px] font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-[#1C1A17] text-[#FAF8F4]"
                  : "bg-white text-[#8A8078] border border-[#1C1A17]/10 hover:border-[#1C1A17]/25"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-[13px] text-red-600 mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 1px 6px rgba(28,26,23,0.06)" }}
      >
        {loading ? (
          <div className="p-8 text-center text-[13px] text-[#8A8078]">
            Loading users…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-[13px] text-[#8A8078]">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#1C1A17]/6 bg-[#F8F7F4]">
                  {["Email", "Joined", "Plan", "Streak", "Entries", "Last Active"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#8A8078]"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr
                    key={user.id}
                    className={`border-b border-[#1C1A17]/4 last:border-0 hover:bg-[#6B8F71]/4 transition-colors cursor-pointer ${
                      i % 2 === 0 ? "" : "bg-[#F8F7F4]/40"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-[#1C1A17] hover:text-[#6B8F71] transition-colors font-medium"
                      >
                        {user.email}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#8A8078]">
                      {fmt(user.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                          user.isPro
                            ? "bg-[#6B8F71]/12 text-[#6B8F71]"
                            : "bg-[#1C1A17]/6 text-[#8A8078]"
                        }`}
                      >
                        {user.isPro ? "Pro" : "Free"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#1C1A17]">
                      {user.streak > 0 ? `🔥 ${user.streak}` : user.streak}
                    </td>
                    <td className="px-4 py-3 text-[#1C1A17]">
                      {user.entryCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[#8A8078]">
                      {fmt(user.lastActive)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
