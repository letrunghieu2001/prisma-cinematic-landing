import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";

import { CopyButton } from "./copy-button";
import { BRAND, FORMAT_INFO } from "@/data/taxonomy";
import { formatOf, type CardSize, type PromptItem } from "@/data/types";

interface ContentCardProps {
  item: PromptItem;
  /** id đang được xem trước (chỉ 1 card autoplay cùng lúc) */
  previewId: string | null;
  onRequestPreview: (id: string | null) => void;
  onOpen: (item: PromptItem) => void;
}

const HOVER_DELAY_MS = 170;

/** Chiều cao vùng poster theo size — tạo nhịp lộn xộn kiểu Pinterest */
const POSTER_HEIGHT: Record<CardSize, string> = {
  sm: "h-40",
  md: "h-52",
  lg: "h-64",
  xl: "h-80",
};

export function ContentCard({ item, previewId, onRequestPreview, onOpen }: ContentCardProps) {
  const info = FORMAT_INFO[formatOf(item)];
  const Icon = info.icon;
  const reduced = useReducedMotion();
  const timerRef = useRef<number | null>(null);

  const isPreviewing = previewId === item.id && !reduced;

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleEnter() {
    if (reduced) return;
    timerRef.current = window.setTimeout(() => onRequestPreview(item.id), HOVER_DELAY_MS);
  }
  function handleLeave() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (previewId === item.id) onRequestPreview(null);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[#E9EAEB] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(16,24,40,0.12)]"
    >
      {/* Poster + hover preview */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Xem chi tiết ${item.title}`}
        className={`relative w-full cursor-pointer overflow-hidden ${POSTER_HEIGHT[item.size]}`}
        style={{ background: `linear-gradient(135deg, ${info.bg}, #fff)` }}
      >
        {/* Poster tĩnh */}
        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(16,24,40,0.08)" }}
          >
            <Icon className="h-7 w-7" style={{ color: info.color }} />
          </span>
          <span
            className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium"
            style={{ color: info.color }}
          >
            {info.label}
          </span>
        </span>

        {/* Nhãn "tự chạy" khi hover, trước khi iframe kịp mount */}
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-3 w-3 fill-white" /> Xem thử
        </span>

        {/* Iframe autoplay — chỉ mount khi card này đang được xem trước */}
        {isPreviewing && (
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            src={item.demoUrl}
            title={`Demo: ${item.title}`}
            sandbox="allow-scripts"
            loading="lazy"
            tabIndex={-1}
            className="absolute inset-0 z-[5] h-full w-full border-0"
          />
        )}
      </button>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-[15px] font-semibold leading-snug text-[#181D27]">
            {item.title}
          </h3>
          {item.access === "premium" ? (
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
              style={{ backgroundColor: BRAND.accent }}
            >
              Premium
            </span>
          ) : (
            <span
              className="rounded-full bg-[#F0F6FE] px-2 py-0.5 text-[11px] font-semibold"
              style={{ color: BRAND.primary }}
            >
              Miễn phí
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#535862]">
          {item.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#717680]">
            {item.subject} · {item.grade}
          </span>
          {item.access === "free" ? (
            <CopyButton text={item.prompt} label="Copy" />
          ) : (
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="rounded-full border border-[#E9EAEB] px-3 py-1.5 text-sm font-medium text-[#535862] transition-colors hover:border-[#D0D5DD] hover:text-[#181D27]"
            >
              Xem
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
