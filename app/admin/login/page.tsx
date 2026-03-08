"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"password" | "verify">("password");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "verify") {
      codeRef.current?.focus();
    }
  }, [step]);

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.step === "verify") {
        setStep("verify");
      } else {
        setError(data.error ?? "Incorrect password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCodeSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        router.push("/admin/overview");
      } else {
        const data = await res.json();
        setError(data.error ?? "Incorrect code. Please try again.");
        setCode("");
        codeRef.current?.focus();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ background: "#F8F7F4" }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Image
            src="/aire-logo.png"
            alt="Aire It Out"
            width={32}
            height={32}
            className="object-contain"
          />
          <span
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[20px] font-medium tracking-wide text-[#1C1A17]"
          >
            Aire It Out
          </span>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-2xl p-8"
          style={{ boxShadow: "0 2px 16px rgba(28,26,23,0.07)" }}
        >
          {step === "password" ? (
            <>
              <h1
                className="text-[15px] font-semibold text-[#1C1A17] mb-1 tracking-wide"
                style={{ fontFamily: "system-ui, Inter, sans-serif" }}
              >
                Admin Dashboard
              </h1>
              <p className="text-[13px] text-[#8A8078] mb-6">
                Enter your admin password to continue.
              </p>

              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-[#1C1A17]/12 text-[14px] text-[#1C1A17] placeholder:text-[#8A8078]/50 focus:outline-none focus:border-[#6B8F71]/60 transition-colors"
                  style={{ fontFamily: "system-ui, Inter, sans-serif" }}
                />

                {error && (
                  <p className="text-[13px] text-red-500 -mt-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !password}
                  className="w-full py-2.5 rounded-lg bg-[#1C1A17] text-[#FAF8F4] text-[13px] font-medium tracking-wide hover:bg-[#2e2b26] transition-colors disabled:opacity-40"
                  style={{ fontFamily: "system-ui, Inter, sans-serif" }}
                >
                  {loading ? "Sending code…" : "Continue"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <button
                  onClick={() => { setStep("password"); setError(""); setCode(""); }}
                  className="text-[#8A8078] hover:text-[#1C1A17] transition-colors"
                  aria-label="Back"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h1
                  className="text-[15px] font-semibold text-[#1C1A17] tracking-wide"
                  style={{ fontFamily: "system-ui, Inter, sans-serif" }}
                >
                  Check your email
                </h1>
              </div>
              <p className="text-[13px] text-[#8A8078] mb-6">
                A verification code has been sent to your email. Enter it below. The code expires in 10 minutes.
              </p>

              <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
                <input
                  ref={codeRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-[#1C1A17]/12 text-[18px] text-[#1C1A17] tracking-[0.3em] text-center placeholder:text-[#8A8078]/50 placeholder:tracking-normal placeholder:text-[14px] focus:outline-none focus:border-[#6B8F71]/60 transition-colors"
                  style={{ fontFamily: "system-ui, Inter, sans-serif" }}
                />

                {error && (
                  <p className="text-[13px] text-red-500 -mt-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="w-full py-2.5 rounded-lg bg-[#1C1A17] text-[#FAF8F4] text-[13px] font-medium tracking-wide hover:bg-[#2e2b26] transition-colors disabled:opacity-40"
                  style={{ fontFamily: "system-ui, Inter, sans-serif" }}
                >
                  {loading ? "Verifying…" : "Sign In"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
