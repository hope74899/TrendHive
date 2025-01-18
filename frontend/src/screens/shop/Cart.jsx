import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthToken";
import Title from "../../components/shop/Title";
import { assets } from "../../assets/frontend_assets/assets";
import CartTotal from "../../components/shop/CartTotal";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, deleteItem, localBaseUrl } = useAuth();
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const [productId, sizes] of Object.entries(cartItems)) {
        for (const [size, quantity] of Object.entries(sizes)) {
          if (quantity > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: quantity,
            });
          }
        }
      }
      setCartData(tempData); // Update the state
    }
  }, [cartItems, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Section */}
      <Title text1={'YOUR'} text2={'CART'} />

      {/* Cart Content */}
      {cartData.length > 0 ? (
        <div className="border-t">
          {/* Cart Header */}
          <div className="grid grid-cols-3 md:grid-cols-6 text-sm text-gray-700 py-4 uppercase font-medium">
            <div className="col-span-3">Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          {/* Cart Items */}
          {cartData.map((item, index) => {
            const product = products.find((product) => product._id === item._id);
            return (
              <div
                key={index}
                className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center py-6 border-b"
              >
                {/* Product Image and Details */}
                <div className="col-span-3 flex items-center gap-4">
                  <img
                    src={`${localBaseUrl}${product?.images?.[0]}`}
                    alt={product?.name || "Product"}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg text-gray-700 font-medium">{product?.name || "Unknown Product"}</p>
                    <p className="text-gray-500 text-sm ">{currency}{product?.price}</p>
                    <p className="text-gray-500 text-sm ">Color: {product?.color || "N/A"}</p>
                    <p className="text-gray-500 text-sm ">Size: {item.size}</p>
                  </div>
                </div>
                {/* Quantity Controls */}
                <div className="flex justify-center items-center">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-1 border-r hover:bg-gray-200"
                      onClick={() => updateQuantity(item._id, item.size, -1)} // Decrease by 1
                    >
                      -
                    </button>
                    <span className="px-4 text-gray-700">{item.quantity}</span>
                    <button
                      className="px-3 py-1 border-l hover:bg-gray-200"
                      onClick={() => updateQuantity(item._id, item.size, 1)} // Increase by 1
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Icon */}
                  <img
                    onClick={() => deleteItem(item._id, item.size)} // Call deleteItem to remove the product
                    className="w-4 ml-4 sm:w-5 cursor-pointer"
                    alt="Delete icon"
                    src={assets.bin_icon}
                  />
                </div>


                {/* Total Price */}
                <div className=" text-right text-gray-700 text-sm font-medium">
                  {currency} {product ? product.price * item.quantity : "N/A"}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      )}

      {/* Continue Shopping */}
      <div className="mt-8 text-right">
        <Link to="/collection" className="text-blue-500 hover:underline text-sm font-medium">
          Continue shopping
        </Link>
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => { navigate('/place-order') }} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>

          </div>
        </div>
      </div>
    </div>

  );
};

export default Cart;
