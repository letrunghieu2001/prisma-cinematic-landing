export function SiteFooter() {
  return (
    <footer className="border-t border-[#E9EAEB] bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <div className="flex items-center gap-2.5">
          <img src="/brand/logomark.svg" alt="" className="h-7 w-7" width={28} height={28} />
          <span className="text-sm text-[#535862]">
            <span className="font-semibold text-[#181D27]">Xưởng Số</span> — thuộc hệ sinh thái
            Trường học số
          </span>
        </div>
        <p className="text-xs text-[#717680]">
          © 2026 MobiFone — Trường học số. Làm bởi giáo viên, cho giáo viên.
        </p>
      </div>
    </footer>
  );
}
