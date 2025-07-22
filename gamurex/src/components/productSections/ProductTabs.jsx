import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("description");
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { filter: "blur(8px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const tabClasses = (tab) =>
    `px-2 py-1 text-[8px] min-[400px]:px-4 min-[400px]:py-2 min-[400px]:text-[10px] md:text-lg sm:text-base font-medium rounded-t-lg transition-colors duration-300 lg:text-2xl lg:px-6 lg:py-3
  ${
    activeTab === tab
      ? "bg-black text-white"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`;

  return (
    <div className="w-full mx-auto bg-[#222]/90 px-4 pb-6 pt-10 lg:pt-16">
      {/* Tab Headings */}
      <div className="flex justify-start space-x-2 border-b border-gray-300">
        <button
          className={tabClasses("description")}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={tabClasses("info")}
          onClick={() => setActiveTab("info")}
        >
          Additional Information
        </button>
        <button
          className={tabClasses("reviews")}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content with Blur Animation */}
      <div
        ref={contentRef}
        className="px-6 py-10 shadow-md rounded-b-xl border border-t-0 border-gray-300"
      >
        {activeTab === "description" && (
          <p className="text-gray-100 leading-relaxed">
            Premium gaming accessory with High Performance, Ergonomic Design,
            and Precision & Accuracy. Greater Connectivity.
          </p>
        )}

        {activeTab === "info" && (
          <p className="text-white leading-relaxed">
            Brand: Logitech. Compatible with PC, PS5, Xbox, Mac.
          </p>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
                A
              </div>
              <div>
                <p className="font-semibold text-gray-400">Admin</p>
                <div className="flex text-yellow-500 text-sm">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
              </div>
            </div>
            <p className="text-white ml-12">
              Loved the quality! Very crisp and good Connectivity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
