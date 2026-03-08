import { NextRequest, NextResponse } from "next/server";
import { generateCode, storeCode } from "@/lib/admin-2fa";
import nodemailer from "nodemailer";

async function sendVerificationCode(code: string) {
  const email = process.env.ADMIN_EMAIL;
  const appPassword = process.env.EMAIL_APP_PASSWORD;

  if (!email || !appPassword) {
    throw new Error("ADMIN_EMAIL or EMAIL_APP_PASSWORD not set in environment");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: email, pass: appPassword },
  });

  await transporter.sendMail({
    from: `"Aire It Out Admin" <${email}>`,
    to: email,
    subject: "Your admin verification code",
    text: `Your verification code is: ${code}\n\nThis code expires in 10 minutes.`,
    html: `<p style="font-family:sans-serif">Your admin verification code is:</p><p style="font-family:monospace;font-size:32px;font-weight:bold;letter-spacing:6px">${code}</p><p style="font-family:sans-serif;color:#888">This code expires in 10 minutes.</p>`,
  });
}

/** POST /api/admin/auth — verify password, send 2FA code */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !password || password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const code = generateCode();
  storeCode(code);

  try {
    await sendVerificationCode(code);
  } catch (err) {
    console.error("[2fa] Failed to send email:", err);
    return NextResponse.json(
      { error: "Failed to send verification email. Check ADMIN_EMAIL and EMAIL_APP_PASSWORD in .env.local." },
      { status: 500 }
    );
  }

  return NextResponse.json({ step: "verify" });
}

/** DELETE /api/admin/auth — clear session cookie */
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}

