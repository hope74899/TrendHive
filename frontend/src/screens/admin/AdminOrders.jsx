import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthToken";
import axios from "axios";
import baseURL from "../../baseurl";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";


const AdminOrders = () => {

  const { token, currency } = useAuth();
  const [orders, setOrders] = useState([])

  const getAllOrders = async () => {
    try {
      if (!token) return;
      const response = await axios.get(`${baseURL}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message || "Failed to fetch user orders.");
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      toast.error("An error occurred. Please try again.");
    }
  }
  useEffect(() => {
    getAllOrders();
  }, [token])

  const updateStatus = async (orderId, status) => {
    try {
      if (!token) return;
      const response = await axios.put(`${baseURL}/api/order/status`, { orderId, status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
  
        // Update the local state for immediate feedback
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update order status.");
      }
    } catch (error) {
      console.error("Error occurred while updating order status", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <div>
      <h1 className="text-xl mb-2">Order Page</h1>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg shadow-sm bg-white">
            {/* Parcel Icon */}
            <div className="flex justify-center items-center">
              <img src={assets.parcel_icon} alt="Parcel Icon" className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            {/* Order Items and Address */}
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-800">
                    {item.name} x {item.quantity} <span>({item.size})</span>
                  </p>
                ))}
              </div>
              <p className="font-semibold mt-3">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <p className="text-gray-600">{order.address.street}</p>
              <p className="text-gray-600">{`${order.address.city}, ${order.address.province}, ${order.address.country}`}</p>
              <p className="text-gray-600 mt-1">{order.address.phone}</p>
            </div>

            {/* Order Details */}
            <div className="space-y-1">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toDateString()}</p>
            </div>
            <p className="text-lg font-bold">{currency}{order.amount}</p>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="border border-gray-300 rounded px-2 text-sm"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminOrders
