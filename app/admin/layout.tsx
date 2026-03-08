"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AdminProvider, useAdmin } from "./AdminContext";
import { ReactNode } from "react";

const NAV = [
  {
    href: "/admin/overview",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/admin/revenue",
    label: "Revenue",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    href: "/admin/content",
    label: "Content",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    href: "/admin/health",
    label: "App Health",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

function Topbar() {
  const router = useRouter();
  const { lastRefreshed, refresh } = useAdmin();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  const refreshedStr = lastRefreshed.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header
      className="h-14 flex items-center justify-between px-6 border-b border-[#1C1A17]/6 bg-white flex-shrink-0"
      style={{ fontFamily: "system-ui, Inter, sans-serif" }}
    >
      <div className="flex items-center gap-3">
        <Image src="/aire-logo.png" alt="" width={22} height={22} className="object-contain opacity-70" />
        <span className="text-[14px] font-semibold text-[#1C1A17] tracking-wide">
          Aire It Out Admin
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[12px] text-[#8A8078] hidden sm:block">
          Refreshed {refreshedStr}
        </span>
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 text-[12px] font-medium text-[#6B8F71] border border-[#6B8F71]/30 px-3 py-1.5 rounded-full hover:bg-[#6B8F71]/6 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
        <button
          onClick={handleLogout}
          className="text-[12px] text-[#8A8078] hover:text-[#1C1A17] transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-52 flex-shrink-0 bg-white border-r border-[#1C1A17]/6 flex flex-col pt-6 pb-4 hidden md:flex"
      style={{ fontFamily: "system-ui, Inter, sans-serif" }}
    >
      <nav className="flex flex-col gap-1 px-3">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                active
                  ? "bg-[#6B8F71]/10 text-[#6B8F71]"
                  : "text-[#8A8078] hover:text-[#1C1A17] hover:bg-[#1C1A17]/4"
              }`}
            >
              <span className={active ? "text-[#6B8F71]" : "text-[#8A8078]"}>
                {icon}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F7F4" }}>
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
