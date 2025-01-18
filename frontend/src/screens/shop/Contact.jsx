import { assets } from "../../assets/frontend_assets/assets"
import NewsLetterBox from "../../components/shop/NewsLetterBox"
import Title from "../../components/shop/Title"


const Contact = () => {
  return (
    <div>
       <div className="text-2xl text-center pt-8 border-t ">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28">
        <img src={assets.contact_img} className="w-full md:max-w-[480px]" alt="" />
        <div className="flex flex-col justify-center gap-6 items-start"> 
        <p className="font-semibold text-xl text-gray-600">Our Store</p>
        <p className="text-gray-500">06005 multan <br />Punjab, Pakistan</p>
        <p className="text-gray-500">Tel: +92 3076330000 <br />Email: admin@trendhive.com</p>
        <p className="text-xl font-semibold text-gray-600">Careers at TrendHive</p>
        <p className="text-gray-500">Learn more about our teams and job openings.</p>
        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact
