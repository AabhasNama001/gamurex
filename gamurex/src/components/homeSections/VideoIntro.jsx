// Optimized VideoIntro.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import bgVid from "../../assets/videos/bgVid2.webm";

const VideoIntro = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(location.pathname === "/");
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!showIntro) return;

    // Scroll & overflow control
    const resetScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(() => {
      gsap.to(wrapperRef.current, {
        height: 0,
        width: 0,
        top: "50%",
        left: "50%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setShowIntro(false);
          resetScroll();
        },
      });
    }, 3000); // Can change to 4000 or 5000 if needed

    return () => {
      clearTimeout(timer);
      resetScroll();
    };
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed hidden sm:block top-0 left-0 w-full h-screen z-50 overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={bgVid}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-contain md:object-cover"
      />
    </div>
  );
};

export default VideoIntro;
