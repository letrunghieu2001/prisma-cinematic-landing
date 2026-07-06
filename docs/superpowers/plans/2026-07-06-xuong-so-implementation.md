# Xưởng Số — Kế hoạch triển khai (Landing + Gallery mock)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng lại trang `/` thành nền tảng "Xưởng Số" — landing-gallery một trang chia sẻ prompt tạo bài học HTML & học liệu số, dữ liệu mock ~30 prompt tiếng Việt thật, UI cinematic tối nhiều animation, sẵn sàng đi demo.

**Architecture:** Một route `/` ghép 6 section component (Hero → Storyboard → LessonTemplates → MaterialGallery → ProcessSteps → Pricing/Footer) + modal chi tiết shared-element. Dữ liệu tĩnh trong `src/data/`, logic lọc thuần trong `src/lib/filter.ts` (test bằng Vitest). Animation kế thừa ngôn ngữ Prisma (easing `[0.16,1,0.3,1]`, pull-up, stagger, noise) qua các component tách trong `src/components/motion/`.

**Tech Stack:** TanStack Start + React 19 + TypeScript + Tailwind CSS 4 (CSS-first) + motion 12 (`motion/react`) + lucide-react + sonner + Vitest.

**Spec:** `docs/superpowers/specs/2026-07-06-xuong-so-design.md`

## Global Constraints

- Ngôn ngữ UI: tiếng Việt; `lang="vi"`; title `"Xưởng Số — Xưởng tạo bài học & học liệu số bằng AI"`.
- Font: **Be Vietnam Pro** (300–800, sans chính) + **Playfair Display Italic** (serif nhấn) — cả hai load Google Fonts subset vietnamese. KHÔNG dùng Almarai/Instrument Serif (thiếu glyph tiếng Việt).
- Màu: nền `#000`, card `#101010`/`#212121`, chữ kem `#E1E0CC`, CTA kem `#DEDBC8`; 9 màu loại học liệu + 4 màu giai đoạn theo bảng spec §4.2 (bản tăng sáng).
- Easing chung: `const EASE = [0.16, 1, 0.3, 1] as const`. Chỉ animate `transform`/`opacity`. Mọi reveal `useInView` với `once: true`.
- `prefers-reduced-motion`: dùng `useReducedMotion()` từ `motion/react` — tắt marquee, timeline hiện sẵn, mọi thứ chỉ fade.
- Icon: chỉ lucide-react. Không emoji làm icon.
- File <400 dòng; component một nhiệm vụ; không mutate (immutable); named constants cho số có nghĩa.
- Copy trên card/moda: nội dung prompt THẬT — không lorem, không placeholder.
- Alias import: `@/` → `src/`.
- Cuối mỗi task: `npm run lint` không lỗi mới; commit theo conventional commits, KHÔNG footer attribution.

---

## Bảng nội dung mock (nguồn chân lý cho Task 2)

8 template bài học (kind `lesson-website`) — cột Demo = file trong `public/demos/`:

| # | id | Tiêu đề | Giai đoạn | Môn | Khối | Access | Demo | Tools |
|---|----|---------|-----------|-----|------|--------|------|-------|
| L1 | `lw-vong-quay` | Vòng quay câu hỏi khởi động | khoi-dong | Toán | Lớp 7 | free | `vong-quay.html` | lovable, claude, v0 |
| L2 | `lw-duoi-hinh` | Đuổi hình bắt chữ văn học | khoi-dong | Ngữ văn | Lớp 8 | premium | — | lovable, claude |
| L3 | `lw-quang-hop` | Bài học tương tác: Quang hợp | hinh-thanh | KHTN | Lớp 7 | free | `quang-hop.html` | claude, lovable, antigravity |
| L4 | `lw-dong-thoi-gian` | Dòng thời gian 1945–1975 | hinh-thanh | Lịch sử & Địa lý | Lớp 9 | free | `dong-thoi-gian.html` | v0, lovable, claude |
| L5 | `lw-quiz-dau-truong` | Quiz đấu trường 4 đáp án | luyen-tap | Tiếng Anh | Lớp 6 | free | `quiz-dau-truong.html` | lovable, v0, claude |
| L6 | `lw-flashcard` | Flashcard lật thẻ từ vựng | luyen-tap | Tiếng Anh | Lớp 7 | premium | — | claude, chatgpt |
| L7 | `lw-trien-lam` | Trang triển lãm dự án nhóm | van-dung | Lịch sử & Địa lý | Lớp 8 | premium | — | lovable, antigravity |
| L8 | `lw-nhap-vai` | Tình huống nhập vai ra quyết định | van-dung | GDCD | Lớp 9 | free | — | claude, gemini |

22 prompt học liệu (kind `material`) — phủ 9 loại × môn × cấp, 6 premium (đánh ★):

