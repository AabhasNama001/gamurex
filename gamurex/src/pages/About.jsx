import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components & Assets
import tanmay1 from "../assets/images/tanmay/tanmay2.webp";
import bgDrops from "../assets/images/bgDrops.webp";
import MarqueeLeft from "../components/aboutSections/MarqueeLeft";
import MarqueeRight from "../components/aboutSections/MarqueeRight";
import NewsletterSection from "../components/aboutSections/NewsletterSection";
import TestimonialSection from "../components/aboutSections/TestimonialSection";
import MyJourney from "../components/aboutSections/MyJourney";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "THIS IS MORE THAN GAMING.",
  "IT’S MY STORY, MY STRUGGLE.",
  "BUILT FROM THE BOTTOM.",
  "POWERED BY CONSISTENCY.",
  "MEANT TO INSPIRE YOU.",
];

const About = () => {
  const location = useLocation();
  const hasScrolledToTop = useRef(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const motiveHeadingRef = useRef(null);
  const headingRefs = useRef([]);
  const cursorRef = useRef(null);

  const [showCursor, setShowCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Scroll to top once when the page is loaded
  useLayoutEffect(() => {
    if (location.pathname === "/about" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  // GSAP initial fade-ins
  useEffect(() => {
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });

    gsap.from(paragraphRef.current, {
      opacity: 0,
      y: 50,
      delay: 0.2,
      duration: 1.5,
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 85%",
      },
    });

    gsap.from(motiveHeadingRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: motiveHeadingRef.current,
        start: "top 85%",
      },
    });
  }, []);

  // Drop animation overlay per line
  useEffect(() => {
    headingRefs.current.forEach((line, i) => {
      const drop = document.createElement("span");
      drop.classList.add("color-overlay");

      Object.assign(drop.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        mixBlendMode: "multiply",
        transformOrigin: "top",
        transform: "scaleY(0)",
        zIndex: 0,
        pointerEvents: "none",
        transition: "transform 0.4s ease",
      });

      line.style.position = "relative";
      line.appendChild(drop);

      ScrollTrigger.create({
        trigger: line,
        start: "top 60%",
        end: "top 40%",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          drop.style.transform = "scaleY(1)";
          line.style.color = "white";
        },
        onLeaveBack: () => {
          drop.style.transform = "scaleY(0)";
          line.style.color = "";
        },
      });
    });
  }, []);

  // Cursor movement handler
  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgDrops})` }}
      className="overflow-hidden w-full bg-contain pt-20"
    >
      {/* Marquee Top */}
      <MarqueeLeft />

      {/* Intro Section */}
      <div className="w-[90%] max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 my-16">
        {/* Left - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="opacity-60 mb-5">About Us</p>
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-black mb-6"
          >
            The Man Behind the Game
          </h1>
          <p
            ref={paragraphRef}
            className="text-lg md:text-xl text-black leading-relaxed"
          >
            Myself Tanmay, popularly known as ScoutOP (or just Scout). I am a
            renowned Indian professional esports player, streamer, and content
            creator, primarily famous for: 🎮 Esports
          </p>
        </div>

        {/* Right - Image + Cursor */}
        <div
          className="md:w-1/2 flex justify-center relative group"
          onMouseEnter={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={tanmay1}
            alt="About Image"
            className="rounded-2xl w-full max-w-md shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-90"
          />
          {showCursor && (
            <div
              ref={cursorRef}
              className="absolute pointer-events-none px-3 py-1 bg-purple-600/80 text-white text-sm sm:text-base rounded-full shadow-xl transition-opacity duration-300"
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              I am Tanmay
            </div>
          )}
        </div>
      </div>

      {/* Marquee Bottom */}
      <MarqueeRight />

      {/* Timeline Section */}
      <MyJourney />

      {/* Motivational Lines */}
      <section id="do-it-section" className="py-12 sm:py-20">
        <h2
          ref={motiveHeadingRef}
          className="text-3xl sm:text-6xl font-bold text-center text-black mb-6 lg:mb-20"
        >
          My Motive Behind This Platform!
        </h2>
        <div className="text-center space-y-4 sm:space-y-6">
          {lines.map((text, index) => (
            <h1
              key={index}
              ref={(el) => (headingRefs.current[index] = el)}
              className="text-[#566053] text-[19px] leading-[18px] sm:text-[32px] sm:leading-[19px] xl:text-[50px] xl:leading-[40px] font-semibold relative"
            >
              {text}
            </h1>
          ))}
        </div>
      </section>

      {/* Testimonials & Newsletter */}
      <TestimonialSection />
      <NewsletterSection />
    </div>
  );
};

export default About;
