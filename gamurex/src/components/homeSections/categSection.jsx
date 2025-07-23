import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import cpuCateg from "../../assets/images/cpus/cpu9.webp";
import headsetCateg from "../../assets/images/headsets/h14.webp";
import controllerCateg from "../../assets/images/gamingControllers/gc1.webp";
import mouseCateg from "../../assets/images/mouses/mouse10.webp";
import bgSpace from "../../assets/images/bg.jpg";

const categories = [
  {
    key: "headset",
    title: "Headsets",
    quote: "Immersive Sound",
    image: headsetCateg,
  },
  {
    key: "controller",
    title: "Gaming Controllers",
    quote: "Total Control",
    image: controllerCateg,
  },
  {
    key: "cpu",
    title: "CPU",
    quote: "Power Within",
    image: cpuCateg,
  },
  {
    key: "mouse",
    title: "Gaming Mouses",
    quote: "Precision Unleashed",
    image: mouseCateg,
  },
];

const CategSection = () => {
  const [hovered, setHovered] = useState("headset"); // Default visible category
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products");
  };

  return (
    <div
      className="bg-cover bg-center py-16 px-4 md:px-10"
      style={{ backgroundImage: `url(${bgSpace})` }}
    >
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-10 md:mt-20 lg:mt-80">
        CATEGORIES
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image - Only one visible at a time */}
        <div className="relative h-[200px] md:h-[500px]">
          {categories.map((item) => (
            <img
              key={item.key}
              src={item.image}
              alt={item.title}
              onClick={handleClick}
              className={`absolute inset-0 w-full h-full object-contain rounded-xl shadow-lg transition-opacity duration-500 ${
                hovered === item.key ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>

        {/* Right Headings */}
        <div className="space-y-6 text-white">
          {categories.map((item) => (
            <div
              key={item.key}
              onMouseEnter={() => setHovered(item.key)}
              className="transition duration-300 cursor-pointer w-fit"
            >
              {/* Without Hover */}
              <div
                className={`${
                  hovered === item.key ? "hidden" : "block opacity-60"
                } withoutHover`}
              >
                <h1 className="text-xl md:text-2xl font-medium">
                  {item.title}
                </h1>
              </div>

              {/* After Hover */}
              <div
                className={`${
                  hovered === item.key ? "block" : "hidden"
                } afterHover bg-black/70 p-4 rounded-lg`}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
                  {item.title}
                </h1>
                <h2 className="text-sm md:text-base text-white italic mt-1">
                  "{item.quote}"
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategSection;
