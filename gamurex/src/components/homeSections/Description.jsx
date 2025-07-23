import descVid from "../../assets/videos/bgVid.mov";
import cpu10 from "../../assets/images/cpus/cpu10.webp";
import { NavLink } from "react-router-dom";

const Description = () => {
  return (
    <div className="relative h-[70vh] w-screen md:h-screen ">
      {/* Background Video */}
      <video
        src={descVid}
        autoPlay
        muted
        loop
        playsInline
        className="absolute brightness-50 top-0 left-0 w-full h-[70vh] md:h-[80vh] lg:h-[100vh] object-cover z-0"
      />

      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/90 z-10 pointer-events-none"></div> */}

      {/* Content */}
      <div className="absolute h-full z-20 flex flex-col items-center justify-center gap-8 p-10 sm:pt-24 sm:flex-row lg:w-full lg:justify-around">
        <div className="text-white text-left space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase">
            Game Like a Pro
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase">
            with the
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-[#00ffff]">
            Ultimate PC
          </h1>
          <NavLink to="/products">
            <button className="mt-6 bg-transparent text-white border border-white px-6 py-2 rounded-full text-sm sm:text-base sm:w-[80%] hover:bg-white hover:text-black transition duration-300">
              Shop Now
            </button>
          </NavLink>
        </div>

        {/* Right Image */}
        <div>
          <img
            src={cpu10}
            className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:mr-30"
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
