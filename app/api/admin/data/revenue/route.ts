import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

const MONTHLY_PRICE = 4.99;
const ANNUAL_PRICE = 39.99;

function getRevenueCatStatus(): { configured: boolean; message?: string } {
  const key = process.env.REVENUECAT_SECRET_KEY;
  if (!key) {
    return { configured: false, message: "RevenueCat not configured — add REVENUECAT_SECRET_KEY to .env.local" };
  }
  if (!key.startsWith("sk_")) {
    return { configured: false, message: "RevenueCat not configured — REVENUECAT_SECRET_KEY must start with sk_ (use a secret key from RevenueCat Dashboard → API Keys)" };
  }
  return { configured: true };
}

export async function GET() {
  const rc = getRevenueCatStatus();

  try {
    const db = getDb();
    const weekAgo = Timestamp.fromDate(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    const monthAgo = Timestamp.fromDate(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    const [
      totalProSnap,
      monthlySnap,
      annualSnap,
      newSubsWeekSnap,
      cancelledWeekSnap,
      trialsStartedWeekSnap,
      trialsConvertedWeekSnap,
      newSubsMonthSnap,
    ] = await Promise.all([
      db.collection("users").where("isPro", "==", true).count().get(),
      db
        .collection("users")
        .where("subscriptionType", "==", "monthly")
        .count()
        .get(),
      db
        .collection("users")
        .where("subscriptionType", "==", "annual")
        .count()
        .get(),
      db
        .collection("users")
        .where("isPro", "==", true)
        .where("subscriptionStartDate", ">=", weekAgo)
        .count()
        .get(),
      // Cancelled = isPro was true but subscriptionEndDate is in the past week
      db
        .collection("users")
        .where("isPro", "==", false)
        .where("subscriptionEndDate", ">=", weekAgo)
        .count()
        .get(),
      db
        .collection("users")
        .where("trialStartDate", ">=", weekAgo)
        .count()
        .get(),
      // Converted = started trial before this week, became Pro this week
      db
        .collection("users")
        .where("isPro", "==", true)
        .where("subscriptionStartDate", ">=", weekAgo)
        .where("trialStartDate", "<", weekAgo)
        .count()
        .get(),
      db
        .collection("users")
        .where("isPro", "==", true)
        .where("subscriptionStartDate", ">=", monthAgo)
        .count()
        .get(),
    ]);

    const monthlyCount = monthlySnap.data().count;
    const annualCount = annualSnap.data().count;
    const totalPro = totalProSnap.data().count;
    // Remaining pro users without a known subscription type
    const unknownCount = totalPro - monthlyCount - annualCount;

    const mrr = +(
      monthlyCount * MONTHLY_PRICE +
      annualCount * (ANNUAL_PRICE / 12) +
      unknownCount * MONTHLY_PRICE // conservative estimate
    ).toFixed(2);

    const arrEstimate = +(mrr * 12).toFixed(2);

    return NextResponse.json({
      mrr,
      arrEstimate,
      totalProSubscribers: totalPro,
      monthlySubscribers: monthlyCount,
      annualSubscribers: annualCount,
      newSubsThisWeek: newSubsWeekSnap.data().count,
      newSubsThisMonth: newSubsMonthSnap.data().count,
      cancelledThisWeek: cancelledWeekSnap.data().count,
      trialsStartedThisWeek: trialsStartedWeekSnap.data().count,
      trialConversionsThisWeek: trialsConvertedWeekSnap.data().count,
      monthlyPrice: MONTHLY_PRICE,
      annualPrice: ANNUAL_PRICE,
      note: "MRR is estimated from Firestore subscription data. For exact revenue, check the RevenueCat dashboard.",
      rcConfigured: rc.configured,
      rcMessage: rc.message,
    });
  } catch (err) {
    console.error("[revenue]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
