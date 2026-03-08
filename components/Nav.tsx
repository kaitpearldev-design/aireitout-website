"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F4]/92 backdrop-blur-xl border-b border-[#1C1A17]/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/aire-logo.png" alt="Aire It Out" width={32} height={32} className="object-contain" priority />
          <span style={{ fontFamily: "var(--font-cormorant)" }} className="text-[21px] font-medium tracking-wide text-[#1C1A17]">
            Aire It Out
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          <NavLink href="/#features">Features</NavLink>
          <NavLink href="/#privacy">Privacy</NavLink>
          <NavLink href="/#pricing">Pricing</NavLink>
          <NavLink href="/help">Help</NavLink>
          <a href="/#download" className="text-sm font-medium text-[#FAF8F4] bg-[#1C1A17] px-5 py-2.5 rounded-full hover:bg-[#2e2b26] transition-all duration-200 tracking-wide">
            Get the App
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-[#1C1A17]" aria-label="Toggle menu">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#FAF8F4]/98 backdrop-blur-xl border-t border-[#1C1A17]/8 px-8 py-8 flex flex-col gap-6">
          <MobileLink href="/#features" onClick={() => setMenuOpen(false)}>Features</MobileLink>
          <MobileLink href="/#privacy" onClick={() => setMenuOpen(false)}>Privacy</MobileLink>
          <MobileLink href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</MobileLink>
          <MobileLink href="/help" onClick={() => setMenuOpen(false)}>Help</MobileLink>
          <a href="/#download" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#FAF8F4] bg-[#1C1A17] px-5 py-3 rounded-full text-center">
            Get the App
          </a>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="nav-underline text-sm text-[#8A8078] hover:text-[#1C1A17] transition-colors duration-200 tracking-wide">
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-base text-[#1C1A17] tracking-wide">
      {children}
    </Link>
  );
}
