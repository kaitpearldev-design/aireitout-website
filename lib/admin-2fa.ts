/** Firestore-backed 2FA code store. Works across serverless instances. */

import { getDb } from "@/lib/firebase-admin";

const DOC_PATH = "admin_2fa/current";
const TTL_MS = 10 * 60 * 1000; // 10 minutes

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function storeCode(code: string): Promise<void> {
  const db = getDb();
  await db.doc(DOC_PATH).set({
    code,
    expiresAt: Date.now() + TTL_MS,
    createdAt: Date.now(),
  });
}

export async function verifyAndConsumeCode(code: string): Promise<boolean> {
  const db = getDb();
  const ref = db.doc(DOC_PATH);
  const snap = await ref.get();

  if (!snap.exists) return false;

  const { code: stored, expiresAt } = snap.data() as {
    code: string;
    expiresAt: number;
  };

  if (Date.now() > expiresAt) {
    await ref.delete();
    return false;
  }

  if (stored !== code) return false;

  await ref.delete(); // one-time use
  return true;
}
