# Xưởng Số — Thiết kế nền tảng chia sẻ prompt tạo bài học & học liệu số

- **Ngày:** 06/07/2026
- **Trạng thái:** Đã duyệt Phần 1 (IA & nội dung) và Phần 2 (hình ảnh & chuyển động); Phần 3 (kỹ thuật) viết bổ sung theo ủy quyền của chủ dự án.
- **Repo:** `prisma-cinematic-landing` (TanStack Start + React 19 + Tailwind 4 + Motion)

---

## 1. Bối cảnh & mục tiêu

### 1.1 Bài toán

Giáo viên trong hệ sinh thái **Trường học số** (truonghocsoquocgia.vn) cần tạo học liệu số và bài học tương tác, nhưng:

- Prompt chất lượng cho việc tạo học liệu đang rải rác ở Facebook/Zalo/blog, không có nền tảng riêng.
- Chưa có nền tảng nào (kể cả quốc tế) chia sẻ prompt tạo học liệu **đa phương tiện** (âm thanh, video, SCORM/xAPI, 3D/VR…) hoặc prompt **tạo website bài học** dùng với Lovable/v0/Claude/Antigravity.
- Không nền tảng nào gắn metadata chương trình học Việt Nam (khối lớp, môn, tiến trình bài dạy theo Công văn 5512).

### 1.2 Sản phẩm

**Xưởng Số** — nền tảng chia sẻ prompt theo mô hình motionsites.ai nhưng cho giáo dục:

1. **Template bài học HTML theo storyboard** (trụ chủ lực): giáo viên chọn template theo tiến trình bài dạy → copy prompt → dán vào công cụ AI (Lovable, v0, Claude, Antigravity…) → nhận website bài học hoàn chỉnh → dùng độc lập hoặc nhúng vào Trường học số (học liệu dạng `EMBEDDED`).
2. **Prompt tạo học liệu** theo 9 loại của Trường học số: Âm thanh, Video, Hình ảnh, SCORM/xAPI, Học liệu nâng cao, Tài liệu, Bài giảng, 3D/VR, Bộ đề.

### 1.3 Phạm vi lần dựng này

- **Landing + Gallery mock trên một trang duy nhất** (kéo xuống là gallery, giống motionsites): dữ liệu tĩnh ~30 prompt mẫu viết thật, chưa có backend/đăng nhập.
- Mục đích: **demo** (trình bày, gọi vốn, cho giáo viên dùng thử) → ưu tiên UI nhiều animation đẹp.
- Hiển thị mô hình **freemium** như motionsites: card `Copy` (miễn phí) xen card `Premium` (khóa, dẫn tới section Nâng cấp).

### 1.4 Tiêu chí thành công

- Vào trang hiểu ngay Xưởng Số làm gì trong 5 giây; kéo xuống là dùng được gallery ngay.
- Copy 1 click hoạt động thật; prompt copy về dán vào Lovable/Claude tạo ra sản phẩm dùng được.
- Lọc theo tiến trình bài dạy (storyboard) hoạt động mượt với layout animation.
- Chạy tốt ở 375px; build production pass; tôn trọng `prefers-reduced-motion`.

### 1.5 Các quyết định đã chốt với chủ dự án

| Quyết định | Lựa chọn |
|---|---|
| Phạm vi | Landing + gallery mock, một trang duy nhất |
| Storyboard | = Tiến trình bài dạy CV 5512: Khởi động → Hình thành kiến thức → Luyện tập → Vận dụng |
| Phong cách | Cinematic tối (kế thừa Prisma) + 9 màu học liệu Trường học số làm điểm nhấn |
| Tên | **Xưởng Số** — cặp đôi với "Trường học số"; wordmark hero "Xưởng Số*" |
| Mô hình hiển thị | Freemium như motionsites (Copy/Premium badge) |
| Bố cục | Phương án B "Sân khấu Storyboard" |
| Animation | Nhiều, đẹp, để đi demo; phát triển từ ngôn ngữ chuyển động Prisma gốc |

---

## 2. Kiến trúc thông tin (đã duyệt)

### 2.1 Trang chủ `/` — một trang, 6 màn kéo liên tục

**① HERO** (100vh, giữ khung video nền + noise + navbar pill của Prisma)
- Wordmark khổng lồ **"Xưởng Số*"** — pull-up từng từ.
- Manifesto: *"Xưởng tạo bài học & học liệu số bằng AI. Chọn template theo tiến trình bài dạy, copy prompt, dán vào Lovable · v0 · Claude — có ngay bài học của riêng bạn."* (từ khóa "bài học", "học liệu" in nghiêng serif).
- CTA pill kem **"Khám phá xưởng ↓"** → cuộn mượt tới Storyboard.
- Navbar pill anchor: Bài học · Học liệu · Quy trình · Bảng giá.
- Mép dưới hero: **marquee chậm** tên 9 loại học liệu, mỗi từ đúng màu loại.

