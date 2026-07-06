export type StoryboardStage = "khoi-dong" | "hinh-thanh" | "luyen-tap" | "van-dung";

export type MaterialType =
  | "audio"
  | "video"
  | "image"
  | "scorm-xapi"
  | "interactive"
  | "document"
  | "lecture"
  | "3d-vr"
  | "exam";

export type AiTool = "lovable" | "v0" | "claude" | "antigravity" | "chatgpt" | "gemini";

export type PromptKind = "lesson-website" | "material";

export type PromptAccess = "free" | "premium";

export interface PromptItem {
  id: string;
  slug: string;
  /** Tiếng Việt, ngắn gọn kiểu tên tác phẩm */
  title: string;
  /** 1-2 câu, giọng giáo viên nói với giáo viên */
  description: string;
  kind: PromptKind;
  /** Bắt buộc khi kind = "material" */
  materialType?: MaterialType;
  /** Bắt buộc với lesson-website; tùy chọn với material */
  stage?: StoryboardStage;
  /** Toán, Ngữ văn, Tiếng Anh, KHTN, Lịch sử & Địa lý, GDCD… */
  subject: string;
  /** Ví dụ "Lớp 7", "THPT", "Tiểu học" */
  grade: string;
  /** Công cụ AI khuyên dùng */
  tools: AiTool[];
  access: PromptAccess;
  /** Nội dung prompt thật tiếng Việt, có cấu trúc — không lorem */
  prompt: string;
  /** "/demos/vong-quay.html" — chỉ lesson-website có demo */
  demoUrl?: string;
  /** Số liệu demo */
  copies: number;
}
