import { useEffect } from "react"
import BestSeller from "../../components/shop/BestSeller"
import Hero from "../../components/shop/Hero"
import LatestCollection from "../../components/shop/LatestCollection"
// import Navbar from "../../components/shop/Navbar"
import NewsLetterBox from "../../components/shop/NewsLetterBox"
import OurPolicy from "../../components/shop/OurPolicy"
import { useAuth } from "../../auth/AuthToken"

const Home = () => {
  const {getProductsData}=useAuth();
  useEffect(() => {
    getProductsData()
  }, [])
  
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home
