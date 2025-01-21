import { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import CartTotal from "../../components/shop/CartTotal";
import Title from "../../components/shop/Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import baseURL from "../../baseurl";
import { useAuth } from "../../auth/AuthToken";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, getCartAmount, token, delivery_fee, products } = useAuth();
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    province: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // Place order function
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return;

    // Validate form data
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.street ||
      !formData.city ||
      !formData.province ||
      !formData.zipcode ||
      !formData.country ||
      !formData.phone
    ) {
      toast.error("Please fill in all the required fields!");
      return;
    }

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!/^\d+$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number!");
      return;
    }

    // Check if cart is empty
    if (!Object.keys(cartItems).length) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      setIsLoading(true);

      const address = { ...formData };
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        items: orderItems,
        amount: getCartAmount() + (delivery_fee || 0),
        address,
      };

      
      switch (method) {
        case "cod": {
          const response = await axios.post(`${baseURL}/api/order/cod`, orderData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 201) {
            toast.success(response.data.message);
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Failed to place order using COD.");
          }
          break;
        }

        case "stripe": {
          try {
              const response = await axios.post(`${baseURL}/api/order/stripe`, orderData, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              if (response.status === 200) {
                setCartItems({});
                  const { url } = response.data;
                  window.location.replace(url);
              } else {
                  console.log("Stripe error message:", response.data.message);
                  toast.error(response.data.message || "Failed to place order using Stripe.");
              }
          } catch (error) {
              console.error("Error during Stripe order:", error.response || error);
              toast.error(error.response?.data?.message || "Failed to place order using Stripe.");
          }
          break;
      }

        default:
          toast.error("Invalid payment method selected.");
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-15 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-600" : ""}`}
              ></p>
              <img className="h-5 mx-auto" src={assets.stripe_logo} alt="Stripe logo" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-600" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-2">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm"
              disabled={isLoading}
            >
              {isLoading ? "PLACING ORDER..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
