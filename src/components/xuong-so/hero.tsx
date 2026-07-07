import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search } from "lucide-react";

import { MeshBg } from "@/components/motion/mesh-bg";
import { CountUp } from "@/components/motion/count-up";
import { BRAND, EASE } from "@/data/taxonomy";
import type { ContentFilter } from "@/lib/filter";
import type { ContentFormat } from "@/data/types";

interface HeroProps {
  filter: ContentFilter;
  onFilterChange: (f: ContentFilter) => void;
  scrollToContent: () => void;
}

interface QuickChip {
  label: string;
  patch: Partial<ContentFilter>;
}

const QUICK_CHIPS: QuickChip[] = [
  { label: "Khởi động Toán 7", patch: { stage: "khoi-dong", subject: "Toán" } },
  { label: "Video KHTN", patch: { formats: ["video"], subject: "KHTN" } },
  { label: "Bộ đề Tiếng Anh", patch: { formats: ["exam"], subject: "Tiếng Anh" } },
  { label: "Bài học tương tác", patch: { formats: ["lesson-website"] } },
];

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 30, suffix: "+", label: "mẫu dùng ngay" },
  { value: 10, suffix: "", label: "định dạng nội dung" },
  { value: 6, suffix: "", label: "môn học" },
];

const fade = (delay: number) => ({
  initial: { y: 18, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

export function Hero({ filter, onFilterChange, scrollToContent }: HeroProps) {
  const [videoFailed, setVideoFailed] = useState(false);

  function applyChip(patch: Partial<ContentFilter>) {
    onFilterChange({
      ...filter,
      formats: patch.formats ?? [],
      stage: null,
      subject: null,
      grade: null,
      ...patch,
    } as ContentFilter);
    scrollToContent();
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <MeshBg />
      {/* Video nền + lớp phủ sáng để hợp tông MobiFone và đọc rõ chữ */}
      {!videoFailed && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoFailed(true)}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
          src={HERO_VIDEO_URL}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/62 to-[#FAFAFA]" />
      {/* Tô sắc xanh thương hiệu lên nền video */}
      <div className="pointer-events-none absolute inset-0 bg-[#0061AF] mix-blend-overlay opacity-[0.1]" />
      <div className="relative mx-auto max-w-5xl px-4 pt-8 pb-16 text-center sm:px-6 sm:pt-12 sm:pb-24">
        {/* Logo lockup */}
        <motion.div {...fade(0)} className="mb-8 flex items-center justify-center gap-2.5">
          <img src="/brand/logomark.svg" alt="" className="h-8 w-8" width={32} height={32} />
          <span className="text-lg font-bold text-[#181D27]">Xưởng Số</span>
          <span className="hidden text-sm text-[#717680] sm:inline">· thuộc Trường học số</span>
        </motion.div>

        <motion.p
          {...fade(0.1)}
          className="mb-4 inline-block rounded-full bg-[#F0F6FE] px-3 py-1 text-sm font-medium"
          style={{ color: BRAND.primary }}
        >
          Kho prompt tạo học liệu & bài học cho giáo viên
        </motion.p>

        <motion.h1
          {...fade(0.18)}
          className="mx-auto max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-[#181D27] sm:text-5xl md:text-6xl"
        >
          Học liệu &amp; bài học số,
          <br />
          <span style={{ color: BRAND.primary }}>tạo bằng AI</span> trong vài phút
        </motion.h1>

        <motion.p
          {...fade(0.28)}
          className="mx-auto mt-5 max-w-2xl text-base text-[#535862] sm:text-lg"
        >
          Chọn một mẫu, copy prompt, dán vào công cụ AI quen thuộc là có ngay học liệu hoặc bài học
          cho lớp mình. Mọi thứ sắp theo môn, khối và tiến trình bài dạy.
        </motion.p>

        {/* Ô tìm kiếm lớn */}
        <motion.form
          {...fade(0.38)}
          onSubmit={(e) => {
            e.preventDefault();
            scrollToContent();
          }}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-[#E9EAEB] bg-white p-1.5 shadow-[0_4px_16px_rgba(16,24,40,0.08)] focus-within:border-[#0061AF]"
        >
          <Search className="ml-3 h-5 w-5 flex-none text-[#717680]" />
          <input
            type="search"
            value={filter.q}
            onChange={(e) => onFilterChange({ ...filter, q: e.target.value })}
            placeholder="Tìm bài học, học liệu theo môn, chủ đề…"
            aria-label="Tìm nội dung"
            className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-[#181D27] placeholder:text-[#98A2B3] focus:outline-none"
          />
          <button
            type="submit"
            className="flex flex-none items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: BRAND.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
          >
            Khám phá <ArrowRight className="h-4 w-4" />
          </button>
        </motion.form>

        {/* Chip gợi ý */}
        <motion.div
          {...fade(0.48)}
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-sm text-[#717680]">Gợi ý:</span>
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => applyChip(chip.patch)}
              className="rounded-full border border-[#E9EAEB] bg-white px-3 py-1.5 text-[13px] font-medium text-[#344054] transition-colors hover:border-[#0061AF] hover:text-[#0061AF]"
            >
              {chip.label}
            </button>
          ))}
        </motion.div>

        {/* Số liệu */}
        <motion.div
          {...fade(0.58)}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold" style={{ color: BRAND.primary }}>
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-[#717680]">{s.label}</div>
            </div>
          ))}
          <div className="text-center">
            <div className="text-3xl font-extrabold" style={{ color: BRAND.primary }}>
              TH→THPT
            </div>
            <div className="text-sm text-[#717680]">mọi cấp học</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
