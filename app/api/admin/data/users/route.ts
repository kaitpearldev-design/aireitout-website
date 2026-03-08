import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import type { Query, CollectionReference } from "firebase-admin/firestore";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") ?? "";
  const filter = searchParams.get("filter") ?? "all";
  const limitParam = Math.min(
    parseInt(searchParams.get("limit") ?? "200"),
    500
  );

  try {
    const db = getDb();
    const col = db.collection("users") as CollectionReference;

    let q: Query = col.orderBy("createdAt", "desc").limit(limitParam);

    if (filter === "pro") {
      q = col
        .where("isPro", "==", true)
        .orderBy("createdAt", "desc")
        .limit(limitParam);
    } else if (filter === "free") {
      q = col
        .where("isPro", "==", false)
        .orderBy("createdAt", "desc")
        .limit(limitParam);
    }

    const snap = await q.get();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let users = snap.docs.map((doc: any) => {
      const d = doc.data();
      return {
        id: doc.id,
        email: d.email ?? "—",
        createdAt: d.createdAt?.toDate?.()?.toISOString() ?? null,
        isPro: d.isPro ?? false,
        streak: d.streak ?? 0,
        entryCount: d.entryCount ?? 0,
        lastActive: d.lastActive?.toDate?.()?.toISOString() ?? null,
      };
    });

    // Firestore doesn't support full-text search — filter client-side.
    if (search) {
      const q2 = search.toLowerCase();
      users = users.filter((u) => u.email.toLowerCase().includes(q2));
    }

    return NextResponse.json({ users });
  } catch (err) {
    console.error("[users]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
