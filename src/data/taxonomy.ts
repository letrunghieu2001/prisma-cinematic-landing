import {
  AudioLines,
  Box,
  Clapperboard,
  FileText,
  GraduationCap,
  Image,
  ListChecks,
  MousePointerClick,
  PackageOpen,
  Presentation,
  type LucideIcon,
} from "lucide-react";

import type { AiTool, ContentFormat, StoryboardStage } from "./types";

/** Easing đặc trưng dùng chung cho chuyển động */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Màu thương hiệu Trường học số / MobiFone ---------- */
export const BRAND = {
  primary: "#0061AF",
  primaryHover: "#0D67F7",
  primarySoft: "#F0F6FE",
  accent: "#ED1C24",
  ink: "#181D27",
  inkSoft: "#535862",
  inkMuted: "#717680",
  border: "#E9EAEB",
  surface: "#FFFFFF",
  canvas: "#FAFAFA",
} as const;

export interface FormatInfo {
  label: string;
  /** Màu chữ/nhấn (bản sáng, đúng gốc Trường học số) */
  color: string;
  /** Nền tint nhạt của loại */
  bg: string;
  icon: LucideIcon;
}

/** 10 định dạng nội dung hợp nhất: Bài học + 9 loại học liệu */
export const FORMAT_INFO: Record<ContentFormat, FormatInfo> = {
  "lesson-website": { label: "Bài học", color: "#0061AF", bg: "#F0F6FE", icon: GraduationCap },
  audio: { label: "Âm thanh", color: "#C11574", bg: "#FDF2FA", icon: AudioLines },
  video: { label: "Video", color: "#A15C07", bg: "#FEFBE8", icon: Clapperboard },
  image: { label: "Hình ảnh", color: "#0BA5EC", bg: "#F0F9FF", icon: Image },
  "scorm-xapi": { label: "SCORM/xAPI", color: "#055BE6", bg: "#F0F6FE", icon: PackageOpen },
  interactive: {
    label: "Học liệu nâng cao",
    color: "#9F1AB1",
    bg: "#FDF4FF",
    icon: MousePointerClick,
  },
  document: { label: "Tài liệu", color: "#6938EF", bg: "#F4F3FF", icon: FileText },
  lecture: { label: "Bài giảng", color: "#067647", bg: "#EDFCF2", icon: Presentation },
  "3d-vr": { label: "3D/VR", color: "#F04438", bg: "#FEF3F2", icon: Box },
  exam: { label: "Bộ đề", color: "#B93815", bg: "#FEF6EE", icon: ListChecks },
};

/** Thứ tự hiển thị định dạng trong sidebar */
export const FORMAT_ORDER: ContentFormat[] = [
  "lesson-website",
  "audio",
  "video",
  "image",
  "scorm-xapi",
  "interactive",
  "document",
  "lecture",
  "3d-vr",
  "exam",
];

export interface StageInfo {
  index: 1 | 2 | 3 | 4;
  label: string;
  color: string;
  description: string;
}

/** Giai đoạn bài dạy (bản màu sáng, tương phản tốt trên nền trắng) */
export const STAGE_INFO: Record<StoryboardStage, StageInfo> = {
  "khoi-dong": {
    index: 1,
    label: "Khởi động",
    color: "#DC6803",
    description: "Gây tò mò, kết nối kiến thức cũ trong 5–7 phút đầu giờ.",
  },
  "hinh-thanh": {
    index: 2,
    label: "Hình thành kiến thức",
    color: "#0061AF",
    description: "Học sinh khám phá và chiếm lĩnh kiến thức mới.",
  },
  "luyen-tap": {
    index: 3,
    label: "Luyện tập",
    color: "#067647",
    description: "Củng cố qua bài tập, trò chơi, quiz có phản hồi ngay.",
  },
  "van-dung": {
    index: 4,
    label: "Vận dụng",
    color: "#9F1AB1",
    description: "Gắn kiến thức với tình huống thực tế, dự án, sản phẩm.",
  },
};

export const STAGE_ORDER: StoryboardStage[] = ["khoi-dong", "hinh-thanh", "luyen-tap", "van-dung"];

export const SUBJECTS: string[] = [
  "Toán",
  "Ngữ văn",
  "Tiếng Anh",
  "KHTN",
  "Lịch sử & Địa lý",
  "GDCD",
];

export const GRADES: string[] = ["Tiểu học", "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "THPT"];

export const TOOL_INFO: Record<AiTool, { label: string }> = {
  lovable: { label: "Lovable" },
  v0: { label: "v0" },
  claude: { label: "Claude" },
  antigravity: { label: "Antigravity" },
  chatgpt: { label: "ChatGPT" },
  gemini: { label: "Gemini" },
};

export const TOOLS = Object.keys(TOOL_INFO) as AiTool[];