| # | id | Tiêu đề | Loại | Giai đoạn | Môn | Khối |
|---|----|---------|------|-----------|-----|------|
| M1 | `au-podcast-chuong` | Kịch bản podcast tóm tắt chương | audio | van-dung | Ngữ văn | Lớp 9 |
| M2 | `au-hoi-thoai-ta` | Hội thoại luyện nghe theo chủ đề | audio | luyen-tap | Tiếng Anh | Lớp 8 |
| M3 | `au-ke-chuyen-th`★ | Giọng kể chuyện lịch sử có nhạc nền | audio | khoi-dong | Lịch sử & Địa lý | Tiểu học |
| M4 | `vi-kich-ban-3p` | Kịch bản video 3 phút + storyboard cảnh | video | hinh-thanh | KHTN | Lớp 8 |
| M5 | `vi-thi-nghiem-ao`★ | Video mô phỏng thí nghiệm an toàn | video | hinh-thanh | KHTN | THPT |
| M6 | `im-infographic-quy-trinh` | Infographic quy trình 5 bước | image | hinh-thanh | KHTN | Lớp 7 |
| M7 | `im-tranh-lich-su` | Bộ tranh minh họa sự kiện lịch sử | image | khoi-dong | Lịch sử & Địa lý | Lớp 6 |
| M8 | `im-so-do-tu-duy` | Sơ đồ tư duy ôn tập chương | image | luyen-tap | Toán | Lớp 9 |
| M9 | `sc-goi-bai-hoc`★ | Gói SCORM bài học có chấm điểm | scorm-xapi | hinh-thanh | Toán | Lớp 8 |
| M10 | `sc-xapi-tracking` | Mô-đun xAPI theo dõi tiến độ đọc | scorm-xapi | luyen-tap | Ngữ văn | THPT |
| M11 | `in-mo-phong-phan-so` | Mô phỏng tương tác chia phần bánh | interactive | hinh-thanh | Toán | Tiểu học |
| M12 | `in-keo-tha-tu-loai`★ | Trò chơi kéo thả phân loại từ | interactive | luyen-tap | Ngữ văn | Lớp 6 |
| M13 | `do-phieu-hoc-tap` | Phiếu học tập theo trạm | document | luyen-tap | KHTN | Lớp 7 |
| M14 | `do-giao-an-5512` | Giáo án theo Công văn 5512 | document | hinh-thanh | Toán | Lớp 7 |
| M15 | `do-de-cuong-on` | Đề cương ôn tập giữa kỳ | document | van-dung | Tiếng Anh | Lớp 9 |
| M16 | `le-slide-outline` | Dàn ý slide bài giảng 12 trang | lecture | hinh-thanh | Ngữ văn | Lớp 8 |
| M17 | `le-bai-giang-tuong-tac`★ | Bài giảng tương tác có câu hỏi chèn | lecture | hinh-thanh | Lịch sử & Địa lý | THPT |
| M18 | `3d-he-mat-troi` | Cảnh 3D hệ Mặt Trời | 3d-vr | hinh-thanh | KHTN | Lớp 6 |
| M19 | `3d-te-bao`★ | Mô hình 3D tế bào thực vật | 3d-vr | hinh-thanh | KHTN | THPT |
| M20 | `ex-ma-tran-de` | Ma trận đề + đề kiểm tra 45 phút | exam | van-dung | Toán | Lớp 8 |
| M21 | `ex-de-15-phut` | Đề 15 phút 3 mức độ | exam | luyen-tap | KHTN | Lớp 9 |
| M22 | `ex-cau-hoi-phan-hoa` | Ngân hàng câu hỏi phân hóa | exam | luyen-tap | Tiếng Anh | Lớp 7 |

Tổng: 30 item; free = 21, premium = 9 (70%/30%). `copies` gán số ngẫu-nhiên-cố-định 40–950.

**Công thức viết `prompt` (mọi item):** (1) Vai trò AI; (2) Bối cảnh lớp/môn/bài; (3) Nhiệm vụ cụ thể; (4) Định dạng đầu ra (với lesson-website: "một file HTML duy nhất, tự chứa, tiếng Việt, responsive, palette gợi ý"); (5) Ràng buộc sư phạm (thời lượng, mức độ, CV 5512 khi liên quan). Độ dài 150–350 từ. Mô tả (`description`) viết giọng giáo-viên-nói-với-giáo-viên theo chuẩn humanized: cụ thể, không đại ngôn, không "tối ưu/bứt phá".

Mẫu chuẩn chất lượng (dùng nguyên văn cho L1):

```
Bạn là lập trình viên front-end kiêm giáo viên Toán THCS. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không dùng thư viện ngoài), tiếng Việt, làm hoạt động KHỞI ĐỘNG 5–7 phút cho bài "Tỉ lệ thức" — Toán 7.

Yêu cầu sản phẩm: một vòng quay may mắn 8 ô, mỗi ô là một câu hỏi ngắn ôn kiến thức tỉ số đã học (ví dụ: "Viết tỉ số của 3 và 5", "Tìm x biết x/4 = 6/8"…). Bấm nút "Quay" thì vòng quay quay 3–5 giây với gia tốc giảm dần rồi dừng ngẫu nhiên; ô trúng sáng lên và hiện câu hỏi to giữa màn hình kèm nút "Hiện đáp án". Có bảng điểm 2 đội (cộng/trừ điểm bằng nút), phông chữ lớn nhìn rõ từ cuối lớp, màu tươi sáng trên nền tối, hiệu ứng confetti khi trả lời đúng.

Ràng buộc: HTML5 + CSS + JS thuần trong một file; hoạt động offline; chữ tiếng Việt có dấu đầy đủ; nút bấm to (tối thiểu 48px) để thao tác trên màn hình cảm ứng; không thu thập dữ liệu.
```

---

### Task 0: Nền móng — font, meta, Vitest

**Files:**
- Modify: `src/routes/__root.tsx` (meta + font links)
- Modify: `src/styles.css` (font-family, bỏ ép Almarai)
- Modify: `package.json` (script `test`)
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: fonts `'Be Vietnam Pro'` (sans) và `'Playfair Display'` (serif italic) khả dụng toàn app; lệnh `npm test` chạy Vitest.

