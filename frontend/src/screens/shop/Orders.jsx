import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthToken"
import Title from "../../components/shop/Title";
import baseURL from "../../baseurl";
import axios from "axios";
import { toast } from "react-toastify";


const Orders = () => {
    const { token, currency, localBaseUrl } = useAuth();
    const [orderData, setOrderData] = useState([])

    const getUserOrders = async () => {
        try {
            if (!token) return;
            const response = await axios.get(`${baseURL}/api/userorders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                // console.log(allOrdersItem); 
                let allOrdersItem=[];
                response.data.orders.map((order)=>{
                    order.items.map((item=>{
                        item['status']=order.status
                        item['payment']=order.payment
                        item['paymentMethod']=order.paymentMethod
                        item['date']=order.date
                        allOrdersItem.push(item)
                    }))
                })
                setOrderData(allOrdersItem);
            } else {
                toast.error(response.data.message || "Failed to fetch user orders.");
            }
        } catch (error) {
            console.error("Error fetching user orders:", error);
            toast.error("An error occurred. Please try again.");
        }
    }
    useEffect(() => {
        getUserOrders();
    }, [token])
    return (
        <div className="border-t pt-16">
            <div className="text-2xl">
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>
            <div>
                {
                    orderData.map((item, index) => (
                        <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-6 text-sm">
                                <img className="w-16 sm:w-20" src={`${localBaseUrl}${item.images?.[0]}`} />
                                <div>
                                    <p className="text-base text-gray-700 font-medium">{item?.name || "Unknown Product"}</p>
                                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                                        <p >{currency}{item?.price}</p>
                                        <p>{`Quantity:${item.quantity}`}</p>
                                        <p>{`Size: ${item.size}`}</p>
                                    </div>
                                    <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                                    <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-between ">
                                <div className="flex items-center gap-2">
                                    <p className="min-w-2 h-2 rounded-full bg-green-600"></p>
                                    <p className="text-sm sm:text-base">{item.status}</p>
                                </div>
                                <div>
                                    <button onClick={getUserOrders} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
