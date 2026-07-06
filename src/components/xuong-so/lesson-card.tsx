import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Eye, MonitorPlay } from "lucide-react";

import { CopyButton } from "./copy-button";
import { CREAM, CREAM_TW, STAGE_INFO } from "@/data/taxonomy";
import type { PromptItem } from "@/data/types";

interface LessonCardProps {
  item: PromptItem;
  onOpen: (item: PromptItem) => void;
  dimmed: boolean;
}

function AccessBadge({ access }: { access: PromptItem["access"] }) {
  if (access === "premium") {
    return (
      <span
        className="rounded-full px-3 py-1 text-xs font-semibold text-black"
        style={{ backgroundColor: CREAM_TW }}
      >
        Premium
      </span>
    );
  }
  return (
    <span
      className="rounded-full border px-3 py-1 text-xs font-medium"
      style={{ borderColor: "rgba(222, 219, 200, 0.4)", color: CREAM_TW }}
    >
      Copy
    </span>
  );
}

function scrollToPricing() {
  document.getElementById("bang-gia")?.scrollIntoView({ behavior: "smooth" });
}

export function LessonCard({ item, onOpen, dimmed }: LessonCardProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewInView = useInView(previewRef, { once: true, margin: "100px" });
  const [hovering, setHovering] = useState(false);
  const stageInfo = item.stage ? STAGE_INFO[item.stage] : null;
  const stageColor = stageInfo?.color ?? CREAM_TW;

  return (
    <motion.article
      layoutId={item.id}
      className={`overflow-hidden rounded-2xl bg-[#101010] transition-all duration-300 ${
        dimmed ? "opacity-35 grayscale" : ""
      }`}
      style={hovering && !dimmed ? { boxShadow: `0 0 60px ${stageColor}30` } : undefined}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Preview */}
      <div ref={previewRef} className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a]">
        {item.demoUrl && previewInView ? (
          <>
            <iframe
              src={item.demoUrl}
              title={`Demo: ${item.title}`}
              sandbox="allow-scripts"
              loading="lazy"
              className="h-full w-full border-0"
            />
            {/* Lớp phủ bắt click mở modal; khi hover thì cho tương tác demo */}
            <button
              type="button"
              aria-label={`Xem chi tiết ${item.title}`}
              onClick={() => onOpen(item)}
              className={`absolute inset-0 cursor-pointer bg-transparent ${
                hovering ? "pointer-events-none" : ""
              }`}
            />
          </>
        ) : (
          <button
            type="button"
            aria-label={`Xem chi tiết ${item.title}`}
            onClick={() => onOpen(item)}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${stageColor}26, #101010)` }}
          >
            <MonitorPlay className="h-12 w-12" style={{ color: stageColor }} />
            <span className="px-6 text-center text-sm text-gray-400">{item.title}</span>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {stageInfo && (
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-black"
              style={{ backgroundColor: stageInfo.color }}
            >
              {stageInfo.label}
            </span>
          )}
          <span className="rounded-full border border-[#212121] px-3 py-1 text-xs text-gray-400">
            {item.subject} · {item.grade}
          </span>
          <span className="ml-auto">
            <AccessBadge access={item.access} />
          </span>
        </div>
        <h3 className="text-xl font-semibold" style={{ color: CREAM }}>
          {item.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          {item.access === "free" ? (
            <CopyButton text={item.prompt} />
          ) : (
            <button
              type="button"
              onClick={scrollToPricing}
              className="inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: CREAM_TW }}
            >
              Nâng cấp
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#212121] px-4 py-2 text-sm text-gray-300 transition-colors hover:border-[#3a3a3a] hover:text-white"
          >
            <Eye className="h-4 w-4" />
            Xem thử
          </button>
        </div>
      </div>
    </motion.article>
  );
}
