import React, { useEffect, useRef } from "react";
import journey1 from "../../assets/images/tanmay/tanmay1.webp";
import journey2 from "../../assets/images/tanmay/tanmay3.webp";
import journey3 from "../../assets/images/tanmay/tanmay4.webp";
import bgDrops from "../../assets/images/bgDrops.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MyJourney = () => {
  const wrapperRefs = useRef([]);
  const stepsRef = useRef([]);
  const containerRef = useRef(null);

  const steps = [
    "Started Gaming in 2015",
    "Joined First Esports Team",
    "Won Major Tournament",
    "Represented India Internationally",
    "Inspired to Build a Brand Website",
    "Launched Exclusive Products for Fans",
    "Streaming and Influencing Millions",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate circle images
      wrapperRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: -200, rotation: 180, opacity: 0 },
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: i * 0.4,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      // Animate timeline items
      stepsRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, filter: "blur(8px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ backgroundImage: `url(${bgDrops})` }}
      className="w-full bg-contain py-16 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-center mx-auto bg-cover">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-4 justify-center">
              {[journey3, journey1].map((src, idx) => (
                <div
                  key={idx}
                  ref={(el) => (wrapperRefs.current[idx] = el)}
                  className="p-[3px] rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 will-change-transform"
                >
                  <img
                    src={src}
                    alt={`Journey ${idx + 1}`}
                    className="w-28 h-28 rounded-full object-cover shadow-md"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div
                ref={(el) => (wrapperRefs.current[2] = el)}
                className="p-[3px] rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 will-change-transform"
              >
                <img
                  src={journey2}
                  alt="Journey 3"
                  className="w-28 h-28 rounded-full object-cover shadow-md"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold md:text-6xl text-gray-800">
            My Journey
          </h2>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 mx-auto relative">
          <div className="flex flex-col gap-8 relative border-l-2 border-purple-500 pl-6">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className="relative opacity-0 will-change-opacity"
              >
                <div className="absolute -left-3 w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                <div className="bg-purple-100 p-4 rounded-lg shadow text-gray-800">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyJourney;
