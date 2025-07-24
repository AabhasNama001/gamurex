import star from "../../assets/images/star.webp";
import logo from "/logo2.webp"; // use local path instead of "/logo2.webp"

const MarqueeLeft = () => {
  return (
    <div className="relative overflow-hidden bg-black py-4">
      <div className="flex w-max animate-marquee gap-8">
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

      {/* Animation styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueeLeft;
