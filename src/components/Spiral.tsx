import { useEffect, useRef } from "react";

interface SpiralProps {
  totalDots?: number;
  dotRadius?: number;
  duration?: number;
  dotColor?: string;
  backgroundColor?: string;
  margin?: number;
  minOpacity?: number;
  maxOpacity?: number;
  minScale?: number;
  maxScale?: number;
  className?: string;
  size?: number;
}

const Spiral = ({
  totalDots = 600,
  dotRadius = 2,
  duration = 3,
  dotColor = "#FFFFFF",
  backgroundColor = "transparent",
  margin = 2,
  minOpacity = 0.3,
  maxOpacity = 1,
  minScale = 0.5,
  maxScale = 1.5,
  className = "",
  size = 400,
}: SpiralProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const SIZE = size;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const CENTER = SIZE / 2;
    const MAX_RADIUS = CENTER - margin - dotRadius;

    svg.innerHTML = "";

    for (let i = 0; i < totalDots; i++) {
      const idx = i + 0.5;
      const frac = idx / totalDots;
      const r = Math.sqrt(frac) * MAX_RADIUS;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", x.toString());
      circle.setAttribute("cy", y.toString());
      circle.setAttribute("r", dotRadius.toString());
      circle.setAttribute("fill", dotColor);
      circle.setAttribute("opacity", "0");

      // Radius animation
      const animR = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute("values", `${dotRadius * minScale};${dotRadius * maxScale};${dotRadius * minScale}`);
      animR.setAttribute("dur", `${duration}s`);
      animR.setAttribute("begin", `${frac * duration}s`);
      animR.setAttribute("repeatCount", "indefinite");
      animR.setAttribute("calcMode", "spline");
      animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      circle.appendChild(animR);

      // Opacity animation
      const animO = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("values", `${minOpacity};${maxOpacity};${minOpacity}`);
      animO.setAttribute("dur", `${duration}s`);
      animO.setAttribute("begin", `${frac * duration}s`);
      animO.setAttribute("repeatCount", "indefinite");
      animO.setAttribute("calcMode", "spline");
      animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      circle.appendChild(animO);

      svg.appendChild(circle);
    }
  }, [totalDots, dotRadius, duration, dotColor, margin, minOpacity, maxOpacity, minScale, maxScale, size]);

  return (
    <div
      className={className}
      style={{
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
      />
    </div>
  );
};

export default Spiral;
