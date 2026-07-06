import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: PrismaLanding,
});

const CREAM = "#E1E0CC";
const CREAM_TW = "#DEDBC8";
const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Shared animation components ---------- */

function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  delayStart = 0,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delayStart?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");
  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} className="overflow-visible inline-block mr-[0.2em] relative">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
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

function WordsPullUpMultiStyle({
  segments,
  containerClassName = "",
}: {
  segments: { text: string; className?: string }[];
  containerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const allWords: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) allWords.push({ word: w, className: seg.className });
    });
  });
  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${containerClassName}`}
    >
      {allWords.map((w, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.22em]">
          <motion.span
            className={`inline-block ${w.className ?? ""}`}
            initial={{ y: 20, opacity: 0 }}
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

function AnimatedLetter({
  char,
  progress,
  charProgress,
}: {
  char: string;
  progress: MotionValue<number>;
  charProgress: number;
}) {
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1],
  );
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

/* ---------- Sections ---------- */

const NAV_ITEMS = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

function Hero() {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 md:py-3 z-20">
          <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[10px] sm:text-xs md:text-sm transition-colors"
                  style={{ color: "rgba(225, 224, 204, 0.8)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom content grid */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-10 pb-4 sm:pb-6 md:pb-8 z-10">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: CREAM }}
              >
                <WordsPullUp text="Prisma" showAsterisk />
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-6 pb-2 sm:pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                className="text-xs sm:text-sm md:text-base"
                style={{ color: "rgba(222, 219, 200, 0.7)", lineHeight: 1.2 }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and
                storytellers bound not by place, status or labels but by passion
                and hunger to unlock potential through our unique perspectives.
              </motion.p>
              <motion.a
                href="#"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                className="group inline-flex items-center gap-2 hover:gap-3 transition-all rounded-full pl-5 pr-1 py-1 self-start"
                style={{ backgroundColor: CREAM_TW, color: "#000" }}
              >
                <span className="font-medium text-sm sm:text-base">Join the lab</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: CREAM }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const paragraph =
    "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = paragraph.split("");
  const total = chars.length;

  return (
    <section className="bg-black px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto text-center px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-28">
        <div
          className="text-[10px] sm:text-xs uppercase tracking-widest mb-8 sm:mb-10"
          style={{ color: CREAM_TW }}
        >
          Visual arts
        </div>

        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
          style={{ color: CREAM }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "I am Marcus Chen,", className: "font-normal" },
              { text: "a self-taught director.", className: "italic font-serif" },
              {
                text: "I have skills in color grading, visual effects, and narrative design.",
                className: "font-normal",
              },
            ]}
          />
        </div>

        <p
          ref={ref}
          className="mt-10 sm:mt-14 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          style={{ color: CREAM_TW }}
        >
          {chars.map((c, i) => (
            <AnimatedLetter
              key={i}
              char={c}
              progress={scrollYProgress}
              charProgress={i / total}
            />
          ))}
        </p>
      </div>
    </section>
  );
}

type FeatureCard = {
  number: string;
  title: string;
  icon: string;
  items: { title: string; desc: string }[];
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    number: "01",
    title: "Project Storyboard.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
    items: [
      { title: "Sequence maps", desc: "Draft scenes and beats in a visual flow." },
      { title: "Shot lists", desc: "Assemble frames, lenses and coverage plans." },
      { title: "Version history", desc: "Track revisions across every draft." },
      { title: "Team handoff", desc: "Share boards with crew in one click." },
    ],
  },
  {
    number: "02",
    title: "Smart Critiques.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    items: [
      { title: "AI analysis", desc: "Frame-by-frame feedback on pacing and light." },
      { title: "Creative notes", desc: "Contextual comments from mentors and peers." },
      { title: "Tool integrations", desc: "Bridge DaVinci, Premiere and Nuke workflows." },
    ],
  },
  {
    number: "03",
    title: "Immersion Capsule.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
    items: [
      { title: "Notification silencing", desc: "Cut noise across your devices." },
      { title: "Ambient soundscapes", desc: "Curated audio to hold your focus." },
      { title: "Schedule syncing", desc: "Block creative time across calendars." },
    ],
  },
];

function FeatureCardShell({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden lg:h-full"
    >
      {children}
    </motion.div>
  );
}

function Features() {
  return (
    <section className="min-h-screen bg-black px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
          <div style={{ color: CREAM }}>
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: "Studio-grade workflows for visionary creators.",
                },
              ]}
            />
          </div>
          <div className="text-gray-500 mt-2">
            <WordsPullUpMultiStyle
              segments={[{ text: "Built for pure vision. Powered by art." }]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 - Video */}
          <FeatureCardShell index={0}>
            <div className="relative w-full h-64 md:h-80 lg:h-full bg-[#212121] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
                <div className="text-lg sm:text-xl font-medium" style={{ color: CREAM }}>
                  Your creative canvas.
                </div>
              </div>
            </div>
          </FeatureCardShell>

          {FEATURE_CARDS.map((card, i) => (
            <FeatureCardShell key={card.number} index={i + 1}>
              <div className="bg-[#212121] w-full h-full p-5 sm:p-6 flex flex-col">
                <img
                  src={card.icon}
                  alt=""
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
                />
                <div className="mt-5 sm:mt-6 flex items-baseline gap-2">
                  <div className="text-base sm:text-lg font-medium" style={{ color: CREAM }}>
                    {card.title}
                  </div>
                  <div className="text-xs text-gray-500">({card.number})</div>
                </div>
                <ul className="mt-4 sm:mt-5 space-y-3 flex-1">
                  {card.items.map((item) => (
                    <li key={item.title} className="flex gap-2">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: CREAM_TW }}
                      />
                      <div>
                        <div className="text-xs sm:text-sm" style={{ color: CREAM }}>
                          {item.title}
                        </div>
                        <div className="text-[11px] sm:text-xs text-gray-400 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm hover:opacity-80 transition-opacity"
                  style={{ color: CREAM_TW }}
                >
                  Learn more
                  <ArrowRight
                    className="w-3.5 h-3.5"
                    style={{ transform: "rotate(-45deg)" }}
                  />
                </a>
              </div>
            </FeatureCardShell>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrismaLanding() {
  return (
    <main className="bg-black min-h-screen" style={{ color: CREAM }}>
      <Hero />
      <About />
      <Features />
    </main>
  );
}
