import React, { useEffect } from "react";
import video404 from "../assets/videos/404.webm";
import video404small from "../assets/videos/404small.webm";

const PageNotFound = () => {
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);

  return (
    <div className="w-screen h-screen pt-20 overflow-hidden relative">
      {/* Video for screens >= 640px */}
      <video
        className="hidden sm:block w-full h-full object-cover"
        src={video404}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Video for screens < 640px */}
      <video
        className="block sm:hidden w-full h-full object-cover"
        src={video404small}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default PageNotFound;
