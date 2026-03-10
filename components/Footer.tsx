import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F4] border-t border-[#1C1A17]/8">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-5 max-w-xs">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/aire-logo.png" alt="Aire It Out" width={28} height={28} className="object-contain" />
              <span style={{ fontFamily: "var(--font-cormorant)" }} className="text-[19px] font-medium tracking-wide text-[#1C1A17]">
                Aire It Out
              </span>
            </Link>
            <p className="text-sm text-[#8A8078] leading-relaxed">A private emotional voice journal for iOS and Android.</p>
            <a href="mailto:support@aireitout.app" className="text-sm text-[#8A8078] hover:text-[#1C1A17] transition-colors duration-200">
              support@aireitout.app
            </a>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/aireitout.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#8A8078]/60 hover:text-[#1C1A17] transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://x.com/AireItOut"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-[#8A8078]/60 hover:text-[#1C1A17] transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12">
            <FooterCol title="Product">
              <FooterLink href="/#features">Features</FooterLink>
              <FooterLink href="/#pricing">Pricing</FooterLink>
              <FooterLink href="/#download">Download</FooterLink>
            </FooterCol>
            <FooterCol title="Support">
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="mailto:support@aireitout.app">Contact Us</FooterLink>
            </FooterCol>
            <FooterCol title="Legal">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#1C1A17]/6 flex flex-col gap-4">
          <p className="text-[12px] text-[#8A8078]/70 leading-relaxed max-w-2xl">
            Aire It Out is not a mental health service.{" "}
            <a href="/help#crisis-resources" className="underline underline-offset-2 decoration-[#8A8078]/30 hover:text-[#1C1A17] transition-colors">
              In crisis? Call or text 988
            </a>{" "}
            (US, 24/7) or visit{" "}
            <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-[#8A8078]/30 hover:text-[#8A8078] transition-colors">
              findahelpline.com
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
              <p className="text-xs text-[#8A8078]">© {new Date().getFullYear()} Aire It Out. All rights reserved.</p>
              <p className="text-[11px] text-[#8A8078]/45 tracking-wide">Requires iOS 16.0 or later · Android 8.0 or later</p>
            </div>
            <div className="flex gap-5 text-xs text-[#8A8078]">
              <Link href="/privacy" className="hover:text-[#1C1A17] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#1C1A17] transition-colors">Terms</Link>
              <Link href="/help" className="hover:text-[#1C1A17] transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1C1A17]/40">{title}</span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-[#8A8078] hover:text-[#1C1A17] transition-colors duration-200">
      {children}
    </Link>
  );
}