- [ ] **Step 1: Cài Vitest**

Run: `npm i -D vitest`

- [ ] **Step 2: Tạo `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: { include: ['src/**/*.test.ts'] },
})
```

Thêm vào `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 3: Đổi meta + font trong `__root.tsx`**

Trong `head()`: title `Xưởng Số — Xưởng tạo bài học & học liệu số bằng AI`; description `Chọn template theo tiến trình bài dạy, copy prompt, dán vào Lovable · v0 · Claude — có ngay bài học và học liệu số của riêng bạn.`; OG tương ứng; đổi 2 link Google Fonts thành:

```
https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,500;1,600;1,700&display=swap
```

Đổi `<html lang="en">` → `lang="vi"` (tìm trong RootDocument).

- [ ] **Step 4: Sửa `src/styles.css`**

Thay mọi `'Almarai'` bằng `'Be Vietnam Pro'`; thay `'Instrument Serif'` bằng `'Playfair Display'`. Giữ nguyên `@utility noise-overlay`, `bg-noise`, token `--color-primary-cream`.

- [ ] **Step 5: Verify + commit**

Run: `npm test` (0 test, exit 0 — Vitest cho phép `--passWithNoTests`; nếu lỗi thêm flag vào script) và `npm run build`.
Expected: build PASS.

```bash
git add -A && git commit -m "feat: nen mong Xuong So - font tieng Viet, meta, vitest"
```

---

### Task 1: Data layer — types + taxonomy

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/taxonomy.ts`

**Interfaces:**
- Produces (types.ts): `StoryboardStage`, `MaterialType`, `AiTool`, `PromptKind = 'lesson-website' | 'material'`, `PromptAccess = 'free' | 'premium'`, `interface PromptItem` (đúng spec §4.1, thêm `accessLabel?` KHÔNG — giữ đúng spec).
- Produces (taxonomy.ts):
  - `EASE = [0.16, 1, 0.3, 1] as const`
  - `MATERIAL_TYPE_INFO: Record<MaterialType, { label: string; color: string; icon: LucideIcon }>` — nhãn/màu đúng bảng spec §4.2; icon: audio `AudioLines`, video `Clapperboard`, image `Image`, scorm-xapi `PackageOpen`, interactive `MousePointerClick`, document `FileText`, lecture `Presentation`, 3d-vr `Box`, exam `ListChecks`.
  - `STAGE_INFO: Record<StoryboardStage, { index: 1|2|3|4; label: string; color: string; description: string }>` — `khoi-dong` #FDB022 "Khởi động" / "Gây tò mò, kết nối kiến thức cũ trong 5–7 phút đầu giờ."; `hinh-thanh` #4D94FF "Hình thành kiến thức" / "Học sinh khám phá và chiếm lĩnh kiến thức mới."; `luyen-tap` #17B26A "Luyện tập" / "Củng cố qua bài tập, trò chơi, quiz có phản hồi ngay."; `van-dung` #C652DE "Vận dụng" / "Gắn kiến thức với tình huống thực tế, dự án, sản phẩm."
  - `STAGE_ORDER: StoryboardStage[]`, `SUBJECTS: string[]` (Toán, Ngữ văn, Tiếng Anh, KHTN, Lịch sử & Địa lý, GDCD), `GRADES: string[]` (Tiểu học, Lớp 6, Lớp 7, Lớp 8, Lớp 9, THPT), `TOOL_INFO: Record<AiTool, { label: string }>` (Lovable, v0, Claude, Antigravity, ChatGPT, Gemini).

- [ ] **Step 1: Viết `types.ts` đúng spec §4.1** (code nguyên văn spec, thêm export).
- [ ] **Step 2: Viết `taxonomy.ts`** theo Interfaces trên — mọi giá trị màu/nhãn copy từ bảng spec §4.2.
- [ ] **Step 3: Verify + commit**

Run: `npx tsc --noEmit` → PASS.

```bash
git add src/data && git commit -m "feat: them types va taxonomy hoc lieu, giai doan storyboard"
```

---

### Task 2: Mock data 30 prompt + test data integrity (TDD)

**Files:**
- Create: `src/data/prompts.test.ts` (viết TRƯỚC)
- Create: `src/data/prompts.ts`

**Interfaces:**
- Consumes: `PromptItem`, taxonomy từ Task 1.
- Produces: `export const PROMPTS: PromptItem[]` (30 item đúng Bảng nội dung mock).

