import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

import bgSpace from "../assets/images/bg.webp";
import ProductTabs from "../components/productSections/ProductTabs";
import TrustAndPolicySection from "../components/productSections/TrustAndPolicySection";
import ExploreSetup from "../components/productSections/ExploreSetup";
import RibbonCursor from "../components/homeSections/RibbonCursor";

gsap.registerPlugin(ScrollTrigger);

// 🧠 Static Info by Category
const ProductInfo = [
  {
    category: "Headset",
    productDescription:
      "Premium gaming headset with immersive sound, soft ear cushions, and crystal-clear voice communication.",
    productSpecifications:
      "Over-ear design, 50mm drivers, detachable noise-canceling mic, 7.1 surround sound, steel headband.",
  },
  {
    category: "Mouse",
    productDescription:
      "Precision-engineered gaming mouse offering high DPI, fast response, and ergonomic comfort.",
    productSpecifications:
      "16000 DPI, RGB lighting, 7 programmable buttons, PTFE feet, ergonomic grip.",
  },
  {
    category: "Gaming Controller",
    productDescription:
      "Versatile wireless controller with responsive buttons, long battery life, and platform compatibility.",
    productSpecifications:
      "Dual vibration, turbo mode, USB-C, 600mAh battery, cross-platform support.",
  },
  {
    category: "CPU",
    productDescription:
      "High-performance processor for multitasking, gaming, and content creation.",
    productSpecifications:
      "6-core/12-thread, 3.7GHz base, 4.6GHz boost, PCIe 4.0, 65W TDP.",
  },
];

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hasScrolledToTop = useRef(false);
  const contentRef = useRef(null);

  const [isFav, setIsFav] = useState(false);

  // Scroll to top on mount
  useLayoutEffect(() => {
    if (location.pathname === "/product-details" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  // GSAP blur-in animation
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

  // Handle product not found
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

  // Sync favourite status from localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFav(favs.some((item) => item.id === id));
  }, [id]);

  const toggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const updatedFavs = isFav
      ? favs.filter((item) => item.id !== id)
      : [...favs, { id, image, title, price, category }];

    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    isFav
      ? toast.error("Removed from favourites")
      : toast.success("Added to favourites");
    setIsFav(!isFav);
  };

  const productInfo =
    ProductInfo.find((info) => info.category === category) || {};

  const handleBuyNow = () => {
    const loadingToastId = toast.loading("Processing purchase...", {
      position: "top-center",
      closeOnClick: false,
      draggable: false,
      closeButton: false,
    });

    setTimeout(() => {
      toast.update(loadingToastId, {
        render: ({ closeToast }) => (
          <div className="max-w-sm sm:max-w-md mx-auto p-4 mt-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-md text-left">
            <h3 className="text-lg font-bold text-green-600 mb-1">
              🎉 Product Purchased!
            </h3>
            <p className="text-gray-800 dark:text-gray-200 text-sm">
              You bought{" "}
              <span className="font-semibold text-indigo-600">{title}</span> for{" "}
              <span className="font-semibold text-emerald-600">{price}</span>.
            </p>

            <button
              onClick={() => {
                navigate("/products");
                closeToast();
              }}
              className="mt-4 w-full sm:w-auto text-sm font-medium px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ),
        isLoading: false,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      });
    }, 2500); // Delay for 2.5 seconds
  };

  return (
    <div>
      <RibbonCursor />
      <div
        style={{ backgroundImage: `url(${bgSpace})` }}
        className="min-h-screen bg-cover pt-28 px-6 lg:px-28 pb-10"
      >
        <div
          ref={contentRef}
          className="flex flex-col lg:flex-row gap-6 overflow-hidden bg-[#222]/90 rounded-t-xl shadow-lg p-8"
        >
          {/* Left Section */}
          <div className="flex-1 flex justify-center items-center relative blur-target">
            <button
              onClick={toggleFavourite}
              className="absolute top-0 left-0 m-4 z-11 text-2xl text-white bg-black/60 p-2 rounded-full"
              title={isFav ? "Remove from favourites" : "Add to favourites"}
            >
              {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>

            <div className="relative group w-fit h-fit rounded-2xl overflow-hidden">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-72 h-72 sm:w-90 sm:h-90 lg:w-120 lg:h-120 object-contain transition duration-300 z-10 relative"
              />
              {/* Glow on hover */}
              <div className="hidden md:block absolute inset-0 pointer-events-none rounded-[50%] before:absolute before:inset-0 before:rounded-[50%] before:opacity-0 before:scale-75 before:transition-all before:duration-500 before:blur-2xl group-hover:before:opacity-60 group-hover:before:scale-125 before:bg-[radial-gradient(circle,rgba(255,255,255,0.5),rgba(255,255,255,0.2),transparent_80%)]" />
            </div>
          </div>

          {/* Right Section */}
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
              onClick={handleBuyNow}
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
                <h4>CPU's, Gaming Mouse, Controllers, Headset</h4>
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