**② DẢI STORYBOARD** — bản sắc riêng
- Timeline ngang 4 giai đoạn: `01 Khởi động → 02 Hình thành kiến thức → 03 Luyện tập → 04 Vận dụng`.
- Đường nối vẽ dần theo scroll, node phát sáng tuần tự, số đếm lên, mô tả 1 dòng + đếm số template mỗi giai đoạn.
- **Click giai đoạn = cuộn xuống gallery + áp filter giai đoạn đó.**
- Mobile: chuyển timeline dọc.

**③ TEMPLATE BÀI HỌC HTML** (chủ lực, card lớn 2 cột desktop / 1 cột mobile)
- 8 template (mỗi giai đoạn 2 cái), trong đó **4 có demo HTML thật** nhúng iframe (preview sống, hover tương tác được).
- Card: preview lớn + badge giai đoạn (màu giai đoạn) + môn/khối + badge Copy/Premium + nút copy + nút "Xem thử" (mở modal).

**④ GALLERY HỌC LIỆU** (filter bar sticky + lưới)
- Filter bar: ô tìm kiếm + 9 chip loại học liệu (đúng hệ màu Trường học số, bản tăng sáng) + dropdown Môn / Khối / Giai đoạn / Công cụ.
- ~22 card học liệu; thumbnail thiết kế theo màu loại + icon Lucide (không dùng emoji).
- Copy 1 click + toast; bấm chip → card sắp xếp lại bằng layout animation.

**⑤ QUY TRÌNH 3 BƯỚC** (1 màn hình)
- `01 Copy prompt → 02 Dán vào công cụ AI → 03 Nhúng vào lớp học`.
- Bước 2 hiện hàng logo/tên công cụ: Lovable, v0, Claude, Antigravity, ChatGPT, Gemini.
- Bước 3 nói rõ: web bài học nhúng vào Trường học số qua học liệu dạng **Nhúng (EMBEDDED)** — hoặc dùng độc lập.

**⑥ NÂNG CẤP + FOOTER**
- 2 gói: **Miễn phí** (copy các prompt Copy, xem mọi preview) / **Premium** (toàn bộ template, mẫu mới hằng tuần, dùng cho tập huấn) — giá demo: 199.000đ/năm cá nhân; Nhà trường: liên hệ. Không dùng đồng hồ đếm ngược giả (không hợp môi trường giáo dục).
- Card Premium bấm ở bất kỳ đâu → cuộn tới section này.
- Footer: "Xưởng Số — thuộc hệ sinh thái Trường học số", link nhóm, liên hệ.

### 2.2 Modal chi tiết prompt (click card, không rời trang)

- Mở bằng shared-element từ card (motion `layoutId`), nền blur đen.
- Nội dung: preview lớn (iframe với bài học / khối màu-icon với học liệu), mô tả, metadata (loại, giai đoạn, môn, khối, công cụ khuyên dùng), hướng dẫn 3 bước ngắn.
- **Free: hiện toàn bộ nội dung prompt** (khối code nền `#101010`, nút copy nổi) — khác motionsites, vì giáo viên cần đọc để tin.
- **Premium: hiện ~10% đầu + mờ dần + lớp khóa** + nút "Nâng cấp" (cuộn tới Bảng giá).
- Đóng: nút X, phím Esc, click nền.

---

## 3. Thiết kế hình ảnh & chuyển động (đã duyệt)

### 3.1 Nền tảng thị giác

| Yếu tố | Quyết định |
|---|---|
| Nền | Đen `#000`; card `#101010` / `#212121`; giữ film-grain (`noise-overlay`, `bg-noise`) |
| Chữ chính | Kem `#E1E0CC`; CTA kem `#DEDBC8`; phụ `gray-400/500` |
| Font | **Be Vietnam Pro** (sans chính, 300–800) + **Playfair Display Italic** (serif nhấn) — thay Almarai/Instrument Serif vì hai font gốc **không đủ glyph tiếng Việt**; Be Vietnam Pro giữ đúng chất geometric, Playfair giữ chất editorial, cả hai có subset `vietnamese` trên Google Fonts |
| Màu chức năng | 9 màu loại học liệu (bảng §4.2) — chỉ dùng điểm nhấn nhỏ: chip, viền trái card, glow; không tô mảng lớn |
| Badge | `Copy` = viền kem trong suốt; `Premium` = nền kem chữ đen |
| Bo góc | Section khung `rounded-[2rem]`; card `rounded-2xl` |
| Icon | Lucide React duy nhất, stroke 1.5–2px thống nhất |

