import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";

import { FilterSidebar } from "./filter-sidebar";
import { ContentMasonry } from "./content-masonry";
import { countByFormat, EMPTY_FILTER, filterContent, type ContentFilter } from "@/lib/filter";
import type { PromptItem } from "@/data/types";

interface ContentLibraryProps {
  items: PromptItem[];
  filter: ContentFilter;
  onFilterChange: (f: ContentFilter) => void;
  onOpen: (item: PromptItem) => void;
}

export function ContentLibrary({ items, filter, onFilterChange, onOpen }: ContentLibraryProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const counts = useMemo(() => countByFormat(items), [items]);
  const visible = useMemo(() => filterContent(items, filter), [items, filter]);

  return (
    <section id="content" className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden w-64 flex-none lg:block">
          <div className="sticky top-6">
            <FilterSidebar
              filter={filter}
              counts={counts}
              total={visible.length}
              onChange={onFilterChange}
            />
          </div>
        </aside>

        {/* Nội dung */}
        <div className="min-w-0 flex-1">
          {/* Thanh trên: tiêu đề + nút lọc mobile */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[#181D27]">Kho nội dung</h2>
              <p className="text-sm text-[#717680]">
                {visible.length} bài học &amp; học liệu — hover để xem thử ngay
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[#E9EAEB] bg-white px-4 py-2 text-sm font-medium text-[#344054] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Bộ lọc
            </button>
          </div>

          <ContentMasonry
            items={visible}
            onOpen={onOpen}
            onClearFilter={() => onFilterChange(EMPTY_FILTER)}
          />
        </div>
      </div>

      {/* Drawer lọc mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0C111D]/50 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-bold text-[#181D27]">Bộ lọc</span>
                <button
                  type="button"
                  aria-label="Đóng bộ lọc"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F4F7] text-[#535862]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterSidebar
                filter={filter}
                counts={counts}
                total={visible.length}
                onChange={onFilterChange}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
