import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { EASE } from "@/data/taxonomy";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delayStart?: number;
}

export function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  delayStart = 0,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} className="overflow-visible inline-block mr-[0.2em] relative">
            <motion.span
              className="inline-block relative"
              initial={reduced ? { opacity: 0 } : { y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: delayStart + i * 0.08, ease: EASE }}
            >
              {word}
              {showAsterisk && isLast && (
                <span className="absolute top-[0.05em] -right-[0.3em] text-[0.31em] font-normal">
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}

interface WordsPullUpMultiStyleProps {
  segments: { text: string; className?: string }[];
  containerClassName?: string;
}

export function WordsPullUpMultiStyle({
  segments,
  containerClassName = "",
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  const allWords: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) allWords.push({ word: w, className: seg.className });
    });
  });
  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {allWords.map((w, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.22em]">
          <motion.span
            className={`inline-block ${w.className ?? ""}`}
            initial={reduced ? { opacity: 0 } : { y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            {w.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
