import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import bgDrops from "../../assets/images/bgDrops.webp";

const testimonials = [
  {
    name: "Steve",
    handle: "@pro_gamer69",
    quote:
      "Tanmay’s journey showed me that consistency matters more than anything. Truly motivating!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Gwen",
    handle: "@stream_fan",
    quote:
      "I used to doubt myself until I saw Scout’s grind. His story literally changed how I approach my goals.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Tony",
    handle: "@aspire_esports",
    quote:
      "Watching ScoutOP isn’t just fun — it’s a masterclass in discipline and strategy.",
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

    gsap.to(container, {
      x: "-50%", // since we duplicated the items
      duration: 10,
      ease: "linear",
      repeat: -1,
    });
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

      {/* Carousel Wrapper */}
      <div className="overflow-hidden w-full">
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />
        <div ref={containerRef} className="flex w-max gap-10">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="w-[250px] h-[350px] sm:min-w-[350px] max-w-xs bg-[#d6d2e3] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4"
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#54DD4C] shadow-md"
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
    </section>
  );
};

export default TestimonialSection;
