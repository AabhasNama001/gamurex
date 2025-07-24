import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiX, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import gsap from "gsap";
import SplitType from "split-type";
import { isAuthenticated, logout } from "../utils/auth";
import { toast } from "react-toastify";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/cart", label: "Cart" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);
  const linkRefs = useRef([]);
  const sidebarLinkRefs = useRef([]);
  const hoverAnimations = useRef([]);
  const backdropRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const getCircleData = useCallback(() => {
    const btn = hamburgerRef.current?.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const cx = btn ? btn.left + btn.width / 2 : vw / 2;
    const cy = btn ? btn.top + btn.height / 2 : vh / 2;

    const r = Math.ceil(
      Math.max(
        Math.hypot(cx - 0, cy - 0),
        Math.hypot(cx - vw, cy - 0),
        Math.hypot(cx - 0, cy - vh),
        Math.hypot(cx - vw, cy - vh)
      )
    );

    return { cx, cy, r };
  }, []);

  const openSidebar = () => {
    if (isOpen) return;
    setIsOpen(true);

    requestAnimationFrame(() => {
      const { cx, cy, r } = getCircleData();

      gsap.set(sidebarRef.current, {
        clipPath: `circle(0px at ${cx}px ${cy}px)`,
        pointerEvents: "auto",
        opacity: 1,
      });

      const tl = gsap.timeline();

      tl.to(sidebarRef.current, {
        clipPath: `circle(${r}px at ${cx}px ${cy}px)`,
        duration: 1.95,
        ease: "power3.out",
      }).from(
        sidebarLinkRefs.current,
        {
          y: 20,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2"
      );
    });
  };

  const closeSidebar = useCallback(() => {
    const { cx, cy } = getCircleData();

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(sidebarRef.current, {
            pointerEvents: "none",
            opacity: 0,
            clipPath: `circle(0px at ${cx}px ${cy}px)`,
          });
          setIsOpen(false);
        },
      })
      .to(sidebarLinkRefs.current, {
        y: 20,
        duration: 0.65,
        stagger: 0.05,
        ease: "power2.in",
      })
      .to(
        sidebarRef.current,
        {
          clipPath: `circle(0px at ${cx}px ${cy}px)`,
          duration: 0.65,
          ease: "power3.in",
        },
        "<"
      );
  }, [getCircleData]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && closeSidebar();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeSidebar]);

  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;
    const handleClick = (e) => e.target === backdrop && closeSidebar();
    backdrop.addEventListener("click", handleClick);
    return () => backdrop.removeEventListener("click", handleClick);
  }, [closeSidebar]);

  useLayoutEffect(() => {
    linkRefs.current.forEach((el) => {
      if (!el) return;
      const split = new SplitType(el, { types: "chars", tagName: "span" });
      const chars = split.chars;

      const tl = gsap.timeline();
      tl.from(chars, {
        y: -30,
        skewX: 10,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
      });

      const play = () => tl.restart();
      el.addEventListener("mouseenter", play);
      hoverAnimations.current.push({ el, play });
    });

    return () => {
      hoverAnimations.current.forEach(({ el, play }) =>
        el?.removeEventListener("mouseenter", play)
      );
      hoverAnimations.current = [];
    };
  }, []);

  const handleUserClick = useCallback(() => {
    if (isAuthenticated()) {
      logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <nav className="w-full text-white fixed top-6 left-0 z-50">
      <div className="max-w-7xl mb-4 mx-auto flex items-center justify-between backdrop-blur-sm px-4 py-3 rounded-4xl">
        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          onClick={openSidebar}
          className="text-2xl relative z-50"
          aria-label="Open menu"
        >
          <i className="ri-menu-line" />
        </button>

        {/* Logo */}
        <NavLink to="/" className="w-32 md:w-50">
          <img src="/logo2.webp" alt="logo" />
        </NavLink>

        {/* Icons */}
        <div className="flex items-center gap-4 text-xl md:text-2xl">
          <NavLink to="/fav" aria-label="Favourites">
            <FiHeart className="cursor-pointer hover:text-red-500" />
          </NavLink>
          <NavLink to="/cart" aria-label="Cart">
            <FiShoppingCart className="cursor-pointer hover:text-blue-500" />
          </NavLink>
          <FiUser
            onClick={handleUserClick}
            className="cursor-pointer hover:text-gray-600"
            aria-label={isAuthenticated() ? "Logout" : "Register"}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed inset-0 z-40 clip-circle-0 opacity-0 pointer-events-none"
      >
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-black/60"
          aria-hidden="true"
        />
        <div className="relative h-full w-full bg-[#020220] shadow-lg overflow-y-auto">
          <div className="h-full flex flex-col justify-between px-6 pt-4 pb-8">
            <div>
              <button
                onClick={closeSidebar}
                className="text-2xl mb-6"
                aria-label="Close menu"
              >
                <FiX />
              </button>

              {/* Sidebar Links */}
              <ul className="flex flex-col ml-4 gap-4 text-[clamp(1.5rem,_5vw,_4rem)] font-medium">
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeSidebar}
                    className="hover:text-[#9e9bfe] w-fit cursor-pointer"
                  >
                    <span
                      ref={(el) => {
                        linkRefs.current[index] = el;
                        sidebarLinkRefs.current[index] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="mt-10 pt-6 px-2 text-sm text-white">
              <div className="flex flex-col sm:flex-row justify-between gap-10">
                <ContactBlock
                  icon={<FaMapMarkerAlt className="text-[#8787f1]" />}
                  text={
                    <>
                      221B Baker Street,
                      <br />
                      London, UK
                    </>
                  }
                />
                <ContactBlock
                  icon={<FaPhoneAlt className="text-[#8787f1]" />}
                  text="+44 20 7946 0958"
                />
                <div className="flex flex-col sm:items-end gap-2">
                  <Social
                    label="Facebook"
                    icon={<FaFacebookF className="text-[#3b5998]" />}
                  />
                  <Social
                    label="Twitter"
                    icon={<FaTwitter className="text-[#1da1f2]" />}
                  />
                  <Social
                    label="Instagram"
                    icon={<FaInstagram className="text-[#e1306c]" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ContactBlock = ({ icon, text }) => (
  <div className="flex items-start gap-2 w-full sm:w-1/3">
    {icon}
    <p>{text}</p>
  </div>
);

const Social = ({ label, icon }) => (
  <div className="flex items-center gap-2">
    {icon}
    <p>{label}</p>
  </div>
);

export default Navbar;
