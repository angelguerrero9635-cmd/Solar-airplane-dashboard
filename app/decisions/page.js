"use client";
import { useEffect, useState } from "react";
import Frame from "@/components/Frame";
import MarkdownViewer from "@/components/MarkdownViewer";
import PageHeader from "@/components/PageHeader";

export default function DecisionsPage() {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    loadList();
  }, []);

  async function loadList() {
    setStatus("loading");
    const res = await fetch("/api/github/dir?dir=decisions");
    const data = await res.json();
    const mdFiles = (Array.isArray(data) ? data : [])
      .filter((f) => f.name.endsWith(".md") && f.name !== "0000-template.md")
      .sort((a, b) => a.name.localeCompare(b.name));
    setFiles(mdFiles);
    setStatus("ready");
    if (mdFiles.length) setSelected((s) => s || mdFiles[mdFiles.length - 1].path);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Decision Records"
        title="ADRs"
        desc="Numbered records of significant design choices — what was considered, what was picked, and why."
      />
      <Frame eyebrow="decisions/">
        <div className="flex flex-wrap items-center gap-2">
          {status === "loading" && (
            <span className="font-mono text-xs text-slate-signal">
              Loading…
            </span>
          )}
          {files.map((f) => (
            <button
              key={f.path}
              onClick={() => setSelected(f.path)}
              className={`border px-3 py-1.5 font-mono text-xs ${
                selected === f.path
                  ? "border-cyanline text-cyanline"
                  : "border-blueprint-600 text-slate-signal hover:text-ink"
              }`}
            >
              {f.name.replace(".md", "")}
            </button>
          ))}
        </div>
      </Frame>

      {selected && (
        <Frame eyebrow={selected}>
          <MarkdownViewer path={selected} />
        </Frame>
      )}
    </div>
  );
}
