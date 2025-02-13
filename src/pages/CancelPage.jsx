import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLastSub } from "../services/all_api";

const CancelPage = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/"); // Redirect to the homepage
  };
  const abc=async()=>{

      await deleteLastSub() 
  }
useEffect(() => {
    abc()
}, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Subscription Cancelled
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We're sorry to see you go! Your subscription has been cancelled. If this
        was a mistake, you can subscribe again anytime.
      </p>
      <button
        onClick={handleNavigateHome}
        className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default CancelPage;
