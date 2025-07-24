import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsletterSection = () => {
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none", // ensures animation only plays once
      },
    });

    return () => {
      ScrollTrigger.kill(); // Cleanup
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const isValid = email.includes("@") && email.includes(".");

      setStatus(isValid ? "success" : "error");
      if (isValid) setEmail("");

      // Clear any existing timeout and set a new one
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStatus(null), 3000);
    },
    [email]
  );

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-16 px-6 text-center w-full"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Stay Updated with the Grind
        </h2>
        <p className="text-lg sm:text-xl text-gray-300">
          Get behind-the-scenes content, stream schedules, and exclusive drops —
          straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full w-full sm:w-2/3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#54DD4C]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <button
            type="submit"
            className="bg-[#54DD4C] hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-all"
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
