import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import bgVid from "../../assets/videos/bgVid2.mp4";

const VideoIntro = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/") {
      // Prevent browser from restoring scroll position
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      // Force scroll to top ASAP (before restore)
      window.scrollTo(0, 0);

      // Disable scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const video = videoRef.current;
      if (video) video.play();

      const timer = setTimeout(() => {
        gsap.to(videoWrapperRef.current, {
          height: "0%",
          width: "0%",
          left: "50%",
          top: "50%",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setShowIntro(false);
            // Re-enable scroll
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
          },
        });
      }, 5000);

      return () => {
        clearTimeout(timer);
        // Reset overflow if unmounted early
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        // Optional: revert scrollRestoration (not strictly necessary)
        if ("scrollRestoration" in history) {
          history.scrollRestoration = "auto";
        }
      };
    } else {
      setShowIntro(false);
    }
  }, [location.pathname]);

  if (!showIntro) return null;

  return (
    <div
      ref={videoWrapperRef}
      className="fixed top-0 left-0 w-full h-screen z-50 overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={bgVid}
        className="w-full h-full object-contain md:object-cover"
        muted
        playsInline
      />
    </div>
  );
};

export default VideoIntro;


