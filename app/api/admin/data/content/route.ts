import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

const MOODS = [
  "Happy",
  "Calm",
  "Grateful",
  "Reflective",
  "Hopeful",
  "Neutral",
  "Tired",
  "Stressed",
  "Sad",
  "Anxious",
];

export async function GET() {
  try {
    const db = getDb();

    const [
      totalEntriesSnap,
      voiceSnap,
      transcriptSnap,
      reflectionSnap,
      photoSnap,
      shareSnap,
      intentionSnap,
      eveningSnap,
      ...moodSnaps
    ] = await Promise.all([
      db.collection("entries").count().get(),
      db.collection("entries").where("hasVoice", "==", true).count().get(),
      db
        .collection("entries")
        .where("hasTranscript", "==", true)
        .count()
        .get(),
      db
        .collection("entries")
        .where("hasAiReflection", "==", true)
        .count()
        .get(),
      db.collection("entries").where("hasPhoto", "==", true).count().get(),
      // Share links — entries where shareLink field exists and is not null/empty
      db
        .collection("entries")
        .where("shareLink", "!=", null)
        .count()
        .get(),
      db
        .collection("entries")
        .where("type", "==", "intention")
        .count()
        .get(),
      db
        .collection("entries")
        .where("type", "==", "evening")
        .count()
        .get(),
      // One count query per mood
      ...MOODS.map((mood) =>
        db.collection("entries").where("mood", "==", mood).count().get()
      ),
    ]);

    const moodDistribution = MOODS.map((mood, i) => ({
      mood,
      count: moodSnaps[i].data().count,
    })).sort((a, b) => b.count - a.count);

    return NextResponse.json({
      totalEntries: totalEntriesSnap.data().count,
      totalVoiceRecordings: voiceSnap.data().count,
      totalTranscriptions: transcriptSnap.data().count,
      totalAiReflections: reflectionSnap.data().count,
      totalPhotos: photoSnap.data().count,
      totalShareLinks: shareSnap.data().count,
      totalMorningIntentions: intentionSnap.data().count,
      totalEveningReflections: eveningSnap.data().count,
      moodDistribution,
    });
  } catch (err) {
    console.error("[content]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
