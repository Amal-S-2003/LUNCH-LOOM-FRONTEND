import React, { useContext, useEffect, useState } from "react";
import {
  clearCurrentPlan,
  getUserData,
  getUserSubscriptions,
  updateProfile,
} from "../services/all_api";
import { server_url } from "../services/server_url";
import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

function UserProfile() {
  // const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [loggedUserData, setLoggedUserData] = useState({});
  const [currentPlan, setCurrentPlan] = useState(null);
  const [subscription, setsubScription] = useState(null);
  const [duration, setDuration] = useState(1);
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();
  const [userData, setUserData] = useState({});
  const { userId, setUserId, userLogged, setUserLogged } =
    useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchLoggedUserData = async () => {
    try {
      const result = await getUserData({ userId });
      console.log(result);

      setLoggedUserData(result.data[0]);
      setCurrentPlan(result?.data[0]?.currentPlan);
      console.log("currentPlan,currentPlan", currentPlan);

      setUserData({
        userId: userId,
        name: loggedUserData.name,
        email: loggedUserData.email,
        phone: loggedUserData.phone,
        address: loggedUserData.address,
        location: loggedUserData.location,
        profilePicture: "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchUserSubscriptions = async () => {
    try {
      const result = await getUserSubscriptions({ userId });
      if (result.status == 200) {
        setsubScription(result.data[0]);
        const calculateDuration = (end) => {
          const startDate = new Date();
          const endDate = new Date(end);
          const timeDifference = endDate - startDate; // Difference in milliseconds
          const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert to days
          return Math.round(daysDifference); // Round to the nearest whole number
        };
        // const { startingDate, endingDate } = subscription;
        const dur = calculateDuration(
          // result.data[0].startingDate,
          currentPlan?.endingDate
        );
        setDuration(dur);
      } else {
        setsubScription([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const navigate = useNavigate();
  const logout = async () => {
    sessionStorage.clear();
    setUserId(null);
    setUserLogged(false);
    await navigate("/");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    const reqHeader = {
      "Content-Type": "multipart/form-data",
    };
    try {
      const reqBody = new FormData();
      reqBody.append("userId", userId);
      reqBody.append("name", userData.name);
      reqBody.append("email", userData.email);
      reqBody.append("phone", userData.phone);
      reqBody.append("address", userData.address);
      reqBody.append("location", userData.location);
      reqBody.append("profilePicture", userData.profilePicture);
      const result = await updateProfile(userData, reqHeader);
      toast.success(result.data);
    } catch (err) {
      console.log(err);
    }
    console.log("Updated User Data:", userData);
    handleClose();
    fetchLoggedUserData();
  };

  useEffect(() => {
    fetchLoggedUserData();
    fetchUserSubscriptions();
    manageCurrentplan(duration);
    if (userData.profilePicture) {
      const objectUrl = URL.createObjectURL(userData.profilePicture);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [userId, userData.profilePicture, duration]);

  const manageCurrentplan = async (duration) => {
    console.log(currentPlan);

    if (currentPlan && duration <= 0) {
      console.log("currentPlan===>", currentPlan);

      const result = await clearCurrentPlan({ userId });
      console.log("duration", duration, userId);
    }
  };

  return (
    <div>
      <div className="card rounded shadow mx-40 mt-32 p-5 flex flex-col lg:flex-row">
        <div className="flex justify-center flex-col  items-center lg:w-1/3">
          <div className="image rounded-full h-40 w-40 overflow-hidden " 
          
          style={{backgroundImage:`url(${server_url}/uploads/${loggedUserData?.profilePicture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",}}>
            {/* <img
              src={`${server_url}/uploads/${loggedUserData?.profilePicture}`}
              alt={loggedUserData?.profilePicture}
            /> */}
          </div>

          <div className="details flex flex-col gap-2 text-gray-600 mt-3">
            <h1 className="text-xl fw-medium">
              <i class=" me-2  fa-solid fa-user"></i>
              {loggedUserData?.name}
            </h1>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-phone"></i>
              {loggedUserData?.phone}
            </p>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-envelope"></i>
              {loggedUserData?.email}
            </p>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-location-crosshairs"></i>
              {loggedUserData?.address}
            </p>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-location-dot"></i>
              {loggedUserData?.location}
            </p>
            <div className="btns">
              <button
                className="px-3 py-1 rounded-lg text-white fw-medium   me-3 w-32 hover:border-green-500 hover:text-green-500 bg-green-500"
                onClick={handleShow}
              >
                Edit
              </button>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-lg text-white fw-medium   me-3 w-32 hover:border-blue-500 hover:text-blue-500 bg-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <span className=" w-1 bg-gray-500"></span>
        <div className="current-plan lg:w-2/3  flex items-start flex-col gap-3   ps-5">
          {/* <div className="flex flex-col gap-2 fw-semibold text-gray-600">
            <p>Mess Name:Foody Hub</p>
            <p>Location:Kochi</p>
            <p>Price:20000/-</p>
            <h5 className="text-xl text-gray-700">
              Current Plan is Ends In{" "}
              <span className="rounded text-red-500 text-4xl mx-1">08</span>Days
            </h5>
          </div> */}
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Current Subscription Details
            </h2>
            {currentPlan ? (
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-600">
                    Mess Name:{" "}
                  </span>
                  <span className="text-gray-800">{currentPlan.messName}</span>
                </div>
                {/* <div>
                  <span className="font-semibold text-gray-600">Details: </span>
                  <span className="text-gray-800">{currentPlan.details}</span>
                </div> */}
                <div>
                  <span className="font-semibold text-gray-600">
                    Subscription Type:{" "}
                  </span>
                  <span className="text-gray-800">
                    {currentPlan.subscriptionType}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Duration:{" "}
                  </span>
                  <span className="text-gray-800">{currentPlan.duration}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Price: </span>
                  <span className="text-gray-800">₹{currentPlan.price}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Starting Date:{" "}
                  </span>
                  <span className="text-gray-800">
                    {new Date(currentPlan.startingDate).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Ending Date:{" "}
                  </span>
                  <span className="text-gray-800">
                    {new Date(currentPlan.endingDate).toLocaleString()}
                  </span>
                </div>
                {/* {duration>0? */}
                <div className="fw-bolder">
                  Current Plan Is Ends in
                  <span className="fw-medium text-red-500 bg-gray-300 mx-2 px-3 rounded-lg  text-2xl">
                    {duration}
                  </span>
                  days
                </div>
                <button
              onClick={() => navigate(`/subDetails/${currentPlan._id}`)}
              className="bg-slate-800 mt-5 rounded-lg px-5 fw-medium text-white py-2"
            >
              View Details
            </button>
              </div>
            ) : (
              <div>
                <p className="text-slate-800 text-xl font-bold ">
                  Currently have no subscriptions!!!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg bg-gray-700 text-white px-3 py-2 rounded-lg"
                >
                  Find Mess Now
                </button>
              </div>
            )}
          </div>
          <div className="btns flex justify-between gap-5">
            <button
              onClick={() => navigate("/myOrders")}
              className="bg-slate-800 mt-5 rounded-lg px-5 fw-medium text-white py-2"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate("/history")}
              className="bg-slate-800 mt-5 rounded-lg px-5 fw-medium text-white py-2"
            >
              View History
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Profile Picture */}
            <Form.Group className="mb-3 flex flex-col items-center">
              <label className="flex flex-col items-center md:col-span-2">
                <input
                  hidden
                  type="file"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      profilePicture: e.target.files[0],
                    })
                  }
                />
                <img
                  className="w-32 h-32 rounded-full border-2 border-gray-300"
                  src={
                    preview
                      ? preview
                      : `${server_url}/uploads/${loggedUserData?.profilePicture}`
                  }
                  alt="No Profile Image"
                />
              </label>
              <Form.Label className="fw-bold">Profile Picture</Form.Label>
            </Form.Group>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                {/* Phone */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Location */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              {/* Address */}

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default UserProfile;
