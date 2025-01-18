import { useEffect, useState } from "react"
import { useAuth } from "../../auth/AuthToken"
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const { products } = useAuth();
    const [bestSeller, setBestSeller] = useState([])
    useEffect(() => {
        const bestproduct = products.filter((item) => item.bestSeller === true);
        setBestSeller(bestproduct.slice(0,5))
    }, [products])
    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, iusto.</p>
            </div>
            {/* rendring products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item, index) => (
                    <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    )
}

export default BestSeller