- [ ] **Step 1: Viết test trước** — `src/data/prompts.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { PROMPTS } from './prompts'
import { MATERIAL_TYPE_INFO, STAGE_INFO, SUBJECTS, GRADES, TOOL_INFO } from './taxonomy'
import { readdirSync } from 'node:fs'

describe('PROMPTS data integrity', () => {
  it('có đúng 30 item, slug/id duy nhất', () => {
    expect(PROMPTS).toHaveLength(30)
    expect(new Set(PROMPTS.map((p) => p.id)).size).toBe(30)
    expect(new Set(PROMPTS.map((p) => p.slug)).size).toBe(30)
  })
  it('material có materialType hợp lệ; lesson-website có stage', () => {
    for (const p of PROMPTS) {
      if (p.kind === 'material') expect(Object.keys(MATERIAL_TYPE_INFO)).toContain(p.materialType)
      if (p.kind === 'lesson-website') expect(Object.keys(STAGE_INFO)).toContain(p.stage)
    }
  })
  it('subject/grade/tools thuộc taxonomy', () => {
    for (const p of PROMPTS) {
      expect(SUBJECTS).toContain(p.subject)
      expect(GRADES).toContain(p.grade)
      expect(p.tools.length).toBeGreaterThan(0)
      for (const t of p.tools) expect(Object.keys(TOOL_INFO)).toContain(t)
    }
  })
  it('mọi demoUrl trỏ tới file tồn tại trong public/demos', () => {
    const files = readdirSync('public/demos')
    for (const p of PROMPTS.filter((p) => p.demoUrl)) {
      expect(files).toContain(p.demoUrl!.replace('/demos/', ''))
    }
  })
  it('prompt thật: >= 400 ký tự, không lorem; tỷ lệ free ~70%', () => {
    for (const p of PROMPTS) {
      expect(p.prompt.length).toBeGreaterThanOrEqual(400)
      expect(p.prompt.toLowerCase()).not.toContain('lorem')
    }
    const free = PROMPTS.filter((p) => p.access === 'free').length
    expect(free).toBe(21)
  })
})
```

- [ ] **Step 2: Run test → FAIL** (`npm test`) vì chưa có `prompts.ts` (và `public/demos` — tạo folder rỗng bằng file `.gitkeep` tạm; test demoUrl sẽ pass sau Task 4; tạm thời chỉ đưa `demoUrl` vào item sau khi demo tồn tại — để tránh phụ thuộc chéo, Task 2 viết item demoUrl đúng tên file sẽ tạo ở Task 4 và chấp nhận test này đỏ đến hết Task 4 nếu chạy sớm; thứ tự thực thi thực tế: Task 4 có thể chạy song song trước khi test).
- [ ] **Step 3: Viết `prompts.ts`** — 30 item đúng Bảng nội dung mock; mỗi `prompt` theo Công thức; L1 dùng nguyên văn mẫu chuẩn. `copies` gán cố định (không `Math.random()`).
- [ ] **Step 4: Run test → PASS** (sau khi Task 4 xong nếu chạy demoUrl test).
- [ ] **Step 5: Commit**

```bash
git add src/data && git commit -m "feat: 30 prompt mau tieng Viet (8 bai hoc + 22 hoc lieu)"
```

---

### Task 3: Logic lọc thuần + test (TDD)

**Files:**
- Create: `src/lib/filter.test.ts` (viết TRƯỚC)
- Create: `src/lib/filter.ts`

**Interfaces:**
- Produces:

```ts
export interface PromptFilter {
  q: string
  types: MaterialType[]        // rỗng = tất cả
  stage: StoryboardStage | null
  subject: string | null
  grade: string | null
  tool: AiTool | null
}
export const EMPTY_FILTER: PromptFilter
export function normalizeVi(s: string): string        // thường hóa + bỏ dấu (NFD strip ̀-ͯ, đ→d)
export function filterPrompts(items: PromptItem[], f: PromptFilter): PromptItem[]
export function countByStage(items: PromptItem[]): Record<StoryboardStage, number>
```

- `filterPrompts`: AND giữa các facet; `q` khớp `normalizeVi` trên title+description+subject; `types` áp cho `materialType` (item `lesson-website` chỉ lọt khi `types` rỗng); trả mảng mới (immutable).

- [ ] **Step 1: Viết test trước** — `src/lib/filter.test.ts` (dùng fixture nội bộ 4 item tự tạo, KHÔNG import PROMPTS để test độc lập dữ liệu):

```ts
import { describe, expect, it } from 'vitest'
import { filterPrompts, normalizeVi, EMPTY_FILTER, countByStage } from './filter'
import type { PromptItem } from '@/data/types'

const make = (over: Partial<PromptItem>): PromptItem => ({
  id: 'x', slug: 'x', title: 'Tiêu đề', description: 'Mô tả', kind: 'material',
  materialType: 'audio', stage: 'khoi-dong', subject: 'Toán', grade: 'Lớp 7',
  tools: ['claude'], access: 'free', prompt: 'p'.repeat(400), copies: 1, ...over,
})
const items = [
  make({ id: 'a', title: 'Vòng quay khởi động' }),
  make({ id: 'b', materialType: 'exam', stage: 'luyen-tap', subject: 'Tiếng Anh', grade: 'Lớp 9', tools: ['lovable'] }),
  make({ id: 'c', kind: 'lesson-website', materialType: undefined, stage: 'van-dung' }),
]

it('normalizeVi bỏ dấu và thường hóa', () => {
  expect(normalizeVi('Vòng Quay Khởi Động')).toBe('vong quay khoi dong')
  expect(normalizeVi('Đuổi hình')).toBe('duoi hinh')
})
it('EMPTY_FILTER trả về tất cả', () => {
  expect(filterPrompts(items, EMPTY_FILTER)).toHaveLength(3)
})
it('tìm kiếm không dấu khớp có dấu', () => {
  expect(filterPrompts(items, { ...EMPTY_FILTER, q: 'vong quay' })).toEqual([items[0]])
})
it('lọc types loại trừ lesson-website', () => {
  expect(filterPrompts(items, { ...EMPTY_FILTER, types: ['exam'] })).toEqual([items[1]])
})
it('kết hợp stage + tool (AND)', () => {
  expect(filterPrompts(items, { ...EMPTY_FILTER, stage: 'luyen-tap', tool: 'lovable' })).toEqual([items[1]])
  expect(filterPrompts(items, { ...EMPTY_FILTER, stage: 'luyen-tap', tool: 'claude' })).toEqual([])
})
it('countByStage đếm đủ 4 giai đoạn', () => {
  expect(countByStage(items)).toEqual({ 'khoi-dong': 1, 'hinh-thanh': 0, 'luyen-tap': 1, 'van-dung': 1 })
})
it('không mutate mảng gốc', () => {
  const before = [...items]
  filterPrompts(items, { ...EMPTY_FILTER, q: 'x' })
  expect(items).toEqual(before)
})
```

