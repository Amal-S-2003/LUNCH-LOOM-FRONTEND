import React, { useEffect, useState } from "react";
import { approveOrRejectRequest,  getMessCustomers } from "../services/all_api";
import { toast, ToastContainer } from "react-toastify";

const Requests = () => {
  const [subscriptions, setSubscriptions] = useState();
  const [totalPendingRequests,setTotalPendingRequests] = useState(0);
  const messId = sessionStorage.getItem("messId");

  const onApprove = (id) => {
    const reqBody={
      id,
      status:"approved"
    }
    const result=approveOrRejectRequest(reqBody)
    console.log(result);
    toast.success("Request Approved")
  };
  const onReject = (id) => {
    const reqBody={
      id,
      status:"rejected"
    }
    const result=approveOrRejectRequest(reqBody)
    toast.error("Request rejected")
    console.log(result);
  };
  const fetchRequests = async () => {
    const result = await getMessCustomers({ messId });
    setSubscriptions(result.data);
    setCount(result.data)
    
  };
  const setCount=(subscriptions)=>{
    const tpr = subscriptions.reduce((count, subscription) => {
      console.log(subscription);
      
      return count + subscription.requestForExtestion.filter(req => req.status === "pending").length;
    }, 0);
    setTotalPendingRequests(tpr)
  }
  useEffect(() => {
    fetchRequests();
  }, [messId,totalPendingRequests]);
  return (
    <div className="overflow-x-auto p-5">
      {totalPendingRequests>0?

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="p-3 border">Username</th>
            <th className="p-3 border">Number of Days</th>
            <th className="p-3 border">Reason</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions?.map((subscription) =>
            subscription.requestForExtestion
              .filter((req) => req.status === "pending") // Only show pending requests
              .map((request) => (
                <tr key={request._id} className="border hover:bg-gray-50">
                  <td className="p-3 border">{subscription.username}</td>
                  <td className="p-3 border text-center">
                    {request.numberOfDays}
                  </td>
                  <td className="p-3 border">{request.reason}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => onApprove(request._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(request._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      :
      <p className="text-center text-green-500 bg-green-100 p-3 rounded-lg font-medium text-2xl">No request is pending...</p>
    }
    <ToastContainer/>
    </div>
  );
};

export default Requests;
