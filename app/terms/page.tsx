import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Aire It Out",
  description: "Terms and conditions for using the Aire It Out app and website.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-28 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-14">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6B8F71] mb-5 block">Legal</span>
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[clamp(3rem,7vw,5rem)] font-light text-[#1C1A17] leading-[0.95] tracking-tight mb-5"
            >
              Terms of Service
            </h1>
            <p className="text-[13px] text-[#8A8078]">Last updated: February 25, 2026</p>
          </div>

          <div className="prose-aire">
            <Section title="1. Acceptance of Terms">
              <p>By downloading, installing, or using Aire It Out (&ldquo;the App,&rdquo; &ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use the App.</p>
              <p>You must be at least 13 years of age to use Aire It Out (16 years of age in the European Economic Area and United Kingdom). By using the App, you represent that you meet this age requirement. If you are between 13 and 18 years old, you represent that your parent or guardian has reviewed and agreed to these Terms on your behalf.</p>
            </Section>

            <Section title="2. Description of Service">
              <p>Aire It Out is a private voice journaling application that allows users to record voice entries, track moods, set morning intentions, reflect in the evening, use time capsules, share entries, export data, and access AI-powered features (Pro). The service is available on iOS and Android.</p>
            </Section>

            <Section title="3. User Accounts">
              <p>You must provide a valid email address to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately at <a href="mailto:support@aireitout.app" className="text-[#1C1A17] underline underline-offset-2 decoration-[#1C1A17]/20 hover:decoration-[#1C1A17]/60 transition-all">support@aireitout.app</a> if you suspect unauthorized access to your account. We are not liable for any loss or damage resulting from unauthorized use of your account.</p>
            </Section>

            <Section title="4. Free and Pro Tiers">
              <h3>Free Tier includes:</h3>
              <ul>
                <li>Unlimited voice recordings</li>
                <li>Morning Intention and Evening Reflection</li>
                <li>Mood tracking and calendar</li>
                <li>Streak counter and achievements</li>
                <li>Time Capsules (3, 6, or 12 month options)</li>
                <li>Photos, notes, and favorites</li>
                <li>PIN lock and auto-wipe</li>
                <li>Daily reminders</li>
                <li>CSV export and single-entry PDF</li>
                <li>Share links with expiring access</li>
              </ul>
              <h3>Pro Tier includes everything in Free, plus:</h3>
              <ul>
                <li>Night Sky (entries become stars)</li>
                <li>AI Reflections on every entry</li>
                <li>Voice transcription (audio → searchable text)</li>
                <li>Calm Breathing (3 guided patterns)</li>
                <li>Weekly AI Mood Insights with narrative</li>
                <li>Star Sessions (guided reflection + AI summary)</li>
                <li>Photo Album (flip through memories)</li>
                <li>Custom Time Capsules (any future date)</li>
                <li>Monthly memoir-style PDF export</li>
              </ul>
            </Section>

            <Section title="5. Subscriptions and Payments">
              <p>Pro is available as a monthly or annual subscription:</p>
              <ul>
                <li><strong>Monthly:</strong> $4.99 per month</li>
                <li><strong>Annual:</strong> $39.99 per year (save approximately 33% compared to monthly)</li>
              </ul>
              <p>A 7-day free trial is available for new Pro subscribers. The free trial is available once per user. After the trial period, your subscription will automatically renew at the applicable rate unless cancelled before the trial ends.</p>
              <p>Subscriptions are processed through the Apple App Store or Google Play and are governed by their respective payment and refund policies. To cancel your subscription, go to your device&apos;s subscription management settings. Cancellation takes effect at the end of the current billing period — you will retain Pro access until that date.</p>
            </Section>

            <Section title="6. User Content">
              <p>You retain full ownership of all content you create in Aire It Out, including voice recordings, written notes, and photos (&ldquo;User Content&rdquo;). By using the Service, you grant Aire It Out a limited, non-exclusive, royalty-free license to store, process, and transmit your User Content solely as necessary to operate and provide the Service. This license terminates when you delete your content or your account.</p>
              <p>We do not claim any ownership rights over your User Content and will never use your personal journal content for advertising, training AI models, or any purpose beyond operating the Service.</p>
            </Section>

            <Section title="7. Sharing Features">
              <p>When you choose to share an entry, you are solely responsible for selecting appropriate sharing settings and for who you share your content with. Aire It Out provides the technical means to share and revoke access, but we are not liable for how recipients use, save, or distribute content after you have shared it with them. Revoke share links promptly if you no longer wish for someone to have access.</p>
            </Section>

            <Section title="8. AI-Generated Content Disclaimer">
              <p>AI features in Aire It Out (including AI Reflections, Star Sessions, and Weekly Mood Insights) are provided for personal reflection and journaling purposes only.</p>
              <p>AI-generated content in Aire It Out:</p>
              <ul>
                <li>Is not medical advice</li>
                <li>Is not provided by licensed mental health professionals</li>
                <li>Is not a substitute for professional therapy, counseling, or psychiatric treatment</li>
                <li>Should not be relied upon in a mental health crisis</li>
              </ul>
              <p>If you are experiencing a mental health crisis or having thoughts of suicide or self-harm, please reach out for help:</p>
              <ul>
                <li><strong>988 Suicide &amp; Crisis Lifeline</strong> — call or text 988 (US, 24/7)</li>
                <li><strong>Crisis Text Line</strong> — text HOME to 741741 (24/7)</li>
                <li><strong>International resources</strong> — findahelpline.com</li>
                <li><strong>Emergency services</strong> — call 911 (US) or your local emergency number</li>
              </ul>
            </Section>

            <Section title="9. Acceptable Use">
              <p>You agree to use Aire It Out for lawful personal journaling purposes only. You agree not to:</p>
              <ul>
                <li>Upload or record content that is illegal, harmful, threatening, or violates any third party&apos;s rights</li>
                <li>Attempt to reverse engineer, decompile, or extract the source code of the App</li>
                <li>Use automated tools, bots, or scripts to access the Service</li>
                <li>Attempt to gain unauthorized access to other users&apos; accounts or data</li>
                <li>Resell, sublicense, or commercially exploit the Service or its features</li>
                <li>Use the App in any way that violates applicable laws or regulations</li>
              </ul>
            </Section>

            <Section title="10. Intellectual Property">
              <p>Aire It Out, including its name, logo, design, user interface, code, and all associated intellectual property, is owned by Aire It Out and protected by applicable intellectual property laws. Nothing in these Terms grants you any right to use our trademarks, logos, or brand assets without our prior written consent.</p>
            </Section>

            <Section title="11. Privacy">
              <p>Your use of Aire It Out is also governed by our <a href="/privacy" className="text-[#1C1A17] underline underline-offset-2 decoration-[#1C1A17]/20 hover:decoration-[#1C1A17]/60 transition-all">Privacy Policy</a>, available at aireitout.app/privacy, which is incorporated into these Terms by reference. By using the App, you agree to the collection and use of your information as described in the Privacy Policy.</p>
            </Section>

            <Section title="12. Data Security">
              <p>We implement AES-256-GCM encryption at rest with per-user keys and TLS/SSL encryption in transit to protect your data.</p>
              <p><strong>Acknowledged limitation:</strong> Aire It Out does not currently implement full end-to-end encryption (where data is encrypted on your device before reaching our servers). We are actively working toward full end-to-end encryption in a future update. PIN codes and biometric data are stored locally on your device and are never transmitted to our servers.</p>
            </Section>

            <Section title="13. Disclaimers and Limitation of Liability">
              <p>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p>We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. We are not liable for any loss of data, including journal entries, resulting from technical failures.</p>
              <p>To the maximum extent permitted by applicable law, Aire It Out&apos;s total liability to you for any claims arising from your use of the Service shall not exceed the greater of (a) the total amount you paid for Pro in the 12 months preceding the claim, or (b) $50.</p>
            </Section>

            <Section title="14. Indemnification">
              <p>You agree to indemnify, defend, and hold harmless Aire It Out and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your use of the Service, your User Content, or your violation of these Terms.</p>
            </Section>

            <Section title="15. Termination">
              <p>We reserve the right to suspend or terminate your account at any time for violation of these Terms, without prior notice. Upon termination, your right to use the Service immediately ceases. Your data will be handled in accordance with our Privacy Policy and data retention practices.</p>
              <p>You may terminate your account at any time by going to Settings → Account → Delete Account.</p>
            </Section>

            <Section title="16. Governing Law and Dispute Resolution">
              <p>These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.</p>
              <p>Any dispute arising from these Terms or your use of the Service shall be resolved through binding individual arbitration under the rules of the American Arbitration Association. You waive any right to participate in a class action lawsuit or class-wide arbitration. Nothing in this section prevents either party from seeking injunctive or other equitable relief for intellectual property violations.</p>
            </Section>

            <Section title="17. Changes to Terms">
              <p>We may update these Terms from time to time. When we make material changes, we will notify you through the app or by email at least 30 days before the changes take effect. Your continued use of the App after the effective date constitutes your acceptance of the updated Terms. The current version will always be available at aireitout.app/terms.</p>
            </Section>

            <Section title="18. General Provisions">
              <p>These Terms, together with the Privacy Policy, constitute the entire agreement between you and Aire It Out regarding the Service. If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect. Our failure to enforce any right or provision of these Terms will not constitute a waiver of that right or provision. You may not assign your rights under these Terms without our prior written consent.</p>
            </Section>

            <Section title="19. Apple App Store — Additional Terms">
              <p>For iOS users: These Terms serve as the End User License Agreement (EULA) for Aire It Out. Apple is not a party to this EULA and has no obligation to provide maintenance or support for the App. In the event of any failure to conform to any applicable warranty, you may notify Apple and Apple will refund the purchase price, if any. Apple has no other warranty obligation. Apple is not responsible for addressing any claims relating to the App, including product liability, consumer protection, or intellectual property claims. Apple and its subsidiaries are third-party beneficiaries of this EULA and may enforce it against you.</p>
            </Section>

            <Section title="20. Contact">
              <p>For any questions, concerns, or notices regarding these Terms, please contact us at:</p>
              <p><a href="mailto:support@aireitout.app" className="text-[#1C1A17] underline underline-offset-2 decoration-[#1C1A17]/20 hover:decoration-[#1C1A17]/60 transition-all">support@aireitout.app</a></p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 pb-10 border-b border-[#1C1A17]/8 last:border-0 last:mb-0 last:pb-0">
      <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="text-[1.7rem] font-semibold text-[#1C1A17] mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}
