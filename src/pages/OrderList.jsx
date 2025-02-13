import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} from "../services/all_api"; // Assuming you have an API to update the order status
import { toast, ToastContainer } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { server_url } from "../services/server_url";
function OrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchAllOrders = async () => {
    const result = await getAllOrders();
    setOrders(result.data);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update the status in the backend
      const reqBody = {
        orderId,
        newStatus,
      };
      const result = await updateOrderStatus(reqBody);
      if (result.status == 200) {
        toast.success(result.data);
      } else {
        toast.warn(result.data);
      }
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, deliveryStatus: newStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.warning("Could not update the order status. Please try again.");
    }
  };
  const showOrderDetails = async (orderId) => {
    console.log(orderId);
    handleShow();
    const result = await getOrderDetails(orderId);
    setSelectedOrder(result.data[0]);
    console.log("ORDER DETAILS=>", result.data[0]);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className=" mx-auto my-8 ">
      <h1 className="text-2xl font-bold text-center mb-5">Order List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              {/* <th className="border border-gray-300 px-4 py-2">Address</th> */}
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">
                Payment Method
              </th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">View</th>
              <th className="border border-gray-300 px-4 py-2">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className="odd:bg-gray-100 even:bg-white">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.phone}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">
                    {order.address}
                  </td> */}
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.paymentMethod}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${order.totalPrice}
                  </td>
                  <td className="text-center">
                    <i
                      onClick={() => showOrderDetails(order._id)}
                      class="fa-solid fa-eye  text-gray-900 cursor-pointer"
                    ></i>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    <select
                      className={`w-full p-2 rounded font-semibold focus:outline-none ${
                        order.deliveryStatus === "Pending"
                          ? "text-red-500"
                          : order.deliveryStatus === "Out for Delivery"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                      value={order.deliveryStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending" className="text-red-500">
                        Pending
                      </option>
                      <option value="Out for Delivery" className="text-red-500">
                        Out for Delivery
                      </option>
                      <option value="Delivered" className="text-green-500">
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-red-500">
                  No orders found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedOrder.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Phone:</strong> {selectedOrder.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{selectedOrder.totalPrice}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.orderDate).toLocaleString()}
            </p>
            <p>
              <strong>Delivery Status:</strong>{selectedOrder.deliveryStatus}
            </p>
           
            <h3 className="font-bold text-gray-800 mt-4 mb-2">
              Ordered Items:
            </h3>
            <ul className="list-none text-gray-700">
              {selectedOrder.orderItems.map((item) => (
                
                <li
                  key={item.foodId}
                  className="flex items-center gap-4 border-b py-2"
                >
                  
                  <div
                    className="w-16 h-16 rounded-full border-3 border-gray-400"
                    style={{
                      backgroundImage: `url(${server_url}/uploads/${item.foodImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div>
                    <p className="font-semibold">{item.foodName}</p>
                    <p className="text-gray-600">
                      ₹{item.price} x {item.qty}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}

export default OrderList;
