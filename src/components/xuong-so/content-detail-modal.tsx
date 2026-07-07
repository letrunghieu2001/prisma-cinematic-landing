import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Lock, X } from "lucide-react";

import { CopyButton } from "./copy-button";
import { BRAND, FORMAT_INFO, STAGE_INFO, TOOL_INFO } from "@/data/taxonomy";
import { formatOf, type PromptItem } from "@/data/types";

interface ContentDetailModalProps {
  item: PromptItem | null;
  onClose: () => void;
}

const PREMIUM_PREVIEW_RATIO = 0.12;

const MINI_STEPS = [
  "01 — Copy prompt",
  "02 — Dán vào Lovable, v0, Claude hoặc công cụ AI bạn quen",
  "03 — Nhúng sản phẩm vào lớp học trên Trường học số",
];

function ModalBody({ item, onClose }: { item: PromptItem; onClose: () => void }) {
  const info = FORMAT_INFO[formatOf(item)];
  const stageInfo = item.stage ? STAGE_INFO[item.stage] : null;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const previewLength = Math.floor(item.prompt.length * PREMIUM_PREVIEW_RATIO);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0C111D]/50 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-[0_24px_64px_rgba(16,24,40,0.24)] md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#F2F4F7] text-[#535862] transition-colors hover:bg-[#E4E7EC]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Preview lớn */}
        <div className="mb-5 overflow-hidden rounded-xl border border-[#E9EAEB]">
          <iframe
            src={item.demoUrl}
            title={`Demo: ${item.title}`}
            sandbox="allow-scripts"
            className="h-[380px] w-full border-0 bg-white"
          />
          <a
            href={item.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-t border-[#E9EAEB] bg-[#FAFAFA] py-2 text-sm text-[#535862] transition-colors hover:text-[#0061AF]"
          >
            <ExternalLink className="h-4 w-4" />
            Mở toàn màn hình
          </a>
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: info.bg, color: info.color }}
          >
            {info.label}
          </span>
          {stageInfo && (
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: stageInfo.color }}
            >
              {stageInfo.label}
            </span>
          )}
          <span className="rounded-full border border-[#E9EAEB] px-2.5 py-1 text-xs text-[#535862]">
            {item.subject}
          </span>
          <span className="rounded-full border border-[#E9EAEB] px-2.5 py-1 text-xs text-[#535862]">
            {item.grade}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-[#181D27]">{item.title}</h3>
        <p className="mb-4 text-[#535862]">{item.description}</p>
        <p className="mb-5 text-sm text-[#717680]">
          Dùng tốt với: {item.tools.map((t) => TOOL_INFO[t].label).join(" · ")}
        </p>

        {/* Khối prompt */}
        <div className="relative mb-5 rounded-xl border border-[#E9EAEB] bg-[#FAFAFA]">
          {item.access === "free" ? (
            <>
              <div className="absolute top-3 right-3">
                <CopyButton text={item.prompt} />
              </div>
              <pre className="max-h-[320px] overflow-y-auto p-5 pt-14 text-sm leading-relaxed whitespace-pre-wrap text-[#344054]">
                {item.prompt}
              </pre>
            </>
          ) : (
            <div className="relative">
              <pre className="max-h-[200px] overflow-hidden p-5 text-sm leading-relaxed whitespace-pre-wrap text-[#344054]">
                {item.prompt.slice(0, previewLength)}…
              </pre>
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 bg-gradient-to-b from-transparent via-white/70 to-white pb-6">
                <Lock className="h-5 w-5" style={{ color: BRAND.accent }} />
                <span className="text-sm font-semibold text-[#181D27]">Nội dung Premium</span>
                <span className="text-xs text-[#717680]">Sắp mở cho tài khoản nhà trường</span>
              </div>
            </div>
          )}
        </div>

        <ul className="space-y-1.5">
          {MINI_STEPS.map((step) => (
            <li key={step} className="text-sm text-[#717680]">
              {step}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function ContentDetailModal({ item, onClose }: ContentDetailModalProps) {
  return (
    <AnimatePresence>
      {item && <ModalBody key={item.id} item={item} onClose={onClose} />}
    </AnimatePresence>
  );
}
