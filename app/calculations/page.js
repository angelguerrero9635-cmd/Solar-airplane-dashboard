import Frame from "@/components/Frame";
import MarkdownViewer from "@/components/MarkdownViewer";
import PageHeader from "@/components/PageHeader";

export default function CalculationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Calculations"
        title="Calc"
        desc="Power budget, wing loading, and battery SOC. The .py scripts and their write-ups are both Claude Code's job — this is a read-only view."
      />
      <Frame title="Power Budget" eyebrow="calculations/power_budget.md">
        <MarkdownViewer path="calculations/power_budget.md" />
      </Frame>
      <Frame title="Battery SOC" eyebrow="calculations/battery_soc.md">
        <MarkdownViewer path="calculations/battery_soc.md" />
      </Frame>
    </div>
  );
}
