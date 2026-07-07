import { Play } from "lucide-react";

import { FORMAT_INFO } from "@/data/taxonomy";
import { formatOf, type ContentFormat, type PromptItem } from "@/data/types";

/** Màu đậm cùng tông cho gradient poster — tạo chiều sâu, chữ trắng nổi */
const POSTER_DEEP: Record<ContentFormat, string> = {
  "lesson-website": "#003A6B",
  audio: "#7A0E48",
  video: "#6B3D04",
  image: "#075E86",
  "scorm-xapi": "#033B94",
  interactive: "#5E0F6A",
  document: "#3F1F99",
  lecture: "#044A2D",
  "3d-vr": "#9B2A22",
  exam: "#74230D",
};

interface PosterThumbnailProps {
  item: PromptItem;
  /** Play badge nảy lên khi card đang hover */
  hovering: boolean;
}

/**
 * Cover tĩnh kiểu YouTube: gradient theo màu loại + hình khối trang trí +
 * glyph lớn + thương hiệu + nhãn dưới. Hiện mặc định, mờ đi khi demo chạy.
 */
export function PosterThumbnail({ item, hovering }: PosterThumbnailProps) {
  const fmt = formatOf(item);
  const info = FORMAT_INFO[fmt];
  const Icon = info.icon;
  const deep = POSTER_DEEP[fmt];

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(140deg, ${info.color}, ${deep})` }}
    >
      {/* Khối trang trí mờ */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="330" cy="60" r="120" fill="#fff" opacity="0.08" />
        <circle cx="330" cy="60" r="80" fill="#fff" opacity="0.06" />
        <circle cx="60" cy="270" r="90" fill="#fff" opacity="0.06" />
        <circle cx="60" cy="270" r="55" fill="#000" opacity="0.05" />
      </svg>

      {/* Glyph lớn mờ ở góc — tạo texture */}
      <Icon
        className="pointer-events-none absolute -top-8 -right-6 h-44 w-44 text-white/10"
        strokeWidth={1.25}
      />

      {/* Thương hiệu góc trên */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-white/90">
          <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: info.color }} />
        </span>
        <span className="text-[11px] font-semibold text-white/90">Trường học số</span>
      </div>

      {/* Glyph chính + play badge */}
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
          <Icon className="h-8 w-8 text-white" strokeWidth={1.75} />
        </span>
        <span
          className="flex items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200"
          style={{
            width: 40,
            height: 40,
            transform: hovering ? "scale(1.12)" : "scale(1)",
          }}
        >
          <Play
            className="h-4 w-4 translate-x-[1px]"
            style={{ color: info.color }}
            fill="currentColor"
          />
        </span>
      </div>

      {/* Nhãn dưới */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/45 to-transparent p-3">
        <span
          className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold"
          style={{ color: info.color }}
        >
          {info.label}
        </span>
        <span className="truncate text-right text-xs font-semibold text-white/95">
          {item.subject} · {item.grade}
        </span>
      </div>
    </div>
  );
}
