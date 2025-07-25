import React, { useEffect, useRef, useState } from "react";

const RibbonCursor = () => {
  const numTrails = 6; // total dots (like React Bits)
  const trailRefs = useRef([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Position history for smooth trailing
  const coords = useRef(
    Array.from({ length: numTrails }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const updateScreen = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMove);

    const animate = () => {
      const speed = 0.2;
      const newCoords = [...coords.current];
      newCoords[0].x += (mouse.x - newCoords[0].x) * speed;
      newCoords[0].y += (mouse.y - newCoords[0].y) * speed;

      for (let i = 1; i < numTrails; i++) {
        newCoords[i].x += (newCoords[i - 1].x - newCoords[i].x) * speed;
        newCoords[i].y += (newCoords[i - 1].y - newCoords[i].y) * speed;
      }

      coords.current = newCoords;

      // Update dot positions
      newCoords.forEach((pos, i) => {
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const colors = ["bg-blue-500", "bg-yellow-400", "bg-red-500", "bg-green-400", "bg-pink-400", "bg-purple-500"];

  return (
    <>
      {Array.from({ length: numTrails }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] ${colors[i % colors.length]} mix-blend-difference hidden md:block`}
          style={{
            opacity: 1 - i * 0.15,
            transform: "translate3d(0, 0, 0)",
            transition: "opacity 0.3s ease",
          }}
        />
      ))}
    </>
  );
};

export default RibbonCursor;
