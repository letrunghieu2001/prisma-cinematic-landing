import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { PROMPTS } from "./prompts";
import { FORMAT_INFO, GRADES, STAGE_INFO, SUBJECTS, TOOL_INFO } from "./taxonomy";
import { formatOf } from "./types";

const SIZES = ["sm", "md", "lg", "xl"];

describe("PROMPTS data integrity", () => {
  it("có đúng 30 item, slug/id duy nhất", () => {
    expect(PROMPTS).toHaveLength(30);
    expect(new Set(PROMPTS.map((p) => p.id)).size).toBe(30);
    expect(new Set(PROMPTS.map((p) => p.slug)).size).toBe(30);
  });

  it("định dạng hợp lệ (bài học hoặc 1 trong 9 loại học liệu)", () => {
    for (const p of PROMPTS) {
      expect(Object.keys(FORMAT_INFO)).toContain(formatOf(p));
      if (p.kind === "lesson-website") expect(Object.keys(STAGE_INFO)).toContain(p.stage);
    }
  });

  it("subject/grade/tools thuộc taxonomy", () => {
    for (const p of PROMPTS) {
      expect(SUBJECTS).toContain(p.subject);
      expect(GRADES).toContain(p.grade);
      expect(p.tools.length).toBeGreaterThan(0);
      for (const t of p.tools) expect(Object.keys(TOOL_INFO)).toContain(t);
    }
  });

  it("mọi item có size hợp lệ và demoUrl theo id", () => {
    for (const p of PROMPTS) {
      expect(SIZES).toContain(p.size);
      expect(p.demoUrl).toBe(`/demos/${p.id}.html`);
    }
  });

  it("mọi demoUrl trỏ tới file tồn tại trong public/demos", () => {
    const files = readdirSync("public/demos");
    for (const p of PROMPTS) {
      expect(files, `thiếu demo cho ${p.id}`).toContain(`${p.id}.html`);
    }
  });

  it("prompt thật: >= 400 ký tự, không lorem; free = 21 item", () => {
    for (const p of PROMPTS) {
      expect(p.prompt.length, `prompt quá ngắn: ${p.id}`).toBeGreaterThanOrEqual(400);
      expect(p.prompt.toLowerCase()).not.toContain("lorem");
    }
    expect(PROMPTS.filter((p) => p.access === "free")).toHaveLength(21);
  });
});
