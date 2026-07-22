import Frame from "@/components/Frame";
import MarkdownViewer from "@/components/MarkdownViewer";
import PageHeader from "@/components/PageHeader";

export default function SpecsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Specifications"
        title="Specs"
        desc="Component tables and datasheet extractions."
      />
      <Frame title="Components" eyebrow="specs/components.md">
        <MarkdownViewer path="specs/components.md" />
      </Frame>
      <Frame title="SunPower C60" eyebrow="specs/datasheets/sunpower_c60.md">
        <MarkdownViewer path="specs/datasheets/sunpower_c60.md" />
      </Frame>
    </div>
  );
}
