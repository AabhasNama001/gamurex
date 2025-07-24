import descVid from "../../assets/videos/bgVid.webm";
import descImg from "../../assets/images/bg.webp";
import cpu10 from "../../assets/images/cpus/cpu10.webp";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Description = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.from([textRef.current, imageRef.current], {
      opacity: 0,
      y: 60,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div
      style={{ backgroundImage: `url(${descImg})` }}
      className="relative bg-cover h-[400px] lg:h-[600px] w-screen overflow-hidden"
    >
      {/* Background Video (not rendered on mobile) */}
      {!isMobile && (
        <video
          src={descVid}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
        />
      )}

      {/* Content */}
      <div className="absolute w-full z-20 flex flex-col items-center justify-center gap-8 p-10 sm:pt-24 sm:flex-row lg:justify-around">
        {/* Left Text Block */}
        <div ref={textRef} className="text-white text-left space-y-1">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold uppercase">
            Game Like a Pro
          </h1>
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold uppercase">
            with the
          </h1>
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold uppercase text-[#00ffff]">
            Ultimate PC
          </h1>
          <NavLink to="/products">
            <button className="mt-2 sm:mt-6 bg-transparent max-[340px]:text-xs text-white border border-white px-6 py-2 rounded-full text-sm sm:text-base sm:w-[80%] hover:bg-white hover:text-black transition duration-300">
              Shop Now
            </button>
          </NavLink>
        </div>

        {/* Right Image */}
        <div ref={imageRef}>
          <img
            src={cpu10}
            alt="Gaming CPU"
            loading="lazy"
            decoding="async"
            className="w-[160px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:mr-30 select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