- [ ] **Step 2: Run → FAIL** (module chưa tồn tại).
- [ ] **Step 3: Implement `filter.ts`** tối thiểu cho pass — `normalizeVi = s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replaceAll('đ','d')`.
- [ ] **Step 4: Run → PASS.** `npm test` toàn bộ xanh.
- [ ] **Step 5: Commit** `feat: logic loc prompt thuan + test`

---

### Task 4: 4 demo HTML bài học

**Files:**
- Create: `public/demos/vong-quay.html`, `public/demos/quang-hop.html`, `public/demos/dong-thoi-gian.html`, `public/demos/quiz-dau-truong.html`

**Interfaces:**
- Produces: 4 file HTML tự chứa (inline CSS/JS, zero dependency, offline được, tiếng Việt có dấu, viewport meta, chữ ≥16px, nút ≥48px, hoạt động đẹp trong khung iframe ~600×400 lẫn fullscreen).

Yêu cầu từng file (mỗi file là "sản phẩm AI tạo từ prompt tương ứng" — chất lượng phải bán được lời hứa):

1. `vong-quay.html` — vòng quay SVG/CSS 8 ô câu hỏi Toán 7 (tỉ lệ thức), nút Quay (quay 3–5s giảm tốc, `requestAnimationFrame`), ô trúng sáng, hiện câu hỏi + nút "Hiện đáp án", bảng điểm 2 đội (+/-), confetti CSS khi bấm "Đúng". Nền tối, màu tươi.
2. `quang-hop.html` — sơ đồ cây quang hợp (SVG inline vẽ tay: mặt trời, lá, rễ, mũi tên CO₂/O₂/H₂O); click từng thành phần → panel giải thích trượt vào; có chế độ "Kiểm tra nhanh" 3 câu điền khuyết. Nền sáng dịu (sản phẩm giáo viên — không cần theo dark theme của Xưởng Số).
3. `dong-thoi-gian.html` — timeline ngang cuộn được 8 sự kiện 1945–1975, mỗi node click → card chi tiết (năm, sự kiện, ý nghĩa); nút Trước/Sau; progress dots.
4. `quiz-dau-truong.html` — 8 câu tiếng Anh lớp 6 (4 đáp án), đếm giờ 15s/câu có vòng tròn tiến độ, +10 điểm đúng nhanh, bảng kết quả cuối có % và lời nhận xét; hiệu ứng đúng/sai rõ (xanh/đỏ + rung nhẹ).

- [ ] **Step 1–4: Viết từng file** (mỗi file một step, tự test bằng mở trình duyệt).
- [ ] **Step 5: Verify:** mở từng file qua dev server `http://localhost:8080/demos/<file>.html` — thao tác chính chạy được.
- [ ] **Step 6: Commit** `feat: 4 demo HTML bai hoc mau`

---

### Task 5: Motion components dùng chung

**Files:**
- Create: `src/components/motion/words-pull-up.tsx` (chuyển `WordsPullUp`, `WordsPullUpMultiStyle` từ `src/routes/index.tsx` cũ sang, export named, thêm prop `as?: 'h1'|'h2'|'p'`)
- Create: `src/components/motion/reveal.tsx` (`RevealCard` — từ `FeatureCardShell` cũ: `{ index?: number; className?: string; children }`, scale 0.95→1 + fade, stagger `index * 0.15`, `useInView once`, tôn trọng `useReducedMotion`)
- Create: `src/components/motion/marquee.tsx` (`Marquee` — `{ children; speed?: number; className? }`: dải chạy ngang vô hạn bằng `motion.div` translateX 2 bản sao nội dung; `useReducedMotion` → đứng yên, overflow-x auto)

**Interfaces:**
- Consumes: `EASE` từ `@/data/taxonomy`.
- Produces: `<WordsPullUp text asterisk? className?>`, `<WordsPullUpMultiStyle segments={{text, className}[]} >`, `<RevealCard index?>`, `<Marquee speed?>`.

- [ ] **Step 1: Tạo 3 file** — copy logic từ index.tsx cũ, đổi import EASE về taxonomy, thêm reduced-motion.
- [ ] **Step 2: Verify** `npx tsc --noEmit` PASS (index.tsx cũ chưa đụng — components mới chưa được dùng, không sao).
- [ ] **Step 3: Commit** `feat: tach motion components tai su dung`

---

### Task 6: CopyButton + Toaster

**Files:**
- Create: `src/components/xuong-so/copy-button.tsx`

**Interfaces:**
- Produces: `<CopyButton text={string} label?={string} size?={'sm'|'lg'} className?>` — pill kem `#DEDBC8` chữ đen; click: clipboard write → icon `Check` + "Đã copy" 2s rồi hoàn nguyên + `toast.success('Đã copy prompt — dán vào Lovable, v0 hoặc Claude để tạo.')`; lỗi → fallback textarea `document.execCommand('copy')`; vẫn lỗi → `toast.error('Không copy được — mở chi tiết và copy thủ công nhé.')`. Dừng lan truyền sự kiện (`stopPropagation`) để không mở modal khi bấm copy trên card.

