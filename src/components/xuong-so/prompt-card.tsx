import { motion } from "motion/react";

import { CopyButton } from "./copy-button";
import { CREAM, CREAM_TW, MATERIAL_TYPE_INFO } from "@/data/taxonomy";
import type { PromptItem } from "@/data/types";

interface PromptCardProps {
  item: PromptItem;
  onOpen: (item: PromptItem) => void;
}

function scrollToPricing() {
  document.getElementById("bang-gia")?.scrollIntoView({ behavior: "smooth" });
}

export function PromptCard({ item, onOpen }: PromptCardProps) {
  const typeInfo = item.materialType ? MATERIAL_TYPE_INFO[item.materialType] : null;
  const color = typeInfo?.color ?? CREAM_TW;
  const TypeIcon = typeInfo?.icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="button"
      tabIndex={0}
      aria-label={`Xem chi tiết ${item.title}`}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
      className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border-l-2 bg-[#101010] transition-colors hover:bg-[#141414] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DEDBC8]"
      style={{ borderLeftColor: color }}
    >
      {/* Đầu card: khối màu loại */}
      <div
        className="relative flex h-28 items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}26, #101010)` }}
      >
        {TypeIcon && <TypeIcon className="h-10 w-10" style={{ color }} />}
        <span className="absolute top-3 right-3">
          {item.access === "premium" ? (
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-black"
              style={{ backgroundColor: CREAM_TW }}
            >
              Premium
            </span>
          ) : (
            <span
              className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
              style={{ borderColor: "rgba(222, 219, 200, 0.4)", color: CREAM_TW }}
            >
              Copy
            </span>
          )}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {typeInfo && (
          <span className="text-xs font-semibold" style={{ color }}>
            {typeInfo.label}
          </span>
        )}
        <h3 className="font-medium leading-snug" style={{ color: CREAM }}>
          {item.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
        <p className="text-xs text-gray-500">
          {item.subject} · {item.grade} · {item.copies} lượt copy
        </p>
        <div className="mt-auto pt-2">
          {item.access === "free" ? (
            <CopyButton text={item.prompt} />
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollToPricing();
              }}
              className="inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: CREAM_TW }}
            >
              Nâng cấp
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
