import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollUnmaskProps {
  children: ReactNode;
  className?: string;
}

const ScrollUnmask = ({ children, className = "" }: ScrollUnmaskProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Clip path unmask: starts as a small centered circle/inset, expands to full
  const clipProgress = useTransform(scrollYProgress, [0, 0.35, 0.65], [
    "inset(40% 30% 40% 30% round 24px)",
    "inset(5% 5% 5% 5% round 16px)",
    "inset(0% 0% 0% 0% round 0px)",
  ]);

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65], [0.92, 0.98, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          clipPath: clipProgress,
          scale,
          opacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollUnmask;
