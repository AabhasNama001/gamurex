import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const GamurexTitle = ({ imageUrls }) => {
  const gamurexRef = useRef(null);
  const imageRefs = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const splitInstance = useRef(null);

  // Wait for all images to load
  useEffect(() => {
    let loaded = 0;
    const total = imageUrls.length;

    const checkLoaded = () => {
      loaded++;
      if (loaded === total) {
        setImagesLoaded(true);
      }
    };

    imageRefs.current.forEach((img) => {
      if (img?.complete) {
        checkLoaded();
      } else {
        img?.addEventListener("load", checkLoaded);
      }
    });

    return () => {
      imageRefs.current.forEach((img) => {
        img?.removeEventListener("load", checkLoaded);
      });
    };
  }, [imageUrls]);

  // Animate text scale on image load
  useEffect(() => {
    if (!imagesLoaded) return;

    const isMobile = window.innerWidth < 640;
    const delay = isMobile ? 0.6 : 5.5;

    gsap.fromTo(
      gamurexRef.current,
      { scale: 0 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        delay,
      }
    );
  }, [imagesLoaded]);

  // SplitType animation (once only)
  useEffect(() => {
    if (!imagesLoaded || !gamurexRef.current) return;

    splitInstance.current = new SplitType(gamurexRef.current, {
      types: "chars",
    });

    gsap.from(splitInstance.current.chars, {
      y: 80,
      opacity: 0,
      rotateX: -90,
      stagger: 0.05,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.4,
    });

    return () => {
      splitInstance.current?.revert();
    };
  }, [imagesLoaded]);

  // Hover and floating logic
  useEffect(() => {
    if (!imagesLoaded) return;

    const gamurexText = gamurexRef.current;
    const images = imageRefs.current;

    // Hide initially
    gsap.set(images, { opacity: 0, scale: 0 });

    // Floating animation
    images.forEach((img, i) => {
      gsap.to(img, {
        y: i % 2 === 0 ? 5 : -5,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random(),
      });
    });

    const enter = () => {
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

      // GPU-accelerated glow
      gamurexText.style.filter = `
        drop-shadow(0 0 45px #00f)
        drop-shadow(0 0 10px #ff0)
        drop-shadow(0 0 15px #f00)
      `;
    };

    const leave = () => {
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

      gamurexText.style.filter = "none";
    };

    gamurexText.addEventListener("mouseenter", enter);
    gamurexText.addEventListener("mouseleave", leave);

    return () => {
      gamurexText.removeEventListener("mouseenter", enter);
      gamurexText.removeEventListener("mouseleave", leave);
    };
  }, [imagesLoaded]);

  return (
    <h1
      ref={gamurexRef}
      className="relative cursor-pointer uppercase text-[40px] sm:text-[70px] md:text-[100px] lg:text-[140px] xl:text-[170px] z-10"
    >
      Gamurex
      {imageUrls.map((url, index) => (
        <img
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          src={url}
          alt={`Gaming ${index + 1}`}
          loading="lazy"
          className="absolute object-cover rounded-lg pointer-events-none transition-opacity
            max-w-[150px] max-h-[180px] w-[80px] h-[80px] sm:w-[12vw] sm:h-[14vw] md:w-[110px] md:h-[110px] lg:w-[150px] lg:h-[180px]"
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
