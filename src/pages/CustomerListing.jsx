
import React, { useEffect, useState } from "react";
import { getMessCustomers } from "../services/all_api";

function CustomerListing() {
  const [customersList, setCustomersList] = useState([]);
  // const [subscriptions, setSubscriptions] = useState([]);
  const messId = sessionStorage.getItem("messId");
  const fetchMessCustomers=async()=>{
    const result=await getMessCustomers({messId})
    console.log(result.data);
    // setSubscriptions(result.data)
   const  subscriptions=result.data
    
    const updatedSubscriptions =await  subscriptions.map((subscription) => ({
      ...subscription,
      remainingDays: calculateRemainingDays(subscription.endingDate),
      userName: subscription.username, // Simulated username
      phoneNumber: subscription.phone, // Placeholder phone number
      lastSubscriptionDate: subscription.startingDate,
      currentUser: calculateRemainingDays(subscription.endingDate) > 0,
    }));

    setCustomersList(updatedSubscriptions);
    console.log("customersList=>",updatedSubscriptions);

  }
  const calculateRemainingDays = (endingDate) => {
    const today = new Date();
    const endDate = new Date(endingDate);
    const difference = endDate - today;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24)); 
    return days > 0 ? days : 0; 
  };

  useEffect(() => {
    fetchMessCustomers()    
  }, [messId]);

  return (
    <>
      <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 max-sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Phone Number</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  Last Subscription Date
                </th>
                <th className="py-2 px-4 border-b text-center">Current Status</th>
                <th className="py-2 px-4 border-b text-left">Remaining Days</th>
              </tr>
            </thead>
            <tbody>
              {customersList.map((customer, index) => (
                <tr className="text-gray-700" key={index}>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b">{customer.userName}</td>
                  <td className="py-2 px-4 border-b">{customer.phoneNumber}</td>
                  <td className="py-2 px-4 border-b">{customer.email}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {new Date(customer.lastSubscriptionDate).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {customer.currentUser ? (
                      <p className="bg-green-100 text-green-600 px-2 py-1 rounded">
                        Active
                      </p>
                    ) : (
                      <p className="bg-red-100 text-red-600 px-2 py-1 rounded">
                        Inactive
                      </p>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {customer.remainingDays>0?<p>{customer.remainingDays}Days</p>:<p className="bg-red-100 text-red-600 px-2 py-1 rounded text-center">Ended</p>} 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomerListing;
