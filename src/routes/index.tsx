import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Hero } from "@/components/xuong-so/hero";
import { StoryboardStrip } from "@/components/xuong-so/storyboard-strip";
import { LessonTemplates } from "@/components/xuong-so/lesson-templates";
import { MaterialGallery } from "@/components/xuong-so/material-gallery";
import { ProcessSteps } from "@/components/xuong-so/process-steps";
import { Pricing } from "@/components/xuong-so/pricing";
import { SiteFooter } from "@/components/xuong-so/site-footer";
import { PromptDetailModal } from "@/components/xuong-so/prompt-detail-modal";
import { PROMPTS } from "@/data/prompts";
import { countByStage } from "@/lib/filter";
import { EMPTY_FILTER, type PromptFilter } from "@/lib/filter";
import type { PromptItem, StoryboardStage } from "@/data/types";

export const Route = createFileRoute("/")({
  component: XuongSoPage,
});

function XuongSoPage() {
  const [filter, setFilter] = useState<PromptFilter>(EMPTY_FILTER);
  const [selected, setSelected] = useState<PromptItem | null>(null);

  const lessons = useMemo(() => PROMPTS.filter((p) => p.kind === "lesson-website"), []);
  const materials = useMemo(() => PROMPTS.filter((p) => p.kind === "material"), []);
  const stageCounts = useMemo(() => countByStage(PROMPTS), []);

  function handleSelectStage(stage: StoryboardStage) {
    setFilter((f) => ({ ...f, stage }));
    document.getElementById("bai-hoc")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="bg-black text-[#E1E0CC]">
      <Hero />
      <StoryboardStrip counts={stageCounts} onSelectStage={handleSelectStage} />
      <LessonTemplates
        items={lessons}
        activeStage={filter.stage}
        onOpen={setSelected}
        onClearStage={() => setFilter((f) => ({ ...f, stage: null }))}
      />
      <MaterialGallery
        items={materials}
        filter={filter}
        onFilterChange={setFilter}
        onOpen={setSelected}
      />
      <ProcessSteps />
      <Pricing />
      <SiteFooter />
      <PromptDetailModal item={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
