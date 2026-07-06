import { Check } from "lucide-react";

import { RevealCard } from "@/components/motion/reveal";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { CREAM, CREAM_TW } from "@/data/taxonomy";

const FREE_FEATURES = [
  "Copy toàn bộ prompt miễn phí",
  "Xem mọi preview & demo",
  "Dùng cho lớp của bạn",
];

const PREMIUM_FEATURES = [
  "Toàn bộ template bài học HTML",
  "Mẫu mới mỗi tuần",
  "Dùng trong tập huấn, nhân rộng toàn trường",
];

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-3">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: CREAM_TW }} />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function Pricing() {
  return (
    <section id="bang-gia" className="bg-black px-4 py-16 sm:px-6 sm:py-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <h2
          className="mx-auto mb-12 max-w-3xl text-center text-3xl leading-tight sm:text-4xl md:mb-16 md:text-5xl"
          style={{ color: CREAM }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "Đơn giản như" },
              { text: "bảng giá", className: "font-serif italic" },
              { text: "này" },
            ]}
          />
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <RevealCard index={0}>
            <div className="flex h-full flex-col gap-5 rounded-2xl bg-[#101010] p-7 md:p-8">
              <h3 className="text-lg font-semibold" style={{ color: CREAM }}>
                Miễn phí
              </h3>
              <p className="text-4xl font-semibold" style={{ color: CREAM }}>
                0đ
              </p>
              <FeatureList features={FREE_FEATURES} />
              <p className="mt-auto pt-2 text-xs text-gray-600">
                Không cần tài khoản — copy và dùng ngay.
              </p>
            </div>
          </RevealCard>

          <RevealCard index={1}>
            <div
              className="flex h-full flex-col gap-5 rounded-2xl bg-[#101010] p-7 md:p-8"
              style={{ border: `1px solid ${CREAM_TW}` }}
            >
              <span
                className="self-start rounded-full px-3 py-1 text-xs font-semibold text-black"
                style={{ backgroundColor: CREAM_TW }}
              >
                Dành cho người dựng bài nghiêm túc
              </span>
              <h3 className="text-lg font-semibold" style={{ color: CREAM }}>
                Premium
              </h3>
              <p className="text-4xl font-semibold" style={{ color: CREAM }}>
                199.000đ<span className="text-base font-normal text-gray-500">/năm</span>
              </p>
              <FeatureList features={PREMIUM_FEATURES} />
              <div className="mt-auto flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-2.5 text-sm font-medium text-gray-500"
                >
                  Sắp ra mắt
                </button>
                <p className="text-center text-xs text-gray-600">
                  Nhà trường &amp; phòng giáo dục: liên hệ
                </p>
              </div>
            </div>
          </RevealCard>
        </div>
      </div>
    </section>
  );
}
