/**
 * RevenueCat REST API v1 helpers — server-side only.
 *
 * The v1 API supports per-subscriber lookups.
 * Aggregate metrics (MRR, total revenue) require the RevenueCat dashboard
 * or v2 project-level metrics API (REVENUECAT_PROJECT_ID required).
 */

const BASE = "https://api.revenuecat.com/v1";

async function rcFetch(path: string) {
  const key = process.env.REVENUECAT_SECRET_KEY;
  if (!key) throw new Error("REVENUECAT_SECRET_KEY is not set");

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`RevenueCat ${res.status}: ${text}`);
  }

  return res.json();
}

/** Fetch subscription info for a single app user id. */
export async function getSubscriber(appUserId: string) {
  return rcFetch(`/subscribers/${encodeURIComponent(appUserId)}`);
}
