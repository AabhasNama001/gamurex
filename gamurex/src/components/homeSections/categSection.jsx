import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import cpuCateg from "../../assets/images/cpus/cpu11.webp";
import headsetCateg from "../../assets/images/headsets/h14.webp";
import controllerCateg from "../../assets/images/gamingControllers/gc1.webp";
import mouseCateg from "../../assets/images/mouses/mouse10.webp";
import bgSpace from "../../assets/images/bg.webp";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    key: "headset",
    title: "Headsets",
    quote: "Immersive Sound",
    image: headsetCateg,
  },
  {
    key: "controller",
    title: "Gaming Controllers",
    quote: "Total Control",
    image: controllerCateg,
  },
  {
    key: "cpu",
    title: "CPU",
    quote: "Power Within",
    image: cpuCateg,
  },
  {
    key: "mouse",
    title: "Gaming Mouses",
    quote: "Precision Unleashed",
    image: mouseCateg,
  },
];

const CategSection = () => {
  const [hovered, setHovered] = useState("headset");
  const navigate = useNavigate();
  const titleRefs = useRef({});
  const headingRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  // SplitType & ScrollTrigger Entry Animation
  useEffect(() => {
    const split = new SplitType(headingRef.current, { types: "chars" });

    gsap.from(split.chars, {
      y: 80,
      opacity: 0,
      stagger: 0.05,
      ease: "power4.out",
      duration: 1.5,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
      },
    });

    gsap.from(imageContainerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 90%",
      },
    });

    gsap.from(textContainerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: "top 90%",
      },
    });

    return () => {
      split.revert();
    };
  }, []);

  const handleClick = () => {
    navigate("/products");
  };

  const handleMouseMove = (e, key) => {
    const el = titleRefs.current[key];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (key) => {
    const el = titleRefs.current[key];
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="category-section bg-cover bg-center py-16 px-4 md:px-10"
      style={{ backgroundImage: `url(${bgSpace})` }}
    >
      <h1
        ref={headingRef}
        className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-10 md:mt-20 lg:mt-80 text-white"
      >
        CATEGORIES
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="relative h-[200px] md:h-[500px]" ref={imageContainerRef}>
          {categories.map((item) => (
            <img
              key={item.key}
              src={item.image}
              alt={item.title}
              onClick={handleClick}
              id={`categ-image-${item.key}`}
              className={`absolute inset-0 w-full h-full object-contain rounded-xl shadow-lg transition-opacity duration-500 transform ${
                hovered === item.key ? "opacity-100 z-10 scale-105" : "opacity-0 z-0 scale-95"
              }`}
            />
          ))}
        </div>

        {/* Right Texts */}
        <div className="space-y-6 text-white" ref={textContainerRef}>
          {categories.map((item) => (
            <div
              key={item.key}
              onMouseEnter={() => setHovered(item.key)}
              className="transition duration-300 cursor-pointer w-fit"
            >
              {/* Default View */}
              <div
                className={`${
                  hovered === item.key ? "hidden" : "block opacity-60"
                } withoutHover`}
              >
                <h1 className="text-xl md:text-2xl font-medium">
                  {item.title}
                </h1>
              </div>

              {/* Hovered View */}
              <div
                className={`${
                  hovered === item.key ? "block" : "hidden"
                } afterHover bg-black/60 p-4 rounded-lg`}
                id={`categ-text-${item.key}`}
                onMouseMove={(e) => handleMouseMove(e, item.key)}
                onMouseLeave={() => handleMouseLeave(item.key)}
                ref={(el) => (titleRefs.current[item.key] = el)}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-500 drop-shadow-md">
                  {item.title}
                </h1>
                <h2 className="text-sm md:text-base text-white italic mt-1">
                  "{item.quote}"
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategSection;
