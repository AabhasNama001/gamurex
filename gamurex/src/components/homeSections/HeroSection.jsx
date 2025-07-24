import GamurexTitle from "./GamurexTitle";
import heroBg from "../../assets/images/bg.webp";
import hero1 from "../../assets/images/heroImg1.webp";
import hero2 from "../../assets/images/heroImg2.webp";
import hero3 from "../../assets/images/heroImg3.webp";
import hero4 from "../../assets/images/heroImg4.webp";

const imageUrls = [hero1, hero2, hero3, hero4];

const HeroSection = () => {
  return (
    <div
      className="w-screen h-[500px] sm:h-[600px] lg:h-[100vh] bg-cover bg-center flex flex-col justify-center items-center relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <GamurexTitle imageUrls={imageUrls} />
      <div className="text-center text-lg md:text-2xl tracking-wider text-white drop-shadow-md">
        <h2>Gaming tools.</h2>
        <h2>Sleek. Fast. Strong.</h2>
      </div>
    </div>
  );
};

export default HeroSection;
