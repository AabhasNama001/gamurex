import star from "../../assets/images/star.webp";
import logo from "/logo2.webp"; // Use local import

const MarqueeRight = () => {
  return (
    <div className="relative overflow-hidden bg-black py-4">
      <div className="flex w-max animate-marquee-reverse gap-8">
        {[...Array(2)].map((_, j) => (
          <div key={j} className="flex gap-8">
            {[...Array(10)].map((_, i) => (
              <div key={`${j}-${i}`} className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-6 w-auto object-contain"
                  draggable="false"
                />
                <img
                  src={star}
                  alt="Star"
                  className="h-10 w-auto object-contain"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Reverse marquee animation */}
      <style>{`
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueeRight;
