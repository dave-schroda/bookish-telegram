import { NextResponse } from "next/server";

export async function GET() {
  // OPTIONAL: read cart state via Woo Store API (`/cart`)
  return NextResponse.json({ ok: true, items: [] });
}
