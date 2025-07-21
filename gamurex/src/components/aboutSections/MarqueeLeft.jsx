import star from "../../assets/images/star.webp";

const MarqueeLeft = () => {
  return (
    <div className="relative bg-black flex w-max animate-marquee1 gap-8">
      {[...Array(2)].map((_, j) => (
        <div key={j} className="flex gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={`${j}-${i}`} className="flex items-center gap-4">
              <img
                src="/logo2.png"
                alt="Logo"
                className="h-6 w-auto object-contain"
                draggable="false"
              />
              <img
                src={star}
                alt="Star"
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      ))}

      <style>{`
           @keyframes marquee1 {
             0% { transform: translateX(-50%); }
             100% { transform: translateX(0%); }
           }
           .animate-marquee1 {
             animation: marquee1 25s linear infinite;
           }
         `}</style>
    </div>
  );
};

export default MarqueeLeft;