### 3.2 Vũ đạo chuyển động (easing chung `[0.16, 1, 0.3, 1]`)

| Section | Chuyển động |
|---|---|
| Hero | Wordmark pull-up từng từ (stagger 0.08s); CTA hover giãn gap; marquee loại học liệu chạy chậm |
| Storyboard | Đường timeline vẽ dần theo scroll (`useScroll` + SVG `pathLength`); node glow tuần tự; số 01→04 đếm lên; hover node scale 1.05 + tooltip |
| Template bài học | Card scale 0.95→1 + fade, stagger 0.15s; hover: iframe tương tác được + viền glow màu giai đoạn + nút copy trồi lên; copy → nút biến hình ✓ + toast |
| Gallery | Filter bar sticky nền blur đen; đổi filter → layout animation (motion `layout`): card bay về vị trí mới, mới fade vào, cũ thu nhỏ biến mất |
| Quy trình | Số 01/02/03 khổng lồ reveal theo scroll; mũi tên nối vẽ dần; logo công cụ fade theo hàng |
| Modal | Shared-element phóng to từ card (`layoutId`); đóng thu về card |

### 3.3 Kỷ luật chuyển động & hiệu năng

- Chỉ animate `transform`/`opacity`; không animate width/height/top/left (tránh CLS).
- `useInView once` cho mọi reveal — không lặp gây mệt.
- `prefers-reduced-motion` (hook `useReducedMotion`): tắt marquee, timeline hiện sẵn, card chỉ fade, modal chỉ fade.
- **Iframe demo là điểm nặng nhất trang**: chỉ mount khi vào viewport (`useInView`), `loading="lazy"`, `sandbox="allow-scripts"`; ngoài viewport hiển thị ảnh tĩnh/gradient.
- Video hero: giữ nguồn hiện có + `poster` + fallback gradient-noise khi video lỗi/offline.
- Mobile 375px: timeline dọc; gallery 1 cột; filter chip thành thanh cuộn ngang; touch target ≥44px.
- Focus ring rõ trên mọi phần tử tương tác; nút icon có `aria-label`; màu loại tăng sáng đạt tương phản ≥3:1 trên nền đen, chữ body ≥4.5:1.

---

## 4. Mô hình dữ liệu mock

### 4.1 Kiểu dữ liệu (`src/data/types.ts`)

```ts
type StoryboardStage = 'khoi-dong' | 'hinh-thanh' | 'luyen-tap' | 'van-dung'

type MaterialType =
  | 'audio' | 'video' | 'image' | 'scorm-xapi' | 'interactive'
  | 'document' | 'lecture' | '3d-vr' | 'exam'

type AiTool = 'lovable' | 'v0' | 'claude' | 'antigravity' | 'chatgpt' | 'gemini'

interface PromptItem {
  id: string
  slug: string
  title: string            // tiếng Việt, ngắn gọn kiểu tên tác phẩm
  description: string      // 1-2 câu, giọng giáo viên nói với giáo viên
  kind: 'lesson-website' | 'material'
  materialType?: MaterialType        // bắt buộc khi kind = material
  stage?: StoryboardStage            // bắt buộc với lesson-website; tùy chọn với material
  subject: string          // Toán, Ngữ văn, Tiếng Anh, KHTN, Lịch sử & Địa lý, GDCD…
  grade: string            // ví dụ "Lớp 7", "THPT", "Tiểu học"
  tools: AiTool[]          // công cụ khuyên dùng
  access: 'free' | 'premium'
  prompt: string           // NỘI DUNG THẬT tiếng Việt, có cấu trúc (vai trò, nhiệm vụ, định dạng đầu ra, ràng buộc sư phạm)
  demoUrl?: string         // '/demos/vong-quay-khoi-dong.html' — chỉ lesson-website có demo
  copies: number           // số liệu demo
}
```

### 4.2 Taxonomy & màu (`src/data/taxonomy.ts`)

Màu gốc Trường học số → bản tăng sáng dùng trên nền tối (tương phản ≥3:1):

| Loại | Nhãn UI | Màu gốc | Bản nền tối |
|---|---|---|---|
| audio | Âm thanh | `#f80291` | `#FF4DB8` |
| video | Video | `#A15C07` | `#FDB022` |
| image | Hình ảnh | (nền `#F0F9FF`) | `#38BDF8` |
| scorm-xapi | SCORM/xAPI | `#055BE6` | `#4D94FF` |
| interactive | Học liệu nâng cao | `#9F1AB1` | `#C652DE` |
| document | Tài liệu | `#6938EF` | `#8B6CF6` |
| lecture | Bài giảng | `#067647` | `#17B26A` |
| 3d-vr | 3D/VR | (nền `#FEF3F2`) | `#F97066` |
| exam | Bộ đề | `#B93815` | `#F38744` |

