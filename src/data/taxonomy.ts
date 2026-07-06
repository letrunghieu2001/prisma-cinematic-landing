import {
  AudioLines,
  Box,
  Clapperboard,
  FileText,
  Image,
  ListChecks,
  MousePointerClick,
  PackageOpen,
  Presentation,
  type LucideIcon,
} from "lucide-react";

import type { AiTool, MaterialType, StoryboardStage } from "./types";

/** Easing đặc trưng kế thừa từ ngôn ngữ chuyển động Prisma */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const CREAM = "#E1E0CC";
export const CREAM_TW = "#DEDBC8";

export interface MaterialTypeInfo {
  label: string;
  /** Bản tăng sáng của màu Trường học số, đạt tương phản >=3:1 trên nền đen */
  color: string;
  icon: LucideIcon;
}

export const MATERIAL_TYPE_INFO: Record<MaterialType, MaterialTypeInfo> = {
  audio: { label: "Âm thanh", color: "#FF4DB8", icon: AudioLines },
  video: { label: "Video", color: "#FDB022", icon: Clapperboard },
  image: { label: "Hình ảnh", color: "#38BDF8", icon: Image },
  "scorm-xapi": { label: "SCORM/xAPI", color: "#4D94FF", icon: PackageOpen },
  interactive: { label: "Học liệu nâng cao", color: "#C652DE", icon: MousePointerClick },
  document: { label: "Tài liệu", color: "#8B6CF6", icon: FileText },
  lecture: { label: "Bài giảng", color: "#17B26A", icon: Presentation },
  "3d-vr": { label: "3D/VR", color: "#F97066", icon: Box },
  exam: { label: "Bộ đề", color: "#F38744", icon: ListChecks },
};

export const MATERIAL_TYPES = Object.keys(MATERIAL_TYPE_INFO) as MaterialType[];

export interface StageInfo {
  index: 1 | 2 | 3 | 4;
  label: string;
  color: string;
  description: string;
}

export const STAGE_INFO: Record<StoryboardStage, StageInfo> = {
  "khoi-dong": {
    index: 1,
    label: "Khởi động",
    color: "#FDB022",
    description: "Gây tò mò, kết nối kiến thức cũ trong 5–7 phút đầu giờ.",
  },
  "hinh-thanh": {
    index: 2,
    label: "Hình thành kiến thức",
    color: "#4D94FF",
    description: "Học sinh khám phá và chiếm lĩnh kiến thức mới.",
  },
  "luyen-tap": {
    index: 3,
    label: "Luyện tập",
    color: "#17B26A",
    description: "Củng cố qua bài tập, trò chơi, quiz có phản hồi ngay.",
  },
  "van-dung": {
    index: 4,
    label: "Vận dụng",
    color: "#C652DE",
    description: "Gắn kiến thức với tình huống thực tế, dự án, sản phẩm.",
  },
};

export const STAGE_ORDER: StoryboardStage[] = [
  "khoi-dong",
  "hinh-thanh",
  "luyen-tap",
  "van-dung",
];

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
