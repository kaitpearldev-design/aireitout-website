/**
 * Firebase Admin SDK — server-side only.
 *
 * Assumed Firestore schema:
 *
 * Collection: users/{uid}
 *   email: string
 *   createdAt: Timestamp
 *   isPro: boolean
 *   streak: number
 *   entryCount: number
 *   lastActive: Timestamp
 *   achievements: string[]
 *   subscriptionType: "monthly" | "annual" | null
 *   subscriptionStartDate?: Timestamp
 *   subscriptionEndDate?: Timestamp
 *   trialStartDate?: Timestamp
 *   deletedAt?: Timestamp
 *   totalIntentions?: number
 *   totalEveningReflections?: number
 *
 * Collection: entries/{entryId}
 *   userId: string
 *   createdAt: Timestamp
 *   mood: string  ("Happy"|"Calm"|"Grateful"|"Reflective"|"Hopeful"|
 *                  "Neutral"|"Tired"|"Stressed"|"Sad"|"Anxious")
 *   hasVoice: boolean
 *   hasTranscript: boolean
 *   hasAiReflection: boolean
 *   hasPhoto: boolean
 *   shareLink?: string
 *   type: "journal" | "intention" | "evening"
 *   isTimeCapsule: boolean
 */

import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function parseServiceAccountKey(key: string) {
  // Attempt 1: parse directly.
  try {
    return JSON.parse(key);
  } catch {
    // Fall through to attempt 2.
  }

  // Attempt 2: some env serialisers double-escape the private_key newlines,
  // producing literal \n sequences. Replace them and retry.
  try {
    return JSON.parse(key.replace(/\\n/g, "\n"));
  } catch {
    // Fall through to throw the user-friendly error below.
  }

  throw new Error(
    "Firebase Admin not configured — check FIREBASE_SERVICE_ACCOUNT_KEY in .env.local"
  );
}

function getAdminApp() {
  if (getApps().length > 0) return getApp();
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key) {
    throw new Error(
      "Firebase Admin not configured — check FIREBASE_SERVICE_ACCOUNT_KEY in .env.local"
    );
  }
  return initializeApp({ credential: cert(parseServiceAccountKey(key)) });
}

export function getDb() {
  return getFirestore(getAdminApp());
}
