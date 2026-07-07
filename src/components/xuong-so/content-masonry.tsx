import { AnimatePresence } from "motion/react";
import { SearchX } from "lucide-react";

import { ContentCard } from "./content-card";
import type { PromptItem } from "@/data/types";

interface ContentMasonryProps {
  items: PromptItem[];
  onOpen: (item: PromptItem) => void;
  onClearFilter: () => void;
}

/** Lưới masonry (CSS columns) — card cao thấp khác nhau tạo nhịp Pinterest */
export function ContentMasonry({ items, onOpen, onClearFilter }: ContentMasonryProps) {
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
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      <AnimatePresence>
        {items.map((item) => (
          <ContentCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </AnimatePresence>
    </div>
  );
}
