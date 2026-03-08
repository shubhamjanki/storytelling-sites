import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("revealing");
          setTimeout(onComplete, 800);
          return 100;
        }
        // Accelerating progress
        const increment = prev < 60 ? 2 : prev < 85 ? 1.5 : 0.8;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "revealing" || progress <= 100 ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ 
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          animate={phase === "revealing" ? { 
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
          } : {}}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--neon)/0.15)_0%,transparent_70%)]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Name reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
              >
                Shubham Pandey
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="text-sm text-muted-foreground font-serif-display italic"
              >
                Portfolio
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 160 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative h-[2px] bg-border rounded-full overflow-hidden mt-4"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent rounded-full blur-sm"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-muted-foreground tabular-nums"
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>

          {/* Corner accents */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.3 }}
            className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-accent"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.35 }}
            className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-accent"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-accent"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.45 }}
            className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-accent"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Loader;