```tsx
// khung chính
const [copied, setCopied] = useState(false)
async function handleCopy(e: React.MouseEvent) {
  e.stopPropagation()
  try {
    await navigator.clipboard.writeText(text)
    ok()
  } catch {
    try { legacyCopy(text); ok() } catch { toast.error('Không copy được — mở chi tiết và copy thủ công nhé.') }
  }
}
function ok() { setCopied(true); toast.success('Đã copy prompt — dán vào Lovable, v0 hoặc Claude để tạo.'); setTimeout(() => setCopied(false), 2000) }
```

- [ ] **Step 1: Viết component** (kèm `legacyCopy` helper textarea ẩn).
- [ ] **Step 2: Thêm `<Toaster theme="dark" position="bottom-center" />`** (sonner) vào `src/routes/__root.tsx` trong RootDocument.
- [ ] **Step 3: Commit** `feat: nut copy prompt voi fallback va toast`

---

### Task 7: Hero

**Files:**
- Create: `src/components/xuong-so/hero.tsx`

**Interfaces:**
- Consumes: `WordsPullUp`, `Marquee`, `MATERIAL_TYPE_INFO`, `EASE`.
- Produces: `<Hero />` — tự chứa, không props.

Nội dung/hành vi:
- Khung 100vh: video nền giữ URL CloudFront hiện có (lấy từ index.tsx cũ) + `poster` + `onError` ẩn video (nền giữ gradient + noise); scrim trên/dưới; `noise-overlay`.
- Navbar pill top-center: chữ "Xưởng Số" (trái) + 4 anchor `#bai-hoc`, `#hoc-lieu`, `#quy-trinh`, `#bang-gia` — smooth scroll (`scrollIntoView({behavior:'smooth'})`), ẩn bớt trên mobile (chỉ logo + Bảng giá).
- Grid 12 cột đáy: wordmark `WordsPullUp text="Xưởng Số" asterisk` cỡ `text-[17vw] md:text-[15vw]`; phải: manifesto (từ "bài học", "học liệu" nghiêng Playfair) + pill CTA "Khám phá xưởng" (mũi tên xoay xuống, click scroll tới `#storyboard`).
- Mép dưới: `<Marquee>` 9 nhãn loại học liệu, mỗi nhãn `<span style={{color}}>` + dấu `·` kem giữa các nhãn.

- [ ] **Step 1: Viết component.**
- [ ] **Step 2: Commit** `feat: hero Xuong So`

---

### Task 8: StoryboardStrip

**Files:**
- Create: `src/components/xuong-so/storyboard-strip.tsx`

**Interfaces:**
- Consumes: `STAGE_INFO`, `STAGE_ORDER`, `countByStage`, `PROMPTS`.
- Produces: `<StoryboardStrip counts={Record<StoryboardStage, number>} onSelectStage={(s: StoryboardStage) => void} />` — id section = `storyboard`.

Hành vi:
- Desktop: hàng ngang 4 node trên SVG line; `useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })` → `pathLength` của `motion.path` (đường kẻ kem mảnh) scrub theo scroll; node i xuất hiện khi progress > i/4 (opacity+scale), vòng glow `box-shadow: 0 0 40px {color}40`.
- Mỗi node: số `0{index}` lớn (Playfair italic), nhãn, mô tả 1 dòng (gray-400), đếm `counts[stage]` template ("x prompt"). Hover: scale 1.05. Click: `onSelectStage(stage)`.
- Mobile (<768px): cột dọc, line dọc bên trái, node xếp dưới nhau.
- Reduced motion: line + node hiện sẵn.
- Headline section: eyebrow "TIẾN TRÌNH BÀI DẠY" + `WordsPullUpMultiStyle` "Chọn prompt theo *nhịp* của tiết học" (chữ "nhịp" nghiêng).

- [ ] **Step 1: Viết component.**
- [ ] **Step 2: Commit** `feat: dai storyboard 4 giai doan`

---

### Task 9: LessonCard + LessonTemplates

**Files:**
- Create: `src/components/xuong-so/lesson-card.tsx`
- Create: `src/components/xuong-so/lesson-templates.tsx`

**Interfaces:**
- Consumes: `RevealCard`, `CopyButton`, `STAGE_INFO`, `PromptItem`.
- Produces:
  - `<LessonCard item onOpen={(item: PromptItem) => void} dimmed={boolean} />` — card lớn: khung preview 16:10 (`demoUrl` → iframe lazy-mount khi `useInView`, `sandbox="allow-scripts"`, lớp phủ bắt click mở modal; không demo → nền gradient màu giai đoạn + icon `MonitorPlay` + tên); hàng badge: chip giai đoạn (màu), chip `môn · khối`, badge `Copy`(viền kem)/`Premium`(nền kem); tiêu đề + mô tả; hàng nút: `CopyButton` (free) hoặc nút "Nâng cấp ↓" (premium, anchor `#bang-gia`) + nút ghost "Xem thử" → `onOpen(item)`. `motion.div layoutId={item.id}`. `dimmed` → opacity 0.35 + grayscale (transition 0.3s).
  - `<LessonTemplates items activeStage={StoryboardStage | null} onOpen />` — section id `bai-hoc`; headline "Template *bài học* HTML" + đếm; grid 2 cột (1 mobile); card `dimmed={activeStage != null && item.stage !== activeStage}`; nút nhỏ "Bỏ lọc giai đoạn" hiện khi activeStage ≠ null.

