import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { getSubscriber } from "@/lib/revenuecat";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    if (typeof body.isAdmin !== "boolean") {
      return NextResponse.json({ error: "isAdmin must be a boolean" }, { status: 400 });
    }
    const db = getDb();
    await db.collection("users").doc(id).update({ isAdmin: body.isAdmin });
    return NextResponse.json({ ok: true, isAdmin: body.isAdmin });
  } catch (err) {
    console.error("[user/id PATCH]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const db = getDb();
    const userDoc = await db.collection("users").doc(id).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const d = userDoc.data()!;

    // Fetch RevenueCat subscriber data — the app user id is typically the
    // Firebase uid. Adjust `id` mapping if your app uses a different value.
    let rcData: Record<string, unknown> | null = null;
    try {
      rcData = await getSubscriber(id);
    } catch {
      // RevenueCat lookup is best-effort
    }

    return NextResponse.json({
      id: userDoc.id,
      email: d.email ?? "—",
      createdAt: d.createdAt?.toDate?.()?.toISOString() ?? null,
      isPro: d.isPro ?? false,
      isAdmin: d.isAdmin ?? false,
      streak: d.streak ?? 0,
      entryCount: d.entryCount ?? 0,
      lastActive: d.lastActive?.toDate?.()?.toISOString() ?? null,
      achievements: d.achievements ?? [],
      totalIntentions: d.totalIntentions ?? 0,
      totalEveningReflections: d.totalEveningReflections ?? 0,
      subscriptionType: d.subscriptionType ?? null,
      subscriptionStartDate:
        d.subscriptionStartDate?.toDate?.()?.toISOString() ?? null,
      subscriptionEndDate:
        d.subscriptionEndDate?.toDate?.()?.toISOString() ?? null,
      trialStartDate: d.trialStartDate?.toDate?.()?.toISOString() ?? null,
      revenueCat: rcData,
    });
  } catch (err) {
    console.error("[user/id]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
