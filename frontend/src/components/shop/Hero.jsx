import { assets } from "../../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <section className=" flex flex-col sm:flex-row border-gray-400 ">
      {/* Left Portion */}
      <div className=" w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] text-center sm:text-left px-4">
          {/* Bestseller Label */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
            <p className="font-medium text-sm md:text-base">Our BESTSELLERS</p>
          </div>

          {/* Heading */}
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed font-semibold">
            Latest Arrivals
          </h1>

          {/* Shop Now Label */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="font-medium text-sm md:text-base">SHOP NOW</p>
            <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
          </div>
        </div>
      </div>

      {/* Right Portion */}
      <div className="w-full sm:w-1/2">
        <img
          src={assets.hero_img}
          className="w-full h-auto object-cover"
          alt="Latest Arrivals Hero"
        />
      </div>
    </section>
  );
};

export default Hero;
