import { NextResponse } from "next/server";
import { getFile } from "@/lib/content";

const MIME_TYPES = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }
  const file = getFile(path);
  if (!file) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const ext = path.split(".").pop().toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  return new NextResponse(file.content, {
    headers: { "Content-Type": contentType },
  });
}
