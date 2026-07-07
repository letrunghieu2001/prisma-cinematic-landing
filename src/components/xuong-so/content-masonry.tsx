import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { SearchX } from "lucide-react";

import { ContentCard } from "./content-card";
import type { PromptItem } from "@/data/types";

interface ContentMasonryProps {
  items: PromptItem[];
  onOpen: (item: PromptItem) => void;
  onClearFilter: () => void;
}

/** Ngưỡng hiển thị tối thiểu để một card được coi là "đang xem" trên touch */
const MIN_ACTIVE_RATIO = 0.55;

/** Lưới masonry (CSS columns) — card cao thấp khác nhau tạo nhịp Pinterest */
export function ContentMasonry({ items, onOpen, onClearFilter }: ContentMasonryProps) {
  // Desktop có hover → dùng hover; touch → tự chạy theo cuộn (1 content/lần)
  const [hoverCapable, setHoverCapable] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    setHoverCapable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const handleVisible = useCallback((id: string, ratio: number) => {
    ratios.current.set(id, ratio);
    let bestId: string | null = null;
    let best = MIN_ACTIVE_RATIO;
    for (const [key, value] of ratios.current) {
      if (value > best) {
        best = value;
        bestId = key;
      }
    }
    setActiveId((prev) => (prev === bestId ? prev : bestId));
  }, []);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E9EAEB] bg-white px-6 py-20 text-center">
        <SearchX className="h-10 w-10 text-[#98A2B3]" />
        <p className="text-[#535862]">Chưa có nội dung khớp bộ lọc.</p>
        <button
          type="button"
          onClick={onClearFilter}
          className="rounded-full bg-[#F0F6FE] px-4 py-2 text-sm font-medium text-[#0061AF] transition-colors hover:bg-[#E0EDFC]"
        >
          Xóa bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-4 min-[520px]:columns-2 lg:columns-3 xl:columns-4">
      <AnimatePresence>
        {items.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onOpen={onOpen}
            hoverCapable={hoverCapable}
            autoActive={activeId === item.id}
            onVisible={handleVisible}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
