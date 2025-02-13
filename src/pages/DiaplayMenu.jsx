import React, { useEffect, useState } from "react";
import { getMessData } from "../services/all_api";

const DisplayMenu = () => {
  const [messData, setMessData] = useState({});
  const messId = sessionStorage.getItem("messId");

  const fetchMessData = async () => {
    try {
      const result = await getMessData({ messId });
      setMessData(result.data);
      console.log(result.data);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchMessData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mess Menu
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-300 px-4 py-2 text-left">Day</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Breakfast</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Lunch</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {messData.weeklyMenu &&
                messData.weeklyMenu.map((menu, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-700">
                      {menu.day}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{menu.breakfast}</td>
                    <td className="border border-gray-300 px-4 py-2">{menu.lunch}</td>
                    <td className="border border-gray-300 px-4 py-2">{menu.dinner}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="  flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{messData.messName} Subscription Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {messData.subscriptionPlans &&messData.subscriptionPlans.map((plan) => (
          <div key={plan._id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700">{plan.name}</h2>
            <p className="text-gray-500">{plan.duration}</p>
            <p className="mt-4 text-gray-600">{plan.details}</p>
            <div className="mt-4 text-xl font-bold text-gray-800">₹{plan.price}</div>
           
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DisplayMenu;
