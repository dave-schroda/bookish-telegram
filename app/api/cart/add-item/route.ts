import { NextRequest, NextResponse } from "next/server";

const STORE = `${process.env.WP_URL}/wp-json/wc/store/v1`;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const upstream = await fetch(`${STORE}/cart/add-item`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: req.headers.get("cookie") ?? "" },
    body,
    credentials: "include",
  });
  const text = await upstream.text();
  const res = new NextResponse(text, { status: upstream.status });
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);
  return res;
}
