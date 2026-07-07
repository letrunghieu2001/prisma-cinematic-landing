import { Search, X } from "lucide-react";

import {
  BRAND,
  FORMAT_INFO,
  FORMAT_ORDER,
  GRADES,
  STAGE_INFO,
  STAGE_ORDER,
  SUBJECTS,
  TOOLS,
  TOOL_INFO,
} from "@/data/taxonomy";
import { isFilterEmpty, type ContentFilter } from "@/lib/filter";
import type { AiTool, ContentFormat, PromptAccess, StoryboardStage } from "@/data/types";

interface FilterSidebarProps {
  filter: ContentFilter;
  counts: Record<ContentFormat, number>;
  total: number;
  onChange: (f: ContentFilter) => void;
}

function GroupTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-2 text-xs font-semibold tracking-wide text-[#717680] uppercase">
      {children}
    </h3>
  );
}

/** Chip chọn đơn: bấm lại để bỏ chọn */
function PillGroup<T extends string>({
  options,
  value,
  onSelect,
  labelOf,
}: {
  options: T[];
  value: T | null;
  onSelect: (v: T | null) => void;
  labelOf: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(active ? null : opt)}
            className="rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors"
            style={
              active
                ? { backgroundColor: BRAND.primary, borderColor: BRAND.primary, color: "#fff" }
                : { borderColor: "#E9EAEB", color: "#535862", backgroundColor: "#fff" }
            }
          >
            {labelOf(opt)}
          </button>
        );
      })}
    </div>
  );
}

export function FilterSidebar({ filter, counts, total, onChange }: FilterSidebarProps) {
  function toggleFormat(fmt: ContentFormat) {
    const formats = filter.formats.includes(fmt)
      ? filter.formats.filter((f) => f !== fmt)
      : [...filter.formats, fmt];
    onChange({ ...filter, formats });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#717680]" />
        <input
          type="search"
          value={filter.q}
          onChange={(e) => onChange({ ...filter, q: e.target.value })}
          placeholder="Tìm nội dung…"
          aria-label="Tìm nội dung"
          className="w-full rounded-full border border-[#E9EAEB] bg-white py-2.5 pr-4 pl-9 text-sm text-[#181D27] placeholder:text-[#98A2B3] focus-visible:border-[#0061AF] focus-visible:outline-2 focus-visible:outline-[#0061AF]"
        />
      </div>

      {!isFilterEmpty(filter) && (
        <button
          type="button"
          onClick={() =>
            onChange({
              ...filter,
              q: "",
              formats: [],
              stage: null,
              subject: null,
              grade: null,
              tool: null,
              access: null,
            })
          }
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F0F6FE] px-3 py-1.5 text-[13px] font-medium"
          style={{ color: BRAND.primary }}
        >
          <X className="h-3.5 w-3.5" /> Xóa bộ lọc
        </button>
      )}

      {/* Định dạng */}
      <div>
        <GroupTitle>Định dạng</GroupTitle>
        <ul className="flex flex-col gap-0.5">
          {FORMAT_ORDER.map((fmt) => {
            const info = FORMAT_INFO[fmt];
            const active = filter.formats.includes(fmt);
            return (
              <li key={fmt}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleFormat(fmt)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-[#F9FAFB]"
                  style={active ? { backgroundColor: info.bg } : undefined}
                >
                  <span
                    className="h-2.5 w-2.5 flex-none rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <span
                    className="flex-1 font-medium"
                    style={{ color: active ? info.color : "#344054" }}
                  >
                    {info.label}
                  </span>
                  <span className="text-xs text-[#98A2B3]">{counts[fmt]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Giai đoạn */}
      <div>
        <GroupTitle>Giai đoạn bài dạy</GroupTitle>
        <PillGroup<StoryboardStage>
          options={STAGE_ORDER}
          value={filter.stage}
          onSelect={(v) => onChange({ ...filter, stage: v })}
          labelOf={(v) => STAGE_INFO[v].label}
        />
      </div>

      {/* Môn */}
      <div>
        <GroupTitle>Môn học</GroupTitle>
        <PillGroup<string>
          options={SUBJECTS}
          value={filter.subject}
          onSelect={(v) => onChange({ ...filter, subject: v })}
          labelOf={(v) => v}
        />
      </div>

      {/* Khối */}
      <div>
        <GroupTitle>Khối lớp</GroupTitle>
        <PillGroup<string>
          options={GRADES}
          value={filter.grade}
          onSelect={(v) => onChange({ ...filter, grade: v })}
          labelOf={(v) => v}
        />
      </div>

      {/* Công cụ */}
      <div>
        <GroupTitle>Công cụ AI</GroupTitle>
        <PillGroup<AiTool>
          options={TOOLS}
          value={filter.tool}
          onSelect={(v) => onChange({ ...filter, tool: v })}
          labelOf={(v) => TOOL_INFO[v].label}
        />
      </div>

      {/* Truy cập */}
      <div>
        <GroupTitle>Truy cập</GroupTitle>
        <PillGroup<PromptAccess>
          options={["free", "premium"]}
          value={filter.access}
          onSelect={(v) => onChange({ ...filter, access: v })}
          labelOf={(v) => (v === "free" ? "Miễn phí" : "Premium")}
        />
      </div>

      <p className="border-t border-[#E9EAEB] pt-4 text-xs text-[#717680]">
        Đang có <span className="font-semibold text-[#181D27]">{total}</span> nội dung
      </p>
    </div>
  );
}
