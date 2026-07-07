import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Hero } from "@/components/xuong-so/hero";
import { ContentLibrary } from "@/components/xuong-so/content-library";
import { ContentDetailModal } from "@/components/xuong-so/content-detail-modal";
import { SiteFooter } from "@/components/xuong-so/site-footer";
import { PROMPTS } from "@/data/prompts";
import { EMPTY_FILTER, type ContentFilter } from "@/lib/filter";
import type { PromptItem } from "@/data/types";

export const Route = createFileRoute("/")({
  component: XuongSoPage,
});

function XuongSoPage() {
  const [filter, setFilter] = useState<ContentFilter>(EMPTY_FILTER);
  const [selected, setSelected] = useState<PromptItem | null>(null);

  function scrollToContent() {
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#181D27]">
      <Hero filter={filter} onFilterChange={setFilter} scrollToContent={scrollToContent} />
      <ContentLibrary
        items={PROMPTS}
        filter={filter}
        onFilterChange={setFilter}
        onOpen={setSelected}
      />
      <SiteFooter />
      <ContentDetailModal item={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
