import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Aarav",
    handle: "@pro_gamer69",
    quote:
      "Tanmay’s journey showed me that consistency matters more than anything. Truly motivating!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Riya",
    handle: "@stream_fan",
    quote:
      "I used to doubt myself until I saw Scout’s grind. His story literally changed how I approach my goals.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Dev",
    handle: "@aspire_esports",
    quote:
      "Watching ScoutOP isn’t just fun — it’s a masterclass in discipline and strategy.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

const TestimonialSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: "-100%",
        duration: 0.5,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      });
    });
  }, []);

  return (
    <section className="bg-[#f3f4f6] py-16 px-4 sm:px-8 text-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-12">
          What People Are Saying
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center space-y-4 hover:shadow-2xl transition-all duration-300"
            >
              {/* Avatar bubble */}
              <img
                src={item.avatar}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#54DD4C] shadow-md"
              />

              {/* Quote */}
              <p className="text-lg font-medium italic text-gray-800">
                “{item.quote}”
              </p>

              {/* Name + handle */}
              <div className="text-sm text-gray-500 font-semibold">
                — {item.name} <span className="block text-xs">{item.handle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
