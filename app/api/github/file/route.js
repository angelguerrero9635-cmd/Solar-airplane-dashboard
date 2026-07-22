import { NextResponse } from "next/server";
import { getFile } from "@/lib/github";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }
  try {
    const file = await getFile(path);
    if (!file) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json(file);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