Màu 4 giai đoạn storyboard: Khởi động `#FDB022` · Hình thành kiến thức `#4D94FF` · Luyện tập `#17B26A` · Vận dụng `#C652DE`.

(Ghi chú: Video và Khởi động cùng dùng `#FDB022` — chấp nhận được vì hai hệ nhãn không đứng cạnh nhau trong cùng ngữ cảnh; chip loại và chip giai đoạn nằm ở hai nhóm filter riêng, luôn kèm nhãn chữ.)

### 4.3 Nội dung mock (~30 item, `src/data/prompts.ts`)

- **8 template bài học HTML** — 2/giai đoạn; 4 cái có demo thật:
  1. Khởi động — *Vòng quay câu hỏi khởi động* (Toán 7) — **demo** `vong-quay.html`
  2. Khởi động — *Đuổi hình bắt chữ* (Ngữ văn 8)
  3. Hình thành — *Bài học tương tác: Quang hợp* (KHTN 7) — **demo** `quang-hop.html`
  4. Hình thành — *Dòng thời gian tương tác* (Lịch sử 9) — **demo** `dong-thoi-gian.html`
  5. Luyện tập — *Quiz đấu trường 4 đáp án* (Tiếng Anh 6) — **demo** `quiz-dau-truong.html`
  6. Luyện tập — *Flashcard lật thẻ từ vựng* (Tiếng Anh 7)
  7. Vận dụng — *Trang triển lãm dự án nhóm* (Địa lý 8)
  8. Vận dụng — *Tình huống nhập vai ra quyết định* (GDCD 9)
- **~22 prompt học liệu** — phủ đủ 9 loại (2–3 cái/loại) × môn (Toán, Ngữ văn, Tiếng Anh, KHTN, Lịch sử & Địa lý, GDCD) × cấp (Tiểu học/THCS/THPT). Ví dụ: podcast tóm tắt chương (Âm thanh), kịch bản video 3 phút kèm storyboard cảnh (Video), infographic quy trình (Hình ảnh), gói SCORM có tracking điểm (SCORM/xAPI), mô phỏng tương tác kiểu H5P (Học liệu nâng cao), phiếu học tập + giáo án 5512 (Tài liệu), outline slide bài giảng (Bài giảng), cảnh 3D hệ mặt trời (3D/VR), ma trận đề + đề 15'/45' (Bộ đề).
- Tỷ lệ **~70% free / 30% premium**; premium rải đều các loại "đắt" (SCORM, template bài học đẹp nhất).
- **Toàn bộ prompt viết thật, dùng được** — có cấu trúc: vai trò AI, bối cảnh lớp/môn, nhiệm vụ, định dạng đầu ra, ràng buộc sư phạm (đúng CV 5512 khi liên quan). Không lorem ipsum. Giọng văn mô tả theo chuẩn humanized: cụ thể, không đại ngôn.

### 4.4 Demo HTML (`public/demos/*.html`)

4 file tự chứa (inline CSS/JS, không phụ thuộc ngoài, tiếng Việt, responsive trong khung iframe):

1. `vong-quay.html` — vòng quay câu hỏi quay được thật (Toán 7).
2. `quang-hop.html` — sơ đồ quang hợp click-để-khám-phá (KHTN 7).
3. `dong-thoi-gian.html` — dòng thời gian sự kiện 1945–1975 cuộn ngang (Lịch sử 9).
4. `quiz-dau-truong.html` — quiz 4 đáp án có tính giờ + điểm (Tiếng Anh 6).

Mỗi demo là "sản phẩm mẫu do AI tạo từ prompt tương ứng" — chất lượng phải đại diện được cho lời hứa của nền tảng.

---

## 5. Kiến trúc kỹ thuật

### 5.1 Cấu trúc file

