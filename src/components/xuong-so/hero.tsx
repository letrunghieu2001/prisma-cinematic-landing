import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

import { Marquee } from "@/components/motion/marquee";
import { WordsPullUp } from "@/components/motion/words-pull-up";
import { CREAM, CREAM_TW, EASE, MATERIAL_TYPES, MATERIAL_TYPE_INFO } from "@/data/taxonomy";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const NAV_ITEMS = [
  { label: "Bài học", target: "bai-hoc" },
  { label: "Học liệu", target: "hoc-lieu" },
  { label: "Quy trình", target: "quy-trinh" },
  { label: "Bảng giá", target: "bang-gia" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="h-screen w-full bg-black p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#101010] to-black md:rounded-[2rem]">
        {!videoFailed && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO_URL}
            onError={() => setVideoFailed(true)}
          />
        )}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Navbar pill */}
        <nav className="absolute top-0 left-1/2 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-5 py-2 md:rounded-b-3xl md:px-8 md:py-3">
          <ul className="flex items-center gap-4 sm:gap-6 md:gap-10">
            <li className="font-semibold text-sm md:text-base" style={{ color: CREAM }}>
              Xưởng Số
            </li>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.target} className={i < NAV_ITEMS.length - 1 ? "hidden sm:block" : ""}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="cursor-pointer text-xs transition-colors hover:text-[#E1E0CC] md:text-sm"
                  style={{ color: "rgba(225, 224, 204, 0.8)" }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom content grid */}
        <div className="absolute right-0 bottom-14 left-0 z-10 px-4 sm:px-6 md:bottom-16 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="text-[17vw] leading-[0.9] font-medium tracking-[-0.06em] md:text-[15vw]"
                style={{ color: CREAM }}
              >
                <WordsPullUp text="Xưởng Số" showAsterisk />
              </h1>
            </div>
            <div className="col-span-12 flex flex-col gap-4 pb-2 sm:gap-6 sm:pb-4 lg:col-span-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                className="text-xs sm:text-sm md:text-base"
                style={{ color: "rgba(222, 219, 200, 0.75)", lineHeight: 1.35 }}
              >
                Xưởng tạo <em className="font-serif italic">bài học</em> &amp;{" "}
                <em className="font-serif italic">học liệu</em> số bằng AI. Chọn template theo
                tiến trình bài dạy, copy prompt, dán vào Lovable · v0 · Claude — có ngay bài
                học của riêng bạn.
              </motion.p>
              <motion.button
                type="button"
                onClick={() => scrollToSection("storyboard")}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                className="group inline-flex cursor-pointer items-center gap-2 self-start rounded-full py-1 pr-1 pl-5 transition-all hover:gap-3"
                style={{ backgroundColor: CREAM_TW, color: "#000" }}
              >
                <span className="text-sm font-medium sm:text-base">Khám phá xưởng</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: CREAM }} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Marquee loại học liệu */}
        <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-white/10 bg-black/40 py-3 backdrop-blur-sm">
          <Marquee speed={45}>
            {MATERIAL_TYPES.map((type) => (
              <span key={type} className="inline-flex items-center gap-8 text-sm font-medium">
                <span style={{ color: MATERIAL_TYPE_INFO[type].color }}>
                  {MATERIAL_TYPE_INFO[type].label}
                </span>
                <span style={{ color: "rgba(225, 224, 204, 0.35)" }}>·</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
