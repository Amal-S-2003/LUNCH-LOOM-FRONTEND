import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { verifyStripe } from "../services/all_api";

function PaymentSuccess() {
  const {userId}=useContext(UserContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const subscriptionId = searchParams.get("subscriptionId");
  console.log("userId:", userId);
  console.log("Success:", success);
  console.log("Subscription ID:", subscriptionId);

  const stripeCheck=async()=>{
    try {
      
      const result=await verifyStripe({userId,success,subscriptionId})
      console.log(result);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    
    stripeCheck()
  }, [userId]);
  return  <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
    {success=='true' ? (
      <div>
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        <button
          onClick={() => window.location.href = "/"} // Example redirect
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Go to Home
        </button>
      </div>
    ) : (
      <div>
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          Unfortunately, your transaction could not be processed. Please try again later.
        </p>
        <button
          onClick={() => window.location.href = "/"} // Example redirect
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Go to Home
        </button>
      </div>
    )}
  </div>
</div>;
}

export default PaymentSuccess;