- [ ] **Step 1: Viết `lesson-card.tsx`.**
- [ ] **Step 2: Viết `lesson-templates.tsx`.**
- [ ] **Step 3: Commit** `feat: section template bai hoc HTML`

---

### Task 10: PromptCard + MaterialGallery (filter bar)

**Files:**
- Create: `src/components/xuong-so/prompt-card.tsx`
- Create: `src/components/xuong-so/material-gallery.tsx`

**Interfaces:**
- Consumes: `filterPrompts`, `PromptFilter`, `EMPTY_FILTER`, `MATERIAL_TYPE_INFO`, `STAGE_INFO`, `SUBJECTS`, `GRADES`, `TOOL_INFO`, `CopyButton`.
- Produces:
  - `<PromptCard item onOpen />` — card học liệu: đầu card khối màu `MATERIAL_TYPE_INFO[type].color` dạng gradient tối (`linear-gradient(135deg, {color}26, #101010)`) + icon loại 40px + viền trái 2px màu loại; body: chip loại (chữ màu loại), tiêu đề, mô tả 2 dòng clamp, hàng meta `môn · khối · {copies} lượt copy`; badge Copy/Premium góc; footer `CopyButton size="sm"` hoặc "Nâng cấp ↓". `motion.div layoutId={item.id}`, wrap `motion.div layout` cho reflow.
  - `<MaterialGallery items filter onFilterChange={(f: PromptFilter) => void} onOpen />` — section id `hoc-lieu`; **controlled component** (filter state ở page); sticky filter bar (`top-0 z-40 bg-black/70 backdrop-blur`): input search (icon `Search`, placeholder "Tìm prompt học liệu…"), hàng chip 9 loại (multi-toggle; active = nền màu loại chữ đen; inactive = viền `#212121` chữ gray-400) cuộn ngang mobile; 4 `<select>` tối giản (Môn/Khối/Giai đoạn/Công cụ, option đầu "Tất cả"); nút "Xóa bộ lọc" khi khác EMPTY_FILTER. Grid `md:grid-cols-3 xl:grid-cols-4` trong `AnimatePresence mode="popLayout"` — card exit scale 0.9 fade, layout animation khi reflow. Empty state: "Chưa có prompt khớp bộ lọc." + nút Xóa bộ lọc.

- [ ] **Step 1: Viết `prompt-card.tsx`.**
- [ ] **Step 2: Viết `material-gallery.tsx`.**
- [ ] **Step 3: Commit** `feat: gallery hoc lieu voi filter bar + layout animation`

---

### Task 11: PromptDetailModal

**Files:**
- Create: `src/components/xuong-so/prompt-detail-modal.tsx`

**Interfaces:**
- Consumes: `CopyButton`, `MATERIAL_TYPE_INFO`, `STAGE_INFO`, `TOOL_INFO`.
- Produces: `<PromptDetailModal item={PromptItem | null} onClose />` — render trong `AnimatePresence`; item null → nothing.

Hành vi:
- Overlay `bg-black/80 backdrop-blur-sm` (click → onClose; `useEffect` Esc → onClose; khóa scroll body khi mở).
- Panel `motion.div layoutId={item.id}` max-w-3xl nền `#101010` rounded-[2rem], cuộn trong panel.
- Trên: preview — `demoUrl` → iframe cao 380px tương tác được + nút "Mở toàn màn hình" (link `target="_blank"`); không demo → khối gradient màu loại/giai đoạn + icon.
- Giữa: tiêu đề (WordsPullUp không cần — chữ tĩnh cho đọc nhanh), mô tả, hàng chip metadata (loại/giai đoạn/môn/khối), hàng "Dùng tốt với:" + tên công cụ.
- Khối prompt: `<pre>` wrap nền `#000` viền `#212121` rounded-2xl chữ gray-300 14px; free → full text + `CopyButton` nổi góc phải trên của khối; premium → hiện `item.prompt.slice(0, Math.floor(item.prompt.length * 0.1))` + lớp phủ gradient mờ dần + icon `Lock` + nút "Nâng cấp để xem toàn bộ" (onClose rồi scroll `#bang-gia`).
- Dưới: 3 bước mini (Copy → Dán vào công cụ AI → Nhúng vào lớp học) 1 dòng mỗi bước.
- Nút X góc (aria-label "Đóng").

- [ ] **Step 1: Viết component.**
- [ ] **Step 2: Commit** `feat: modal chi tiet prompt shared-element`

---

### Task 12: ProcessSteps + Pricing + SiteFooter

**Files:**
- Create: `src/components/xuong-so/process-steps.tsx`
- Create: `src/components/xuong-so/pricing.tsx`
- Create: `src/components/xuong-so/site-footer.tsx`

**Interfaces:**
- Produces: `<ProcessSteps />` (id `quy-trinh`), `<Pricing />` (id `bang-gia`), `<SiteFooter />` — đều không props.

