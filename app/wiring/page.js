import Frame from "@/components/Frame";
import MarkdownViewer from "@/components/MarkdownViewer";
import PageHeader from "@/components/PageHeader";

export default function WiringPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="System Diagram"
        title="Wiring"
        desc="Block-level power and signal path — see the page for known unknowns and what's still TBD."
      />
      <Frame eyebrow="specs/wiring_diagram.md">
        <MarkdownViewer path="specs/wiring_diagram.md" />
      </Frame>
    </div>
  );
}
