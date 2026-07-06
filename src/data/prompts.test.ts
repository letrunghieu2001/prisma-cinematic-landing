import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { PROMPTS } from "./prompts";
import { GRADES, MATERIAL_TYPE_INFO, STAGE_INFO, SUBJECTS, TOOL_INFO } from "./taxonomy";

describe("PROMPTS data integrity", () => {
  it("có đúng 30 item, slug/id duy nhất", () => {
    expect(PROMPTS).toHaveLength(30);
    expect(new Set(PROMPTS.map((p) => p.id)).size).toBe(30);
    expect(new Set(PROMPTS.map((p) => p.slug)).size).toBe(30);
  });

  it("material có materialType hợp lệ; lesson-website có stage", () => {
    for (const p of PROMPTS) {
      if (p.kind === "material") {
        expect(Object.keys(MATERIAL_TYPE_INFO)).toContain(p.materialType);
      }
      if (p.kind === "lesson-website") {
        expect(Object.keys(STAGE_INFO)).toContain(p.stage);
      }
    }
  });

  it("subject/grade/tools thuộc taxonomy", () => {
    for (const p of PROMPTS) {
      expect(SUBJECTS).toContain(p.subject);
      expect(GRADES).toContain(p.grade);
      expect(p.tools.length).toBeGreaterThan(0);
      for (const t of p.tools) {
        expect(Object.keys(TOOL_INFO)).toContain(t);
      }
    }
  });

  it("mọi demoUrl trỏ tới file tồn tại trong public/demos", () => {
    const files = readdirSync("public/demos");
    for (const p of PROMPTS.filter((p) => p.demoUrl)) {
      expect(files).toContain(p.demoUrl!.replace("/demos/", ""));
    }
  });

  it("prompt thật: >= 400 ký tự, không lorem; free = 21 item", () => {
    for (const p of PROMPTS) {
      expect(p.prompt.length, `prompt quá ngắn: ${p.id}`).toBeGreaterThanOrEqual(400);
      expect(p.prompt.toLowerCase()).not.toContain("lorem");
    }
    const free = PROMPTS.filter((p) => p.access === "free").length;
    expect(free).toBe(21);
  });
});
