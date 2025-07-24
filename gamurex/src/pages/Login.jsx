import React, { useState, useLayoutEffect, useRef } from "react";
import { getUser, login } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/images/bg.webp";

const Login = () => {
  const location = useLocation();
  const hasScrolledToTop = useRef(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Scroll to top once on mount without triggering GSAP issues
  useLayoutEffect(() => {
    if (location.pathname === "/login" && !hasScrolledToTop.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      hasScrolledToTop.current = true;
    }
  }, [location.pathname]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = getUser();

    // 🛑 Case 1: No user has registered
    if (!savedUser || !savedUser.email || !savedUser.password) {
      toast.error("User not registered!");
      return;
    }

    // ❌ Case 2: User exists but email or password is incorrect
    if (savedUser.email !== email || savedUser.password !== password) {
      toast.error("Invalid email or password!");
      return;
    }

    // ✅ Case 3: Login successful
    login();
    toast.success("Login successful!");
    navigate("/products");
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="flex justify-center items-center h-screen bg-cover text-white"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white text-black p-8 rounded-lg w-80 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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

          {/* 👁️ Toggle visibility */}
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
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
