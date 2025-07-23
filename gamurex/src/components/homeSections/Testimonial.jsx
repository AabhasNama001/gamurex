import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { TypeAnimation } from "react-type-animation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// images
import bgSpace from "../../assets/images/bg.webp";
import test1 from "../../assets/images/testimonial/test1.webp";
import test2 from "../../assets/images/testimonial/test2.webp";
import test3 from "../../assets/images/testimonial/test3.webp";
import test4 from "../../assets/images/testimonial/test4.webp";
import test5 from "../../assets/images/testimonial/test5.webp";
import test6 from "../../assets/images/testimonial/test6.webp";

// register plugin
gsap.registerPlugin(ScrollTrigger);

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
    desc: "Controllers are ergonomic and responsive, making long gaming marathons comfortable and fun.",
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
];

const Testimonial = () => {
  const cardsRef = useRef([]);
  const swiperRef = useRef();

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        }
      );
    });
  }, []);

  const handleMouseEnter = () => {
    swiperRef.current?.swiper?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.swiper?.autoplay?.start();
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgSpace})` }}
      className="bg-cover py-24 px-4 sm:px-6 lg:px-20 text-white"
    >
      <div className="text-center mb-16">
        <TypeAnimation
          sequence={[
            "Client Stories",
            1000,
            "Client Stories That Define",
            1000,
            "Client Stories That Define Our Excellence",
            2000,
          ]}
          speed={60}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700"
          repeat={Infinity}
        />
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Swipe or use arrows to explore what our clients say!
        </p>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-indigo-500/30 transition-transform duration-300 will-change-transform"
            >
              <div className="relative h-72">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
