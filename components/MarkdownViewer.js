"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ path, label }) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  async function load() {
    setStatus("loading");
    try {
      const res = await fetch(
        `/api/content/file?path=${encodeURIComponent(path)}`
      );
      if (res.status === 404) {
        setContent("");
        setStatus("missing");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setContent(data.content);
      setStatus("ready");
    } catch (e) {
      setError(e.message);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-signal">
          {label || path}
        </span>
        <StatusLabel status={status} />
      </div>

      {status === "loading" && (
        <p className="font-mono text-xs text-slate-signal">
          Loading {path}…
        </p>
      )}

      {status === "missing" && (
        <p className="font-mono text-xs text-amber-signal">
          {path} isn&apos;t in this content snapshot.
        </p>
      )}

      {status === "error" && (
        <p className="font-mono text-xs text-amber-signal">Error: {error}</p>
      )}

      {status === "ready" && content && (
        <article className="prose-blueprint max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      )}
    </div>
  );
}

function StatusLabel({ status }) {
  const map = {
    ready: ["READ-ONLY", "text-slate-signal"],
    error: ["ERROR", "text-amber-signal"],
    missing: ["NOT FOUND", "text-amber-signal"],
    loading: ["LOADING", "text-slate-signal"],
  };
  const [text, cls] = map[status] || ["", ""];
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest">
      <span className={cls}>{text}</span>
    </span>
  );
}
