# Xưởng Số v2 — Redesign theo bộ nhận diện Trường học số (MobiFone)

- **Ngày:** 07/07/2026
- **Trạng thái:** Đã duyệt (người dùng: "oke hết, code đi").
- **Tiền đề:** kế thừa v1 (`2026-07-06-xuong-so-design.md`); đây là bản dựng lại giao diện + mô hình nội dung.

## 1. Mục tiêu thay đổi (6 yêu cầu người dùng)

1. Thêm logo Trường học số vào bộ nhận diện.
2. Bỏ header menu; bỏ các section Bài học / Quy trình / Bảng giá. Chỉ còn **Hero + Content**. Hero content tốt hơn. **Gộp bài học + học liệu thành một luồng "content"** với **một bộ lọc chung**.
3. Preview kiểu YouTube/motionsites: **hover là tự chạy demo**, không nút "Xem thử". Layout **masonry Pinterest lộn xộn có chủ đích** (cục to/nhỏ xen kẽ).
4. Dùng **UI system Trường học số (MobiFone)** cho toàn trang.
5. Viết lại toàn bộ nội dung theo giọng **humanized** (giáo viên nói với giáo viên).
6. Thêm nhiều animation.

## 2. Quyết định đã chốt

| Vấn đề | Quyết định |
|---|---|
| Hướng hình ảnh | **MobiFone sáng**: nền trắng, xanh `#0061AF` chủ đạo, đỏ `#ED1C24` nhấn, font Inter. Bỏ chất cinematic tối. |
| Bộ lọc | **Sidebar lọc + lưới masonry** (kiểu thư viện); mobile = drawer. |
| Preview | **Gen demo thật cho cả 30 content** (như website chạy thật), tất cả style bằng **UI system Trường học số**; hover tự chạy trong iframe. |
| Layout | Masonry Pinterest, mỗi item có `size` (sm/md/lg/xl) tạo nhịp lộn xộn. |
| Footer | Slim 1 dòng (logo + © MobiFone — Trường học số). |
| Sections bỏ | navbar menu, Bài học, Quy trình, Bảng giá, và pricing. Modal chi tiết giữ. |

## 3. Design System "Trường học số / MobiFone"

Đóng gói tokens dùng chung cho **cả trang chính lẫn 30 demo** (demo tự chứa → inline khối CSS này).

- **Primary** `#0061AF` (xanh MobiFone), hover `#0D67F7`, nền nhạt `#F0F6FE`.
- **Accent** `#ED1C24` (đỏ MobiFone) — dùng dè: badge Premium, nhấn.
- **Nền** `#FFFFFF` / `#FAFAFA`; **card** trắng, viền `#E9EAEB`; bóng Untitled UI (sm/md/lg).
- **Chữ** `#181D27` / phụ `#535862` / mờ `#717680`.
- **Font** Inter 300–800. **Bo góc** 12px.
- **9 màu loại học liệu (bản sáng, đúng gốc Trường học số)** — fg / bg tint:
  - Âm thanh `#C11574`/`#FDF2FA` · Video `#A15C07`/`#FEFBE8` · Hình ảnh `#0BA5EC`/`#F0F9FF` · SCORM/xAPI `#055BE6`/`#F0F6FE` · Học liệu nâng cao `#9F1AB1`/`#FDF4FF` · Tài liệu `#6938EF`/`#F4F3FF` · Bài giảng `#067647`/`#EDFCF2` · 3D/VR `#F04438`/`#FEF3F2` · Bộ đề `#B93815`/`#FEF6EE`.
- **Định dạng thứ 10 — Bài học** (`lesson-website`): `#0061AF`/`#F0F6FE`.
- **Giai đoạn bài dạy (sáng):** Khởi động `#DC6803` · Hình thành `#0061AF` · Luyện tập `#067647` · Vận dụng `#9F1AB1`.
- **Logo:** copy `Logomark.svg` (mark), `Logo.svg` (wordmark), `LogoWithName.svg` từ gkebook vào `public/brand/`; dùng ở Hero, footer, favicon.

## 4. Mô hình nội dung hợp nhất

- Gộp `lesson-website` + 9 `material` thành **content**. **10 định dạng** = `lesson-website` + 9 `MaterialType`.
- `PromptItem` (mở rộng v1): thêm
  - `size: 'sm' | 'md' | 'lg' | 'xl'` — chiều cao card trong masonry (phân bố lộn xộn, vài `xl` nổi bật).
  - **Mọi item có `demoUrl`** trỏ tới một demo trong `public/demos/`.
- `format(item)` = `item.kind === 'lesson-website' ? 'lesson-website' : item.materialType`.
- `taxonomy.ts` viết lại theo **light mode** + thêm `FORMAT_INFO: Record<ContentFormat, {label,color,bg,icon}>` (10 mục), giữ `STAGE_INFO/SUBJECTS/GRADES/TOOL_INFO`.

## 5. Bộ lọc chung (`src/lib/filter.ts`)

