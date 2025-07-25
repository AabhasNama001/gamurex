// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import Typed from "typed.js";

// import test1 from "../../assets/images/testimonial/test7.webp";
// import test2 from "../../assets/images/testimonial/test8.webp";
// import test3 from "../../assets/images/testimonial/test9.webp";
// import test4 from "../../assets/images/testimonial/test10.webp";
// import test5 from "../../assets/images/testimonial/test11.webp";
// import test6 from "../../assets/images/testimonial/test12.webp";
// import bg from "../../assets/images/bg.webp";

// const testimonials = [
//   {
//     name: "Syble F. Romans",
//     address: "from London",
//     stars: "⭐⭐⭐⭐⭐",
//     desc: "These headsets deliver clear audio, enhancing every gaming session. Highly recommended!",
//     image: test1,
//   },
//   {
//     name: "Earl S. West",
//     address: "from Wellington",
//     stars: "⭐⭐⭐⭐⭐",
//     desc: "The mouse is incredibly precise, perfect for competitive gaming. A true game-changer.",
//     image: test2,
//   },
//   {
//     name: "Sally H. McDuffie",
//     address: "from California",
//     stars: "⭐⭐⭐⭐⭐",
//     desc: "Controllers are ergonomic , making long gaming marathons comfortable.",
//     image: test3,
//   },
//   {
//     name: "Joseph S. Thomas",
//     address: "from Germany",
//     stars: "⭐⭐⭐⭐⭐",
//     desc: "Powerful CPU ensures smooth performance, no lag even during intense gaming. Top-tier!",
//     image: test4,
//   },
//   {
//     name: "Timothy A. Thompson",
//     address: "from Washington D.C",
//     stars: "⭐⭐⭐⭐⭐",
//     desc: "Comfortable headsets with immersive sound, perfect for communication.",
//     image: test5,
//   },
//   {
//     name: "Pretty S. Pots",
//     address: "from Peru",
//     stars: "⭐⭐⭐⭐⭐",
//     desc: "Gaming mouse offers excellent grip and customizable buttons, boosting my gameplay.",
//     image: test6,
//   },
// ];

// const Testimonial = () => {
//   const trackRef = useRef(null);
//   const tl = useRef(null);
//   const headingRef = useRef(null);
//   const [cardWidth, setCardWidth] = useState(0);
//   const pos = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

//   // 🎯 Typed animation
//   useEffect(() => {
//     const typed = new Typed(headingRef.current, {
//       strings: [
//         "Client Stories",
//         `Client Stories <span class="bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">That Define</span>`,
//         `Client Stories <span class="bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">That Define</span> Our Excellence`,
//       ],
//       typeSpeed: 45,
//       backSpeed: 25,
//       smartBackspace: true,
//       showCursor: false,
//     });
//     return () => typed.destroy();
//   }, []);

//   // 🔧 Responsive card width
//   useEffect(() => {
//     const updateCardWidth = () => {
//       const wrapper = document.querySelector(".testimonial-wrapper");
//       if (!wrapper) return;
//       const screenWidth = window.innerWidth;
//       const baseWidth = wrapper.offsetWidth;
//       let visible = 1;
//       if (screenWidth >= 1024) visible = 3;
//       else if (screenWidth >= 640) visible = 2;
//       setCardWidth((baseWidth / visible) * 0.9);
//     };

//     updateCardWidth();
//     const resizeObserver = new ResizeObserver(updateCardWidth);
//     resizeObserver.observe(document.body);
//     return () => resizeObserver.disconnect();
//   }, []);

//   // 🎞️ GSAP infinite scroll
//   useEffect(() => {
//     if (!cardWidth || !trackRef.current) return;

//     const track = trackRef.current;
//     const baseCards = Array.from(track.children).slice(0, testimonials.length);

//     // Clean previous clones
//     while (track.children.length > testimonials.length) {
//       track.removeChild(track.lastChild);
//     }

