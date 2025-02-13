import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../services/all_api";
import { server_url } from "../services/server_url";

function ViewOrders() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserOrders = async () => {
    try {
      const result = await getUserOrders({ userId });
      setOrders(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>
      {orders?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                Order ID: <span className="text-blue-600">{order._id}</span>
              </h2>
              <p className="text-gray-600">
                <strong>Name:</strong> {order.name}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {order.phone}
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-gray-600">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Delivery Status:</strong>
                <span
                  className={`${
                    order.deliveryStatus === "Delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.deliveryStatus}
                </span>
              </p>
              <p className="text-gray-600">
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>
              <h3 className="font-bold text-gray-800 mt-4 mb-2">
                Ordered Items:
              </h3>
              <ul className="list-none text-gray-700">
                {order.orderItems.map((item) => (
                  <li
                    key={item.foodId}
                    className="flex items-center gap-4 border-b py-2"
                  >
                    <img
                      src={`${server_url}/uploads/${item.foodImage}`}
                      alt={item.foodName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.foodName}</p>
                      <p className="text-gray-600">
                        ₹{item.price} x {item.qty}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600">
                <strong>Total Price:</strong><span className="text-teal-500 text-2xl fw-bold">
                  
                  ₹{order.totalPrice}
                  </span> 
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg ">No orders found.</p>
      )}
    </div>
  );
}

export default ViewOrders;

