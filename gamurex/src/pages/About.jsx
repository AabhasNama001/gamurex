import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tanmay1 from "../assets/images/tanmay/tanmay2.webp";
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

  // ✅ Scroll to top once on mount without triggering GSAP issues
  useLayoutEffect(() => {
    if (location.pathname === "/about" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageRef = useRef(null);
  const cursorRef = useRef(null);
  const motiveHeadingRef = useRef(null);
  const motiveTextRef = useRef(null);
  const headingRefs = useRef([]);

  const [showCursor, setShowCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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

    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.3,
      duration: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 90%",
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

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <div className="overflow-hidden w-full bg-[#ebbdbd] pt-20">
      <MarqueeLeft />

      <div className="w-[90%] max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 my-16">
        {/* Left - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="opacity-60 mb-5">About Us</p>
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-[#000000] mb-6"
          >
            The Man Behind the Game
          </h1>
          <p
            ref={paragraphRef}
            className="text-lg md:text-xl text-[#000000] leading-relaxed"
          >
            Myself Tanmay, popularly known as ScoutOP (or just Scout). I am a
            renowned Indian professional esports player, streamer, and content
            creator, primarily famous for: 🎮 Esports
          </p>
        </div>

        {/* Right - Image with custom cursor */}
        <div
          className="md:w-1/2 flex justify-center relative group"
          onMouseEnter={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            ref={imageRef}
            src={tanmay1}
            alt="About Image"
            className="rounded-2xl w-full max-w-md shadow-lg transition-all duration-500 ease-in-out group-hover:scale-105"
          />

          {/* Floating Tanmay Cursor */}
          {showCursor && (
            <div
              ref={cursorRef}
              className="absolute pointer-events-none px-3 py-1 bg-[purple]/80 text-white text-sm sm:text-base rounded-full shadow-xl transition-opacity duration-300"
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

      <MarqueeRight />
      <MyJourney />

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
              className="text-[#566053] text-[5vw] sm:text-[6vh] leading-[3vw] xl:leading-[6vh] font-semibold relative"
            >
              {text}
            </h1>
          ))}
        </div>
      </section>

      <TestimonialSection />
      <NewsletterSection />
    </div>
  );
};

export default About;
