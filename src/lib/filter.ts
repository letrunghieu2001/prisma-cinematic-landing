import { formatOf } from "@/data/types";
import type {
  AiTool,
  ContentFormat,
  PromptAccess,
  PromptItem,
  StoryboardStage,
} from "@/data/types";
import { FORMAT_ORDER } from "@/data/taxonomy";

export interface ContentFilter {
  q: string;
  /** Rỗng = mọi định dạng */
  formats: ContentFormat[];
  stage: StoryboardStage | null;
  subject: string | null;
  grade: string | null;
  tool: AiTool | null;
  access: PromptAccess | null;
}

export const EMPTY_FILTER: ContentFilter = {
  q: "",
  formats: [],
  stage: null,
  subject: null,
  grade: null,
  tool: null,
  access: null,
};

/** Thường hóa + bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu */
export function normalizeVi(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replaceAll("đ", "d");
}

function matchesQuery(item: PromptItem, q: string): boolean {
  if (!q.trim()) return true;
  const haystack = normalizeVi(`${item.title} ${item.description} ${item.subject} ${item.grade}`);
  return normalizeVi(q)
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

/** Lọc AND giữa các facet; trả về mảng mới, không mutate đầu vào */
export function filterContent(items: PromptItem[], f: ContentFilter): PromptItem[] {
  return items.filter((item) => {
    if (!matchesQuery(item, f.q)) return false;
    if (f.formats.length > 0 && !f.formats.includes(formatOf(item))) return false;
    if (f.stage && item.stage !== f.stage) return false;
    if (f.subject && item.subject !== f.subject) return false;
    if (f.grade && item.grade !== f.grade) return false;
    if (f.tool && !item.tools.includes(f.tool)) return false;
    if (f.access && item.access !== f.access) return false;
    return true;
  });
}

/** Đếm số nội dung theo từng định dạng (cho badge ở sidebar) */
export function countByFormat(items: PromptItem[]): Record<ContentFormat, number> {
  const counts = Object.fromEntries(FORMAT_ORDER.map((fmt) => [fmt, 0])) as Record<
    ContentFormat,
    number
  >;
  for (const item of items) {
    counts[formatOf(item)] += 1;
  }
  return counts;
}

export function isFilterEmpty(f: ContentFilter): boolean {
  return (
    f.q === "" &&
    f.formats.length === 0 &&
    f.stage === null &&
    f.subject === null &&
    f.grade === null &&
    f.tool === null &&
    f.access === null
  );
}
