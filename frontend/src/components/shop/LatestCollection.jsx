import { useEffect, useState } from "react"
import { useAuth } from "../../auth/AuthToken"
import Title from "./Title"
import ProductItem from "./ProductItem"

const LatestCollection = () => {
    const { products } = useAuth()
    const [latestProducts, setLatestProducts] = useState([])
    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])
    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, iusto.</p>
            </div>
            {/* rendring products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    )
}

export default LatestCollection
