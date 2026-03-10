import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { AggregateField, Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    const db = getDb();
    const weekAgo = Timestamp.fromDate(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    const [
      avgSnap,
      zeroEntriesSnap,
      deletedWeekSnap,
      totalUsersSnap,
      adminSnap,
    ] = await Promise.all([
      // Averages for entries and streak across all users
      db
        .collection("users")
        .aggregate({
          avgEntries: AggregateField.average("entryCount"),
          avgStreak: AggregateField.average("streak"),
          totalEntrySum: AggregateField.sum("entryCount"),
        })
        .get(),
      // Users who signed up but never journaled
      db
        .collection("users")
        .where("entryCount", "==", 0)
        .count()
        .get(),
      // Deleted accounts this week (soft-delete pattern)
      db
        .collection("users")
        .where("deletedAt", ">=", weekAgo)
        .count()
        .get(),
      db.collection("users").count().get(),
      db.collection("users").where("isAdmin", "==", true).count().get(),
    ]);

    const aggData = avgSnap.data();
    const adminAccountCount = adminSnap.data().count;
    const totalUsers = totalUsersSnap.data().count - adminAccountCount;

    // Top features by entry type counts
    const [voiceSnap, photoSnap, timeCapsuleSnap, shareSnap] =
      await Promise.all([
        db.collection("entries").where("hasVoice", "==", true).count().get(),
        db.collection("entries").where("hasPhoto", "==", true).count().get(),
        db
          .collection("entries")
          .where("isTimeCapsule", "==", true)
          .count()
          .get(),
        db
          .collection("entries")
          .where("shareLink", "!=", null)
          .count()
          .get(),
      ]);

    const features = [
      { feature: "Voice Recording", count: voiceSnap.data().count },
      { feature: "Photo Attachments", count: photoSnap.data().count },
      { feature: "Time Capsules", count: timeCapsuleSnap.data().count },
      { feature: "Share Links", count: shareSnap.data().count },
    ].sort((a, b) => b.count - a.count);

    return NextResponse.json({
      avgEntriesPerUser: +(aggData.avgEntries ?? 0).toFixed(1),
      avgStreak: +(aggData.avgStreak ?? 0).toFixed(1),
      usersWithZeroEntries: zeroEntriesSnap.data().count,
      deletedAccountsThisWeek: deletedWeekSnap.data().count,
      totalUsers,
      adminAccountCount,
      topFeatures: features,
    });
  } catch (err) {
    console.error("[health]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
