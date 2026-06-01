import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { jwtVerify } from "jose";
import { FieldValue } from "firebase-admin/firestore";

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET ?? "fallback-secret");

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// GET: list all articles (published only for public, all for admin)
export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  const onlyPublished = req.nextUrl.searchParams.get("all") !== "true" || !isAdmin;

  let query = adminDb.collection("blog_articles").orderBy("createdAt", "desc");
  if (onlyPublished) {
    query = query.where("published", "==", true) as typeof query;
  }

  const snap = await query.get();
  const articles = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(articles);
}

// POST: create article (admin only)
export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const body = await req.json();
  const now = new Date().toISOString();

  const ref = await adminDb.collection("blog_articles").add({
    ...body,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ id: ref.id });
}
