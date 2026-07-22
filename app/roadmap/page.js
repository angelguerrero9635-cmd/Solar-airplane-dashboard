import Frame from "@/components/Frame";
import MarkdownViewer from "@/components/MarkdownViewer";
import PageHeader from "@/components/PageHeader";

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Phase Plan"
        title="Roadmap"
        desc="Prototype → production, with exit criteria for each phase."
      />
      <Frame eyebrow="docs/roadmap.md">
        <MarkdownViewer path="docs/roadmap.md" />
      </Frame>
    </div>
  );
}
