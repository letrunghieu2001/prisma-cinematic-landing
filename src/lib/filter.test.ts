import { describe, expect, it } from "vitest";

import type { PromptItem } from "@/data/types";
import { EMPTY_FILTER, countByFormat, filterContent, isFilterEmpty, normalizeVi } from "./filter";

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
  demoUrl: "/demos/x.html",
  size: "md",
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
    access: "premium",
  }),
  make({ id: "c", kind: "lesson-website", materialType: undefined, stage: "van-dung" }),
];

describe("normalizeVi", () => {
  it("bỏ dấu và thường hóa", () => {
    expect(normalizeVi("Vòng Quay Khởi Động")).toBe("vong quay khoi dong");
    expect(normalizeVi("Đuổi hình")).toBe("duoi hinh");
  });
});

describe("filterContent", () => {
  it("EMPTY_FILTER trả về tất cả", () => {
    expect(filterContent(items, EMPTY_FILTER)).toHaveLength(3);
  });

  it("tìm kiếm không dấu khớp có dấu", () => {
    expect(filterContent(items, { ...EMPTY_FILTER, q: "vong quay" })).toEqual([items[0]]);
  });

  it("lọc theo định dạng gộp cả bài học", () => {
    expect(filterContent(items, { ...EMPTY_FILTER, formats: ["exam"] })).toEqual([items[1]]);
    expect(filterContent(items, { ...EMPTY_FILTER, formats: ["lesson-website"] })).toEqual([
      items[2],
    ]);
    expect(filterContent(items, { ...EMPTY_FILTER, formats: ["audio", "exam"] })).toHaveLength(2);
  });

  it("lọc access free/premium", () => {
    expect(filterContent(items, { ...EMPTY_FILTER, access: "premium" })).toEqual([items[1]]);
    expect(filterContent(items, { ...EMPTY_FILTER, access: "free" })).toHaveLength(2);
  });

  it("kết hợp stage + tool (AND)", () => {
    expect(filterContent(items, { ...EMPTY_FILTER, stage: "luyen-tap", tool: "lovable" })).toEqual([
      items[1],
    ]);
    expect(filterContent(items, { ...EMPTY_FILTER, stage: "luyen-tap", tool: "claude" })).toEqual(
      [],
    );
  });

  it("không mutate mảng gốc", () => {
    const before = [...items];
    filterContent(items, { ...EMPTY_FILTER, q: "x" });
    expect(items).toEqual(before);
  });
});

describe("countByFormat", () => {
  it("đếm đúng theo định dạng, gồm bài học", () => {
    const c = countByFormat(items);
    expect(c["audio"]).toBe(1);
    expect(c["exam"]).toBe(1);
    expect(c["lesson-website"]).toBe(1);
    expect(c["video"]).toBe(0);
  });
});

describe("isFilterEmpty", () => {
  it("nhận biết bộ lọc rỗng", () => {
    expect(isFilterEmpty(EMPTY_FILTER)).toBe(true);
    expect(isFilterEmpty({ ...EMPTY_FILTER, access: "free" })).toBe(false);
  });
});
