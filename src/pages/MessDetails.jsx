import React, { useState, useEffect } from "react";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { server_url } from "../services/server_url";
import {
  addComment,
  getAllComment,
  getMessData,
  getUserData,
  subcriptionFunction,
} from "../services/all_api";
import { toast, ToastContainer } from "react-toastify";
subcriptionFunction;
const MessDetails = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [loggedUserData, setLoggedUserData] = useState({});

  const [messData, setMessData] = useState(null);
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchMessData = async () => {
    try {
      const result = await getMessData({ messId: id });
      setMessData(result.data);
      fetchAllComments();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchLoggedUserData = async () => {
    try {
      const result = await getUserData({ userId });
      setLoggedUserData(result.data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const addNewComment = async (messId) => {
    const reqBody = new FormData();
    reqBody.append("name", loggedUserData.name);
    reqBody.append("userId", loggedUserData._id);
    reqBody.append("profilePicture", loggedUserData.profilePicture);
    reqBody.append("messId", messId);
    reqBody.append("comment", comment);
    console.log("reqBody", reqBody);
    try {
      const result = await addComment(reqBody);
      if (result.status == 200) {
        toast.success(result.data);
        setComment("");
      } else {
        toast.warn("Comment Not Added");
      }
    } catch (error) {
      console.log(error);
    }
    fetchAllComments();
  };

  const fetchAllComments = async () => {
    const messId = messData._id;
    const result = await getAllComment({ messId });
    if (result.status == 200) {
      setAllComments(result.data);
    } else {
      console.log(result);
    }
  };
  useEffect(() => {
    // setMessId(id);
    fetchLoggedUserData();
    fetchMessData();
    fetchAllComments();
  }, [messData]);

  const handleSubscribe = async (plan) => {
    if (loggedUserData.currentPlan) {

      toast.error("Already have a subscription plan... ");
    } else {
      const { name, details, price, duration } = plan;
      const messId = id;
      const messName = messData.messName;
      const messImage = messData.messImage;
      const userId = sessionStorage.getItem("userId");
      let username = loggedUserData.name;
      let email = loggedUserData.email;
      let phone = loggedUserData.phone;
      const reqBody = {
        name,
        details,
        price,
        duration,
        messName,
        messImage,
        messId,
        userId,
        username,
        email,
        phone,
      };
      console.log(reqBody);
      const result = await subcriptionFunction(reqBody);
      const { session_url } = result.data;
      if (result.status == 200) {
        window.location.replace(session_url);
      } else {
        toast.error(result.response.data);
      }
    }
  };

  if (!messData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        {/* <div className="flex flex-wrap items-center bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white"> */}
        <div className="flex flex-wrap items-center bg-gray-900 p-6 text-white">
          <img
            src={`${server_url}/uploads/${messData.messImage}`}
            alt="Mess"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="ml-6 mt-4 md:mt-0">
            <h2 className="text-3xl font-extrabold">{messData.messName}</h2>
            <p className="mt-2">{messData.messDescription}</p>
            <p className="mt-2">
              📍 {messData.address}, {messData.location}
            </p>
            <p className="mt-2">
              📞 {messData.phoneNumber} | ✉️ {messData.emailAddress}
            </p>
            <p className="mt-2">
              🚚 Home Delivery:{" "}
              <span
                className={
                  messData.homeDelivery ? "text-green-400" : "text-red-400"
                }
              >
                {messData.homeDelivery ? "Available" : "Not Available"}
              </span>
            </p>
          </div>
        </div>

        {/* Weekly Menu */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Weekly Menu
          </h3>
          <table className="w-full text-left table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Day</th>
                <th className="border border-gray-300 px-4 py-2">Breakfast</th>
                <th className="border border-gray-300 px-4 py-2">Lunch</th>
                <th className="border border-gray-300 px-4 py-2">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {messData.weeklyMenu.map((menu, index) => (
                <tr
                  key={index}
                  className="text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    {menu.day}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.breakfast}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.lunch}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.dinner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subscription Plans */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Subscription Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messData.subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg shadow-md bg-white text-center transition-transform transform hover:scale-105"
              >
                <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
                <p className="text-gray-600 mt-2">{plan.details}</p>
                <p className="text-xl font-semibold text-blue-600 mt-4">
                  💰 ₹{plan.price}
                </p>
                <p className="text-gray-500">{plan.duration}</p>
                <button
                  onClick={() => handleSubscribe(plan)}
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment and View Comments */}
        <div className="min-h-screen  bg-gray-100 p-6">
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            {/* Post a Comment Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Post a Comment
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  // src={`${server_url}/uploads/${loggedUserData.profilePicture}`}
                  src={`${server_url}/uploads/${loggedUserData.profilePicture}`}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => addNewComment(messData._id)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Post Comment
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Comments
              </h2>
              {allComments.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={`${server_url}/uploads/${comment.profilePicture}`}
                    alt={comment.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {comment.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* =========== */}
      </div>
            <ToastContainer />
      
    </div>
  );
};

export default MessDetails;
