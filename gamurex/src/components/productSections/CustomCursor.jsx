import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const NUM_CIRCLES = 5;

const CustomCursor = () => {
  const circleRefs = useRef([]);

  useEffect(() => {
    const coords = { x: 0, y: 0 };

    const circles = circleRefs.current.map((circle, i) => ({
      el: circle,
      x: 0,
      y: 0,
      delay: i * 0.04,
    }));

    const move = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;

      circles.forEach((circle, index) => {
        const targetX = index === 0 ? coords.x : circles[index - 1].x;
        const targetY = index === 0 ? coords.y : circles[index - 1].y;

        gsap.to(circle, {
          x: targetX,
          y: targetY,
          duration: 0.15,
          overwrite: true,
          onUpdate() {
            circle.el.style.transform = `translate(${circle.x}px, ${circle.y}px)`;
          },
          onStart() {
            circle.x = targetX;
            circle.y = targetY;
          },
        });
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {Array.from({ length: NUM_CIRCLES }).map((_, i) => {
        const size = 24 - i * 2; // 16px to 8px (in steps)
        const colorStops = [
          "#00fff0", // cyan
          "#ff00ff", // magenta
          "#00ff00", // neon green
          "#ff6600", // orange
          "#ff0000", // red
        ];
        const glowColor = "#00ffff";

        return (
          <div
            key={i}
            ref={(el) => (circleRefs.current[i] = el)}
            className="fixed top-0 hidden md:block left-0 z-[9999] pointer-events-none rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle at center, ${
                colorStops[i % colorStops.length]
              })`,
              opacity: (1 - i / NUM_CIRCLES) * 0.9,
              mixBlendMode: "screen", // Works on both dark & light BGs
              transition: "all 0.2s ease",
            }}
          ></div>
        );
      })}
    </>
  );
};

export default CustomCursor;
