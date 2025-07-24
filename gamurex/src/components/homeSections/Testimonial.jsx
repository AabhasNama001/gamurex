import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import test1 from "../../assets/images/testimonial/test7.webp";
import test2 from "../../assets/images/testimonial/test8.webp";
import test3 from "../../assets/images/testimonial/test9.webp";
import test4 from "../../assets/images/testimonial/test10.webp";
import test5 from "../../assets/images/testimonial/test11.webp";
import test6 from "../../assets/images/testimonial/test12.webp";

const testimonials = [
  {
    name: "Syble F. Romans",
    address: "from London",
    stars: "⭐⭐⭐⭐⭐",
    desc: "These headsets deliver clear audio, enhancing every gaming session. Highly recommended!",
    image: test1,
  },
  {
    name: "Earl S. West",
    address: "from Wellington",
    stars: "⭐⭐⭐⭐⭐",
    desc: "The mouse is incredibly precise, perfect for competitive gaming. A true game-changer.",
    image: test2,
  },
  {
    name: "Sally H. McDuffie",
    address: "from California",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Controllers are ergonomic and responsive, making long gaming marathons comfortable.",
    image: test3,
  },
  {
    name: "Joseph S. Thomas",
    address: "from Germany",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Powerful CPU ensures smooth performance, no lag even during intense gaming. Top-tier!",
    image: test4,
  },
  {
    name: "Timothy A. Thompson",
    address: "from Washington D.C",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Comfortable headsets with immersive sound, perfect for communication and single-player.",
    image: test5,
  },
  {
    name: "Pretty S. Pots",
    address: "from Peru",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Gaming mouse offers excellent grip and customizable buttons, boosting my gameplay.",
    image: test6,
  },
   {
    name: "Syble F. Romans",
    address: "from London",
    stars: "⭐⭐⭐⭐⭐",
    desc: "These headsets deliver clear audio, enhancing every gaming session. Highly recommended!",
    image: test1,
  },
];

const Testimonial = () => {
  const trackRef = useRef(null);
  const tl = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const pos = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const updateCardWidth = () => {
      const screenWidth = window.innerWidth;
      let visibleCards = 1;

      if (screenWidth >= 1024) visibleCards = 3;
      else if (screenWidth >= 640) visibleCards = 2;

      const containerWidth =
        document.querySelector(".testimonial-wrapper")?.offsetWidth || 0;
      const paddingFactor = screenWidth < 640 ? 0.85 : screenWidth < 1024 ? 0.9 : 0.95;
      setCardWidth((containerWidth / visibleCards) * paddingFactor);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    if (!cardWidth) return;

    const track = trackRef.current;

    // Reset previous
    if (tl.current) tl.current.kill();
    while (track.children.length > testimonials.length) {
      track.removeChild(track.lastChild);
    }

    // Duplicate cards
    const originalCards = Array.from(track.children).slice(0, testimonials.length);
    for (let i = 0; i < 2; i++) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
      });
    }

    const totalScrollWidth = cardWidth * testimonials.length;

    tl.current = gsap.to(track, {
      x: -totalScrollWidth,
      duration: 10,
      ease: "linear",
      repeat: -1,
    });

    // Pause/resume on hover
    const stop = () => {
      if (window.innerWidth >= 1024) tl.current?.pause();
    };
    const start = () => {
      if (window.innerWidth >= 1024) tl.current?.play();
    };

    track.addEventListener("mouseenter", stop);
    track.addEventListener("mouseleave", start);

    return () => {
      track.removeEventListener("mouseenter", stop);
      track.removeEventListener("mouseleave", start);
    };
  }, [cardWidth]);

  // 🖱️ Drag logic
  useEffect(() => {
    const track = trackRef.current;

    const onMouseDown = (e) => {
      pos.current.isDown = true;
      pos.current.startX = e.pageX - track.offsetLeft;
      pos.current.scrollLeft = track.scrollLeft;
      tl.current?.pause();
      track.classList.add("dragging");
    };

    const onMouseLeave = () => {
      pos.current.isDown = false;
      track.classList.remove("dragging");
    };

    const onMouseUp = () => {
      pos.current.isDown = false;
      track.classList.remove("dragging");
      tl.current?.play();
    };

    const onMouseMove = (e) => {
      if (!pos.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - pos.current.startX) * 1.5; // scroll-fast factor
      track.scrollLeft = pos.current.scrollLeft - walk;
    };

    // Touch support
    const onTouchStart = (e) => {
      pos.current.isDown = true;
      pos.current.startX = e.touches[0].pageX - track.offsetLeft;
      pos.current.scrollLeft = track.scrollLeft;
      tl.current?.pause();
    };

    const onTouchEnd = () => {
      pos.current.isDown = false;
      tl.current?.play();
    };

    const onTouchMove = (e) => {
      if (!pos.current.isDown) return;
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - pos.current.startX) * 1.5;
      track.scrollLeft = pos.current.scrollLeft - walk;
    };

    // Attach listeners
    track.addEventListener("mousedown", onMouseDown);
    track.addEventListener("mouseleave", onMouseLeave);
    track.addEventListener("mouseup", onMouseUp);
    track.addEventListener("mousemove", onMouseMove);

    track.addEventListener("touchstart", onTouchStart);
    track.addEventListener("touchend", onTouchEnd);
    track.addEventListener("touchmove", onTouchMove);

    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("mouseleave", onMouseLeave);
      track.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("mousemove", onMouseMove);

      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-20 bg-cover overflow-hidden text-white">
      <div className="testimonial-wrapper relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 w-max cursor-pointer select-none"
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="testimonial-card"
              style={{ minWidth: `${cardWidth}px` }}
            >
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-indigo-500/30 transition-transform duration-300">
                <div className="relative h-72 xl:h-84">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover rounded-t-3xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/384x288/E0E0E0/333333?text=Image+Unavailable";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <p className="text-xl font-semibold">{t.name}</p>
                    <p className="text-sm">{t.address}</p>
                    <p className="text-lg mt-1">{t.stars}</p>
                  </div>
                </div>
                <div className="p-6 text-white min-h-[120px] flex items-center justify-center text-center text-base leading-relaxed">
                  <p className="text-gray-100">{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
