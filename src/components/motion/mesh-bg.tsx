import { motion, useReducedMotion } from "motion/react";

/**
 * Nền gradient mesh xanh MobiFone chuyển động rất nhẹ cho Hero.
 * Ba khối blob mờ trôi chậm; reduced-motion → đứng yên.
 */
export function MeshBg({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  const blobs = [
    {
      color: "#0061AF",
      size: 520,
      from: { x: "-10%", y: "-20%" },
      to: { x: "10%", y: "10%" },
      dur: 18,
    },
    {
      color: "#4D94FF",
      size: 460,
      from: { x: "70%", y: "-10%" },
      to: { x: "55%", y: "20%" },
      dur: 22,
    },
    {
      color: "#ED1C24",
      size: 300,
      from: { x: "80%", y: "70%" },
      to: { x: "65%", y: "55%" },
      dur: 26,
    },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            background: b.color,
            filter: "blur(90px)",
            opacity: 0.18,
            left: b.from.x,
            top: b.from.y,
          }}
          animate={reduced ? undefined : { x: ["0%", "12%", "0%"], y: ["0%", "10%", "0%"] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
