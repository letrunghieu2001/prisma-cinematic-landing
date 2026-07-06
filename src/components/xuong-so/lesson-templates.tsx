import { X } from "lucide-react";

import { LessonCard } from "./lesson-card";
import { RevealCard } from "@/components/motion/reveal";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { CREAM, STAGE_INFO } from "@/data/taxonomy";
import type { PromptItem, StoryboardStage } from "@/data/types";

interface LessonTemplatesProps {
  items: PromptItem[];
  activeStage: StoryboardStage | null;
  onOpen: (item: PromptItem) => void;
  onClearStage: () => void;
}

export function LessonTemplates({ items, activeStage, onOpen, onClearStage }: LessonTemplatesProps) {
  return (
    <section id="bai-hoc" className="relative bg-black px-4 py-16 sm:px-6 sm:py-24 md:px-10">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <h2
          className="mx-auto mb-3 max-w-3xl text-center text-3xl leading-tight sm:text-4xl md:text-5xl"
          style={{ color: CREAM }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "Template" },
              { text: "bài học", className: "font-serif italic" },
              { text: "HTML" },
            ]}
          />
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-500 sm:text-base">
          Copy prompt — dán vào Lovable, v0, Claude… — nhận về web bài học hoàn chỉnh.
        </p>

        {activeStage && (
          <div className="mb-8 flex justify-center">
            <button
              type="button"
              onClick={onClearStage}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#212121] px-4 py-2 text-sm text-gray-300 transition-colors hover:border-[#3a3a3a] hover:text-white"
            >
              <X className="h-4 w-4" />
              Bỏ lọc giai đoạn: {STAGE_INFO[activeStage].label}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <RevealCard key={item.id} index={i % 2}>
              <LessonCard
                item={item}
                onOpen={onOpen}
                dimmed={activeStage != null && item.stage !== activeStage}
              />
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
