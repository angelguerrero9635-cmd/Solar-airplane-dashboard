import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function resolveSafe(relPath) {
  const resolved = path.resolve(CONTENT_ROOT, relPath);
  if (resolved !== CONTENT_ROOT && !resolved.startsWith(CONTENT_ROOT + path.sep)) {
    return null;
  }
  return resolved;
}

export function getFile(relPath) {
  const filePath = resolveSafe(relPath);
  if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return null;
  }
  return { content: fs.readFileSync(filePath, "utf-8"), path: relPath };
}

export function listDir(relPath) {
  const dirPath = resolveSafe(relPath);
  if (!dirPath || !fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return [];
  }
  return fs.readdirSync(dirPath, { withFileTypes: true }).map((entry) => ({
    name: entry.name,
    path: path.posix.join(relPath, entry.name),
    type: entry.isDirectory() ? "dir" : "file",
  }));
}

export function getSnapshotInfo() {
  const meta = getFile("_meta.json");
  if (!meta) return null;
  const data = JSON.parse(meta.content);
  return {
    sha: data.sourceCommit.slice(0, 7),
    message: data.sourceCommitMessage,
    date: data.copiedAt,
  };
}
