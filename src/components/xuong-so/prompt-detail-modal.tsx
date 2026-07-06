import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Lock, X } from "lucide-react";

import { CopyButton } from "./copy-button";
import { CREAM, CREAM_TW, MATERIAL_TYPE_INFO, STAGE_INFO, TOOL_INFO } from "@/data/taxonomy";
import type { PromptItem } from "@/data/types";

interface PromptDetailModalProps {
  item: PromptItem | null;
  onClose: () => void;
}

const PREMIUM_PREVIEW_RATIO = 0.1;
const SCROLL_AFTER_CLOSE_MS = 50;

const MINI_STEPS = [
  "01 — Copy prompt",
  "02 — Dán vào Lovable, v0, Claude hoặc công cụ AI bạn quen",
  "03 — Nhúng sản phẩm vào lớp học trên Trường học số (học liệu dạng Nhúng)",
];

function ModalBody({ item, onClose }: { item: PromptItem; onClose: () => void }) {
  const typeInfo = item.materialType ? MATERIAL_TYPE_INFO[item.materialType] : null;
  const stageInfo = item.stage ? STAGE_INFO[item.stage] : null;
  const accentColor = typeInfo?.color ?? stageInfo?.color ?? CREAM_TW;
  const PreviewIcon = typeInfo?.icon;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function handleUpgrade() {
    onClose();
    setTimeout(() => {
      document.getElementById("bang-gia")?.scrollIntoView({ behavior: "smooth" });
    }, SCROLL_AFTER_CLOSE_MS);
  }

  const previewLength = Math.floor(item.prompt.length * PREMIUM_PREVIEW_RATIO);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.div
        layoutId={item.id}
        className="relative mx-auto max-w-3xl rounded-[2rem] bg-[#101010] p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-gray-300 transition-colors hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Preview */}
        {item.demoUrl ? (
          <div className="mb-6 overflow-hidden rounded-2xl border border-[#212121]">
            <iframe
              src={item.demoUrl}
              title={`Demo: ${item.title}`}
              sandbox="allow-scripts"
              className="h-[380px] w-full border-0"
            />
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black/60 py-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Mở toàn màn hình
            </a>
          </div>
        ) : (
          <div
            className="mb-6 flex h-[200px] items-center justify-center rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${accentColor}26, #000)` }}
          >
            {PreviewIcon && <PreviewIcon className="h-16 w-16" style={{ color: accentColor }} />}
          </div>
        )}

        <h3 className="mb-2 text-2xl font-semibold" style={{ color: CREAM }}>
          {item.title}
        </h3>
        <p className="mb-4 text-gray-400">{item.description}</p>

        <div className="mb-2 flex flex-wrap items-center gap-2">
          {typeInfo && (
            <span className="rounded-full px-3 py-1 text-xs font-semibold text-black" style={{ backgroundColor: typeInfo.color }}>
              {typeInfo.label}
            </span>
          )}
          {stageInfo && (
            <span className="rounded-full px-3 py-1 text-xs font-semibold text-black" style={{ backgroundColor: stageInfo.color }}>
              {stageInfo.label}
            </span>
          )}
          <span className="rounded-full border border-[#212121] px-3 py-1 text-xs text-gray-400">
            {item.subject}
          </span>
          <span className="rounded-full border border-[#212121] px-3 py-1 text-xs text-gray-400">
            {item.grade}
          </span>
        </div>
        <p className="mb-6 text-sm text-gray-500">
          Dùng tốt với: {item.tools.map((t) => TOOL_INFO[t].label).join(" · ")}
        </p>

        {/* Khối prompt */}
        <div className="relative mb-6 rounded-2xl border border-[#212121] bg-black">
          {item.access === "free" ? (
            <>
              <div className="absolute top-3 right-3">
                <CopyButton text={item.prompt} />
              </div>
              <pre className="max-h-[320px] overflow-y-auto p-5 pt-14 text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
                {item.prompt}
              </pre>
            </>
          ) : (
            <div className="relative">
              <pre className="max-h-[200px] overflow-hidden p-5 text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
                {item.prompt.slice(0, previewLength)}…
              </pre>
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 bg-gradient-to-b from-transparent via-black/60 to-black pb-6">
                <Lock className="h-6 w-6" style={{ color: CREAM_TW }} />
                <button
                  type="button"
                  onClick={handleUpgrade}
                  className="inline-flex cursor-pointer items-center rounded-full px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                  style={{ backgroundColor: CREAM_TW }}
                >
                  Nâng cấp để xem toàn bộ
                </button>
              </div>
            </div>
          )}
        </div>

        <ul className="space-y-1.5">
          {MINI_STEPS.map((step) => (
            <li key={step} className="text-sm text-gray-500">
              {step}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function PromptDetailModal({ item, onClose }: PromptDetailModalProps) {
  return (
    <AnimatePresence>{item && <ModalBody key={item.id} item={item} onClose={onClose} />}</AnimatePresence>
  );
}
