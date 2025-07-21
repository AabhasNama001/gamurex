import React, { useEffect, useState } from "react";
import bannerVideo from "../assets/videos/bannerVideo.mp4";
import ProductCard from "../components/ProductCard";
import cpu1 from "../assets/images/cpus/cpu2.webp";
import cpu2 from "../assets/images/cpus/cpu3.webp";
import cpu3 from "../assets/images/cpus/cpu5.webp";
import cpu4 from "../assets/images/cpus/cpu6.webp";
import cpu5 from "../assets/images/cpus/cpu7.webp";
import cpu6 from "../assets/images/cpus/cpu9.webp";
import cpu7 from "../assets/images/cpus/cpu10.webp";
import cpu8 from "../assets/images/cpus/cpu11.webp";
import cpu9 from "../assets/images/cpus/cpu16.webp";
import mouse1 from "../assets/images/mouses/mouse12.webp";
import mouse3 from "../assets/images/mouses/mouse2.webp";
import mouse2 from "../assets/images/mouses/mouse1.webp";
import mouse4 from "../assets/images/mouses/mouse4.webp";
import mouse5 from "../assets/images/mouses/mouse5.webp";
import mouse6 from "../assets/images/mouses/mouse6.webp";
import mouse7 from "../assets/images/mouses/mouse13.webp";
import mouse8 from "../assets/images/mouses/mouse8.webp";
import mouse9 from "../assets/images/mouses/mouse9.webp";
import mouse10 from "../assets/images/mouses/mouse10.webp";
import mouse11 from "../assets/images/mouses/mouse11.webp";
import mouse12 from "../assets/images/mouses/mouse3.webp";
import headset1 from "../assets/images/headsets/h12.webp";
import headset2 from "../assets/images/headsets/h14.webp";
import headset3 from "../assets/images/headsets/h13.webp";
import headset4 from "../assets/images/headsets/h6.webp";
import headset5 from "../assets/images/headsets/h8.webp";
import headset6 from "../assets/images/headsets/h10.webp";
import headset11 from "../assets/images/headsets/h11.webp";
import headset12 from "../assets/images/headsets/h1.webp";
import headset13 from "../assets/images/headsets/h4.webp";
import headset14 from "../assets/images/headsets/h2.webp";
import headset15 from "../assets/images/headsets/h15.webp";
import headset7 from "../assets/images/headsets/h16.webp";
import headset8 from "../assets/images/headsets/h17.webp";
import headset9 from "../assets/images/headsets/h18.webp";
import headset10 from "../assets/images/headsets/h19.webp";
import controller1 from "../assets/images/gamingControllers/gc1.webp";
import controller2 from "../assets/images/gamingControllers/gc2.webp";
import controller3 from "../assets/images/gamingControllers/gc3.webp";
import controller4 from "../assets/images/gamingControllers/gc4.webp";
import controller5 from "../assets/images/gamingControllers/gc5.webp";
import controller6 from "../assets/images/gamingControllers/gc6.webp";
import controller7 from "../assets/images/gamingControllers/gc7.webp";
import controller8 from "../assets/images/gamingControllers/gc8.webp";
import controller9 from "../assets/images/gamingControllers/gc9.webp";
import bgBlue3 from "../assets/images/bgBlue3.png";
import bgDrops from "../assets/images/bgDrops.jpg";
import Customize from "../components/Customize";

