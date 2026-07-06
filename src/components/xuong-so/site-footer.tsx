import { CREAM } from "@/data/taxonomy";

const FOOTER_LINKS = [
  { label: "Bài học", target: "bai-hoc" },
  { label: "Học liệu", target: "hoc-lieu" },
  { label: "Quy trình", target: "quy-trinh" },
  { label: "Bảng giá", target: "bang-gia" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#212121] bg-black px-4 py-12 sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className="relative inline-block text-4xl font-medium tracking-tight"
            style={{ color: CREAM }}
          >
            Xưởng Số
            <span className="absolute top-0 -right-3 text-sm">*</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Thuộc hệ sinh thái Trường học số — truonghocsoquocgia.vn
          </p>
        </div>
        <nav aria-label="Liên kết chân trang">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.target}>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cursor-pointer text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs text-gray-600">
        © 2026 Xưởng Số. Làm bởi giáo viên, cho giáo viên.
      </p>
    </footer>
  );
}
