import { useRef, useState, useEffect, useLayoutEffect } from "react";

interface CursorMaskRevealProps {
  backgroundImage: string;
  foregroundImage: string;
  maskWidth?: number;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

function drawContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
) {
  const iw = img.width;
  const ih = img.height;
  if (iw === 0 || ih === 0) return;
  const scale = Math.min(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (w - dw) / 2;
  const dy = (h - dh) / 2;
  ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
}

const CursorMaskReveal = ({
  backgroundImage,
  foregroundImage,
  maskWidth = 150,
  overlayColor = "rgba(0,0,0,0)",
  className = "",
  style,
  alt,
}: CursorMaskRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 500, h: 500 });
  const [maskPos, setMaskPos] = useState({ x: 0.5, y: 0.5 });
  const [isInside, setIsInside] = useState(false);
  const [images, setImages] = useState<{
    bg: HTMLImageElement | null;
    fg: HTMLImageElement | null;
  }>({ bg: null, fg: null });

  // Load images
  useEffect(() => {
    if (typeof window === "undefined") return;
    let done = 0;
    const loaded: { bg: HTMLImageElement | null; fg: HTMLImageElement | null } = {
      bg: null,
      fg: null,
    };
    function check() {
      done++;
      if (done === 2) setImages({ ...loaded });
    }
    const bg = new Image();
    bg.crossOrigin = "anonymous";
    bg.onload = check;
    bg.onerror = check;
    bg.src = backgroundImage;
    loaded.bg = bg;

    const fg = new Image();
    fg.crossOrigin = "anonymous";
    fg.onload = check;
    fg.onerror = check;
    fg.src = foregroundImage;
    loaded.fg = fg;
  }, [backgroundImage, foregroundImage]);

  // Track container size
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ref = containerRef.current;
    function updateSize() {
      const rect = ref.getBoundingClientRect();
      setContainerSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
    }
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(ref);
    return () => ro.disconnect();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;
    let lastMouse = { x: 0, y: 0 };

    function handlePointerMove(e: PointerEvent) {
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      const rect = ref!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setIsInside(true);
        setMaskPos({ x: x / rect.width, y: y / rect.height });
      } else {
        setIsInside(false);
      }
    }

    function handlePointerLeave() {
      setIsInside(false);
    }

    function handleScroll() {
      const rect = ref!.getBoundingClientRect();
      const x = lastMouse.x - rect.left;
      const y = lastMouse.y - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setIsInside(true);
        setMaskPos({ x: x / rect.width, y: y / rect.height });
      } else {
        setIsInside(false);
      }
    }

    ref.addEventListener("pointermove", handlePointerMove);
    ref.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      ref.removeEventListener("pointermove", handlePointerMove);
      ref.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Draw to canvas
  useEffect(() => {
    const { w, h } = containerSize;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !images.bg || !images.fg) return;

    ctx.clearRect(0, 0, w, h);

    // Draw foreground with grayscale filter
    ctx.save();
    ctx.filter = "grayscale(100%)";
    drawCover(ctx, images.fg, w, h);
    ctx.restore();

    // Overlay
    if (overlayColor && overlayColor !== "rgba(0,0,0,0)") {
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = overlayColor;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    if (isInside) {
      const cx = maskPos.x * w;
      const cy = maskPos.y * h;
      const radius = maskWidth / 2;

      // Punch a circular hole
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      // Soft radial gradient for smooth edges
      const gradient = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius);
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(0.7, "rgba(0,0,0,0.8)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.restore();

      // Draw background (color) only in the hole
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      drawCover(ctx, images.bg, w, h);
      ctx.restore();
    }
  }, [images, containerSize, maskPos, maskWidth, isInside, overlayColor]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
      }}
      aria-label={alt}
    >
      <canvas
        ref={canvasRef}
        width={containerSize.w}
        height={containerSize.h}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export default CursorMaskReveal;
