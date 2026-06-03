import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "fallback-secret"
);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (
    email.toLowerCase().trim() !== (process.env.ADMIN_EMAIL ?? "").toLowerCase().trim() ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
