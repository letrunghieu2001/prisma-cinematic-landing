import type { PromptItem } from "./types";

/**
 * 30 prompt mẫu — 8 template bài học HTML + 22 prompt học liệu.
 * Nội dung viết thật, dùng được ngay; free = 21, premium = 9.
 */
export const PROMPTS: PromptItem[] = [
  // ---------- 8 TEMPLATE BÀI HỌC HTML ----------
  {
    id: "lw-vong-quay",
    slug: "lw-vong-quay",
    title: "Vòng quay câu hỏi khởi động",
    description:
      "Trò vòng quay để hâm nóng đầu giờ. Học sinh quay trúng câu nào trả lời câu đó, có tính điểm hai đội cho vui.",
    kind: "lesson-website",
    stage: "khoi-dong",
    subject: "Toán",
    grade: "Lớp 7",
    tools: ["lovable", "claude", "v0"],
    access: "free",
    demoUrl: "/demos/vong-quay.html",
    copies: 812,
    prompt: `Bạn là lập trình viên front-end kiêm giáo viên Toán THCS. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không dùng thư viện ngoài), tiếng Việt, làm hoạt động KHỞI ĐỘNG 5–7 phút cho bài "Tỉ lệ thức" — Toán 7.

Yêu cầu sản phẩm: một vòng quay may mắn 8 ô, mỗi ô là một câu hỏi ngắn ôn kiến thức tỉ số đã học (ví dụ: "Viết tỉ số của 3 và 5", "Tìm x biết x/4 = 6/8"…). Bấm nút "Quay" thì vòng quay quay 3–5 giây với gia tốc giảm dần rồi dừng ngẫu nhiên; ô trúng sáng lên và hiện câu hỏi to giữa màn hình kèm nút "Hiện đáp án". Có bảng điểm 2 đội (cộng/trừ điểm bằng nút), phông chữ lớn nhìn rõ từ cuối lớp, màu tươi sáng trên nền tối, hiệu ứng confetti khi trả lời đúng.

Ràng buộc: HTML5 + CSS + JS thuần trong một file; hoạt động offline; chữ tiếng Việt có dấu đầy đủ; nút bấm to (tối thiểu 48px) để thao tác trên màn hình cảm ứng; không thu thập dữ liệu.`,
  },
  {
    id: "lw-duoi-hinh",
    slug: "lw-duoi-hinh",
    title: "Đuổi hình bắt chữ văn học",
    description:
      "Trò đuổi hình bắt chữ về tác phẩm, tác giả. Hợp để mở bài, ôn tên nhân vật hoặc chi tiết đã học.",
    kind: "lesson-website",
    stage: "khoi-dong",
    subject: "Ngữ văn",
    grade: "Lớp 8",
    tools: ["lovable", "claude"],
    access: "premium",
    copies: 356,
    prompt: `Bạn là giáo viên Ngữ văn THCS kiêm nhà thiết kế trò chơi lớp học. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không thư viện ngoài), tiếng Việt, làm trò "Đuổi hình bắt chữ" để KHỞI ĐỘNG tiết Ngữ văn 8.

Yêu cầu: 6 màn, mỗi màn hiển thị 2–4 biểu tượng emoji hoặc hình vẽ SVG gợi ý một từ khóa văn học (tên tác phẩm, tên nhân vật, hoặc một thành ngữ). Học sinh gõ đáp án vào ô, hệ thống chấm đúng/sai (bỏ qua dấu và chữ hoa), cho tối đa 2 gợi ý (mở dần số chữ cái). Có thanh tiến độ 6 màn, điểm số, và màn chúc mừng cuối. Vì đây là bản dùng cho tập huấn, hãy để phần dữ liệu câu đố trong một mảng JS rõ ràng để giáo viên dễ thay nội dung.

Ràng buộc: một file chạy offline; chữ Việt có dấu; nút và ô nhập to, rõ; giao diện vui mắt, phù hợp học sinh 13–14 tuổi; không thu thập dữ liệu người dùng.`,
  },
  {
    id: "lw-quang-hop",
    slug: "lw-quang-hop",
    title: "Bài học tương tác: Quang hợp",
    description:
      "Sơ đồ quang hợp bấm vào từng bộ phận là hiện giải thích, kèm 3 câu kiểm tra nhanh cuối bài.",
    kind: "lesson-website",
    stage: "hinh-thanh",
    subject: "KHTN",
    grade: "Lớp 7",
    tools: ["claude", "lovable", "antigravity"],
    access: "free",
    demoUrl: "/demos/quang-hop.html",
    copies: 674,
    prompt: `Bạn là giáo viên KHTN THCS kiêm lập trình viên. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS + SVG vẽ tay, không thư viện ngoài), tiếng Việt, làm bài học tương tác giúp học sinh HÌNH THÀNH KIẾN THỨC về quá trình quang hợp — KHTN 7.

Yêu cầu: một sơ đồ cây vẽ bằng SVG gồm mặt trời, lá, thân, rễ và các mũi tên chỉ CO₂ đi vào, O₂ đi ra, nước từ rễ lên. Khi học sinh bấm vào từng thành phần (mặt trời, lá, rễ, từng mũi tên), một bảng bên cạnh trượt ra giải thích vai trò của thành phần đó trong quang hợp, đúng nội dung KHTN 7. Có nút "Kiểm tra nhanh" mở 3 câu điền khuyết về nguyên liệu và sản phẩm của quang hợp, chấm đúng/sai ngay và hiện lời giải.

Ràng buộc: một file chạy offline; nền sáng dịu dễ đọc; chữ Việt có dấu; bố cục responsive để chiếu máy chiếu hoặc xem trên máy tính bảng; nội dung khoa học chính xác; không thu thập dữ liệu.`,
  },
  {
    id: "lw-dong-thoi-gian",
    slug: "lw-dong-thoi-gian",
    title: "Dòng thời gian 1945–1975",
    description:
      "Dòng thời gian các mốc lịch sử 1945–1975, bấm vào từng mốc là hiện chi tiết và ý nghĩa sự kiện.",
    kind: "lesson-website",
    stage: "hinh-thanh",
    subject: "Lịch sử & Địa lý",
    grade: "Lớp 9",
    tools: ["v0", "lovable", "claude"],
    access: "free",
    demoUrl: "/demos/dong-thoi-gian.html",
    copies: 521,
    prompt: `Bạn là giáo viên Lịch sử THCS kiêm nhà thiết kế web giáo dục. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không thư viện ngoài), tiếng Việt, làm dòng thời gian tương tác giúp học sinh HÌNH THÀNH KIẾN THỨC về giai đoạn lịch sử Việt Nam 1945–1975 — Lịch sử 9.

Yêu cầu: một trục thời gian ngang cuộn được với 8 mốc sự kiện quan trọng (ví dụ 2/9/1945, Điện Biên Phủ 1954, Hiệp định Paris 1973, 30/4/1975…). Mỗi mốc là một điểm bấm được; khi bấm sẽ hiện thẻ chi tiết gồm năm, tên sự kiện và 2–3 câu về ý nghĩa. Có nút Trước/Sau và các chấm tiến độ; hỗ trợ phím mũi tên trái/phải. Để phần dữ liệu sự kiện trong mảng JS rõ ràng để giáo viên dễ chỉnh.

Ràng buộc: một file chạy offline; giao diện trang trọng, dễ đọc khi chiếu; chữ Việt có dấu; nội dung lịch sử chính xác theo SGK; responsive; không thu thập dữ liệu.`,
  },
  {
    id: "lw-quiz-dau-truong",
    slug: "lw-quiz-dau-truong",
    title: "Quiz đấu trường 4 đáp án",
    description:
      "Quiz trắc nghiệm kiểu đấu trường có tính giờ và điểm, dùng để luyện tập từ vựng cuối tiết.",
    kind: "lesson-website",
    stage: "luyen-tap",
    subject: "Tiếng Anh",
    grade: "Lớp 6",
    tools: ["lovable", "v0", "claude"],
    access: "free",
    demoUrl: "/demos/quiz-dau-truong.html",
    copies: 903,
    prompt: `Bạn là giáo viên Tiếng Anh THCS kiêm lập trình viên game giáo dục. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không thư viện ngoài), tiếng Việt (phần hướng dẫn) + tiếng Anh (câu hỏi), làm trò quiz kiểu "đấu trường" để LUYỆN TẬP từ vựng và ngữ pháp cơ bản — Tiếng Anh 6.

Yêu cầu: 8 câu trắc nghiệm 4 đáp án hiển thị dạng lưới 2×2 nhiều màu như Kahoot. Mỗi câu có đồng hồ đếm ngược 15 giây với vòng tròn tiến độ; trả lời đúng được 10 điểm cộng thêm điểm thưởng theo tốc độ. Hiệu ứng rõ ràng khi đúng (xanh, dấu tích) và sai (đỏ, rung nhẹ). Màn hình bắt đầu có nút "Bắt đầu"; màn kết thúc hiện tổng điểm, số câu đúng trên 8, phần trăm và lời nhận xét tiếng Việt theo mức, kèm nút "Chơi lại".

Ràng buộc: một file chạy offline; chữ rõ, nút to trên 48px; màu tương phản tốt; nội dung phù hợp học sinh lớp 6; không thu thập dữ liệu.`,
  },
  {
    id: "lw-flashcard",
    slug: "lw-flashcard",
    title: "Flashcard lật thẻ từ vựng",
    description:
      "Bộ thẻ từ vựng lật hai mặt, có chế độ tự kiểm tra. Học sinh ôn từ theo chủ đề trước khi làm bài.",
    kind: "lesson-website",
    stage: "luyen-tap",
    subject: "Tiếng Anh",
    grade: "Lớp 7",
    tools: ["claude", "chatgpt"],
    access: "premium",
    copies: 288,
    prompt: `Bạn là giáo viên Tiếng Anh THCS kiêm lập trình viên front-end. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không thư viện ngoài), tiếng Việt (hướng dẫn) + tiếng Anh (nội dung), làm bộ thẻ ghi nhớ (flashcard) để LUYỆN TẬP từ vựng theo chủ đề — Tiếng Anh 7.

Yêu cầu: một bộ 12 thẻ, mặt trước là từ tiếng Anh + phiên âm, mặt sau là nghĩa tiếng Việt + một câu ví dụ. Bấm vào thẻ để lật (hiệu ứng lật 3D bằng CSS transform). Có nút Trước/Sau, nút "Đánh dấu đã thuộc", và chế độ "Tự kiểm tra": hiện nghĩa tiếng Việt, học sinh gõ từ tiếng Anh, chấm đúng/sai. Thanh tiến độ cho biết đã học bao nhiêu thẻ. Để dữ liệu từ vựng trong mảng JS rõ ràng để giáo viên thay chủ đề khác.

Ràng buộc: một file chạy offline; hiệu ứng lật mượt; chữ rõ, responsive cho điện thoại; chữ Việt có dấu; không thu thập dữ liệu.`,
  },
  {
    id: "lw-trien-lam",
    slug: "lw-trien-lam",
    title: "Trang triển lãm dự án nhóm",
    description:
      "Trang trưng bày sản phẩm dự án của các nhóm, mỗi nhóm một khung. Dùng cho tiết vận dụng, báo cáo dự án.",
    kind: "lesson-website",
    stage: "van-dung",
    subject: "Lịch sử & Địa lý",
    grade: "Lớp 8",
    tools: ["lovable", "antigravity"],
    access: "premium",
    copies: 197,
    prompt: `Bạn là giáo viên kiêm lập trình viên front-end. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không thư viện ngoài), tiếng Việt, làm trang "triển lãm số" để học sinh VẬN DỤNG — trưng bày sản phẩm dự án nhóm môn Lịch sử & Địa lý 8 (ví dụ dự án về một vùng kinh tế hoặc một giai đoạn lịch sử).

Yêu cầu: bố cục dạng phòng trưng bày với 6 gian, mỗi gian là một thẻ dự án gồm tên nhóm, tiêu đề, ảnh minh họa (dùng khung giữ chỗ có thể thay link ảnh), phần mô tả và một nút "Xem chi tiết" mở hộp thoại đọc đầy đủ. Có thanh điều hướng nhảy nhanh giữa các gian và một trang bìa mở đầu triển lãm. Để dữ liệu các nhóm trong mảng JS rõ ràng để giáo viên và học sinh tự điền.

Ràng buộc: một file chạy offline; giao diện trang trọng như một triển lãm; responsive; chữ Việt có dấu; không thu thập dữ liệu người dùng.`,
  },
  {
    id: "lw-nhap-vai",
    slug: "lw-nhap-vai",
    title: "Tình huống nhập vai ra quyết định",
    description:
      "Câu chuyện phân nhánh: học sinh chọn cách xử lý tình huống đạo đức, mỗi lựa chọn dẫn tới kết quả khác nhau.",
    kind: "lesson-website",
    stage: "van-dung",
    subject: "GDCD",
    grade: "Lớp 9",
    tools: ["claude", "gemini"],
    access: "free",
    copies: 342,
    prompt: `Bạn là giáo viên Giáo dục công dân kiêm nhà thiết kế truyện tương tác. Hãy tạo MỘT file HTML duy nhất, tự chứa (inline CSS/JS, không thư viện ngoài), tiếng Việt, làm trò nhập vai ra quyết định để học sinh VẬN DỤNG bài học về trách nhiệm và ứng xử — GDCD 9.

Yêu cầu: một câu chuyện phân nhánh về một tình huống đời sống (ví dụ chứng kiến bạn quay cóp, nhặt được của rơi, mâu thuẫn nhóm bạn). Mỗi màn nêu tình huống và 2–3 lựa chọn; mỗi lựa chọn dẫn tới màn tiếp theo và một kết quả khác nhau, cuối cùng hiện phần "Điều em học được" phân tích hệ quả của các quyết định. Có nút chơi lại để thử hướng khác. Đặt dữ liệu các nút chuyện trong một cấu trúc JS rõ ràng để giáo viên dễ mở rộng tình huống.

Ràng buộc: một file chạy offline; nội dung phù hợp lứa tuổi, không phán xét gay gắt, hướng tới suy ngẫm; chữ Việt có dấu; giao diện đọc dễ chịu; không thu thập dữ liệu.`,
  },

  // ---------- 22 PROMPT HỌC LIỆU ----------
  {
    id: "au-podcast-chuong",
    slug: "au-podcast-chuong",
    title: "Kịch bản podcast tóm tắt chương",
    description:
      "Kịch bản podcast hai người dẫn tóm tắt một chương văn học, giọng gần gũi để học sinh nghe ôn bài.",
    kind: "material",
    materialType: "audio",
    stage: "van-dung",
    subject: "Ngữ văn",
    grade: "Lớp 9",
    tools: ["claude", "gemini", "chatgpt"],
    access: "free",
    copies: 431,
    prompt: `Bạn là biên kịch podcast giáo dục kiêm giáo viên Ngữ văn. Hãy viết kịch bản một tập podcast dài 6–8 phút tóm tắt và bàn luận nhẹ nhàng về một chương/tác phẩm trong chương trình Ngữ văn 9 (giáo viên sẽ điền tên tác phẩm cụ thể).

Yêu cầu kịch bản: hai người dẫn (một thầy/cô và một học sinh tò mò) trò chuyện tự nhiên; mở đầu bằng một câu hỏi khơi gợi; lần lượt điểm qua bối cảnh, nhân vật chính, mạch truyện và thông điệp; xen vào 2–3 câu hỏi để người nghe tự ngẫm; kết bằng một lời nhắn ngắn giúp nhớ bài. Ghi rõ tên người nói trước mỗi lượt thoại. Kèm hướng dẫn giọng đọc (tốc độ vừa, thân mật) và gợi ý nhạc nền nhẹ ở đầu/cuối để nếu dùng công cụ chuyển văn bản thành giọng nói (text-to-speech) sẽ ra sản phẩm tự nhiên.

Ràng buộc: tiếng Việt chuẩn, dễ nghe; độ dài lời thoại hợp 6–8 phút; nội dung bám sát tác phẩm, không suy diễn sai; tránh thuật ngữ khó không giải thích.`,
  },
  {
    id: "au-hoi-thoai-ta",
    slug: "au-hoi-thoai-ta",
    title: "Hội thoại luyện nghe theo chủ đề",
    description:
      "Đoạn hội thoại tiếng Anh theo chủ đề quen thuộc, có phần chậm và phần tốc độ thường để luyện nghe.",
    kind: "material",
    materialType: "audio",
    stage: "luyen-tap",
    subject: "Tiếng Anh",
    grade: "Lớp 8",
    tools: ["chatgpt", "gemini", "claude"],
    access: "free",
    copies: 388,
    prompt: `Bạn là giáo viên Tiếng Anh THCS kiêm biên kịch audio luyện nghe. Hãy viết kịch bản một đoạn hội thoại luyện nghe cho học sinh Tiếng Anh 8 theo chủ đề đời sống quen thuộc (ví dụ hỏi đường, đặt món ăn, kể về kỳ nghỉ — giáo viên chọn).

Yêu cầu: một đoạn hội thoại 12–16 lượt thoại giữa hai nhân vật, dùng từ vựng và cấu trúc ngang trình độ lớp 8; ghi rõ tên người nói. Sau kịch bản, cung cấp: (1) bản dịch tiếng Việt; (2) danh sách 8 từ/cụm từ trọng tâm kèm nghĩa; (3) 5 câu hỏi hiểu nội dung (có đáp án); (4) gợi ý đọc hai tốc độ — một bản chậm rõ để nghe lần đầu và một bản tốc độ tự nhiên — để khi đưa vào công cụ tạo giọng nói sẽ có hai phiên bản phục vụ luyện tập.

Ràng buộc: tiếng Anh đúng ngữ pháp, phát âm dễ; nội dung trong sáng, phù hợp lứa tuổi; trình bày rõ từng phần.`,
  },
  {
    id: "au-ke-chuyen-th",
    slug: "au-ke-chuyen-th",
    title: "Giọng kể chuyện lịch sử có nhạc nền",
    description:
      "Kịch bản kể chuyện một nhân vật lịch sử cho học sinh tiểu học, lời giản dị, gợi cảm xúc.",
    kind: "material",
    materialType: "audio",
    stage: "khoi-dong",
    subject: "Lịch sử & Địa lý",
    grade: "Tiểu học",
    tools: ["claude", "gemini"],
    access: "premium",
    copies: 176,
    prompt: `Bạn là người kể chuyện cho thiếu nhi kiêm giáo viên tiểu học. Hãy viết kịch bản một đoạn kể chuyện dài 4–5 phút về một nhân vật hoặc câu chuyện lịch sử phù hợp học sinh tiểu học (giáo viên chọn nhân vật), dùng để mở đầu tiết học, khơi gợi hứng thú.

Yêu cầu: lời kể của một người dẫn, giọng ấm áp, câu ngắn, hình ảnh cụ thể, có đôi chỗ đặt câu hỏi nhỏ cho các em suy nghĩ ("Các con thử đoán xem…"). Chia rõ 3 phần: mở, diễn biến, và bài học rút ra thật nhẹ nhàng. Ghi chú giọng đọc (chậm, biểu cảm), chỗ nào ngừng lấy hơi, và gợi ý nhạc nền không lời êm dịu ở đầu và cuối để khi tạo audio bằng công cụ giọng nói sẽ giàu cảm xúc.

Ràng buộc: tiếng Việt trong sáng, dễ hiểu với trẻ 8–10 tuổi; nội dung lịch sử chính xác nhưng kể theo lối truyện; không có chi tiết bạo lực gây sợ hãi; độ dài lời thoại vừa 4–5 phút.`,
  },
  {
    id: "vi-kich-ban-3p",
    slug: "vi-kich-ban-3p",
    title: "Kịch bản video 3 phút + storyboard cảnh",
    description:
      "Kịch bản video giải thích một hiện tượng KHTN, chia cảnh rõ ràng kèm gợi ý hình ảnh cho từng cảnh.",
    kind: "material",
    materialType: "video",
    stage: "hinh-thanh",
    subject: "KHTN",
    grade: "Lớp 8",
    tools: ["gemini", "claude", "chatgpt"],
    access: "free",
    copies: 507,
    prompt: `Bạn là biên kịch video khoa học kiêm giáo viên KHTN. Hãy viết kịch bản một video giải thích dài khoảng 3 phút về một hiện tượng trong chương trình KHTN 8 (giáo viên chọn chủ đề, ví dụ áp suất, phản ứng hóa học, lực đẩy Acsimet).

Yêu cầu: chia thành 6–8 cảnh; mỗi cảnh trình bày dưới dạng bảng gồm ba cột — Số cảnh & thời lượng | Lời bình (voice-over tiếng Việt) | Gợi ý hình ảnh/động họa trên màn hình. Mở đầu bằng một câu hỏi hoặc tình huống đời thường; phần giữa giải thích bản chất hiện tượng theo trình tự dễ hiểu; kết bằng một ví dụ ứng dụng và một câu hỏi mở. Ghi rõ những từ khóa cần hiện chữ trên màn hình. Storyboard phải đủ chi tiết để giáo viên dựng bằng công cụ làm video AI hoặc phần mềm trình chiếu.

Ràng buộc: nội dung khoa học chính xác, ngôn ngữ phù hợp lớp 8; lời bình ngắn gọn, khớp thời lượng; tiếng Việt có dấu; không dùng thuật ngữ khó chưa giải thích.`,
  },
  {
    id: "vi-thi-nghiem-ao",
    slug: "vi-thi-nghiem-ao",
    title: "Video mô phỏng thí nghiệm an toàn",
    description:
      "Kịch bản video mô phỏng một thí nghiệm khó làm trực tiếp trên lớp, nhấn mạnh quy tắc an toàn.",
    kind: "material",
    materialType: "video",
    stage: "hinh-thanh",
    subject: "KHTN",
    grade: "THPT",
    tools: ["gemini", "claude"],
    access: "premium",
    copies: 231,
    prompt: `Bạn là biên kịch video giáo dục kiêm giáo viên môn khoa học tự nhiên bậc THPT. Hãy viết kịch bản một video mô phỏng một thí nghiệm khó hoặc nguy hiểm khi làm trực tiếp trên lớp (giáo viên chọn thí nghiệm, ví dụ phản ứng của kim loại kiềm với nước, điện phân).

Yêu cầu: chia 7–9 cảnh trình bày dạng bảng — Số cảnh & thời lượng | Lời bình | Mô tả hình ảnh/mô phỏng cần dựng. Mở đầu nêu mục tiêu và cảnh báo an toàn; trình bày dụng cụ, hóa chất; mô phỏng từng bước tiến hành với hiện tượng quan sát được; giải thích bản chất; nhấn mạnh quy tắc an toàn và xử lý sự cố; kết bằng câu hỏi củng cố. Ghi rõ các nhãn chữ và công thức cần hiện trên màn hình.

Ràng buộc: nội dung chính xác, đúng bản chất phản ứng; ngôn ngữ THPT; đặc biệt làm nổi bật yếu tố an toàn; lời bình khớp thời lượng; tiếng Việt có dấu.`,
  },
  {
    id: "im-infographic-quy-trinh",
    slug: "im-infographic-quy-trinh",
    title: "Infographic quy trình 5 bước",
    description:
      "Mô tả chi tiết để tạo một infographic giải thích một quy trình khoa học theo 5 bước, dễ in và chiếu.",
    kind: "material",
    materialType: "image",
    stage: "hinh-thanh",
    subject: "KHTN",
    grade: "Lớp 7",
    tools: ["chatgpt", "gemini"],
    access: "free",
    copies: 419,
    prompt: `Bạn là nhà thiết kế đồ họa thông tin kiêm giáo viên KHTN. Hãy viết một mô tả chi tiết (prompt) để tạo một infographic dọc giải thích một quy trình khoa học 5 bước trong chương trình KHTN 7 (giáo viên chọn chủ đề, ví dụ vòng tuần hoàn của nước, quá trình tiêu hóa).

Yêu cầu mô tả: nêu rõ tiêu đề, phong cách (tươi sáng, thân thiện học sinh, tối giản), bảng màu gợi ý, và bố cục 5 khối theo chiều dọc nối bằng mũi tên. Với mỗi bước, ghi: nhãn ngắn, một câu giải thích, và gợi ý biểu tượng minh họa. Bổ sung phần chú thích và một dòng ghi nguồn. Viết mô tả đủ cụ thể để đưa vào công cụ tạo ảnh AI ra kết quả dùng được, đồng thời nêu tỷ lệ khung hình phù hợp để vừa in A4 vừa chiếu.

Ràng buộc: nội dung khoa học chính xác; chữ trong hình bằng tiếng Việt có dấu; tránh chi tiết rườm rà gây rối; ưu tiên dễ đọc từ xa.`,
  },
  {
    id: "im-tranh-lich-su",
    slug: "im-tranh-lich-su",
    title: "Bộ tranh minh họa sự kiện lịch sử",
    description:
      "Mô tả để tạo bộ tranh minh họa một sự kiện lịch sử, dùng treo lớp hoặc chèn vào bài giảng.",
    kind: "material",
    materialType: "image",
    stage: "khoi-dong",
    subject: "Lịch sử & Địa lý",
    grade: "Lớp 6",
    tools: ["chatgpt", "gemini"],
    access: "free",
    copies: 264,
    prompt: `Bạn là họa sĩ minh họa lịch sử kiêm giáo viên. Hãy viết mô tả chi tiết (prompt) để tạo một bộ 3 tranh minh họa cùng phong cách về một sự kiện hoặc thời kỳ lịch sử trong chương trình Lịch sử & Địa lý 6 (giáo viên chọn chủ đề).

Yêu cầu: nêu rõ phong cách tranh (ví dụ tranh màu nước trang trọng hoặc tranh vẽ minh họa sách giáo khoa), tông màu, và bối cảnh chung để cả 3 tranh nhất quán. Mô tả từng tranh: cảnh gì, nhân vật, trang phục, chi tiết bối cảnh đúng thời kỳ, và cảm xúc muốn truyền tải. Ghi chú tránh lỗi lịch sử thường gặp (trang phục, kiến trúc sai thời kỳ). Nêu tỷ lệ khung hình ngang phù hợp chèn vào slide và một biến thể dọc để in treo lớp.

Ràng buộc: chính xác về mặt lịch sử ở mức phù hợp lớp 6; hình ảnh phù hợp lứa tuổi, không bạo lực; mô tả đủ rõ để công cụ tạo ảnh cho kết quả nhất quán giữa 3 tranh.`,
  },
  {
    id: "im-so-do-tu-duy",
    slug: "im-so-do-tu-duy",
    title: "Sơ đồ tư duy ôn tập chương",
    description:
      "Mô tả để tạo sơ đồ tư duy tổng hợp một chương Toán, giúp học sinh hệ thống kiến thức khi ôn tập.",
    kind: "material",
    materialType: "image",
    stage: "luyen-tap",
    subject: "Toán",
    grade: "Lớp 9",
    tools: ["gemini", "chatgpt", "claude"],
    access: "free",
    copies: 356,
    prompt: `Bạn là giáo viên Toán THCS kiêm nhà thiết kế sơ đồ tư duy. Hãy viết mô tả chi tiết (prompt) để tạo một sơ đồ tư duy tổng hợp kiến thức một chương Toán 9 (giáo viên chọn chương, ví dụ Hàm số bậc nhất, Hệ phương trình).

Yêu cầu: nêu chủ đề trung tâm đặt ở giữa, 4–6 nhánh chính tỏa ra, mỗi nhánh có 2–3 nhánh phụ ghi công thức hoặc dạng bài quan trọng. Mô tả rõ: bảng màu phân biệt các nhánh, kiểu chữ dễ đọc, và cách sắp xếp cân đối để không rối. Ghi rõ toàn bộ nội dung chữ trên sơ đồ (chính xác về mặt toán học) để công cụ tạo ảnh đặt đúng chỗ. Nêu tỷ lệ khung hình ngang để chiếu và bản in A4.

Ràng buộc: nội dung toán chính xác, đúng chương trình lớp 9; chữ tiếng Việt và ký hiệu toán rõ ràng; bố cục thoáng, dễ nhìn từ xa; tránh nhồi quá nhiều chữ vào một nhánh.`,
  },
  {
    id: "sc-goi-bai-hoc",
    slug: "sc-goi-bai-hoc",
    title: "Gói SCORM bài học có chấm điểm",
    description:
      "Cấu trúc một gói SCORM cho bài Toán, gồm phần lý thuyết, ví dụ và bài kiểm tra chấm điểm tự động.",
    kind: "material",
    materialType: "scorm-xapi",
    stage: "hinh-thanh",
    subject: "Toán",
    grade: "Lớp 8",
    tools: ["claude", "lovable"],
    access: "premium",
    copies: 208,
    prompt: `Bạn là chuyên gia thiết kế học liệu điện tử kiêm giáo viên Toán. Hãy mô tả chi tiết cấu trúc một gói học liệu chuẩn SCORM cho một bài Toán 8 (giáo viên chọn bài, ví dụ Hằng đẳng thức đáng nhớ), để có thể dựng bằng công cụ tạo SCORM rồi tải lên hệ thống Trường học số.

Yêu cầu: chia gói thành các màn (screens) rõ ràng — màn giới thiệu mục tiêu; 2–3 màn lý thuyết có ví dụ minh họa từng bước; 1 màn hướng dẫn có tương tác (kéo thả hoặc bấm chọn); và 1 màn kiểm tra gồm 5 câu trắc nghiệm/điền khuyết. Với phần kiểm tra, mô tả yêu cầu chấm điểm tự động và ghi nhận kết quả: điểm đạt tối thiểu (ví dụ 60%), số lần làm lại, và các trạng thái cần báo về hệ thống (hoàn thành, đạt/chưa đạt, điểm số) theo cách SCORM lưu tiến trình. Nêu rõ nội dung từng câu hỏi và đáp án.

Ràng buộc: nội dung toán chính xác lớp 8; mô tả đủ để người dựng biết chính xác từng màn và luật chấm điểm; tiếng Việt có dấu; nhắc yêu cầu đóng gói .zip chuẩn SCORM để tải lên được.`,
  },
  {
    id: "sc-xapi-tracking",
    slug: "sc-xapi-tracking",
    title: "Mô-đun xAPI theo dõi tiến độ đọc",
    description:
      "Mô tả mô-đun học liệu ghi nhận hành vi đọc của học sinh theo chuẩn xAPI, để giáo viên nắm ai đã đọc tới đâu.",
    kind: "material",
    materialType: "scorm-xapi",
    stage: "luyen-tap",
    subject: "Ngữ văn",
    grade: "THPT",
    tools: ["claude", "lovable"],
    access: "free",
    copies: 143,
    prompt: `Bạn là chuyên gia học liệu điện tử kiêm giáo viên Ngữ văn. Hãy mô tả chi tiết một mô-đun học liệu đọc hiểu theo chuẩn xAPI cho một văn bản trong chương trình Ngữ văn THPT (giáo viên chọn văn bản), để dựng bằng công cụ tạo học liệu rồi đưa lên hệ thống có ghi nhận tiến trình.

Yêu cầu: mô tả bố cục mô-đun gồm phần đọc chia theo đoạn, các câu hỏi suy ngẫm chèn giữa các đoạn, và phần tổng kết. Quan trọng nhất: liệt kê các hành vi cần ghi nhận theo xAPI dưới dạng câu "chủ thể – hành động – đối tượng" (ví dụ "học sinh đã mở mô-đun", "đã đọc xong đoạn 2", "đã trả lời câu hỏi 3", "đã hoàn thành") kèm dữ liệu đi kèm như thời điểm và kết quả. Nêu rõ mục đích: giúp giáo viên biết ai đã đọc tới đâu và trả lời thế nào.

Ràng buộc: nội dung bám sát văn bản; mô tả hành vi xAPI rõ ràng, đúng cấu trúc; tiếng Việt có dấu; nhắc yêu cầu xuất gói theo chuẩn để hệ thống nhận tiến trình.`,
  },
  {
    id: "in-mo-phong-phan-so",
    slug: "in-mo-phong-phan-so",
    title: "Mô phỏng tương tác chia phần bánh",
    description:
      "Học liệu tương tác cho học sinh tiểu học kéo cắt phần bánh để hiểu phân số, thao tác trực tiếp bằng chuột.",
    kind: "material",
    materialType: "interactive",
    stage: "hinh-thanh",
    subject: "Toán",
    grade: "Tiểu học",
    tools: ["lovable", "claude", "v0"],
    access: "free",
    copies: 478,
    prompt: `Bạn là giáo viên tiểu học kiêm lập trình viên học liệu tương tác. Hãy mô tả chi tiết (và có thể kèm HTML một file tự chứa) một học liệu nâng cao giúp học sinh tiểu học hiểu khái niệm phân số qua việc chia phần bánh.

Yêu cầu: một chiếc bánh hình tròn có thể chia thành 2, 3, 4, 6 hoặc 8 phần bằng cách bấm nút; học sinh bấm chọn tô màu một số phần và màn hình hiện phân số tương ứng (ví dụ tô 3 trên 4 phần thì hiện 3/4) kèm câu đọc "ba phần tư". Có phần bài tập nhỏ: đưa ra một phân số, yêu cầu học sinh tô đúng số phần, chấm đúng/sai với lời khen động viên. Giao diện nhiều màu, hình minh họa vui, nút to.

Ràng buộc: nội dung toán chính xác; ngôn ngữ và hình ảnh phù hợp trẻ 8–10 tuổi; thao tác đơn giản bằng chuột hoặc chạm; chữ Việt có dấu; nếu xuất HTML thì một file chạy offline, không thu thập dữ liệu.`,
  },
  {
    id: "in-keo-tha-tu-loai",
    slug: "in-keo-tha-tu-loai",
    title: "Trò chơi kéo thả phân loại từ",
    description:
      "Học liệu kéo thả xếp các từ vào đúng nhóm từ loại. Dùng luyện tập, có chấm điểm và làm lại.",
    kind: "material",
    materialType: "interactive",
    stage: "luyen-tap",
    subject: "Ngữ văn",
    grade: "Lớp 6",
    tools: ["lovable", "claude", "v0"],
    access: "premium",
    copies: 312,
    prompt: `Bạn là giáo viên Ngữ văn THCS kiêm lập trình viên học liệu tương tác. Hãy mô tả chi tiết (và có thể kèm HTML một file tự chứa) một trò chơi kéo thả để học sinh LUYỆN TẬP phân loại từ theo từ loại — Ngữ văn 6 (danh từ, động từ, tính từ).

Yêu cầu: màn hình có ba giỏ (Danh từ, Động từ, Tính từ) và một khay chứa 12 thẻ từ. Học sinh kéo từng thẻ vào giỏ tương ứng; thả đúng thì thẻ bám vào và sáng xanh, thả sai thì bật lại kèm gợi ý ngắn. Có nút "Kiểm tra" hiện số câu đúng và điểm, nút "Làm lại" xáo trộn vị trí. Để dữ liệu các từ trong mảng JS rõ ràng để giáo viên thay bộ từ khác. Có hiệu ứng và lời khen động viên khi hoàn thành.

Ràng buộc: nội dung ngữ pháp chính xác; thao tác kéo thả mượt trên cả chuột và cảm ứng; chữ Việt có dấu; nếu xuất HTML thì một file chạy offline; không thu thập dữ liệu.`,
  },
  {
    id: "do-phieu-hoc-tap",
    slug: "do-phieu-hoc-tap",
    title: "Phiếu học tập theo trạm",
    description:
      "Bộ phiếu học tập chia theo các trạm hoạt động cho một tiết KHTN, in ra phát cho từng nhóm.",
    kind: "material",
    materialType: "document",
    stage: "luyen-tap",
    subject: "KHTN",
    grade: "Lớp 7",
    tools: ["claude", "chatgpt", "gemini"],
    access: "free",
    copies: 402,
    prompt: `Bạn là giáo viên KHTN THCS. Hãy soạn một bộ phiếu học tập theo phương pháp dạy học theo trạm cho một tiết KHTN 7 (giáo viên chọn chủ đề), để in ra phát cho các nhóm.

Yêu cầu: thiết kế 4 trạm hoạt động, mỗi trạm là một phiếu riêng gồm: tên trạm, mục tiêu ngắn, nhiệm vụ cụ thể (quan sát, thí nghiệm nhỏ, đọc tư liệu hoặc thảo luận), chỗ trống để học sinh ghi câu trả lời, và thời gian gợi ý. Kèm một phiếu tổng hợp để nhóm ghi kết luận sau khi qua đủ 4 trạm, và một hướng dẫn ngắn cho giáo viên về cách luân chuyển nhóm. Trình bày rõ ràng, có khung và dòng kẻ để viết.

Ràng buộc: nội dung khoa học chính xác lớp 7; nhiệm vụ vừa sức, làm được trong thời gian một tiết; ngôn ngữ rõ ràng cho học sinh tự đọc hiểu; định dạng dễ in đen trắng A4; tiếng Việt có dấu.`,
  },
  {
    id: "do-giao-an-5512",
    slug: "do-giao-an-5512",
    title: "Giáo án theo Công văn 5512",
    description:
      "Khung giáo án đầy đủ theo mẫu Công văn 5512, chia rõ bốn hoạt động, để giáo viên điền nội dung bài mình.",
    kind: "material",
    materialType: "document",
    stage: "hinh-thanh",
    subject: "Toán",
    grade: "Lớp 7",
    tools: ["claude", "chatgpt", "gemini"],
    access: "free",
    copies: 587,
    prompt: `Bạn là giáo viên Toán THCS quen soạn giáo án theo Công văn 5512 của Bộ Giáo dục và Đào tạo. Hãy soạn một giáo án hoàn chỉnh cho một bài Toán 7 (giáo viên chọn bài) đúng cấu trúc kế hoạch bài dạy 5512.

Yêu cầu: đủ các phần — I. Mục tiêu (kiến thức, năng lực, phẩm chất); II. Thiết bị dạy học và học liệu; III. Tiến trình dạy học chia thành 4 hoạt động: (1) Khởi động, (2) Hình thành kiến thức mới, (3) Luyện tập, (4) Vận dụng. Mỗi hoạt động ghi rõ: mục tiêu, nội dung, sản phẩm, và tổ chức thực hiện theo các bước chuyển giao nhiệm vụ – thực hiện – báo cáo – kết luận. Chèn câu hỏi và bài tập cụ thể ở mỗi hoạt động. Trình bày dạng văn bản rõ ràng, dễ chỉnh sửa.

Ràng buộc: đúng cấu trúc và tinh thần Công văn 5512; nội dung toán chính xác lớp 7; ngôn ngữ sư phạm chuẩn; tiếng Việt có dấu; độ dài hợp lý cho một tiết học.`,
  },
  {
    id: "do-de-cuong-on",
    slug: "do-de-cuong-on",
    title: "Đề cương ôn tập giữa kỳ",
    description:
      "Đề cương ôn tập tiếng Anh giữa kỳ, tóm tắt trọng tâm kèm bài tập tự luyện và đáp án.",
    kind: "material",
    materialType: "document",
    stage: "van-dung",
    subject: "Tiếng Anh",
    grade: "Lớp 9",
    tools: ["chatgpt", "claude", "gemini"],
    access: "free",
    copies: 445,
    prompt: `Bạn là giáo viên Tiếng Anh THCS. Hãy soạn một đề cương ôn tập giữa học kỳ cho học sinh Tiếng Anh 9, tổng hợp trọng tâm và kèm bài tập tự luyện có đáp án.

Yêu cầu: chia đề cương thành các phần — (1) Tóm tắt ngữ pháp trọng tâm giữa kỳ (giáo viên nêu các đơn vị, ví dụ thì hiện tại hoàn thành, câu tường thuật) với ví dụ minh họa; (2) Danh sách từ vựng theo chủ đề đã học kèm nghĩa; (3) Bài tập tự luyện chia dạng (chọn đáp án, chia động từ, viết lại câu, đọc hiểu ngắn) với số lượng vừa phải mỗi dạng; (4) Đáp án chi tiết ở cuối. Trình bày rõ ràng, đánh số, dễ in cho học sinh mang về nhà tự học.

Ràng buộc: nội dung đúng chương trình lớp 9, độ khó phù hợp giữa kỳ; tiếng Anh chuẩn; hướng dẫn bằng tiếng Việt có dấu; định dạng dễ in A4; phần đáp án tách riêng để tiện photo.`,
  },
  {
    id: "le-slide-outline",
    slug: "le-slide-outline",
    title: "Dàn ý slide bài giảng 12 trang",
    description:
      "Dàn ý chi tiết cho bộ slide bài giảng Ngữ văn 12 trang, ghi rõ nội dung và gợi ý hình cho từng trang.",
    kind: "material",
    materialType: "lecture",
    stage: "hinh-thanh",
    subject: "Ngữ văn",
    grade: "Lớp 8",
    tools: ["gemini", "claude", "chatgpt"],
    access: "free",
    copies: 391,
    prompt: `Bạn là giáo viên Ngữ văn THCS kiêm người thiết kế bài giảng trình chiếu. Hãy soạn dàn ý chi tiết cho một bộ slide bài giảng khoảng 12 trang cho một bài Ngữ văn 8 (giáo viên chọn bài).

Yêu cầu: với mỗi trang slide, ghi rõ — Số trang | Tiêu đề trang | Nội dung chính (gạch đầu dòng ngắn gọn, không viết cả đoạn dài) | Gợi ý hình ảnh hoặc sơ đồ minh họa | Ghi chú cho giáo viên (câu hỏi đặt ra, điều cần nhấn mạnh). Bố cục bài giảng đi từ trang tựa, giới thiệu tác giả/tác phẩm, phân tích nội dung – nghệ thuật theo trình tự, đến trang tổng kết và câu hỏi luyện tập. Đảm bảo mỗi trang không quá tải chữ.

Ràng buộc: nội dung bám sát tác phẩm, chính xác; văn phong sư phạm; ưu tiên trình bày để trình chiếu (ít chữ, rõ ý); tiếng Việt có dấu; dàn ý đủ chi tiết để dựng bằng công cụ tạo slide.`,
  },
  {
    id: "le-bai-giang-tuong-tac",
    slug: "le-bai-giang-tuong-tac",
    title: "Bài giảng tương tác có câu hỏi chèn",
    description:
      "Kịch bản bài giảng có chèn câu hỏi giữa chừng để giữ sự chú ý, dùng cho bài Lịch sử THPT.",
    kind: "material",
    materialType: "lecture",
    stage: "hinh-thanh",
    subject: "Lịch sử & Địa lý",
    grade: "THPT",
    tools: ["claude", "gemini", "lovable"],
    access: "premium",
    copies: 219,
    prompt: `Bạn là giáo viên Lịch sử THPT kiêm nhà thiết kế bài giảng tương tác. Hãy soạn kịch bản một bài giảng có chèn câu hỏi tương tác giữa chừng cho một bài Lịch sử THPT (giáo viên chọn bài), để dựng thành bài giảng điện tử.

Yêu cầu: chia bài giảng thành 5–7 phân đoạn nội dung; sau mỗi phân đoạn chèn một điểm dừng tương tác (câu hỏi trắc nghiệm nhanh, câu hỏi mở hoặc yêu cầu quan sát tư liệu) với đáp án và phản hồi gợi ý. Với mỗi phân đoạn ghi rõ: nội dung trình bày cô đọng, gợi ý tư liệu/hình ảnh, và câu hỏi tương tác kèm mục đích. Kết thúc bằng phần hệ thống hóa kiến thức và một câu hỏi vận dụng. Mục tiêu là giữ học sinh chủ động thay vì nghe thụ động.

Ràng buộc: nội dung lịch sử chính xác, khách quan; ngôn ngữ phù hợp THPT; câu hỏi tương tác bám sát nội dung vừa trình bày; tiếng Việt có dấu; đủ chi tiết để dựng bằng công cụ tạo bài giảng tương tác.`,
  },
  {
    id: "3d-he-mat-troi",
    slug: "3d-he-mat-troi",
    title: "Cảnh 3D hệ Mặt Trời",
    description:
      "Mô tả một cảnh 3D hệ Mặt Trời cho học sinh xoay xem các hành tinh, dùng khi dạy về vũ trụ.",
    kind: "material",
    materialType: "3d-vr",
    stage: "hinh-thanh",
    subject: "KHTN",
    grade: "Lớp 6",
    tools: ["claude", "lovable", "antigravity"],
    access: "free",
    copies: 367,
    prompt: `Bạn là chuyên gia dựng cảnh 3D giáo dục kiêm giáo viên KHTN. Hãy mô tả chi tiết một cảnh 3D hệ Mặt Trời cho học sinh KHTN 6, đủ rõ để dựng bằng công cụ tạo cảnh 3D/WebGL (ví dụ Three.js) rồi nhúng làm học liệu.

Yêu cầu: mô tả Mặt Trời ở trung tâm và 8 hành tinh quay quanh theo quỹ đạo, kích thước và khoảng cách được điều chỉnh hợp lý để dễ quan sát (không cần đúng tỷ lệ thật, ưu tiên trực quan). Người dùng có thể xoay, phóng to/thu nhỏ bằng chuột hoặc chạm; bấm vào một hành tinh sẽ hiện bảng thông tin ngắn (tên, đặc điểm nổi bật, vị trí so với Mặt Trời). Ghi rõ màu sắc gợi ý cho từng hành tinh, tốc độ quay tương đối, và ánh sáng phát ra từ Mặt Trời. Nêu yêu cầu chạy được trên trình duyệt máy tính và máy tính bảng.

Ràng buộc: thông tin thiên văn chính xác ở mức lớp 6; thao tác đơn giản; nhãn và bảng thông tin bằng tiếng Việt có dấu; hiệu năng nhẹ để máy trường chạy được.`,
  },
  {
    id: "3d-te-bao",
    slug: "3d-te-bao",
    title: "Mô hình 3D tế bào thực vật",
    description:
      "Mô tả mô hình 3D tế bào thực vật để học sinh xoay xem và tìm hiểu từng bào quan, dùng cho THPT.",
    kind: "material",
    materialType: "3d-vr",
    stage: "hinh-thanh",
    subject: "KHTN",
    grade: "THPT",
    tools: ["claude", "lovable"],
    access: "premium",
    copies: 184,
    prompt: `Bạn là chuyên gia dựng mô hình 3D sinh học kiêm giáo viên. Hãy mô tả chi tiết một mô hình 3D tế bào thực vật cho học sinh THPT, đủ rõ để dựng bằng công cụ tạo mô hình 3D/WebGL rồi nhúng làm học liệu tương tác.

Yêu cầu: mô tả một tế bào thực vật cắt bổ đôi để nhìn thấy bên trong, gồm các bào quan chính: thành tế bào, màng sinh chất, nhân, lục lạp, ti thể, không bào, bộ máy Golgi, lưới nội chất. Người dùng xoay và phóng to bằng chuột/chạm; bấm vào từng bào quan sẽ làm nổi bật nó và hiện bảng chú thích về cấu tạo và chức năng. Có chế độ "ẩn/hiện nhãn" và một danh sách bên cạnh để nhảy nhanh tới từng bào quan. Ghi rõ màu sắc phân biệt các bào quan và bố cục hợp lý để không che khuất nhau.

Ràng buộc: nội dung sinh học chính xác cấp THPT; nhãn và chú thích bằng tiếng Việt có dấu; thao tác trực quan; tối ưu để chạy mượt trên máy cấu hình trung bình.`,
  },
  {
    id: "ex-ma-tran-de",
    slug: "ex-ma-tran-de",
    title: "Ma trận đề + đề kiểm tra 45 phút",
    description:
      "Ma trận đề theo mức độ nhận thức kèm đề kiểm tra 45 phút môn Toán và đáp án, dùng cho kiểm tra định kỳ.",
    kind: "material",
    materialType: "exam",
    stage: "van-dung",
    subject: "Toán",
    grade: "Lớp 8",
    tools: ["claude", "chatgpt", "gemini"],
    access: "free",
    copies: 498,
    prompt: `Bạn là giáo viên Toán THCS quen ra đề kiểm tra định kỳ. Hãy xây dựng một ma trận đề và một đề kiểm tra 45 phút cho môn Toán 8 (giáo viên chọn phạm vi chương/chủ đề), kèm đáp án và hướng dẫn chấm.

Yêu cầu: (1) Ma trận đề dạng bảng, phân bố câu hỏi theo bốn mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) và theo từng chủ đề, ghi rõ số câu và điểm mỗi ô; (2) Đề kiểm tra gồm phần trắc nghiệm và phần tự luận, tổng 10 điểm, thời gian 45 phút, nội dung khớp ma trận; (3) Đáp án và hướng dẫn chấm chi tiết theo từng ý, có biểu điểm. Trình bày rõ ràng, đánh số câu mạch lạc.

Ràng buộc: nội dung toán chính xác lớp 8; độ khó phân bố hợp lý theo bốn mức độ; đề và đáp án khớp nhau; tiếng Việt và ký hiệu toán rõ ràng; định dạng dễ in.`,
  },
  {
    id: "ex-de-15-phut",
    slug: "ex-de-15-phut",
    title: "Đề 15 phút 3 mức độ",
    description:
      "Đề kiểm tra nhanh 15 phút môn KHTN chia ba mức độ, kèm đáp án, dùng đầu hoặc cuối tiết.",
    kind: "material",
    materialType: "exam",
    stage: "luyen-tap",
    subject: "KHTN",
    grade: "Lớp 9",
    tools: ["chatgpt", "claude", "gemini"],
    access: "free",
    copies: 421,
    prompt: `Bạn là giáo viên KHTN THCS. Hãy soạn một đề kiểm tra nhanh 15 phút cho môn KHTN 9 (giáo viên chọn chủ đề vừa học), chia theo ba mức độ và kèm đáp án.

Yêu cầu: đề gồm khoảng 10 câu, phân bố ba mức độ — Nhận biết (nhớ kiến thức), Thông hiểu (giải thích), Vận dụng (áp dụng vào tình huống); trộn trắc nghiệm và một vài câu trả lời ngắn. Ghi rõ điểm mỗi câu, tổng 10 điểm, phù hợp làm trong 15 phút. Cuối đề có đáp án và giải thích ngắn cho các câu vận dụng. Có thể tạo thêm một mã đề thứ hai bằng cách đảo thứ tự câu và phương án để chống nhìn bài.

Ràng buộc: nội dung khoa học chính xác lớp 9; độ dài vừa 15 phút; câu hỏi rõ nghĩa, không gài bẫy đánh đố; tiếng Việt có dấu; định dạng gọn, dễ in một mặt A4.`,
  },
  {
    id: "ex-cau-hoi-phan-hoa",
    slug: "ex-cau-hoi-phan-hoa",
    title: "Ngân hàng câu hỏi phân hóa",
    description:
      "Bộ câu hỏi tiếng Anh chia theo trình độ để giao bài phù hợp từng nhóm học sinh trong lớp.",
    kind: "material",
    materialType: "exam",
    stage: "luyen-tap",
    subject: "Tiếng Anh",
    grade: "Lớp 7",
    tools: ["chatgpt", "claude", "gemini"],
    access: "free",
    copies: 358,
    prompt: `Bạn là giáo viên Tiếng Anh THCS quan tâm dạy học phân hóa. Hãy xây dựng một ngân hàng câu hỏi luyện tập cho một chủ đề Tiếng Anh 7 (giáo viên chọn, ví dụ thì quá khứ đơn, từ vựng về sở thích), chia theo ba nhóm trình độ để giao bài phù hợp từng nhóm học sinh.

Yêu cầu: chia thành ba nhóm — Cơ bản, Khá, Nâng cao. Mỗi nhóm có khoảng 6–8 câu, độ khó và dạng bài tăng dần (nhóm cơ bản nhiều câu chọn đáp án và điền từ đơn giản; nhóm nâng cao có viết lại câu, đọc hiểu ngắn, hoặc viết câu theo gợi ý). Ghi rõ mục tiêu mỗi nhóm và đáp án cho tất cả câu. Kèm gợi ý ngắn cho giáo viên về cách phân nhóm học sinh và luân chuyển khi các em tiến bộ.

Ràng buộc: nội dung đúng chương trình lớp 7; ba mức độ tách bạch rõ ràng; tiếng Anh chuẩn, hướng dẫn bằng tiếng Việt có dấu; trình bày để dễ cắt ghép thành phiếu giao cho từng nhóm.`,
  },
];
