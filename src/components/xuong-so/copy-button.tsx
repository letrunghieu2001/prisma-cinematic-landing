import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { BRAND } from "@/data/taxonomy";

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: "sm" | "lg";
  className?: string;
}

const COPIED_RESET_MS = 2000;

function legacyCopy(text: string): void {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const ok = document.execCommand("copy");
    if (!ok) throw new Error("execCommand copy failed");
  } finally {
    document.body.removeChild(textarea);
  }
}

export function CopyButton({
  text,
  label = "Copy prompt",
  size = "sm",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  function markCopied() {
    setCopied(true);
    toast.success("Đã copy prompt — dán vào Lovable, v0 hoặc Claude để tạo.");
    setTimeout(() => setCopied(false), COPIED_RESET_MS);
  }

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      markCopied();
    } catch {
      try {
        legacyCopy(text);
        markCopied();
      } catch {
        toast.error("Không copy được — mở chi tiết và copy thủ công nhé.");
      }
    }
  }

  const sizeClasses = size === "lg" ? "px-6 py-3 text-base min-h-[44px]" : "px-4 py-2 text-sm";
  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Đã copy prompt" : label}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${sizeClasses} ${className}`}
      style={{ backgroundColor: copied ? "#067647" : BRAND.primary, outlineColor: BRAND.primary }}
      onMouseEnter={(e) => {
        if (!copied) e.currentTarget.style.backgroundColor = BRAND.primaryHover;
      }}
      onMouseLeave={(e) => {
        if (!copied) e.currentTarget.style.backgroundColor = BRAND.primary;
      }}
    >
      <Icon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      <span>{copied ? "Đã copy" : label}</span>
    </button>
  );
}