//     // Duplicate once only
//     baseCards.forEach((card) => {
//       const clone = card.cloneNode(true);
//       track.appendChild(clone);
//     });

//     const scrollWidth = cardWidth * testimonials.length;

//     if (tl.current) tl.current.kill();

//     tl.current = gsap.to(track, {
//       x: -scrollWidth,
//       duration: 14,
//       ease: "linear",
//       repeat: -1,
//     });

//     const pause = () => window.innerWidth >= 1024 && tl.current?.pause();
//     const resume = () => window.innerWidth >= 1024 && tl.current?.play();

//     track.addEventListener("mouseenter", pause);
//     track.addEventListener("mouseleave", resume);

//     return () => {
//       track.removeEventListener("mouseenter", pause);
//       track.removeEventListener("mouseleave", resume);
//     };
//   }, [cardWidth]);

//   // 🖱️ Drag support (desktop only)
//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     const onDown = (e) => {
//       pos.current.isDown = true;
//       pos.current.startX = (e.pageX || e.touches?.[0].pageX) - track.offsetLeft;
//       pos.current.scrollLeft = track.scrollLeft;
//       tl.current?.pause();
//       track.classList.add("dragging");
//     };

//     const onMove = (e) => {
//       if (!pos.current.isDown) return;
//       const x = (e.pageX || e.touches?.[0].pageX) - track.offsetLeft;
//       const walk = (x - pos.current.startX) * 1.5;
//       track.scrollLeft = pos.current.scrollLeft - walk;
//     };

//     const onUp = () => {
//       pos.current.isDown = false;
//       track.classList.remove("dragging");
//       tl.current?.play();
//     };

//     track.addEventListener("mousedown", onDown);
//     track.addEventListener("touchstart", onDown, { passive: true });
//     track.addEventListener("mousemove", onMove);
//     track.addEventListener("touchmove", onMove, { passive: true });
//     track.addEventListener("mouseup", onUp);
//     track.addEventListener("mouseleave", onUp);
//     track.addEventListener("touchend", onUp);

//     return () => {
//       ["mousedown", "mousemove", "mouseup", "mouseleave"].forEach((type) =>
//         track.removeEventListener(type, onUp)
//       );
//       ["touchstart", "touchmove", "touchend"].forEach((type) =>
//         track.removeEventListener(type, onUp)
//       );
//     };
//   }, []);

//   return (
//     <div
//       style={{ backgroundImage: `url(${bg})` }}
//       className="py-24 px-4 sm:px-6 lg:px-20 bg-cover overflow-hidden text-white"
//     >
//       <div className="text-center mb-16 h-[250px]">
//         <h2
//           ref={headingRef}
//           className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
//         />
//         <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
//           Hover to explore what our clients say!
//         </p>
//       </div>
//       <div className="testimonial-wrapper relative w-full overflow-hidden">
//         <div
//           ref={trackRef}
//           className="flex gap-8 w-[300px] cursor-pointer select-none"
//         >
//           {testimonials.map((t, index) => (
//             <div
//               key={index}
//               className="testimonial-card"
//               style={{ minWidth: `${cardWidth}px` }}
//             >
//               <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-indigo-500/30 transition-transform duration-300">
//                 <div className="relative h-72 xl:h-84">
//                   <img
//                     src={t.image}
//                     alt={t.name}
//                     loading="lazy"
//                     decoding="async"
//                     className="w-full h-full object-cover rounded-t-3xl"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src =
//                         "https://placehold.co/384x288/E0E0E0/333333?text=Image+Unavailable";
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
//                   <div className="absolute bottom-4 left-4 z-20 text-white">
//                     <p className="text-xl font-semibold">{t.name}</p>
//                     <p className="text-sm">{t.address}</p>
//                     <p className="text-lg mt-1">{t.stars}</p>
//                   </div>
//                 </div>
//                 <div className="p-6 text-white min-h-[120px] flex items-center justify-center text-center text-base leading-relaxed">
//                   <p className="text-gray-100">{t.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import test1 from "../../assets/images/testimonial/test7.webp";
import test2 from "../../assets/images/testimonial/test8.webp";
import test3 from "../../assets/images/testimonial/test9.webp";
import test4 from "../../assets/images/testimonial/test10.webp";
import test5 from "../../assets/images/testimonial/test11.webp";
import test6 from "../../assets/images/testimonial/test12.webp";
import bg from "../../assets/images/bg.webp";

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
    name: "Joseph S. Thomas",
    address: "from California",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Controllers are ergonomic , making long gaming marathons comfortable.",
    image: test3,
  },
  {
    name: "Sally H. McDuffie",
    address: "from Germany",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Powerful CPU ensures smooth performance, no lag even during intense gaming. Top-tier!",
    image: test4,
  },
  {
    name: "Timothy A. Thompson",
    address: "from Washington D.C",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Comfortable headsets with immersive sound, perfect for communication.",
    image: test5,
  },
  {
    name: "Pretty S. Pots",
    address: "from Peru",
    stars: "⭐⭐⭐⭐⭐",
    desc: "Gaming mouse offers excellent grip and customizable buttons, boosting my gameplay.",
    image: test6,
  },
];

