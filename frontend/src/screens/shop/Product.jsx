import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthToken";
import { useEffect, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import RelatedProducts from "../../components/shop/RelatedProducts";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart ,localBaseUrl,user} = useAuth();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const navigate=useNavigate();
  const isLoggin = user?.isLoggin;
  

  // Fetch product data from the products array
  useEffect(() => {
    if (products) {
      const selectedProduct = products.find((item) => item._id === productId);
      if (selectedProduct) {
        setProductData(selectedProduct);
        setImage(selectedProduct.images?.[0]); 
        setSize(selectedProduct.sizes?.[0])// Default to the first image
      }
    }
  }, [productId, products]);

  const handleAddToCart=(id,size)=>{
    if(isLoggin){
    addToCart(id,size)
    }
    else{
      navigate('/login')
    }
  }
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-3 sm:gap-5 overflow-auto sm:overflow-y-auto sm:w-[9%]">
          {productData.images.map((item, index) => (
            <img
              src={`${localBaseUrl}${item}`}
              key={index}
              alt={`Image ${index + 1}`}
              className="w-[20%] sm:w-full flex-shrink-0 cursor-pointer border border-gray-300 hover:border-blue-500"
              onClick={() => setImage(item)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <img
            src={`${localBaseUrl}${image}`}
            className="w-full h-auto rounded-sm border border-gray-300"
            alt="Main Product"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData?.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="Star Dull" className="w-3.5" />
            <p className="pl-2">(100)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData?.price} </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData?.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button key={index} className={`border py-2 px-4 bg-gray-100${item === size ? 'border border-orange-500' : ''}`} onClick={()=>setSize(item)}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={()=> handleAddToCart(productData._id,size)} className="bg-black text-white px-6 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-9 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5  flex flex-col gap-1">
            <p>100% Orignal product.</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (50)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio et nesciunt similique incidunt, doloribus saepe consectetur facere nemo omnis vero, facilis molestias, fugiat dolorum repellat dicta accusamus porro natus enim.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo officia. Temporibus harum voluptatum non sed laudantium, autem placeat nihil laboriosam sunt dignissimos facere voluptatibus amet nulla corrupti hic quae quas labore quia ex est quisquam maiores voluptates sit? Repellendus cum maiores debitis, in distinctio inventore odi t sint accusantium neque.
          </p>
        </div>
      </div>
      {/* display related products */} 
      < RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0">Loading...</div> 
  );
};

export default Product;