`ContentFilter { q; formats: ContentFormat[]; stage; subject; grade; tool; access: 'free'|'premium'|null }`.
`filterContent(items, f)`: AND các facet; `formats` áp trên `format(item)` (gồm cả bài học). `normalizeVi` giữ. `countByFormat(items)` cho badge đếm ở sidebar. Test thuần mở rộng từ bộ test v1.

## 6. Bố cục & component

```
src/routes/index.tsx        # Hero + ContentLibrary(sidebar+masonry) + Footer + Modal
src/components/xuong-so/
  hero.tsx                  # VIẾT LẠI: logo + tiêu đề + mô tả + search lớn + chip + số liệu; nền mesh động
  filter-sidebar.tsx        # MỚI: search + 10 format + giai đoạn + môn + khối + công cụ + free/premium + xóa lọc; mobile drawer
  content-library.tsx       # MỚI: ghép sidebar + masonry + đếm + empty state
  content-masonry.tsx       # MỚI: CSS columns, phân bố theo size
  content-card.tsx          # MỚI: poster THS + hover mount iframe autoplay + badge + copy; click mở modal
  content-detail-modal.tsx  # đổi từ prompt-detail-modal: light THS, iframe demo lớn, prompt, copy
  site-footer.tsx           # slim
  copy-button.tsx           # giữ, đổi màu sang xanh MobiFone
src/components/motion/
  words-pull-up.tsx, reveal.tsx  # giữ
  count-up.tsx              # MỚI: đếm số liệu hero
  mesh-bg.tsx               # MỚI: gradient mesh xanh động nền hero (nhẹ, reduced-motion tắt)
public/brand/*.svg          # logo
public/demos/*.html         # 30 demo THS-styled (self-contained)
src/styles/ths-tokens.css   # (tham chiếu) tokens dùng cho demo — inline vào từng demo
```
**Xoá:** `storyboard-strip.tsx`, `lesson-templates.tsx`, `material-gallery.tsx`, `process-steps.tsx`, `pricing.tsx`, `lesson-card.tsx`, `prompt-card.tsx`, `marquee.tsx` (nếu không dùng).

`src/styles.css`: thay palette dark→ light MobiFone; đổi `--font-*` (Inter đã có ở __root; sửa lại link font sang Inter); `__root.tsx` đổi font link + Toaster theme light.

## 7. Masonry + hover-preview

- Masonry bằng CSS `columns-1 sm:columns-2 lg:columns-3 xl:columns-4`, mỗi card `break-inside-avoid`; chiều cao poster theo `size` (sm ~180px … xl ~420px) → nhịp lộn xổn.
- Card: poster tĩnh (nền bg-tint loại + icon + tiêu đề). Hover ≥200ms → mount `<iframe demoUrl sandbox="allow-scripts" loading="lazy">` tự chạy, crossfade từ poster; rời chuột gỡ iframe. Giới hạn ~2 iframe chạy đồng thời (hàng đợi theo hover gần nhất). Reduced-motion: bỏ autoplay, chỉ nâng shadow.
- Click card (không phải trên nút copy) → modal chi tiết (iframe lớn + prompt + copy).

## 8. Gen 30 demo (THS-styled)

Mỗi demo là 1 file HTML tự chứa (inline CSS từ ths-tokens + JS thuần, không CDN, tiếng Việt, responsive, autoplay khi mở), đại diện "sản phẩm AI tạo ra". Khuôn theo định dạng:
- Bài học (8): trang học tương tác (giữ 4 cũ, restyle THS + thêm 4).
- Âm thanh: player sóng nhạc tự chạy. Video: player poster + scrubber tự chạy. Hình ảnh: infographic/ảnh SVG. SCORM: màn học + quiz chấm điểm. Nâng cao: widget tương tác. Tài liệu: trang phiếu/giáo án. Bài giảng: slide tự lật. 3D/VR: khối 3D xoay CSS. Bộ đề: quiz.
- Tổng ~30 file trong `public/demos/`. Sinh song song bằng workflow.

## 9. Animation

Hero reveal nối tiếp + count-up + mesh bg động. Card vào lưới fade+rise stagger theo cột. Hover nâng shadow + crossfade poster→iframe. Lọc reflow layout animation + số đếm mượt. Sidebar nhóm mở/gập. Tất cả transform/opacity, tôn trọng `prefers-reduced-motion`.

## 10. Content humanized

Viết lại mọi chữ (hero, nhãn lọc, 30 mô tả, empty state, footer, tooltip) giọng giáo viên: cụ thể, mộc, không "tối ưu/bứt phá/đột phá". Prompt giữ chất lượng thật.

## 11. Ngoài phạm vi

Backend, đăng nhập, đóng góp, thanh toán, route `/prompt/$slug`, đồng bộ filter lên URL. Media thật (dùng demo HTML sinh ra thay thế).

## 12. Kiểm thử

`filter.test.ts` (mở rộng: formats gộp bài học, countByFormat). `prompts.test.ts` (30 item, mọi item có demoUrl tồn tại, có `size` hợp lệ, free=21). `npm run lint` + `build` pass. Verify tay: 375px + desktop, hover autoplay, lọc reflow, reduced-motion.
