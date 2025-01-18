import { assets } from "../../assets/frontend_assets/assets";
import NewsLetterBox from "../../components/shop/NewsLetterBox";
import Title from "../../components/shop/Title";

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <div className="text-2xl md:text-4xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <div>
          <img
            src={assets.about_img}
            className="w-full md:max-w-[450px]"
            alt="About Us"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to our TrendHive! We are passionate about bringing you the best
            products and services to meet your needs. With years of experience
            and a commitment to excellence, we strive to make every interaction
            meaningful.
          </p>
          <p>
            Our team works tirelessly to ensure you receive quality products and
            exceptional service, because your satisfaction is our top priority.
          </p>
          <b className="text-gray-800">OUR MISSION</b>
          <p>
            Our mission is to create a seamless and enjoyable shopping
            experience. We aim to provide reliable products, excellent customer
            care, and a platform where every customer feels valued.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className=" text-2xl md:text-4xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We carefully curate our products to meet the highest standards of
            quality, ensuring you always receive the best.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shop with ease and confidence. Our platform is designed for a smooth
            and hassle-free experience from start to finish.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our friendly support team is here to assist you at every step,
            ensuring your journey with us is nothing short of amazing.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
