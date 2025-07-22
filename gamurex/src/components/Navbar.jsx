import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiX, FiHeart, FiShoppingCart } from "react-icons/fi";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full text-white shadow-md fixed top-6 left-0 z-50">
      <div className="max-w-7xl mb-4 mx-auto flex items-center justify-between backdrop-blur-sm px-4 py-3 rounded-4xl">
        {/* Left: Hamburger */}
        <div>
          <button onClick={toggleSidebar} className="text-2xl">
            <span className="text-2xl">
              <i className={isOpen ? "" : "ri-menu-line"}></i>
            </span>
          </button>
        </div>

        {/* Center: Logo */}
        <div className="w-32 md:w-50">
          <NavLink to="/">
            <img src="/logo2.png" />
          </NavLink>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 text-xl">
          <NavLink to="/fav">
            <FiHeart className="cursor-pointer" />
          </NavLink>
          <FiShoppingCart className="cursor-pointer" />
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-[#020220] shadow-lg p-6 transform transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={toggleSidebar} className="text-2xl mb-6 pt-4">
          <FiX />
        </button>

        {/* Nav Links */}
        <ul className="flex flex-col ml-10 gap-4 text-[clamp(1.5rem,_5vw,_4rem)] font-medium">
          <NavLink
            to="/"
            onClick={toggleSidebar}
            className="hover:text-[#454590] w-fit"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={toggleSidebar}
            className="hover:text-[#454590] w-fit"
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={toggleSidebar}
            className="hover:text-[#454590] w-fit"
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            onClick={toggleSidebar}
            className="hover:text-[#454590] w-fit"
          >
            Login
          </NavLink>
        </ul>

        {/* Footer Info Below Nav Links */}
        <div className="mt-10 pt-6 px-10 text-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-10 text-white">
            {/* Left: Address */}
            <div className="flex items-start gap-2 w-full sm:w-1/3">
              <FaMapMarkerAlt className="mt-1 text-lg text-[#8787f1]" />
              <p>
                221B Baker Street,
                <br />
                London, UK
              </p>
            </div>

            {/* Center: Phone */}
            <div className="flex items-start sm:justify-center gap-2 w-full sm:w-1/3">
              <FaPhoneAlt className="mt-1 text-lg text-[#8787f1]" />
              <p>+44 20 7946 0958</p>
            </div>

            {/* Right: Social Media */}
            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-1/3">
              <div className="flex items-center gap-2">
                <FaFacebookF className="text-[#3b5998]" />
                <p>Facebook</p>
              </div>
              <div className="flex items-center gap-2">
                <FaTwitter className="text-[#1da1f2]" />
                <p>Twitter</p>
              </div>
              <div className="flex items-center gap-2">
                <FaInstagram className="text-[#e1306c]" />
                <p>Instagram</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
