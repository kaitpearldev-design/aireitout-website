import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    const db = getDb();
    const weekAgo = Timestamp.fromDate(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    const [totalSnap, proSnap, entriesSnap, newUsersSnap, activeSnap] =
      await Promise.all([
        db.collection("users").count().get(),
        db.collection("users").where("isPro", "==", true).count().get(),
        db.collection("entries").count().get(),
        db
          .collection("users")
          .where("createdAt", ">=", weekAgo)
          .count()
          .get(),
        db
          .collection("users")
          .where("lastActive", ">=", weekAgo)
          .count()
          .get(),
      ]);

    const totalUsers = totalSnap.data().count;
    const proUsers = proSnap.data().count;

    // Estimated MRR — assumes all Pro users are on monthly plan.
    // For accurate MRR, use RevenueCat dashboard or sync subscription type
    // into Firestore via webhooks.
    const estimatedMrr = +(proUsers * 4.99).toFixed(2);

    return NextResponse.json({
      totalUsers,
      proUsers,
      totalEntries: entriesSnap.data().count,
      newUsersThisWeek: newUsersSnap.data().count,
      activeUsersLast7Days: activeSnap.data().count,
      estimatedMrr,
    });
  } catch (err) {
    console.error("[overview]", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
