import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { EASE } from "@/data/taxonomy";

interface RevealCardProps {
  index?: number;
  className?: string;
  children: ReactNode;
}

/** Entrance scale 0.95→1 + fade, stagger theo index — kế thừa FeatureCardShell của Prisma */
export function RevealCard({ index = 0, className = "", children }: RevealCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
