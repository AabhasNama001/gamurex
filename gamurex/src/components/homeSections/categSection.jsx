// CategSection.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cpuCateg from "../../assets/images/cpus/cpu9.webp";
import headsetCateg from "../../assets/images/headsets/h14.webp";
import controllerCateg from "../../assets/images/gamingControllers/gc1.webp";
import mouseCateg from "../../assets/images/mouses/mouse7.webp";
import bgSpace from "../../assets/images/bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { img: cpuCateg, label: "CPU" },
  { img: controllerCateg, label: "Gaming Controllers" },
  { img: headsetCateg, label: "Headsets" },
  { img: mouseCateg, label: "Gaming Mouses" },
];

const CategSection = () => {
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading when it enters the section
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top center+=50",
            toggleActions: "play none none reverse",
          },
          duration: 0.7,
          ease: "power1.out",
        }
      );

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isPhone: "(max-width: 639px)",
        },
        (context) => {
          const { isDesktop, isTablet, isPhone } = context.conditions;

          // Clear styles
          cardRefs.current.forEach((card) =>
            gsap.set(card, { clearProps: "all" })
          );

          if (isPhone || isTablet) {
            cardRefs.current.forEach((card, i) => {
              gsap.from(card, {
                opacity: 0,
                y: 60,
                filter: "blur(12px)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
                duration: 0.5,
                delay: 0.1 * i,
                ease: "power2.out",
              });
            });
          }

          // if (isDesktop) {
          //   const lefts = ["0%", "25%", "50%", "75%"];
          //   cardRefs.current.forEach((card, i) => {
          //     gsap.set(card, {
          //       position: "absolute",
          //       top: 0,
          //       left: lefts[i],
          //       width: "25%",
          //       zIndex: i + 1,
          //     });

          //     gsap.fromTo(
          //       card,
          //       { opacity: 0, y: 60, filter: "blur(12px)" },
          //       {
          //         opacity: 1,
          //         y: 0,
          //         filter: "blur(0px)",
          //         scrollTrigger: {
          //           trigger: sectionRef.current,
          //           start: `top+=${i * 100} center`,
          //           end: `top+=${(i + 1) * 100} center`,
          //           scrub: true,
          //         },
          //         duration: 0.8,
          //         ease: "power3.out",
          //       }
          //     );
          //   });
          // }

          if (isDesktop) {
            const lefts = ["2%", "26%", "50%", "74%"]; // Leaves ~2% gap between each
            cardRefs.current.forEach((card, i) => {
              gsap.set(card, {
                position: "absolute",
                top: 0,
                left: lefts[i],
                width: "22%",
                zIndex: i + 1,
              });

              gsap.fromTo(
                card,
                { opacity: 0, y: 60, filter: "blur(12px)" },
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scrollTrigger: {
                    trigger: sectionRef.current,
                    start: `top+=${i * 80} center`,
                    end: `top+=${(i + 1) * 60} center`,
                    scrub: true,
                  },
                  duration: 0.8,
                  ease: "power3.out",
                }
              );
            });
          }
        }
      );

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundImage: `url(${bgSpace})` }}
      className="w-[100%] pb-20 mx-auto px-3 py-12 min-h-[100vh] relative bg-cover font-['Deacon-normal']"
    >
      <div
        ref={headingRef}
        className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mt-20 mb-30 "
      >
        CATEGORIES
      </div>

      <div
        className="
          flex flex-col gap-6
          sm:grid sm:grid-cols-2 sm:gap-8
          lg:flex lg:relative lg:h-[370px] lg:grid-cols-none lg:gap-14"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            ref={addToRefs}
            className={`card-item bg-[#24243b] hover:bg-[#171730] rounded-2xl shadow-xl text-center px-4 py-8 flex flex-col items-center
              transition min-h-[200px] md:min-h-[220px] `}
          >
            <img
              src={card.img}
              alt={card.label}
              className="w-20 h-20 object-contain mb-5 lg:w-40 lg:h-40"
              draggable="false"
            />
            <h2 className="text-lg lg:text-2xl tracking-wider font-semibold mt-2 uppercase">
              {card.label}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategSection;
