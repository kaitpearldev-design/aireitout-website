import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Aire It Out",
  description: "How Aire It Out collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-[13px] text-[#8A8078]">Last updated: February 25, 2026</p>
          </div>

          <div className="prose-aire">
            <Section title="1. Information We Collect">
              <h3>Account Information</h3>
              <p>When you create an account, we collect your email address and a securely hashed password. You may optionally provide demographic information during onboarding (such as age range and journaling goals) to help personalize your experience. This information is optional and can be skipped.</p>

              <h3>Journal Content</h3>
              <p>We collect the content you create in the app, including voice recordings, written notes, photos, mood selections, entry dates, and Time Capsule settings. This content is encrypted at rest and is only accessible by you.</p>

              <h3>AI-Processed Data</h3>
              <p>For Pro users, text transcripts of your voice entries are sent to OpenAI for transcription and AI Reflection generation. Photos and raw audio files are never sent to OpenAI except when audio is sent for transcription purposes. Audio sent for transcription is not retained by OpenAI after processing.</p>

              <h3>Morning Intention and Evening Reflection Data</h3>
              <p>Your morning intentions and evening reflections are stored as journal entries and may be included in your weekly insights generation if you are a Pro user.</p>

              <h3>Sharing Data</h3>
              <p>If you choose to share an entry, we generate a secure expiring link. We collect view count data for shared links. Recipients of shared links can view the shared entry content.</p>

              <h3>Device and Usage Information</h3>
              <p>We collect basic device information necessary to operate the app, including device type and operating system version. We do not use third-party analytics or advertising tracking tools.</p>

              <h3>Notification Preferences</h3>
              <p>Your notification settings, reminder times, and Morning Intention cutoff times are stored locally on your device and in your account settings.</p>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve the Aire It Out service</li>
                <li>Process voice transcription and generate AI Reflections for Pro users</li>
                <li>Authenticate your identity and maintain your account</li>
                <li>Send notifications and reminders you have enabled</li>
                <li>Generate expiring share links for entries you choose to share</li>
                <li>Produce aggregate, anonymized analytics to understand how the app is used generally</li>
              </ul>
              <p>We do not sell, rent, or trade your personal information to any third party for any purpose.</p>
            </Section>

            <Section title="3. Photos and Media">
              <p>Photos you attach to entries are stored securely in our systems and are accessible only by you, or by recipients of share links you have explicitly created. Photos are permanently and irrecoverably deleted when you delete your account or delete the entry they are attached to. Photos are never sent to AI services.</p>
            </Section>

            <Section title="4. Voice Recordings and Transcription">
              <p>Voice recordings are stored securely and encrypted at rest. For Pro users who use Voice Transcription, audio is sent to OpenAI&apos;s transcription service for processing. OpenAI does not retain your audio after transcription is complete. Free users&apos; audio recordings are never sent to any external service. You can delete any voice recording at any time by deleting the entry.</p>
            </Section>

            <Section title="5. AI Features">
              <p>AI features are available to Pro subscribers only. When you use AI Reflections, Guided Prompts, or Weekly Mood Insights, the relevant text data (transcripts, mood data, entry text) is sent to OpenAI for processing. Photos and raw audio are never sent to AI services except audio sent specifically for transcription.</p>
              <p>AI-generated content in Aire It Out is not medical advice, is not provided by licensed mental health professionals, and is not a substitute for professional mental health treatment or crisis support. If you are experiencing a mental health crisis, please contact the crisis resources listed in our <a href="/help#crisis-resources" className="text-[#1C1A17] underline underline-offset-2 decoration-[#1C1A17]/20 hover:decoration-[#1C1A17]/60 transition-all">Help Center</a>.</p>
            </Section>

            <Section title="6. Sharing Features">
              <p>When you share an entry, Aire It Out generates a secure, time-limited link. You control who you share this link with. You can revoke any share link at any time, after which it will no longer be accessible. We are not responsible for how recipients use or share content after you have shared it with them. Share link view counts are visible to you in the app.</p>
            </Section>

            <Section title="7. Data Storage and Security">
              <p>Your journal content is encrypted at rest using AES-256-GCM encryption with per-user encryption keys. All data transmitted between your device and our servers is protected using TLS/SSL encryption.</p>
              <p><strong>Important note:</strong> Aire It Out currently uses encryption at rest and in transit but does not yet implement full end-to-end encryption (where data is encrypted on your device before it reaches our servers). We are actively working toward full end-to-end encryption in a future update. PIN codes and biometric authentication data are stored locally on your device only and are never transmitted to our servers.</p>
            </Section>

            <Section title="8. Data Retention and Deletion">
              <p>Your data is retained for as long as your account is active. You may delete individual entries at any time. You may delete your entire account from Settings → Account → Delete Account, which will permanently delete all of your entries, recordings, photos, and personal information within 30 days of your request.</p>
              <p>Auto-Wipe settings you configure will automatically delete entries after your chosen inactivity period (7, 30, or 90 days). Favorited entries and sealed Time Capsules are protected from Auto-Wipe.</p>
            </Section>

            <Section title="9. Third-Party Services">
              <p>Aire It Out uses the following third-party services to operate:</p>
              <ul>
                <li><strong>Firebase (Google)</strong> — user authentication and database storage</li>
                <li><strong>OpenAI</strong> — voice transcription and AI features (Pro only)</li>
                <li><strong>RevenueCat</strong> — subscription management and payment processing</li>
                <li><strong>Google (SMTP/Gmail)</strong> — transactional emails such as password reset and email verification</li>
                <li><strong>Apple App Store / Google Play</strong> — app distribution and in-app purchase processing</li>
                <li><strong>Expo / EAS</strong> — app build and delivery infrastructure</li>
              </ul>
              <p>We do not use any advertising networks, behavioral tracking tools, or data brokers. We do not share your data with any third party beyond what is necessary to operate these services.</p>
            </Section>

            <Section title="10. Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access your data</strong> — request a copy of the personal information we hold about you</li>
                <li><strong>Export your data</strong> — use the CSV or PDF export features in the app at any time</li>
                <li><strong>Correct your data</strong> — update your account information in Settings</li>
                <li><strong>Delete your data</strong> — delete your account and all associated data from Settings</li>
                <li><strong>Control notifications</strong> — manage all notification preferences in Settings</li>
                <li><strong>Revoke shares</strong> — revoke any active share links at any time</li>
              </ul>
              <p>To exercise any of these rights or to submit a data request, contact us at <a href="mailto:support@aireitout.app" className="text-[#1C1A17] underline underline-offset-2 decoration-[#1C1A17]/20 hover:decoration-[#1C1A17]/60 transition-all">support@aireitout.app</a>. We will respond to all requests within 30 days.</p>
              <p>If you are located in the European Economic Area (EEA) or United Kingdom, you have additional rights under GDPR including the right to data portability, the right to restrict processing, and the right to lodge a complaint with your local supervisory authority.</p>
              <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) including the right to know what personal information is collected and the right to non-discrimination for exercising your rights.</p>
            </Section>

            <Section title="11. Children's Privacy">
              <p>Aire It Out is not directed to children under the age of 13 (or under 16 in the European Economic Area and United Kingdom). We do not knowingly collect personal information from children under these ages. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:support@aireitout.app" className="text-[#1C1A17] underline underline-offset-2 decoration-[#1C1A17]/20 hover:decoration-[#1C1A17]/60 transition-all">support@aireitout.app</a> and we will delete it promptly.</p>
              <p>While the app is rated 9+ on the App Store for technical reasons, the app is intended for users aged 13 and older. Parental guidance is recommended for users under 13.</p>
            </Section>

            <Section title="12. International Data Transfers">
              <p>Aire It Out is operated from the United States. If you are accessing the app from outside the United States, your data may be transferred to and processed in the United States. By using the app, you consent to this transfer. We take appropriate safeguards to ensure your data is protected in accordance with this Privacy Policy.</p>
            </Section>

            <Section title="13. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. When we make material changes, we will notify you through the app or by email at least 14 days before the changes take effect. Your continued use of the app after the effective date constitutes your acceptance of the updated policy. The current version will always be available at aireitout.app/privacy.</p>
            </Section>

            <Section title="14. Contact">
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
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
