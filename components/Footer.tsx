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
          <p className="text-[11px] text-[#8A8078]/55 leading-relaxed max-w-2xl">
            Aire It Out is not a mental health service. If you need support: call or text{" "}
            <span className="text-[#8A8078]/80">988</span> (US) or visit{" "}
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
