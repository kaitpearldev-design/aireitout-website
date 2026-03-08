import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/admin-auth";
import { verifyAndConsumeCode } from "@/lib/admin-2fa";

/** POST /api/admin/auth/verify — verify 2FA code, set session cookie */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { code } = body as { code?: string };

  if (!code || !verifyAndConsumeCode(code)) {
    return NextResponse.json(
      { error: "Incorrect code. Please try again." },
      { status: 401 }
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const token = await hashPassword(adminPassword);
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
  return response;
}
