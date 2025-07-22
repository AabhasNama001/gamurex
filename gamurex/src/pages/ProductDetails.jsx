import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgSpace from "../assets/images/bg.jpg";
import ProductTabs from "../components/productSections/ProductTabs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TrustAndPolicySection from "../components/productSections/TrustAndPolicySection";
import ExploreSetup from "../components/productSections/ExploreSetup";
import { FaHeart, FaRegHeart } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const ProductInfo = [
  {
    category: "Headset",
    productDescription:
      "Premium gaming headset with immersive sound, soft ear cushions, and crystal-clear voice communication.",
    productSpecifications:
      "Over-ear design with memory foam ear cushions, 50mm drivers, detachable noise-canceling mic, braided cable, 7.1 surround sound support, and durable adjustable steel headband for long gaming sessions.",
  },
  {
    category: "Mouse",
    productDescription:
      "Precision-engineered gaming mouse offering high DPI, fast response, and ergonomic comfort for gamers.",
    productSpecifications:
      "Ergonomic right-handed shape with textured side grips, 16000 DPI optical sensor, RGB lighting, 7 programmable buttons, ultra-light braided cable, and PTFE feet for smooth glide.",
  },
  {
    category: "Gaming Controller",
    productDescription:
      "Versatile wireless controller with responsive buttons, long battery life, and support for multiple platforms.",
    productSpecifications:
      "Wireless controller with dual vibration feedback, textured grip handles, responsive analog sticks, turbo mode, 600mAh battery, USB-C charging, and compatibility with PC, Android, and console platforms.",
  },
  {
    category: "CPU",
    productDescription:
      "High-performance processor built for multitasking, gaming, and content creation with reliable speed and efficiency.",
    productSpecifications:
      "6-core, 12-thread architecture with base clock of 3.7GHz, boost up to 4.6GHz, 65W TDP, integrated graphics, support for DDR4 RAM and PCIe 4.0 lanes.",
  },
];

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hasScrolledToTop = useRef(false);

  const [isFav, setIsFav] = useState(false);

  // ✅ Scroll to top once on mount
  useLayoutEffect(() => {
    if (location.pathname === "/product-details" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll(".blur-target");

      gsap.set(elements, { filter: "blur(8px)", opacity: 0 });

      gsap.to(elements, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  if (!state) {
    return (
      <div className="text-center py-32">
        <h1 className="text-3xl text-red-600">No product selected.</h1>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 px-6 py-3 bg-black text-white rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { id, image, title, price, category } = state;

  // 🧠 Load favourites
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFav(favs.some((item) => item.id === id));
  }, [id]);

  const toggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const isAlreadyFav = favs.some((item) => item.id === id);

    let updatedFavs;
    if (isAlreadyFav) {
      updatedFavs = favs.filter((item) => item.id !== id);
    } else {
      updatedFavs = [...favs, { id, image, title, price, category }];
    }

    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    setIsFav(!isAlreadyFav);
  };

  const productInfo =
    ProductInfo.find((info) => info.category === category) || {};

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${bgSpace})` }}
        className="min-h-screen bg-cover pt-28 px-6 lg:px-28 pb-10"
      >
        <div
          ref={contentRef}
          className="flex flex-col lg:flex-row gap-6 overflow-hidden bg-[#222]/90 rounded-t-xl shadow-lg p-8"
        >
          {/* Left: Image */}
          <div className="flex-1 flex justify-center items-center relative blur-target">
            {/* 💖 Favourite Button */}
            <button
              onClick={toggleFavourite}
              className="absolute top-0 left-0 m-4 text-2xl text-white bg-black/60 p-2 rounded-full"
              title={isFav ? "Remove from favourites" : "Add to favourites"}
            >
              {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>

            <img
              src={image}
              alt={title}
              className="w-72 h-72 object-contain sm:w-90 sm:h-90 lg:w-120 lg:h-120"
            />
          </div>

          {/* Right: Info */}
          <div className="flex-1 space-y-4 text-center lg:text-start tracking-wider">
            <h1 className="text-2xl lg:text-4xl xl:text-6xl font-bold text-blue-300 blur-target">
              {title}
            </h1>
            <div className="text-xl blur-target">⭐⭐⭐⭐</div>
            <h2 className="text-3xl font-semibold text-red-600 blur-target">
              {price}
            </h2>
            <p className="text-gray-700 blur-target">
              {productInfo.productDescription}
            </p>
            <button
              onClick={() => alert("Redirecting to payment...")}
              className="mt-4 px-6 py-3 bg-green-700 text-white rounded-full hover:bg-emerald-600 transition-all blur-target"
            >
              Buy It Now
            </button>
            <div className="mt-6 space-y-4 text-gray-400 text-sm blur-target">
              <div className="flex gap-4">
                <h3>SKU:</h3>
                <h4>Gaming Logi G Pro X</h4>
              </div>
              <div className="flex gap-4">
                <h3 className="font-bold">Tags:</h3>
                <h4>Console, Gaming, Mechanical</h4>
              </div>
              <div className="flex gap-4">
                <h3 className="font-bold">Categories:</h3>
                <h4>
                  CPU's, Gaming Mouse, Gaming Controllers, Wireless Headset
                </h4>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-10 px-6 py-3 bg-black text-white rounded-full blur-target"
            >
              ⬅ Back
            </button>
          </div>
        </div>

        <div className="mt-4">
          <ProductTabs />
        </div>

        <div className="mt-4">
          <TrustAndPolicySection />
        </div>
      </div>

      <div className="mt-4">
        <ExploreSetup />
      </div>
    </div>
  );
};

export default ProductDetails;
