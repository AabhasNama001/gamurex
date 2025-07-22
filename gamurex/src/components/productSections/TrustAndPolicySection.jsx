import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const trustCards = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description:
      "Get your gear delivered lightning-fast right to your doorstep.",
  },
  {
    icon: "🛡️",
    title: "1-Year Warranty",
    description: "Worry-free shopping with a full year of product protection.",
  },
  {
    icon: "🔄",
    title: "Easy Returns",
    description: "Changed your mind? Return within 7 days, no questions asked.",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    description: "Round-the-clock help from real people who get gaming.",
  },
];

const faqs = [
  {
    question: "When will my product arrive?",
    answer:
      "Typically within 3–5 business days via our express courier partners.",
  },
  {
    question: "How does the return process work?",
    answer:
      "Simply raise a request from your account and we handle the pickup.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 40 countries with tracking provided.",
  },
];

const TrustAndPolicySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elems = sectionRef.current.querySelectorAll(".fade-in");
    elems.forEach((el) => {
      gsap.fromTo(
        el,
        { filter: "blur(8px)", opacity: 0, y: 50 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-20 rounded-b-xl px-6 lg:px-20 bg-[#222]/90 text-white space-y-20"
    >
      {/* Why Choose Us Section */}
      <div className="text-center space-y-10 fade-in">
        <h2 className="text-4xl font-bold text-blue-400">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustCards.map((card, index) => (
            <div
              key={index}
              className="bg-black p-6 rounded-xl cursor-pointer shadow-md hover:shadow-blue-400 transition-all duration-300 fade-in"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-green-300 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full fade-in"></div>

      {/* Shipping & Returns FAQs */}
      <div className="fade-in">
        <h2 className="text-4xl font-bold text-blue-400 text-center mb-10">
          Shipping & Returns
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="bg-[#111] p-6 rounded-xl cursor-pointer fade-in"
            >
              <summary className="text-lg font-medium text-yellow-400">
                {faq.question}
              </summary>
              <p className="text-gray-400 mt-2 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustAndPolicySection;