const Testimonial = () => {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const wrapRef = useRef({ width: 0 });

  useEffect(() => {
    const container = containerRef.current;

    // Get full scroll width divided by 2 sets of items
    wrapRef.current.width = container.scrollWidth / 4;

    animRef.current = gsap.to(container, {
      x: `-=${wrapRef.current.width}`,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % wrapRef.current.width),
      },
    });

    return () => animRef.current.kill();
  }, []);

  const handleManualScroll = (dir) => {
    const container = containerRef.current;
    const moveBy = 350 * dir;

    animRef.current.pause();

    gsap.to(container, {
      x: `+=${-moveBy}`,
      duration: 1,
      ease: "power2.out",
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % wrapRef.current.width),
      },
      onComplete: () => {
        animRef.current.play();
      },
    });
  };

  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="relative overflow-hidden pt-20 px-4 pb-30 sm:px-8 lg:px-28 xl:px-40 bg-contain"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Client Stories{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">
            That Define
          </span>{" "}
          Our Excellence
        </h2>
      </div>

      {/* Arrows - Mobile & Desktop */}
      <div className="absolute inset-x-0 top-[90%] sm:top-1/2 flex justify-between px-8 sm:px-6 -translate-y-[50%] sm:-translate-y-1/2 z-10">
        <button
          onClick={() => handleManualScroll(-1)}
          className="bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-xl transition"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          onClick={() => handleManualScroll(1)}
          className="bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-xl transition"
        >
          <FaArrowRight size={20} />
        </button>
      </div>

      <div className="hidden sm:flex absolute z-10 top-1/2 right-6 -translate-y-1/2">
        <button
          onClick={() => handleManualScroll(1)}
          className="bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-xl transition"
        >
          <FaArrowRight size={20} />
        </button>
      </div>

      <div className="w-full overflow-hidden relative">
        <div className="relative w-full flex justify-center items-center h-[400px]">
          <div
            ref={containerRef}
            className="flex w-max gap-10 will-change-transform"
          >
            {/* Repeat testimonials 3x for buffer */}
            {[...testimonials, ...testimonials, ...testimonials].map(
              (item, index) => (
                <div
                  key={index}
                  className="w-[200px] sm:w-[350px] h-[320px] sm:h-[350px] max-w-xs bg-[#d6d2e3] rounded-2xl shadow-xl overflow-hidden shrink-0 flex flex-col"
                >
                  {/* Image with Overlay */}
                  <div className="relative h-[80%] w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-3 text-sm space-y-1">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs italic">{item.address}</p>
                      <p className="text-yellow-400 text-sm">{item.stars}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-3 h-[20%] flex items-center justify-center text-center">
                    <p className="text-sm text-gray-800 italic">
                      “{item.desc}”
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
