import { memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoFooter from "/logo2.webp";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import bgFooter from "../assets/images/bg.webp";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="bg-cover text-white flex justify-center"
      style={{ backgroundImage: `url(${bgFooter})` }}
    >
      <div className="min-[1700px]:w-[1600px] w-full">
        {/* Logo Section */}
        <div className="w-[90%] mx-auto py-10 cursor-pointer">
          <img
            onClick={() => navigate("/")}
            src={logoFooter}
            alt="Footer Logo"
            loading="lazy"
            className="w-full object-contain max-h-[200px]"
          />
        </div>

        {/* Footer Content */}
        <div className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:px-32 text-sm sm:text-base">
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Links</h3>
            {["/", "/products", "/about"].map((path, idx) => {
              const labels = ["HOME", "PRODUCTS", "ABOUT"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className="block hover:text-yellow-400 transition w-fit"
                >
                  {labels[idx]}
                </NavLink>
              );
            })}
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Policies</h3>
            {["TERMS OF USE", "SALES POLICY", "PRIVACY POLICY"].map((policy) => (
              <p
                key={policy}
                className="hover:text-yellow-400 cursor-pointer transition w-fit"
              >
                {policy}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p>Ocala, FL 34471, USA</p>
            <p>info@gamurex.com</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <div className="flex gap-4 items-center text-2xl">
              <SocialIcon href="https://instagram.com" title="Instagram">
                <FaInstagram className="hover:text-pink-500 transition" />
              </SocialIcon>
              <SocialIcon href="https://x.com" title="Twitter">
                <FaTwitter className="hover:text-blue-400 transition" />
              </SocialIcon>
              <SocialIcon href="https://facebook.com" title="Facebook">
                <FaFacebook className="hover:text-blue-800 transition" />
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs py-4 border-t border-gray-700">
          &copy; {new Date().getFullYear()} Gamurex. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, title, children }) => (
  <a
    href={href}
    title={title}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={title}
  >
    {children}
  </a>
);

export default memo(Footer);
