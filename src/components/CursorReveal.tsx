import { useMotionValue, motion, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";

interface CursorRevealProps {
  portrait: string;
  className?: string;
  imgClassName?: string;
}

const CursorReveal = ({ portrait, className = "", imgClassName = "" }: CursorRevealProps) => {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const containerRef = useRef<HTMLDivElement>(null);

  const maskImage = useTransform([x, y], ([latestX, latestY]: number[]) =>
    `radial-gradient(circle 160px at ${latestX}px ${latestY}px, black 20%, transparent 70%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(-999);
    y.set(-999);
  }, [x, y]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {/* Grayscale base */}
      <img src={portrait} className={`w-full grayscale ${imgClassName}`} alt="" />

      {/* Color reveal layer */}
      <motion.img
        src={portrait}
        className={`absolute inset-0 w-full ${imgClassName}`}
        style={{
          WebkitMaskImage: maskImage as any,
          maskImage: maskImage as any,
        }}
        alt=""
      />
    </div>
  );
};

export default CursorReveal;
