import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { CREAM, STAGE_INFO, STAGE_ORDER } from "@/data/taxonomy";
import type { StoryboardStage } from "@/data/types";

interface StoryboardStripProps {
  counts: Record<StoryboardStage, number>;
  onSelectStage: (stage: StoryboardStage) => void;
}

interface StageNodeProps {
  stage: StoryboardStage;
  count: number;
  progress: MotionValue<number>;
  nodeIndex: number;
  reduced: boolean;
  onSelect: (stage: StoryboardStage) => void;
}

function StageNode({ stage, count, progress, nodeIndex, reduced, onSelect }: StageNodeProps) {
  const info = STAGE_INFO[stage];
  const start = nodeIndex * 0.2;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.15], [0.85, 1]);

  return (
    <motion.button
      type="button"
      aria-label={`Lọc prompt theo giai đoạn ${info.label}`}
      onClick={() => onSelect(stage)}
      style={reduced ? undefined : { opacity, scale }}
      whileHover={{ scale: 1.05 }}
      className="group flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl bg-[#101010] p-5 text-left transition-colors hover:bg-[#161616] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DEDBC8] md:p-6"
    >
      <span
        className="font-serif text-5xl italic md:text-6xl"
        style={{ color: info.color, textShadow: `0 0 40px ${info.color}40` }}
      >
        0{info.index}
      </span>
      <span className="text-lg font-semibold" style={{ color: CREAM }}>
        {info.label}
      </span>
      <span className="text-sm leading-snug text-gray-400">{info.description}</span>
      <span className="mt-1 text-xs font-medium" style={{ color: info.color }}>
        {count} prompt →
      </span>
    </motion.button>
  );
}

export function StoryboardStrip({ counts, onSelectStage }: StoryboardStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });

  return (
    <section id="storyboard" className="bg-black px-4 py-16 sm:px-6 sm:py-24 md:px-10">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div
          className="mb-3 text-center text-[10px] tracking-widest uppercase sm:text-xs"
          style={{ color: "rgba(222, 219, 200, 0.6)" }}
        >
          Tiến trình bài dạy
        </div>
        <h2
          className="mx-auto mb-12 max-w-3xl text-center text-3xl leading-tight sm:text-4xl md:mb-16 md:text-5xl"
          style={{ color: CREAM }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "Chọn prompt theo" },
              { text: "nhịp", className: "font-serif italic" },
              { text: "của tiết học" },
            ]}
          />
        </h2>

        {/* Đường timeline vẽ dần theo scroll */}
        <div className="relative">
          <svg
            className="pointer-events-none absolute top-1/2 left-0 hidden w-full md:block"
            height="2"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              stroke="rgba(225, 224, 204, 0.25)"
              strokeWidth="2"
              style={{ pathLength: reduced ? 1 : scrollYProgress }}
            />
          </svg>
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
            {STAGE_ORDER.map((stage, i) => (
              <StageNode
                key={stage}
                stage={stage}
                count={counts[stage]}
                progress={scrollYProgress}
                nodeIndex={i}
                reduced={reduced}
                onSelect={onSelectStage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
