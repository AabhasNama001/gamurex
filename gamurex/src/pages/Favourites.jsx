// src/pages/Favourites.jsx
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { getFavourites, saveFavourites } from "../utils/localStorage";
import ProductCard from "../components/productSections/ProductCard";
import bgSpace from "../assets/images/bg.webp";
import { useLocation } from "react-router-dom";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const hasScrolledToTop = useRef(false);
  const location = useLocation();

  // Scroll to top on mount
  useLayoutEffect(() => {
    if (location.pathname === "/fav" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  // Load favourites from localStorage on route change
  useEffect(() => {
    setFavourites(getFavourites());
  }, [location.pathname]);

  // Handle unfavourite
  const handleUnfavourite = (id) => {
    const updated = favourites.filter((item) => item.id !== id);
    setFavourites(updated);
    saveFavourites(updated);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgSpace})` }}
      className="min-h-screen bg-cover py-40 px-6"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-300">
        Your Favourites
      </h1>

      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favourites.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              isFavPage={true}
              onUnfavourite={handleUnfavourite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No Favourites Added!
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
            You haven’t added any products to your favourites yet. Start
            exploring and tap the ❤️ icon to save your favorite items!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
