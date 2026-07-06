import type { AiTool, MaterialType, PromptItem, StoryboardStage } from "@/data/types";
import { STAGE_ORDER } from "@/data/taxonomy";

export interface PromptFilter {
  q: string;
  /** Rỗng = tất cả các loại */
  types: MaterialType[];
  stage: StoryboardStage | null;
  subject: string | null;
  grade: string | null;
  tool: AiTool | null;
}

export const EMPTY_FILTER: PromptFilter = {
  q: "",
  types: [],
  stage: null,
  subject: null,
  grade: null,
  tool: null,
};

/** Thường hóa + bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu */
export function normalizeVi(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replaceAll("đ", "d");
}

function matchesQuery(item: PromptItem, q: string): boolean {
  if (!q.trim()) return true;
  const haystack = normalizeVi(`${item.title} ${item.description} ${item.subject}`);
  return normalizeVi(q)
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

/** Lọc AND giữa các facet; trả về mảng mới, không mutate đầu vào */
export function filterPrompts(items: PromptItem[], f: PromptFilter): PromptItem[] {
  return items.filter((item) => {
    if (!matchesQuery(item, f.q)) return false;
    if (f.types.length > 0) {
      if (!item.materialType || !f.types.includes(item.materialType)) return false;
    }
    if (f.stage && item.stage !== f.stage) return false;
    if (f.subject && item.subject !== f.subject) return false;
    if (f.grade && item.grade !== f.grade) return false;
    if (f.tool && !item.tools.includes(f.tool)) return false;
    return true;
  });
}

/** Đếm số prompt theo từng giai đoạn bài dạy */
export function countByStage(items: PromptItem[]): Record<StoryboardStage, number> {
  const counts = Object.fromEntries(STAGE_ORDER.map((s) => [s, 0])) as Record<
    StoryboardStage,
    number
  >;
  for (const item of items) {
    if (item.stage) counts[item.stage] += 1;
  }
  return counts;
}