const Products = () => {
  const [active, setActive] = useState("Headset");

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure page opens from the top on mount
  }, []);

  // ✅ Product data with 4 categories
  const ProductData = [
    {
      category: "Headset",
      bgImage: headset8,
      products: [
        { image: headset1, title: "HyperX Cloud II", price: "$99" },
        { image: headset2, title: "HyperX Cloud Alpha", price: "$109" },
        { image: headset3, title: "HyperX Cloud Stinger Core", price: "$59" },
        { image: headset4, title: "HyperX Cloud Revolver", price: "$119" },
        { image: headset8, title: "HyperX Cloud MIX", price: "$129" },
        { image: headset6, title: "HyperX CloudX Flight", price: "$139" },
        { image: headset7, title: "HyperX Cloud Orbit S", price: "$299" },
        { image: headset5, title: "HyperX Cloud Stinger", price: "$49" },
        { image: headset9, title: "HyperX Cloud Core", price: "$69" },
        { image: headset10, title: "HyperX Cloud Chat", price: "$29" },
        { image: headset11, title: "HyperX Cloud PS", price: "$89" },
        {
          image: headset12,
          title: "HyperX Cloud Alpha Wireless",
          price: "$199",
        },
        { image: headset13, title: "HyperX Cloud Buds", price: "$39" },
        { image: headset14, title: "HyperX Cloud Flight S", price: "$159" },
        { image: headset15, title: "HyperX Cloud II Wireless", price: "$149" },
      ],
    },
    {
      category: "Controller",
      bgImage: controller8,
      products: [
        { image: controller1, title: "GameSir T4 Pro", price: "$45" },
        { image: controller2, title: "GameSir G4 Pro", price: "$49" },
        { image: controller3, title: "GameSir X2 Bluetooth", price: "$59" },
        { image: controller4, title: "GameSir G3s", price: "$35" },
        { image: controller5, title: "GameSir F4 Falcon", price: "$29" },
        { image: controller6, title: "GameSir X3 Type-C", price: "$89" },
        { image: controller7, title: "GameSir T1s", price: "$39" },
        { image: controller8, title: "GameSir VX2 AimSwitch", price: "$99" },
        { image: controller9, title: "GameSir G7 SE", price: "$69" },
      ],
    },
    {
      category: "CPU",
      bgImage: cpu8,
      products: [
        { image: cpu1, title: "Ryzen 3 3200G", price: "$79" },
        { image: cpu2, title: "Ryzen 5 5600G", price: "$139" },
        { image: cpu3, title: "Ryzen 5 7600X", price: "$229" },
        { image: cpu4, title: "Ryzen 7 5700X", price: "$249" },
        { image: cpu5, title: "Ryzen 7 7700X", price: "$329" },
        { image: cpu6, title: "Ryzen 9 5900X", price: "$389" },
        { image: cpu7, title: "Ryzen 9 7900X", price: "$459" },
        { image: cpu8, title: "Ryzen Threadripper 3960X", price: "$1399" },
        { image: cpu9, title: "Ryzen 5 4600G", price: "$119" },
      ],
    },
    {
      category: "Mouse",
      bgImage: mouse5,
      products: [
        { image: mouse1, title: "Redragon M908 Impact", price: "$39" },
        { image: mouse2, title: "Redragon M601 CENTROPHORUS", price: "$25" },
        { image: mouse3, title: "Redragon M602 RGB", price: "$29" },
        { image: mouse4, title: "Redragon M612 Predator", price: "$34" },
        { image: mouse5, title: "Redragon M913 Impact Elite", price: "$49" },
        { image: mouse6, title: "Redragon M811 Aatrox", price: "$35" },
        { image: mouse7, title: "Redragon M808 Storm", price: "$39" },
        { image: mouse8, title: "Redragon M990 LEGEND", price: "$59" },
        { image: mouse9, title: "Redragon M690 Mirage", price: "$27" },
        { image: mouse10, title: "Redragon M990 RGB", price: "$55" },
        { image: mouse11, title: "Redragon M719 Invader", price: "$29" },
        { image: mouse12, title: "Redragon M801 Sniper", price: "$49" },
      ],
    },
  ];

  // Get current category's product list
  const selectedCategory = ProductData.find((c) => c.category === active);

  return (
    <div
      style={{ backgroundImage: `url(${bgDrops})` }}
      className="bg-contain text-white min-h-screen"
    >
      {/* 🎥 Video Banner */}
      <div className="w-full h-[60vh] overflow-hidden lg:h-[80vh]">
        <video
          src={bannerVideo}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover md:object-fill"
        />
      </div>

      {/* 🎮 Title */}
      <div className="flex flex-col items-center gap-4 py-16">
        <h1 className="text-3xl text-black sm:text-4xl md:text-5xl font-bold uppercase">
          Categories
        </h1>
      </div>

      {/* 🌀 Categories Section */}
      <div className="flex justify-center flex-wrap gap-6 py-6">
        {ProductData.map((cat, i) => (
          <div
            key={i}
            onClick={() => setActive(cat.category)}
            style={{
              backgroundImage:
                active === cat.category ? "none" : `url(${cat.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36  rounded-full flex items-center justify-center text-center text-sm sm:text-xl font-semibold cursor-pointer transition-all duration-300
        ${
          active === cat.category
            ? "bg-white text-black scale-110 shadow-2xl"
            : "text-white bg-black/100"
        }`}
          >
            <h4 className="px-3">{cat.category}</h4>
          </div>
        ))}
      </div>

      {/* 🛍️ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 py-10 xl:px-8">
        {selectedCategory?.products.map((product, index) => (
          <ProductCard
            key={`${selectedCategory.category}-${index}`}
            image={product.image}
            title={product.title}
            price={product.price}
            bgColor={selectedCategory.bgColor}
          />
        ))}
      </div>

      <div>
        <Customize />
      </div>
    </div>
  );
};

export default Products;
