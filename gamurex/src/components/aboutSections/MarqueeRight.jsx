import star from "../../assets/images/star.webp";

const MarqueeRight = () => {
  return (
       <div className="relative bg-black flex w-max animate-marquee2 gap-8">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex gap-8">
              {[...Array(10)].map((_, i) => (
                <div key={`${j}-${i}`} className="flex items-center gap-4">
                  <img
                    src="/logo2.webp"
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
               @keyframes marquee2 {
                 0% { transform: translateX(0%); }
                 100% { transform: translateX(-50%); }
               }
               .animate-marquee2 {
                 animation: marquee2 25s linear infinite;
               }
             `}</style>
        </div>
  )
}

export default MarqueeRight