// pages/Home.jsx
import { lazy, Suspense, useRef, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bgVid3 from "../../src/assets/videos/bgVid3.webm";
import founderBanner from "../assets/images/founderBanner.webp";

// Lazy load heavy sections
const VideoIntro = lazy(() => import("../components/homeSections/VideoIntro"));
const HeroSection = lazy(() =>
  import("../components/homeSections/HeroSection")
);
const Description = lazy(() =>
  import("../components/homeSections/Description")
);
const CategSection = lazy(() =>
  import("../components/homeSections/categSection")
);
const Testimonial = lazy(() =>
  import("../components/homeSections/Testimonial")
);

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolledToTop = useRef(false);
  const videoRef = useRef(null);

  // ✅ Prevent animation stutter on initial mount
  useLayoutEffect(() => {
    if (location.pathname === "/" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "auto" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  const handleClick = () => {
    navigate("/about", { state: { fromTop: true } });
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      id="wrapper"
      className="relative w-full min-h-screen overflow-x-hidden text-white"
    >
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <VideoIntro />
        <HeroSection />
        <Description />
        <CategSection />

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={founderBanner}
            alt="Founder Banner"
            className="w-full h-auto md:hidden object-cover pointer-events-none select-none          "
          />
          <video
            ref={videoRef}
            src={bgVid3}
            muted
            loop
            playsInline
            preload="none" // ✅ Prevent early loading
            className="w-full h-auto pointer-events-none select-none hidden md:block"
          />
          <button
            onClick={handleClick}
            className="absolute z-10 bg-transparent border border-white px-4 py-1 rounded-full text-[12px] sm:text-xl sm:w-[35%] lg:w-[25%] lg:py-2 xl:w-[20%] hover:bg-white hover:text-black transition duration-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
          >
            Meet the Founder
          </button>
        </div>

        <Testimonial />
      </Suspense>
    </div>
  );
};

export default Home;
