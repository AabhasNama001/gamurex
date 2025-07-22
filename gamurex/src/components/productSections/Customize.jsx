import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import {
  Sparkles,
  SlidersHorizontal,
  MonitorSmartphone,
  Gamepad2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    icon: <Sparkles size={32} />,
    title: "RGB Lighting",
    desc: "Customize lighting modes, sync with music or gameplay, and choose from 16M+ colors.",
  },
  {
    icon: <SlidersHorizontal size={32} />,
    title: "Macro Buttons",
    desc: "Program shortcut keys for complex combos or rapid fire shots.",
  },
  {
    icon: <MonitorSmartphone size={32} />,
    title: "Cross-Platform",
    desc: "Personalize settings and sync profiles across PC, console, or mobile.",
  },
  {
    icon: <Gamepad2 size={32} />,
    title: "Grip & Feel",
    desc: "Select shell textures, hand sizes, and ergonomic fits that suit you best.",
  },
];

const Customize = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".customize-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".customize-title",
          start: "top 80%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".customize-card", {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full mt-40 bg-black text-white py-20 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="customize-title text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          🎨 Customize Your Gear
        </h2>
        <p className="customize-title text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Choose how you play. Modify your peripherals to match your gaming
          identity with top-tier personalization features.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <Tilt
              key={index}
              glareEnable={true}
              glareMaxOpacity={0.25}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.05}
              className="customize-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-transform duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="text-blue-400 mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customize;
