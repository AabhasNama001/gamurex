// pages/Home.jsx
import VideoIntro from "../components/homeSections/VideoIntro";
import HeroSection from "../components/homeSections/HeroSection";
import Description from "../components/homeSections/Description";
import CategSection from "../components/homeSections/categSection";
import bgVid3 from "../../src/assets/videos/bgVid3.webm";
import { useRef, useLayoutEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import Testimonial from "../components/homeSections/Testimonial";

const Home = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const hasScrolledToTop = useRef(false);

  // ✅ Scroll to top once on mount without triggering GSAP issues
  useLayoutEffect(() => {
    if (location.pathname === "/" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  /**
   * Navigates to the About page with the state flag set to true,
   * so that the About page knows to scroll to the top of the page.
   */
  const handleClick = () => {
    navigate("/about", { state: { fromTop: true } });
  };

  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      id="wrapper"
      className="relative w-full min-h-screen overflow-x-hidden text-white"
    >
      <VideoIntro />
      <HeroSection />
      <Description />
      <CategSection />
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={bgVid3}
          muted
          loop
          playsInline
          className="w-full h-auto"
        />
        <button
          onClick={handleClick}
          className="absolute z-10 bg-transparent border-1 border-white px-4 py-1 rounded-full text-[12px] sm:text-xl sm:w-[35%] lg:w-[25%] lg:py-2 xl:w-[20%] hover:bg-white hover:text-black transition duration-300  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
        >
          Meet the Founder
        </button>
      </div>
      <Testimonial />
    </div>
  );
};

export default Home;
