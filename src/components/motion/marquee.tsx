import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface MarqueeProps {
  children: ReactNode;
  /** Thời gian chạy hết một vòng (giây) */
  speed?: number;
  className?: string;
}

const DEFAULT_SPEED_SECONDS = 40;

/** Dải chạy ngang vô hạn — 2 bản sao nội dung, translateX 0% → -50% */
export function Marquee({ children, speed = DEFAULT_SPEED_SECONDS, className = "" }: MarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`overflow-x-auto whitespace-nowrap ${className}`}>
        <div className="inline-flex items-center gap-8">{children}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        <div className="inline-flex items-center gap-8 pr-8">{children}</div>
        <div className="inline-flex items-center gap-8 pr-8" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
