import { NextResponse } from "next/server";
import { getSnapshotInfo } from "@/lib/content";

export async function GET() {
  const info = getSnapshotInfo();
  if (!info) {
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
  return NextResponse.json(info);
}