Nội dung:
- **ProcessSteps**: card nền `#101010` rounded-[2rem]; 3 cột (dọc mobile): số 01/02/03 Playfair italic cỡ lớn reveal theo scroll; tiêu đề + mô tả: (01 "Copy prompt" — "Chọn template theo giai đoạn bài dạy, bấm copy — xong bước một."); (02 "Dán vào công cụ AI" — "Lovable, v0, Claude, Antigravity, ChatGPT hay Gemini — dán prompt, chờ vài phút."; dưới là hàng tên công cụ chữ gray-500 fade vào lần lượt); (03 "Nhúng vào lớp học" — "Web bài học chạy độc lập, hoặc nhúng vào Trường học số bằng học liệu dạng Nhúng (EMBEDDED)."). Mũi tên nối `motion.path pathLength` giữa các cột (ẩn mobile).
- **Pricing**: headline "Đơn giản như *bảng giá* này"; 2 card: Miễn phí (0đ — "Copy toàn bộ prompt miễn phí", "Xem mọi preview & demo", "Dùng cho lớp của bạn") / Premium (viền kem, badge "Dành cho người dựng bài nghiêm túc"; 199.000đ/năm — "Toàn bộ template bài học HTML", "Mẫu mới mỗi tuần", "Dùng trong tập huấn, nhân rộng toàn trường"; nút "Sắp ra mắt" disabled-style + dòng nhỏ "Nhà trường & phòng giáo dục: liên hệ"). KHÔNG countdown giả.
- **SiteFooter**: wordmark "Xưởng Số*" vừa, dòng "Thuộc hệ sinh thái Trường học số — truonghocsoquocgia.vn", cột anchor links (Bài học, Học liệu, Quy trình, Bảng giá), dòng bản quyền "© 2026 Xưởng Số. Làm bởi giáo viên, cho giáo viên."

- [ ] **Step 1–3: Viết 3 component (mỗi cái một step).**
- [ ] **Step 4: Commit** `feat: quy trinh 3 buoc, bang gia, footer`

---

### Task 13: Ghép trang — index.tsx mới

**Files:**
- Modify: `src/routes/index.tsx` (thay toàn bộ nội dung Prisma)

**Interfaces:**
- Consumes: tất cả section Task 7–12, `PROMPTS`, `filterPrompts`, `countByStage`, `EMPTY_FILTER`.

Cấu trúc:

```tsx
function XuongSoPage() {
  const [filter, setFilter] = useState<PromptFilter>(EMPTY_FILTER)
  const [selected, setSelected] = useState<PromptItem | null>(null)
  const lessons = PROMPTS.filter((p) => p.kind === 'lesson-website')
  const materials = PROMPTS.filter((p) => p.kind === 'material')
  const galleryItems = useMemo(() => filterPrompts(materials, filter), [materials, filter])

  const handleSelectStage = (stage: StoryboardStage) => {
    setFilter((f) => ({ ...f, stage }))
    document.getElementById('bai-hoc')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="bg-black text-[#E1E0CC]">
      <Hero />
      <StoryboardStrip counts={countByStage(PROMPTS)} onSelectStage={handleSelectStage} />
      <LessonTemplates items={lessons} activeStage={filter.stage} onOpen={setSelected} />
      <MaterialGallery items={materials} filter={filter} onFilterChange={setFilter} onOpen={setSelected} />
      <ProcessSteps />
      <Pricing />
      <SiteFooter />
      <PromptDetailModal item={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
```

Ghi chú: `LessonTemplates` nhận `activeStage={filter.stage}` để dim template khác giai đoạn — click storyboard lọc CẢ hai vùng (templates dim + gallery facet), scroll tới `#bai-hoc` (vùng ngay dưới storyboard) — sát ý định người dùng hơn spec §2.1② một bậc, ghi nhận là cải tiến có chủ đích.

- [ ] **Step 1: Viết lại `index.tsx`.**
- [ ] **Step 2: Verify:** `npm test` xanh (cả data-integrity giờ có demos), `npm run lint`, `npm run build` PASS; mở `http://localhost:8080/` kiểm tra: hero render, storyboard scrub, click giai đoạn lọc + cuộn, copy ra clipboard thật, modal mở/đóng, filter reflow, 375px, reduced-motion.
- [ ] **Step 3: Commit** `feat: ghep trang Xuong So hoan chinh`

---

### Task 14: Rà soát cuối

- [ ] **Step 1:** Chạy code review (code-reviewer) trên toàn diff; sửa CRITICAL/HIGH.
- [ ] **Step 2:** Đối chiếu Pre-Delivery Checklist ui-ux-pro-max (§1–§3: contrast, touch target, focus, lazy, CLS) — sửa phát hiện.
- [ ] **Step 3:** `npm run build` + smoke test production `npm run preview`.
- [ ] **Step 4: Commit chốt** `chore: hoan thien demo Xuong So`

---

## Self-Review (đã chạy)

1. **Spec coverage:** Hero/marquee (T7), storyboard scrub+click (T8), templates+iframe lazy (T9), gallery filter 9 chip + 4 dropdown + search + empty state (T10), modal free/premium (T11), quy trình + pricing không countdown + footer (T12), meta/fonts tiếng Việt (T0), data 30 item + công thức prompt (T2), demo HTML (T4), lỗi clipboard/video/iframe (T6/T7/T9), test filter + data integrity (T2/T3), reduced-motion (T5–T11), ngoài-phạm-vi giữ nguyên. ✔
2. **Placeholder:** không còn TBD/TODO; nội dung copy, mô tả, giá, thông điệp đều chốt chữ. ✔
3. **Type consistency:** `PromptFilter`/`EMPTY_FILTER`/`filterPrompts`/`countByStage` (T3) khớp cách dùng T10/T13; `onOpen(item)` thống nhất T9/T10/T11; `layoutId={item.id}` cả card lẫn modal; `activeStage` = `filter.stage` cùng kiểu `StoryboardStage | null`. ✔
