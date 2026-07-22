import Frame from "@/components/Frame";
import MarkdownViewer from "@/components/MarkdownViewer";
import PageHeader from "@/components/PageHeader";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Test Log"
        title="Logs"
        desc="Dated bench test and flight test entries. New entries are added through Claude Code — this is a read-only view."
      />
      <Frame eyebrow="logs/test_flights.md">
        <MarkdownViewer path="logs/test_flights.md" />
      </Frame>
    </div>
  );
}
