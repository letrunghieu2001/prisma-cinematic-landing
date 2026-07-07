import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";

import { CopyButton } from "./copy-button";
import { BRAND, FORMAT_INFO } from "@/data/taxonomy";
import { formatOf, type CardSize, type PromptItem } from "@/data/types";

interface ContentCardProps {
  item: PromptItem;
  onOpen: (item: PromptItem) => void;
}

const HOVER_DELAY_MS = 140;

/** Chiều cao vùng thumbnail theo size — tạo nhịp lộn xộn kiểu Pinterest */
const POSTER_HEIGHT: Record<CardSize, string> = {
  sm: "h-44",
  md: "h-56",
  lg: "h-72",
  xl: "h-96",
};

export function ContentCard({ item, onOpen }: ContentCardProps) {
  const info = FORMAT_INFO[formatOf(item)];
  const Icon = info.icon;
  const reduced = useReducedMotion();

  const cardRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<number | null>(null);
  const inView = useInView(cardRef, { once: true, margin: "300px" });

  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Gửi lệnh play/pause tới iframe khi trạng thái đổi (và sau khi iframe đã load)
  useEffect(() => {
    if (!loaded || reduced) return;
    iframeRef.current?.contentWindow?.postMessage(playing ? "play" : "pause", "*");
  }, [playing, loaded, reduced]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleEnter() {
    if (reduced) return;
    timerRef.current = window.setTimeout(() => setPlaying(true), HOVER_DELAY_MS);
  }
  function handleLeave() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setPlaying(false);
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[#E9EAEB] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(16,24,40,0.12)]"
    >
      {/* Thumbnail: iframe demo đứng yên; hover mới chạy */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Xem chi tiết ${item.title}`}
        className={`relative w-full cursor-pointer overflow-hidden ${POSTER_HEIGHT[item.size]}`}
        style={{ background: `linear-gradient(135deg, ${info.bg}, #fff)` }}
      >
        {/* Placeholder trước khi iframe kịp render (giữ khung, tránh nhảy layout) */}
        <span
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white"
            style={{ boxShadow: "0 4px 12px rgba(16,24,40,0.08)" }}
          >
            <Icon className="h-6 w-6" style={{ color: info.color }} />
          </span>
        </span>

        {/* iframe thumbnail — mount khi tới gần viewport, mặc định đứng yên */}
        {inView && (
          <iframe
            ref={iframeRef}
            src={item.demoUrl}
            title={`Xem thử: ${item.title}`}
            sandbox="allow-scripts"
            loading="lazy"
            tabIndex={-1}
            scrolling="no"
            onLoad={() => setLoaded(true)}
            className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-white"
          />
        )}

        {/* Badge định dạng + nhãn "Xem thử" khi hover */}
        <span
          className="pointer-events-none absolute top-2 left-2 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold shadow-sm"
          style={{ color: info.color }}
        >
          {info.label}
        </span>
        <span className="pointer-events-none absolute right-2 bottom-2 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-3 w-3 fill-white" /> Đang chạy thử
        </span>
      </button>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-[15px] leading-snug font-semibold text-[#181D27]">
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
