import { AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";

import { PromptCard } from "./prompt-card";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import {
  CREAM,
  GRADES,
  MATERIAL_TYPES,
  MATERIAL_TYPE_INFO,
  STAGE_INFO,
  STAGE_ORDER,
  SUBJECTS,
  TOOLS,
  TOOL_INFO,
} from "@/data/taxonomy";
import { EMPTY_FILTER, filterPrompts, type PromptFilter } from "@/lib/filter";
import type { AiTool, MaterialType, PromptItem, StoryboardStage } from "@/data/types";

interface MaterialGalleryProps {
  items: PromptItem[];
  filter: PromptFilter;
  onFilterChange: (f: PromptFilter) => void;
  onOpen: (item: PromptItem) => void;
}

const SELECT_CLASSES =
  "cursor-pointer rounded-full border border-[#212121] bg-[#101010] px-3 py-1.5 text-sm text-gray-300 focus-visible:outline-2 focus-visible:outline-[#DEDBC8]";

function isFilterEmpty(f: PromptFilter): boolean {
  return (
    f.q === "" &&
    f.types.length === 0 &&
    f.stage === null &&
    f.subject === null &&
    f.grade === null &&
    f.tool === null
  );
}

export function MaterialGallery({ items, filter, onFilterChange, onOpen }: MaterialGalleryProps) {
  const visible = filterPrompts(items, filter);

  function toggleType(type: MaterialType) {
    const types = filter.types.includes(type)
      ? filter.types.filter((t) => t !== type)
      : [...filter.types, type];
    onFilterChange({ ...filter, types });
  }

  return (
    <section id="hoc-lieu" className="bg-black px-4 py-16 sm:px-6 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2
          className="mx-auto mb-3 max-w-3xl text-center text-3xl leading-tight sm:text-4xl md:text-5xl"
          style={{ color: CREAM }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "Kho prompt" },
              { text: "học liệu", className: "font-serif italic" },
            ]}
          />
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-500 sm:text-base">
          9 loại học liệu theo chuẩn Trường học số — lọc theo môn, khối, giai đoạn bài dạy.
        </p>

        {/* Filter bar sticky */}
        <div className="sticky top-0 z-40 -mx-2 mb-8 flex flex-col gap-3 rounded-b-2xl bg-black/70 px-2 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-0 flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                value={filter.q}
                onChange={(e) => onFilterChange({ ...filter, q: e.target.value })}
                placeholder="Tìm prompt học liệu…"
                aria-label="Tìm prompt học liệu"
                className="w-full rounded-full border border-[#212121] bg-[#101010] py-2 pr-4 pl-9 text-sm text-gray-200 placeholder:text-gray-600 focus-visible:outline-2 focus-visible:outline-[#DEDBC8]"
              />
            </div>
            <select
              value={filter.subject ?? ""}
              onChange={(e) => onFilterChange({ ...filter, subject: e.target.value || null })}
              aria-label="Lọc theo môn học"
              className={SELECT_CLASSES}
            >
              <option value="">Tất cả môn</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={filter.grade ?? ""}
              onChange={(e) => onFilterChange({ ...filter, grade: e.target.value || null })}
              aria-label="Lọc theo khối lớp"
              className={SELECT_CLASSES}
            >
              <option value="">Tất cả khối</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              value={filter.stage ?? ""}
              onChange={(e) =>
                onFilterChange({ ...filter, stage: (e.target.value || null) as StoryboardStage | null })
              }
              aria-label="Lọc theo giai đoạn bài dạy"
              className={SELECT_CLASSES}
            >
              <option value="">Mọi giai đoạn</option>
              {STAGE_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STAGE_INFO[s].label}
                </option>
              ))}
            </select>
            <select
              value={filter.tool ?? ""}
              onChange={(e) =>
                onFilterChange({ ...filter, tool: (e.target.value || null) as AiTool | null })
              }
              aria-label="Lọc theo công cụ AI"
              className={SELECT_CLASSES}
            >
              <option value="">Mọi công cụ</option>
              {TOOLS.map((t) => (
                <option key={t} value={t}>
                  {TOOL_INFO[t].label}
                </option>
              ))}
            </select>
            {!isFilterEmpty(filter) && (
              <button
                type="button"
                onClick={() => onFilterChange(EMPTY_FILTER)}
                className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#212121] px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
                Xóa bộ lọc
              </button>
            )}
          </div>

          {/* Chip 9 loại học liệu */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {MATERIAL_TYPES.map((type) => {
              const info = MATERIAL_TYPE_INFO[type];
              const active = filter.types.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleType(type)}
                  className="shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
                  style={
                    active
                      ? { backgroundColor: info.color, borderColor: info.color, color: "#000" }
                      : { borderColor: "#212121", color: "#9ca3af" }
                  }
                >
                  {info.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-600">{visible.length} prompt</p>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <PromptCard key={item.id} item={item} onOpen={onOpen} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#101010] px-6 py-16 text-center">
            <p className="text-gray-400">Chưa có prompt khớp bộ lọc.</p>
            <button
              type="button"
              onClick={() => onFilterChange(EMPTY_FILTER)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#212121] px-4 py-2 text-sm text-gray-300 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
