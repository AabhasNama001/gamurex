import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import images
import test1 from "../../assets/images/testimonial/test1.webp";
import test2 from "../../assets/images/testimonial/test2.webp";
import test3 from "../../assets/images/testimonial/test3.webp";
import test4 from "../../assets/images/testimonial/test4.webp";
import test5 from "../../assets/images/testimonial/test5.webp";
import test6 from "../../assets/images/testimonial/test6.webp";

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
  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-20 text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Client Stories <br />
          <span className="text-indigo-600">That Define</span> <br />
          Our Excellence
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Swipe or use arrows to explore what our clients say!
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white text-black rounded-xl overflow-hidden shadow-lg group transition-transform hover:scale-105">
              <div className="relative h-92">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/384x288/E0E0E0/333333?text=Image+Unavailable";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-indigo-700/30 transition duration-300"></div>
                <div className="absolute top-4 left-4 text-white z-10">
                  <p className="text-xl font-bold">{t.name}</p>
                  <p className="text-sm">{t.address}</p>
                  <p className="text-xl mt-2">{t.stars}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-800">{t.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