```
src/
  routes/
    __root.tsx            # sửa meta (title, OG, lang=vi), đổi font sang Be Vietnam Pro + Playfair Display
    index.tsx             # composition 6 section (mỏng, chỉ ghép)
  components/
    motion/               # tách từ index.tsx cũ, tái sử dụng
      words-pull-up.tsx   # WordsPullUp + WordsPullUpMultiStyle
      reveal.tsx          # FeatureCardShell → RevealCard (scale+fade+stagger)
      marquee.tsx         # marquee chậm (mới)
    xuong-so/
      hero.tsx
      storyboard-strip.tsx
      lesson-templates.tsx
      material-gallery.tsx     # filter bar + grid
      prompt-card.tsx          # card học liệu
      lesson-card.tsx          # card template bài học (iframe preview)
      prompt-detail-modal.tsx
      copy-button.tsx          # copy + biến hình ✓ + toast
      process-steps.tsx
      pricing.tsx
      site-footer.tsx
  data/
    types.ts
    taxonomy.ts           # loại học liệu, giai đoạn, môn, khối, công cụ + màu/icon/nhãn
    prompts.ts            # ~30 PromptItem
  lib/
    filter.ts             # hàm lọc thuần (filterPrompts) — tách riêng để test
public/demos/*.html       # 4 demo bài học
```

- Mỗi file <400 dòng; component nhỏ, một nhiệm vụ (theo coding-style KISS/nhiều-file-nhỏ).
- Route `/` giữ nguyên là route duy nhất; nội dung Prisma cũ bị thay hoàn toàn (git giữ lịch sử).

### 5.2 Luồng dữ liệu & state

- Dữ liệu tĩnh import trực tiếp từ `src/data/prompts.ts` — không fetch, không backend.
- **Filter state** đặt tại `MaterialGallery` (useState): `{ q, types[], stage, subject, grade, tool }`; lọc bằng hàm thuần `filterPrompts(items, filter)` trong `lib/filter.ts`.
- Click giai đoạn ở StoryboardStrip → callback lên `index.tsx` → set filter + `scrollIntoView` gallery (state nâng lên mức trang chỉ cho liên kết storyboard↔gallery này).
- Modal: state `selectedItem` mức trang; `layoutId` = `item.id` nối card↔modal.
- Copy: `navigator.clipboard.writeText(item.prompt)` trong try/catch → thành công: toast sonner "Đã copy prompt — dán vào Lovable/Claude để tạo"; thất bại (clipboard bị chặn): fallback chọn-thủ-công qua `<textarea>` ẩn, nếu vẫn lỗi → toast lỗi kèm gợi ý copy trong modal.

### 5.3 Xử lý lỗi

| Tình huống | Xử lý |
|---|---|
| Clipboard API bị chặn | Fallback textarea + `document.execCommand('copy')`; vẫn lỗi → toast hướng dẫn mở modal bôi đen copy tay |
| Video hero lỗi/offline | `onError` → ẩn video, hiện nền gradient tối + noise (đã là lớp dưới sẵn) |
| Iframe demo lỗi | `onError` → thay bằng thumbnail tĩnh màu giai đoạn + nhãn "Xem demo tại trang chi tiết" |
| Không có kết quả lọc | Empty state: "Chưa có prompt khớp bộ lọc" + nút "Xóa bộ lọc" (một hành động rõ ràng) |
| Dữ liệu mock thiếu trường | Chặn từ build: kiểm bằng test data-integrity (§5.4) |

### 5.4 Kiểm thử & chất lượng

- Thêm **Vitest** (chưa có trong repo):
  - `lib/filter.test.ts` — lọc theo từng facet, kết hợp facet, tìm kiếm không dấu/có dấu, empty.
  - `data/prompts.test.ts` — data integrity: đủ trường bắt buộc theo `kind`, slug duy nhất, `materialType` hợp lệ, mọi `demoUrl` trỏ tới file tồn tại trong `public/demos/`, tỷ lệ free/premium đúng cam kết ±10%.
- `npm run lint` + `npm run build` pass là điều kiện hoàn thành.
- Kiểm tra tay trên dev server: 375px + desktop, bật `prefers-reduced-motion`, copy thật vào clipboard.
- Code review (code-reviewer) sau khi code xong, trước commit cuối.

### 5.5 Meta & SEO

- `lang="vi"`; title: **"Xưởng Số — Xưởng tạo bài học & học liệu số bằng AI"**; description + OG tags tương ứng; giữ error boundary/404 hiện có của root.

---

## 6. Ngoài phạm vi (để giai đoạn sau)

- Backend, đăng nhập, đóng góp prompt cộng đồng, thanh toán thật.
- Trang chi tiết prompt có URL riêng (hiện dùng modal; giai đoạn sau thêm route `/prompt/$slug` cho SEO/chia sẻ).
- Remix/fork prompt, đánh giá "đã dùng trên lớp", hồ sơ người đóng góp.
- Tích hợp API thật với Trường học số (nút "Đưa vào lớp học của tôi").
- Đồng bộ filter lên URL search params (nice-to-have, làm nếu còn thời gian).
