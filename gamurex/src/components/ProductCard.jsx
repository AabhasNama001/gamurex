import React from "react";
import bgWhite from "../assets/images/bgWhite.webp";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ image, title, price, bgImage = `url(${bgWhite})` }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product-details", {
      state: { image, title, price },
    });
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto mt-16">
      {/* Image placed outside the clipped background */}
      <div className="absolute -top-10 md:-top-20 left-1/2 transform -translate-x-1/2 z-10 w-32 h-32 md:w-40 md:h-40">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Clipped background card */}
      <div
        className="relative h-70 rounded-2xl p-4 pt-14 text-black shadow-lg"
        style={{
          clipPath: "polygon(0 0, 85% 0, 100% 20%, 100% 100%, 0 100%)",
          backgroundImage: bgImage,
          backgroundSize: "cover",
        }}
      >
        {/* Price Tag */}
        <div className="absolute top-4 right-4 text-red-600 border-2 bg-white border-red-300 text-sm md:text-lg xl:text-2xl font-semibold px-4 py-1 rounded-xl shadow">
          {price}
        </div>

        {/* Text Content */}
        <div className="mt-4">
          <h3 className="text-2xl md:text-3xl text-[rgb(9,9,72)] text-center pt-10 font-bold">
            {title}
          </h3>
        </div>

        {/* Button */}
        <div className="absolute bottom-6 left-1/2 font-['Deacon-normal'] transform -translate-x-1/2">
          <button
            onClick={handleClick}
            className="relative overflow-hidden px-4 md:px-5 py-3 xl:px-6 xl:py-4 rounded-full text-lg text-white border-white border-2 transition-all duration-500 bg-gradient-to-r from-black to-gray-700  group"
          >
            <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-500 group-hover:w-full z-0 group-hover:border-black group-hover:border-2 group-hover:rounded-full"></span>
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              View Full Specs
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
