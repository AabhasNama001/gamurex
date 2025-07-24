import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const NewsletterSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(headingRef.current?.children, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.includes("@") && email.includes(".")) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-black via-[#0e0e0e] to-black text-white py-16 px-6 w-full text-center relative overflow-hidden"
    >
      {/* Animated Icon */}
      <div className="absolute top-6 left-6 sm:left-10 text-green-400 text-3xl animate-bounce">
        <FaEnvelope />
      </div>

      {/* Glow behind */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[200px] w-[200px] bg-green-500 blur-3xl opacity-20 rounded-full pointer-events-none" />

      {/* Content */}
      <div className="max-w-2xl mx-auto space-y-6 z-10 relative">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold flex flex-wrap justify-center gap-1"
        >
          {"Stay Updated with the Grind".split(" ").map((word, i) => (
            <span key={i} className="inline-block">
              {word}
            </span>
          ))}
        </h2>

        <p className="text-lg sm:text-xl text-gray-300">
          Get behind-the-scenes drops, stream schedules, and exclusive content — straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full w-full sm:w-2/3 bg-white/10 backdrop-blur-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#54DD4C] transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#54DD4C] hover:bg-green-500 text-black font-semibold px-6 py-3 rounded-full transition-all"
          >
            Subscribe
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-400 font-medium mt-2">
            ✅ You’re on the list, gamer!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 font-medium mt-2">
            ❌ Please enter a valid email address.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
