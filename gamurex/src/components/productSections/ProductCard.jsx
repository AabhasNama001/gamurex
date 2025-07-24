import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import bgWhite from "../../assets/images/bgWhite.webp";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  addFavourite,
  removeFavourite,
  getFavourites,
  isFavourite as checkIsFavourite,
} from "../../utils/localStorage"; // ✅ Import your utils

const ProductCard = ({
  id,
  image,
  title,
  price,
  category,
  bgImage = `url(${bgWhite})`,
  onUnfavourite, // ✅ New: optional callback
}) => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);
  const animationFrame = useRef(null);

  // ✅ Check favourite status on mount
  useEffect(() => {
    setIsFavourite(checkIsFavourite(id));
  }, [id]);

  const handleClick = useCallback(() => {
    navigate("/product-details", {
      state: { id, image, title, price },
    });
  }, [navigate, id, image, title, price]);

  const toggleFavourite = useCallback(() => {
    if (isFavourite) {
      const updated = removeFavourite(id);
      setIsFavourite(false);
      toast.error("Removed from favourites.");
      if (onUnfavourite) onUnfavourite(id); // ✅ Notify parent
    } else {
      addFavourite({ id, image, title, price, category });
      setIsFavourite(true);
      toast.success("Added to favourites!");
    }
  }, [isFavourite, id, image, title, price, category, onUnfavourite]);

  const addToCart = useCallback(() => {
    const cart = localStorage.getItem("cart");
    let storedCart = cart ? JSON.parse(cart) : [];
    const existingItem = storedCart.find((item) => item.id === id);

    let updatedCart;
    if (existingItem) {
      updatedCart = storedCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...storedCart,
        { id, image, title, price, category, quantity: 1 },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product added to cart!");
  }, [id, image, title, price, category]);

  const handleMouseMove = useCallback((e) => {
    if (!titleRef.current) return;

    const rect = titleRef.current.getBoundingClientRect();

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const cursorStyle = useMemo(
    () => ({
      transform: `translate(${cursorPos.x - 80}px, ${cursorPos.y - 80}px)`,
      background: "linear-gradient(135deg, #ff5e5e, #ff0066)",
      color: "#fff",
      whiteSpace: "nowrap",
    }),
    [cursorPos]
  );

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto mt-16">
      {/* Heart Icon */}
      <div
        onClick={toggleFavourite}
        className="absolute top-2 left-2 text-2xl z-20 cursor-pointer"
      >
        {isFavourite ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400" />
        )}
      </div>

      {/* Product Image */}
      <div className="absolute -top-10 md:-top-20 left-1/2 transform -translate-x-1/2 z-10 w-32 h-32 md:w-40 md:h-40">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Card */}
      <div
        className="relative h-70 rounded-2xl p-4 pt-14 text-black shadow-lg"
        style={{
          clipPath: "polygon(0 0, 85% 0, 100% 20%, 100% 100%, 0 100%)",
          backgroundImage: bgImage,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute top-4 right-4 text-red-600 border-2 bg-white border-red-300 text-sm md:text-lg xl:text-2xl font-semibold px-4 py-1 rounded-xl shadow">
          {price}
        </div>

        <div className="mt-4">
          <h3
            ref={titleRef}
            onClick={handleClick}
            onMouseEnter={() => setShowCursor(true)}
            onMouseLeave={() => setShowCursor(false)}
            onMouseMove={handleMouseMove}
            className="relative text-2xl cursor-pointer md:text-3xl text-[rgb(9,9,72)] text-center pt-10 font-bold"
          >
            {title}

            {showCursor && (
              <div
                className="pointer-events-none absolute z-50 px-3 py-2 text-xs md:text-sm font-semibold rounded-full shadow-lg transition-transform duration-150 ease-out"
                style={cursorStyle}
              >
                Click for Details...
              </div>
            )}
          </h3>
        </div>

        <div className="absolute bottom-6 left-1/2 font-['Deacon-normal'] transform -translate-x-1/2">
          <button
            onClick={addToCart}
            className="relative overflow-hidden px-4 sm:text-[14px] md:px-5 py-3 xl:px-6 xl:py-4 rounded-full xl:text-lg text-white border-white border-2 transition-all duration-500 bg-gradient-to-r from-black to-gray-700 group"
          >
            <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-500 group-hover:w-full z-0 group-hover:border-black group-hover:border-2 group-hover:rounded-full" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
