import React from "react";
import test1 from "../../assets/images/testimonial/test7.webp";
import test2 from "../../assets/images/testimonial/test8.webp";
import test3 from "../../assets/images/testimonial/test9.webp";
import test4 from "../../assets/images/testimonial/test10.webp";
import test5 from "../../assets/images/testimonial/test11.webp";
import test6 from "../../assets/images/testimonial/test12.webp";
import bg from "../../assets/images/bg.webp";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import required modules individually
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../index.css";

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

export default function TestimonialDemo() {
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="w-full bg-cover px-4 py-10 sm:px-6 md:px-10 lg:px-20"
    >
      <div className="text-center my-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Client Stories{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">
            That Define
          </span>{" "}
          Our Excellence
        </h2>
      </div>

      <Swiper
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 10,
          stretch: 50,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 150,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-6 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-md">
              <div className="testimonials-profile-circle mb-4">
                <img
                  src={testimonial.image}
                  alt="testimonial-avatar"
                  className="testimonial-avatar"
                  loading="lazy"
                />
              </div>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 mb-3 text-center">
                {testimonial.desc}
              </p>
              <h6 className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-white text-center">
                - {testimonial.name}
                <span className="block text-xs sm:text-sm text-zinc-500">
                  {testimonial.address}
                </span>
                <div className="text-yellow-500 text-base mt-1">
                  {testimonial.stars}
                </div>
              </h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
