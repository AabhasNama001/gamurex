import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import bgDrops from "../../assets/images/bgDrops.webp";

const testimonials = [
  {
    name: "Steve",
    handle: "@pro_gamer69",
    quote: "Tanmay’s journey showed me that consistency matters more than anything. Truly motivating!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Gwen",
    handle: "@stream_fan",
    quote: "I used to doubt myself until I saw Scout’s grind. His story literally changed how I approach my goals.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Tony",
    handle: "@aspire_esports",
    quote: "Watching ScoutOP isn’t just fun — it’s a masterclass in discipline and strategy.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Chris",
    handle: "@e_gaming-squad",
    quote: "His gameplay sets the standard — and so does his gear.",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
];

const TestimonialSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cardWidth = container.scrollWidth / 4;

    const anim = gsap.to(container, {
      x: `-=${cardWidth}`,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % cardWidth),
      },
    });

    return () => anim.kill();
  }, []);

  return (
    <section
      style={{ backgroundImage: `url(${bgDrops})` }}
      className="relative overflow-hidden pt-20 px-4 pb-30 sm:px-8 bg-contain"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold text-black">
          What People Are Saying
        </h2>
      </div>

      <div className="w-full overflow-hidden relative">
        <div className="relative w-full flex justify-center items-center h-[350px]">
          <div className="absolute left-0 top-0 h-full w-10 rounded-r-2xl bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-10 rounded-l-2xl bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />

          <div
            ref={containerRef}
            className="flex w-max gap-10 will-change-transform"
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="w-[250px] h-[350px] sm:min-w-[350px] max-w-xs bg-[#d6d2e3] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4 shrink-0"
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#54DD4C] shadow-md"
                  loading="lazy"
                />
                <p className="text-lg font-medium italic text-gray-800">
                  “{item.quote}”
                </p>
                <div className="text-sm text-gray-500 font-semibold">
                  — {item.name}
                  <span className="block text-xs">{item.handle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
