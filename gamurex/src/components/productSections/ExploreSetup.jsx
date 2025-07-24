import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import headsetImg from "../../assets/images/headsets/h18.webp";
import mouseImg from "../../assets/images/mouses/mouse4.webp";
import controllerImg from "../../assets/images/gamingControllers/gc1.webp";
import cpuImg from "../../assets/images/cpus/cpu2.webp";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    image: headsetImg,
    label: "HyperX Cloud Core",
    price: "$99",
  },
  {
    image: mouseImg,
    label: "Redragon M612",
    price: "$79",
  },
  {
    image: controllerImg,
    label: "GameSir T4 Pro",
    price: "$89",
  },
  {
    image: cpuImg,
    label: "Ryzen 3 3200G",
    price: "$199",
  },
];

const ExploreSetup = () => {
  const containerRef = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".parallax-card");
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen lg:min-h-[700px] px-6 py-20 bg-black text-white text-center"
    >
      <h2 className="text-4xl font-bold mb-12 tracking-wide text-blue-400">
        Explore our Latest Releases
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="parallax-card relative group rounded-xl overflow-hidden bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] shadow-lg hover:scale-105 transition-transform duration-500 p-6"
          >
            <img
              src={product.image}
              alt={product.label}
              className="w-full h-64 object-contain mx-auto"
            />

            <div className="mt-2 text-xl font-semibold text-white">
              {product.label}
            </div>

            <div className="mt-2 text-xl font-semibold text-blue-700">
              {product.price}
            </div>

            {/* Hover Overlay */}
            <div
              onClick={handleClick}
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
            >
              <span className="text-white text-sm font-medium">
                Let's Explore
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreSetup;
