import React, { useState, useLayoutEffect, useRef } from "react";
import { saveUser } from "../utils/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/images/bg.webp";
import head from "../assets/images/headsets/h15.webp";
import mouse from "../assets/images/mouses/mouse12.webp";
import cpu from "../assets/images/cpus/cpu2.webp";
import cont from "../assets/images/gamingControllers/gc1.webp";

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
      className="flex justify-center items-center min-h-screen bg-cover bg-center text-white px-4"
    >
      <form
        onSubmit={handleRegister}
        className="bg-[#141a21] relative h-[390px]  text-white p-8 rounded-xl w-full max-w-md lg:max-w-xl lg:p-12 shadow-xl"
      >
        <img src={head} alt="" className="absolute top-0 left-0 w-20 h-20" />
        <img src={mouse} alt="" className="absolute top-0 right-0 w-20 h-20" />
        <img src={cpu} alt="" className="absolute bottom-0 left-0 w-16 h-16" />
        <img
          src={cont}
          alt=""
          className="absolute bottom-0 right-0 w-20 h-20"
        />
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        {/* Email Input */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            className="peer w-full px-3 pt-5 pb-2 border border-gray-400 rounded bg-transparent text-sm placeholder-transparent focus:outline-none focus:border-green-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-2 text-xs text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-300"
          >
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="peer w-full px-3 pt-5 pb-2 border border-gray-400 rounded bg-transparent text-sm placeholder-transparent focus:outline-none focus:border-green-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-2 text-xs text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-300"
          >
            Password
          </label>

          {/* Toggle Show/Hide Password */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-sm text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 font-semibold"
        >
          Register
        </button>

        <div className="text-center text-sm mt-4">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-blue-500 underline hover:text-blue-300"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
