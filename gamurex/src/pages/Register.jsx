import React, { useState, useLayoutEffect, useRef } from "react";
import { saveUser } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/images/bg.webp";

const Register = () => {
  const location = useLocation();
  const hasScrolledToTop = useRef(false);

  useLayoutEffect(() => {
    if (location.pathname === "/register" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    saveUser({ email, password });
    toast.success("Registration successful!");
    navigate("/login");
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="flex justify-center items-center h-screen bg-cover text-white"
    >
      <form
        onSubmit={handleRegister}
        className="bg-white text-black p-8 rounded-lg w-80 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Email Input */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            className="peer w-full px-3 pt-5 pb-2 border rounded bg-transparent text-sm text-black placeholder-transparent focus:outline-none focus:border-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
          >
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="peer w-full px-3 pt-5 pb-2 border rounded bg-transparent text-sm text-black placeholder-transparent focus:outline-none focus:border-black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
          >
            Password
          </label>

          {/* Toggle Show/Hide Password */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-sm text-gray-600 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
