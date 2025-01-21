import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import baseURL from "../../baseurl";

const StripeVerify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            const success = searchParams.get("success");
            const sessionId = searchParams.get("sessionId");
            const orderId = searchParams.get("orderId");
            console.log("Query parameters:", {
                success: searchParams.get("success"),
                sessionId: searchParams.get("sessionId"),
                orderId: searchParams.get("orderId"),
            });

            if (success === "true" && sessionId && orderId) {
                try {
                    // Call your backend to confirm the payment and update the order
                    const response = await axios.post(`${baseURL}/api/order/confirm`, {
                        sessionId,
                        orderId,
                    });

                    if (response.status === 200) {
                        toast.success(response.data.message);
                        navigate("/orders"); // Redirect to the orders page
                    } else {
                        toast.error("Failed to confirm the payment.");
                    }
                } catch (error) {
                    console.error("Error confirming payment:", error.message);
                    toast.error("An error occurred while confirming payment.");
                }
            } else {
                toast.error("Payment was not successful.");
                navigate("/cart"); // Redirect back to the cart
            }
        };

        verifyPayment();
    }, [searchParams, navigate]);

    return <h1>Verifying your payment...</h1>;
};

export default StripeVerify;
