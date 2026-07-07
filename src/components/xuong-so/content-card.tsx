import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { CopyButton } from "./copy-button";
import { PosterThumbnail } from "./poster-thumbnail";
import { BRAND, FORMAT_INFO } from "@/data/taxonomy";
import { formatOf, type CardSize, type PromptItem } from "@/data/types";

interface ContentCardProps {
  item: PromptItem;
  onOpen: (item: PromptItem) => void;
  /** Thiết bị có hover (desktop) hay không (touch) */
  hoverCapable: boolean;
  /** Card này đang là card được cuộn tới (dùng cho touch, 1 lần 1 content) */
  autoActive: boolean;
  /** Báo tỉ lệ hiển thị lên masonry để chọn card auto-play trên touch */
  onVisible: (id: string, ratio: number) => void;
}

const HOVER_DELAY_MS = 140;

/** Chiều cao thumbnail theo size — tạo nhịp lộn xộn kiểu Pinterest */
const POSTER_HEIGHT: Record<CardSize, string> = {
  sm: "h-40",
  md: "h-52",
  lg: "h-64",
  xl: "h-80",
};

export function ContentCard({
  item,
  onOpen,
  hoverCapable,
  autoActive,
  onVisible,
}: ContentCardProps) {
  const info = FORMAT_INFO[formatOf(item)];
  const reduced = useReducedMotion();

  const cardRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<number | null>(null);
  const inView = useInView(cardRef, { once: true, margin: "300px" });

  const [loaded, setLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);

  const active = !reduced && (hoverCapable ? hovering : autoActive);

  // Gửi play/pause tới iframe
  useEffect(() => {
    if (!loaded) return;
    iframeRef.current?.contentWindow?.postMessage(active ? "play" : "pause", "*");
  }, [active, loaded]);

  // Trên touch: theo dõi mức hiển thị để masonry chọn card đang xem
  useEffect(() => {
    if (hoverCapable || reduced) return;
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => onVisible(item.id, entry.intersectionRatio), {
      threshold: [0, 0.3, 0.6, 0.9],
    });
    io.observe(el);
    return () => {
      io.disconnect();
      onVisible(item.id, 0);
    };
  }, [hoverCapable, reduced, item.id, onVisible]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleEnter() {
    if (!hoverCapable || reduced) return;
    timerRef.current = window.setTimeout(() => setHovering(true), HOVER_DELAY_MS);
  }
  function handleLeave() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setHovering(false);
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-shadow duration-200 hover:shadow-[0_16px_40px_rgba(16,24,40,0.14)]"
    >
      {/* Thumbnail: poster tĩnh, hover/cuộn tới mới chạy demo */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Xem chi tiết ${item.title}`}
        className={`relative block w-full cursor-pointer overflow-hidden ${POSTER_HEIGHT[item.size]}`}
        style={{ background: info.bg }}
      >
        {/* Demo động (nền dưới) — mount khi tới gần viewport */}
        {inView && (
          <iframe
            ref={iframeRef}
            src={`${item.demoUrl}?chrome=0`}
            title={`Xem thử: ${item.title}`}
            sandbox="allow-scripts"
            loading="lazy"
            tabIndex={-1}
            scrolling="no"
            onLoad={() => setLoaded(true)}
            className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-white"
          />
        )}

        {/* Poster tĩnh (đè trên) — mờ đi khi active để lộ demo */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: active ? 0 : 1, pointerEvents: "none" }}
        >
          <PosterThumbnail item={item} hovering={hovering} />
        </div>
      </button>

      {/* Thân card */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ backgroundColor: info.bg, color: info.color }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: info.color }} />
            {info.label}
          </span>
          <span className="ml-auto">
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
          </span>
        </div>

        <h3 className="line-clamp-2 text-[15px] leading-snug font-semibold text-[#181D27]">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#535862]">
          {item.description}
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-xs text-[#717680]">
            {item.subject} · {item.grade}
          </span>
          {item.access === "free" ? (
            <CopyButton text={item.prompt} label="Copy" />
          ) : (
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="flex-none rounded-full border border-[#E9EAEB] px-3 py-1.5 text-sm font-medium text-[#535862] transition-colors hover:border-[#D0D5DD] hover:text-[#181D27]"
            >
              Xem
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
