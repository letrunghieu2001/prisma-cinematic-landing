import { describe, expect, it } from "vitest";

import type { PromptItem } from "@/data/types";
import { EMPTY_FILTER, countByStage, filterPrompts, normalizeVi } from "./filter";

const make = (over: Partial<PromptItem>): PromptItem => ({
  id: "x",
  slug: "x",
  title: "Tiêu đề",
  description: "Mô tả",
  kind: "material",
  materialType: "audio",
  stage: "khoi-dong",
  subject: "Toán",
  grade: "Lớp 7",
  tools: ["claude"],
  access: "free",
  prompt: "p".repeat(400),
  copies: 1,
  ...over,
});

const items = [
  make({ id: "a", title: "Vòng quay khởi động" }),
  make({
    id: "b",
    materialType: "exam",
    stage: "luyen-tap",
    subject: "Tiếng Anh",
    grade: "Lớp 9",
    tools: ["lovable"],
  }),
  make({ id: "c", kind: "lesson-website", materialType: undefined, stage: "van-dung" }),
];

describe("normalizeVi", () => {
  it("bỏ dấu và thường hóa", () => {
    expect(normalizeVi("Vòng Quay Khởi Động")).toBe("vong quay khoi dong");
    expect(normalizeVi("Đuổi hình")).toBe("duoi hinh");
  });
});

describe("filterPrompts", () => {
  it("EMPTY_FILTER trả về tất cả", () => {
    expect(filterPrompts(items, EMPTY_FILTER)).toHaveLength(3);
  });

  it("tìm kiếm không dấu khớp có dấu", () => {
    expect(filterPrompts(items, { ...EMPTY_FILTER, q: "vong quay" })).toEqual([items[0]]);
  });

  it("lọc types loại trừ lesson-website", () => {
    expect(filterPrompts(items, { ...EMPTY_FILTER, types: ["exam"] })).toEqual([items[1]]);
  });

  it("kết hợp stage + tool (AND)", () => {
    expect(filterPrompts(items, { ...EMPTY_FILTER, stage: "luyen-tap", tool: "lovable" })).toEqual([
      items[1],
    ]);
    expect(filterPrompts(items, { ...EMPTY_FILTER, stage: "luyen-tap", tool: "claude" })).toEqual(
      [],
    );
  });

  it("lọc subject và grade", () => {
    expect(filterPrompts(items, { ...EMPTY_FILTER, subject: "Tiếng Anh" })).toEqual([items[1]]);
    expect(filterPrompts(items, { ...EMPTY_FILTER, grade: "Lớp 7" })).toHaveLength(2);
  });

  it("không mutate mảng gốc", () => {
    const before = [...items];
    filterPrompts(items, { ...EMPTY_FILTER, q: "x" });
    expect(items).toEqual(before);
  });
});

describe("countByStage", () => {
  it("đếm đủ 4 giai đoạn", () => {
    expect(countByStage(items)).toEqual({
      "khoi-dong": 1,
      "hinh-thanh": 0,
      "luyen-tap": 1,
      "van-dung": 1,
    });
  });
});
