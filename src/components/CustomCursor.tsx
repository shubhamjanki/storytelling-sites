import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 25 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label, .cursor-hover");
      if (interactive && !isHovering.current) {
        isHovering.current = true;
        if (ringRef.current) {
          ringRef.current.style.width = "56px";
          ringRef.current.style.height = "56px";
          ringRef.current.style.borderColor = "hsl(var(--accent))";
        }
        if (dotRef.current) {
          dotRef.current.style.transform = "scale(2)";
        }
      } else if (!interactive && isHovering.current) {
        isHovering.current = false;
        if (ringRef.current) {
          ringRef.current.style.width = "36px";
          ringRef.current.style.height = "36px";
          ringRef.current.style.borderColor = "hsl(var(--neon))";
        }
        if (dotRef.current) {
          dotRef.current.style.transform = "scale(1)";
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 10000,
        }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default CustomCursor;
