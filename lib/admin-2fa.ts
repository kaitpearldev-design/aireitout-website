/** In-memory 2FA code store. Works for single-process deployments. */

type CodeEntry = { code: string; expiresAt: number };

const store = new Map<string, CodeEntry>();
const ADMIN_KEY = "admin";
const TTL_MS = 10 * 60 * 1000; // 10 minutes

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function storeCode(code: string): void {
  for (const [k, v] of store) {
    if (Date.now() > v.expiresAt) store.delete(k);
  }
  store.set(ADMIN_KEY, { code, expiresAt: Date.now() + TTL_MS });
}

export function verifyAndConsumeCode(code: string): boolean {
  const entry = store.get(ADMIN_KEY);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    store.delete(ADMIN_KEY);
    return false;
  }
  if (entry.code !== code) return false;
  store.delete(ADMIN_KEY); // one-time use
  return true;
}
