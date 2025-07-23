import { NavLink, useNavigate } from "react-router-dom";
import logoFooter from "/logo2.webp";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import bgFooter from "../assets/images/bg.webp";

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <footer
      style={{ backgroundImage: `url(${bgFooter})` }}
      className="bg-cover text-white flex justify-center"
    >
      <div className="min-[1700px]:w-[1600px]">
        {/* Logo Section */}
        <div className="w-[90%] mx-auto py-10">
          <img
            onClick={handleClick}
            src={logoFooter}
            alt="Footer Logo"
            className="w-full object-cover max-h-[200px]"
          />
        </div>

        {/* Footer Content */}
        <div className="w-full px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm sm:text-base sm:px-32">
          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg mb-2 text-white">Links</h3>
            <NavLink to="/" className="hover:text-yellow-400 transition w-fit">
              HOME
            </NavLink>
            <NavLink
              to="/products"
              className="hover:text-yellow-400 transition w-fit"
            >
              PRODUCTS
            </NavLink>
            <NavLink
              to="/login"
              className="hover:text-yellow-400 transition w-fit"
            >
              LOGIN
            </NavLink>
          </div>

          {/* Policies */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg mb-2 text-white">Policies</h3>
            <p className="hover:text-yellow-400 cursor-pointer transition w-fit">
              TERMS OF USE
            </p>
            <p className="hover:text-yellow-400 cursor-pointer transition w-fit">
              SALES POLICY
            </p>
            <p className="hover:text-yellow-400 cursor-pointer transition w-fit">
              PRIVACY POLICY
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg mb-2 text-white">Contact</h3>
            <p>Ocala, FL 34471, USA</p>
            <p>info@gamurex.com</p>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg mb-2 text-white">Follow Us</h3>
            <div className="flex gap-4 items-center text-2xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 transition"
              >
                <FaFacebook />
              </a>

              {/* Add more icons if needed */}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-xs py-4 border-t border-gray-700">
          &copy; {new Date().getFullYear()} Gamurex. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
