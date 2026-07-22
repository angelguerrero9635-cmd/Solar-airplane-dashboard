import Frame from "@/components/Frame";
import MarkdownViewer from "@/components/MarkdownViewer";
import PageHeader from "@/components/PageHeader";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Project Rulebook"
        title="CLAUDE.md"
        desc="The single file every Claude session reads first. Edits happen through Claude Code, not here — this is a read-only view."
      />
      <Frame eyebrow="Root · Source of Truth">
        <MarkdownViewer path="CLAUDE.md" label="CLAUDE.md" />
      </Frame>
    </div>
  );
}
