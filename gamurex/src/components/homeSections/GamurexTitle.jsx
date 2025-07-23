import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GamurexTitle = ({ imageUrls }) => {
  const gamurexRef = useRef(null);
  const imageRefs = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Wait for all images to load before animating
  useEffect(() => {
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        setImagesLoaded(true);
      }
    };

    imageRefs.current.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
      }
    });

    return () => {
      imageRefs.current.forEach((img) => {
        img?.removeEventListener("load", handleLoad);
      });
    };
  }, [imageUrls]);

  // Animate title after images loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    gsap.fromTo(
      gamurexRef.current,
      { scale: 0 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        // delay: 5.5,
      }
    );
  }, [imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const gamurexText = gamurexRef.current;
    const images = imageRefs.current;

    const handleMouseEnter = () => {
      gsap.to(images, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.1,
          from: "random",
        },
      });
    };

    const handleMouseLeave = () => {
      gsap.to(images, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
        stagger: {
          each: 0.1,
          from: "random",
        },
      });
    };

    gamurexText.addEventListener("mouseenter", handleMouseEnter);
    gamurexText.addEventListener("mouseleave", handleMouseLeave);
    gsap.set(images, { opacity: 0, scale: 0 });

    return () => {
      gamurexText.removeEventListener("mouseenter", handleMouseEnter);
      gamurexText.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [imagesLoaded]);

  return (
    <h1
      ref={gamurexRef}
      className="relative cursor-pointer uppercase max-[350px]:text-[40px] text-[50px] sm:text-[70px] lg:text-[140px] xl:text-[170px] z-10"
    >
      Gamurex
      {imageUrls.map((url, index) => (
        <img
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          src={url}
          alt={`Gaming related image ${index + 1}`}
          loading="lazy"
          className={`absolute max-w-[150px] max-h-[180px] w-[80px] h-[80px] sm:w-[12vw] sm:h-[14vw] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[180px] object-cover rounded-lg transition-opacity`}
          style={{
            ...(index === 0 && { top: "25px", left: "-5px" }),
            ...(index === 1 && { top: "5px", right: "-75px" }),
            ...(index === 2 && {
              bottom: "-125px",
              left: "105px",
              rotate: "-25deg",
            }),
            ...(index === 3 && { bottom: "-145px", right: "-75px" }),
            transform: "translate(-50%, -50%)",
            opacity: 0,
            zIndex: 0,
          }}
        />
      ))}
    </h1>
  );
};

export default GamurexTitle;
