import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import fueraEmblem from "@/imports/fuera-eagle-emblem.png";

interface OpeningSequenceProps {
  onComplete: () => void;
}

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [phase, setPhase] = useState<"grid" | "emblem" | "typography" | "reveal" | "exit">("grid");

  useEffect(() => {
    // Stage 1: Geometric lines draw in (0 -> 600ms)
    const t1 = setTimeout(() => setPhase("emblem"), 600);
    // Stage 2: Emblem aligns & red blade reveals (600 -> 1400ms)
    const t2 = setTimeout(() => setPhase("typography"), 1400);
    // Stage 3: FUERA wordmark & two branches subtitle reveal (1400 -> 2400ms)
    const t3 = setTimeout(() => setPhase("reveal"), 2400);
    // Stage 4: Smooth transition out into homepage (2900ms)
    const t4 = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 600);
    }, 2900);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro-backdrop"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF9F6] text-[#121214] overflow-hidden select-none"
        >
          {/* Subtle architectural coordinates and corner markers */}
          <div className="absolute top-6 left-6 text-[10px] font-mono tracking-[0.25em] text-[#121214]/40 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A]" />
            FUERA // 01 TECH • 02 MARKETING
          </div>

          <div className="absolute top-6 right-6 text-[10px] font-mono tracking-[0.25em] text-[#121214]/40 uppercase hidden sm:block">
            BANGALORE [HQ] • 12.9352° N, 77.6245° E
          </div>

          <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-[0.2em] text-[#121214]/35 uppercase">
            BRAND ARCHITECTURE 2026
          </div>

          {/* Minimalist Drawing Lines (controlled & sophisticated) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#121214]/10" strokeWidth="1">
            {/* Center horizontal axis */}
            <motion.line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* Center vertical axis */}
            <motion.line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            />
            {/* Focal boundary circle */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="140"
              fill="none"
              strokeDasharray="4 6"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </svg>

          {/* Centerpiece Content Box */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
            {/* Emblem Reveal */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
              {/* Subtle pulsing red halo */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.25, opacity: [0, 0.25, 0.15] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 rounded-full bg-[#E6002A]/20 blur-xl"
              />

              {/* Minimal geometric brackets framing logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -inset-2 border border-[#E6002A]/30 rounded-2xl"
              />

              <motion.img
                src={fueraEmblem}
                alt="FUERA Emblem"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Typographic reveal: FUERA */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl font-black tracking-[0.28em] text-[#121214] uppercase pl-[0.28em]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                FUERA
              </motion.h1>
            </div>

            {/* Department duality subtitle reveal */}
            <div className="overflow-hidden flex flex-col items-center">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 text-xs sm:text-sm font-medium tracking-[0.2em] text-[#121214]/75 uppercase mt-1"
              >
                <span>Tech Solutions</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A]" />
                <span>Digital Marketing</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-[11px] font-mono tracking-[0.35em] text-[#121214]/40 uppercase mt-3"
              >
                TWO BRANCHES • ONE FUERA
              </motion.div>
            </div>

            {/* Micro loading progress line */}
            <div className="w-48 h-[2px] bg-[#121214]/10 rounded-full mt-8 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full bg-[#E6002A]"
              />
            </div>
          </div>

          {/* Interactive Skip Button */}
          <button
            onClick={onComplete}
            className="absolute bottom-6 right-6 text-[11px] font-mono tracking-[0.18em] text-[#121214]/50 hover:text-[#E6002A] uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Skip Intro</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#121214]/5 border border-[#121214]/10">ESC</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
