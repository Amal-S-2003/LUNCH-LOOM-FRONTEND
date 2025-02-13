import React, { useEffect, useState } from "react";
import {
  getAllFoods,
  getAllMesses,
  getAllOrders,
  getAllUsers,
} from "../services/all_api";

function AdminDashBoard() {
  const [userCount, setUserCount] = useState(0);
  const [messCount, setMessCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredRevenue, setDeliveredRevenue] = useState(0);
  const [pendingRevenue, setPendingRevenue] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const [allOrders, setAllOrders] = useState([]);

  const fetchCounts = async () => {
    const uc = await getAllUsers();
    setUserCount(uc.data.length);
    const oc = await getAllOrders();
    setOrderCount(oc.data.length);
    setAllOrders(oc.data);
    console.log("allOrders-->", allOrders);

    const mc = await getAllMesses();
    setMessCount(mc.data.length);
    const fc = await getAllFoods();
    setFoodCount(fc.data.length);
    const r = await getMonthlyRevenueAndOrders(oc.data);
  };

  const getMonthlyRevenueAndOrders = async (orders) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based (Jan = 0, Feb = 1, etc.)
    const currentYear = currentDate.getFullYear();

    // Filter orders for the current month and year
    const monthlyOrders = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    });

    // Calculate revenue and Orders
    setTotalRevenue(
      monthlyOrders.reduce((sum, order) => sum + order.totalPrice, 0)
    );
    setTotalOrders(monthlyOrders.length);

    setDeliveredRevenue(
      monthlyOrders
        .filter((order) => order.deliveryStatus === "Delivered")
        .reduce((sum, order) => sum + order.totalPrice, 0)
    );

    setPendingRevenue(
      monthlyOrders
        .filter((order) => order.deliveryStatus === "Pending")
        .reduce((sum, order) => sum + order.totalPrice, 0)
    );

    setCompletedOrders(
      monthlyOrders.filter((order) => order.deliveryStatus === "Delivered")
        .length
    );
    setPendingOrders(
      monthlyOrders.filter((order) => order.deliveryStatus === "Pending").length
    );
  };
  useEffect(() => {
    fetchCounts();
  }, []);
  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: userCount },
          { label: "Total Messes", value: messCount },
          { label: "Total Foods", value: foodCount },
          { label: "Total Orders", value: orderCount },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center font-bold"
          >
            <h2 className="text-gray-600 text-lg">{item.label}</h2>
            <h1 className="text-4xl text-teal-800 mt-2">{item.value}</h1>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* Revenue & Orders Section */}
      <section>
        <h1 className="text-center text-4xl text-teal-700 font-bold underline mb-6">
          {month} Revenue & Orders
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl shadow-lg  bg-gray-300">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-2xl font-bold">₹{totalRevenue}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg  bg-gray-300">
            <h3 className="text-lg font-semibold">Delivered Revenue</h3>
            <p className="text-2xl font-bold">₹{deliveredRevenue}</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg  bg-gray-300">
            <h3 className="text-lg font-semibold">Pending Revenue</h3>
            <p className="text-2xl font-bold">₹{pendingRevenue}</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg  bg-gray-300">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gray-300">
            <h3 className="text-lg font-semibold">Completed Orders</h3>
            <p className="text-2xl font-bold">{completedOrders}</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gray-300">
            <h3 className="text-lg font-semibold">Pending Orders</h3>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashBoard;
