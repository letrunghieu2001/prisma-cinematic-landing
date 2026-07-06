import { motion, useReducedMotion } from "motion/react";

import { RevealCard } from "@/components/motion/reveal";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { CREAM, EASE, TOOLS, TOOL_INFO } from "@/data/taxonomy";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  showTools?: boolean;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Copy prompt",
    description: "Chọn template theo giai đoạn bài dạy, bấm copy — xong bước một.",
  },
  {
    number: "02",
    title: "Dán vào công cụ AI",
    description: "Lovable, v0, Claude, Antigravity, ChatGPT hay Gemini — dán prompt, chờ vài phút.",
    showTools: true,
  },
  {
    number: "03",
    title: "Nhúng vào lớp học",
    description:
      "Web bài học chạy độc lập, hoặc nhúng vào Trường học số bằng học liệu dạng Nhúng (EMBEDDED).",
  },
];

export function ProcessSteps() {
  const reduced = useReducedMotion();

  return (
    <section id="quy-trinh" className="bg-black px-4 py-16 sm:px-6 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#101010] px-6 py-14 md:rounded-[2rem] md:px-14 md:py-20">
        <h2
          className="mx-auto mb-12 max-w-3xl text-center text-3xl leading-tight sm:text-4xl md:mb-16 md:text-5xl"
          style={{ color: CREAM }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "Ba bước," },
              { text: "một bài học", className: "font-serif italic" },
            ]}
          />
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <RevealCard key={step.number} index={i}>
              <div className="flex flex-col gap-3">
                <span
                  className="font-serif text-6xl italic md:text-7xl"
                  style={{ color: "rgba(222, 219, 200, 0.5)" }}
                >
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold" style={{ color: CREAM }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
                {step.showTools && (
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    {TOOLS.map((tool, j) => (
                      <motion.span
                        key={tool}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + j * 0.1, ease: EASE }}
                        className="text-sm text-gray-500"
                      >
                        {TOOL_INFO[tool].label}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
