import React, { useState, useEffect } from "react";
import {
  getMessData,
  updateWeeklyMenu,
  updateSubscriptionPlans,
} from "../services/all_api";
import { toast, ToastContainer } from "react-toastify";

const MenuAdd = () => {
  const [messData, setMessData] = useState({});
  const messId = sessionStorage.getItem("messId");
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMessData({ messId });
        setMessData(data);
        setWeeklyMenu(data.weeklyMenu || []);
        setSubscriptionPlans(data.subscriptionPlans || []);
      } catch (error) {
        console.error("Error fetching mess data:", error);
      }
    };
    fetchData();
  }, [messId]);

  // Handle Weekly Menu Changes
  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...weeklyMenu];
    updatedMenu[index][field] = value;
    setWeeklyMenu(updatedMenu);
  };

  // Handle Subscription Plan Changes
  const handleSubscriptionChange = (index, field, value) => {
    const updatedPlans = [...subscriptionPlans];
    updatedPlans[index][field] = value;
    setSubscriptionPlans(updatedPlans);
  };

  // Add New Subscription Plan
  const addNewPlan = () => {
    setSubscriptionPlans([
      ...subscriptionPlans,
      { name: "", price: 0, duration: "", details: "" },
    ]);
  };

  // Delete Subscription Plan
  const deleteSubscriptionPlan = (index) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      const updatedPlans = subscriptionPlans.filter((_, i) => i !== index);
      setSubscriptionPlans(updatedPlans);
    }
  };

  // Save Weekly Menu
  const saveMenu = async () => {
    try {
      const newMenu = { messId, weeklyMenu };
      await updateWeeklyMenu(newMenu);
      toast.success("Menu updated successfully!");
    } catch (error) {
      toast.error("Menu is not Updated!:");
    }
  };

  // Save Subscription Plans
  const savePlans = async () => {
    try {
      const newPlans = { messId, subscriptionPlans };
      await updateSubscriptionPlans(newPlans);
      toast.success("Subscription plans updated successfully!");
    } catch (error) {
      toast.error("Error updating subscription plans");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Weekly Menu Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Weekly Menu
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Day
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Breakfast
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Lunch
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Dinner
                </th>
              </tr>
            </thead>
            <tbody>
              {weeklyMenu.map((menu, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.day}
                  </td>
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <td key={meal} className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={menu[meal]}
                        onChange={(e) =>
                          handleMenuChange(index, meal, e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={saveMenu}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Save Weekly Menu
        </button>

        {/* Subscription Plans Section */}
        <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6 text-center">
          Edit Subscription Plans
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Plan Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price (₹)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Duration
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Details
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptionPlans.map((plan, index) => (
                <tr key={index}>
                  {["name", "price", "duration", "details"].map((field) => (
                    <td
                      key={field}
                      className="border border-gray-300 px-4 py-2"
                    >
                      <input
                        type={field === "price" ? "number" : "text"}
                        value={plan[field]}
                        onChange={(e) =>
                          handleSubscriptionChange(index, field, e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => deleteSubscriptionPlan(index)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Plan Button */}
        
<div className="btns flex flex-wrap justify-between">

        <button
          onClick={savePlans}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Save Subscription Plans
        </button>
        <button
          onClick={addNewPlan}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex items-center"
        >
           Add New Plan
        </button>
</div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MenuAdd;
