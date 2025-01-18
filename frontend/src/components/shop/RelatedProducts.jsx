import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthToken";
import Title from "./Title";
import ProductItem from "./ProductItem";

// eslint-disable-next-line react/prop-types
const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useAuth();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter((item) => subCategory === item.subCategory);
      setRelated(productCopy.slice(0, 5)); // Take the first 5 related products
    }
}, [products, category, subCategory]);
  return (
    <div className="my-20">
    <div className="text-center text-3xl py-8">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
    </div>
    {/* rendring products */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
            <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price} />
        ))}
    </div>
</div>
  );
};

export default RelatedProducts;
