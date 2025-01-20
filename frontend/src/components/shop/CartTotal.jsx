import { useState } from "react";
import { useAuth } from "../../auth/AuthToken";
import Title from "./Title";
import axios from "axios";
import baseURL from "../../baseurl";
import { toast } from "react-toastify";

const CartTotal = () => {
    const { currency, getCartAmount, delivery_fee, token } = useAuth();

    const cartAmount = getCartAmount(); // Store the cart total
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0); // Store the discount amount
    const [error, setError] = useState(""); // For showing error messages

    const handleCouponSubmit = async () => {
        if (!coupon) {
            setError("Please enter a coupon code.");
            return;
        }

        // Prevent applying the same coupon multiple times
        if (discount > 0) {
            setError("That coupon has already been applied.");
            return;
        }

        setError(""); // Clear any previous error

        try {
            const response = await axios.post(`${baseURL}/api/subscriber/verify`, { coupon }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setDiscount(cartAmount * 0.2); // Apply 20% discount
                setCoupon(""); // Clear the coupon field
                toast.success(response.data.message)
            } else {
                setError(response.data.message || "Invalid coupon code.");
                setDiscount(0); // Reset discount on failure
            }
        } catch (error) {
            console.error("Error verifying coupon:", error);
            setError("Failed to verify coupon. Please try again.");
        }
    };


    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={"TOTAL"} text2={"AMOUNT"} />
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{cartAmount}.00</p>
                </div>
                {/* Coupon Input Field */}
                <div className="flex justify-end items-center gap-2 mt-3">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="border p-2 w-1/5 rounded"
                    />
                    <button
                        onClick={handleCouponSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Apply
                    </button>
                </div>


                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="flex justify-between">
                    <p>After Discount</p>
                    <p>{currency}{cartAmount - discount}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping fee</p>
                    <p>{currency}{delivery_fee}.00</p>
                </div>
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>
                        {currency}
                        {cartAmount === 0
                            ? 0
                            : (cartAmount - discount + delivery_fee)}
                    </b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
