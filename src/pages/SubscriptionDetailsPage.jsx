import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server_url } from "../services/server_url";
import { fetchSubDetails, sendRequest } from "../services/all_api";
import { toast, ToastContainer } from "react-toastify";

const SubDetails = () => {
  const { id } = useParams(); // Get subscription ID from URL
  const [subscription, setSubscription] = useState(null);
  const [extensionDays, setExtensionDays] = useState("");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState(1);
  const [reload, setReload] = useState(false); // Track re-fetch state

  // Fetch subscription details
  const getData = async (id) => {
    try {
      const result = await fetchSubDetails(id);
      setSubscription(result.data[0]);

      // Calculate remaining days
      const calculateDuration = (end) => {
        const startDate = new Date();
        const endDate = new Date(end);
        const daysDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        return Math.round(daysDifference);
      };

      setDuration(calculateDuration(result.data[0]?.endingDate));
    } catch (error) {
      console.error("Error fetching subscription details:", error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id, reload]); // Re-fetch data when `reload` changes

  // Handle submission of the extension request
  const handleExtendPlan = async () => {
    if (!extensionDays || !reason) {
      toast.info("Please fill in all fields!");
      return;
    }

    const extensionRequest = {
      subscriptionId: id,
      extensionDays: parseInt(extensionDays),
      reason: reason,
    };

    try {
      const result = await sendRequest(extensionRequest);
      if (result.status === 200) {
        toast.success("Request submitted successfully!");
        setReload((prev) => !prev); // Toggle reload state to trigger re-fetch
        setExtensionDays(""); // Reset input fields
        setReason("");
      } else {
        toast.error("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting extension request:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Subscription Details
      </h1>

      {subscription ? (
        <div className="space-y-2">
          {/* Image */}
          <img
            src={`${server_url}/uploads/${subscription.messImage}`}
            alt={subscription.messName}
            className="w-full h-60 object-cover rounded-lg mt-3"
          />
          <p><strong>Mess Name:</strong> {subscription.messName}</p>
          <p><strong>Plan:</strong> {subscription.details}</p>
          <p><strong>Duration:</strong> {subscription.duration}</p>
          <p><strong>Start Date:</strong> {new Date(subscription.startingDate).toDateString()}</p>
          <p><strong>End Date:</strong> {new Date(subscription.endingDate).toDateString()}</p>
          <p><strong>Price:</strong> ₹{subscription.price}</p>
          <p><strong>Contact:</strong> {subscription.phone}</p>
          <p><strong>Email:</strong> {subscription.email}</p>
          <div className="fw-bolder">
            Current Plan Ends in 
            <span className="fw-medium text-red-500 bg-gray-300 mx-2 px-3 rounded-lg text-2xl">
              {duration}
            </span> days
          </div>

          {/* Extension Form */}
          {subscription?.requestForExtestion?.some(req => req.status === "pending") ? (
            <p className="bg-green-100 text-green-600 font-medium rounded-lg p-3">
              "Your request to extend the food subscription by 
              {subscription.requestForExtestion.find(req => req.status === "pending")?.numberOfDays} days 
              has been submitted with the reason: 
              '{subscription.requestForExtestion.find(req => req.status === "pending")?.reason}'."
            </p>
          ) : (
            <div className="mt-6 p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Extend Your Plan</h2>

              <label className="block text-sm font-medium text-gray-600">
                Number of Days:
              </label>
              <input
                type="number"
                value={extensionDays}
                onChange={(e) => setExtensionDays(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter number of days"
              />

              <label className="block text-sm font-medium text-gray-600 mt-3">
                Reason for Extension:
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your reason"
              ></textarea>

              <button
                onClick={handleExtendPlan}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit Extension Request
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default SubDetails;
