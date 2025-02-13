// App.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { registerAPI } from "../services/all_api";
import { Bounce, ToastContainer, toast } from "react-toastify";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    profilePicture: "",
    password: "",
  });
  const [preview, setPreview] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, location, profilePicture, password } =
      registerData;
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !location ||
      !profilePicture ||
      !password
    ) {
      toast.info("please fill the input fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("email", email);
      reqBody.append("phone", phone);
      reqBody.append("address", address);
      reqBody.append("location", location);
      reqBody.append("profilePicture", profilePicture);
      reqBody.append("password", password);
      const reqHeader = {
        "Content-Type": "multipart/form-data",
      };
      try {
        const result = await registerAPI(reqBody, reqHeader);
        console.log("result=> ", result);
        if (result.status == 200) {
          console.log("registerd");
          setRegisterData({
            name: "",
            email: "",
            phone: "",
            address: "",
            location: "",
            profilePicture: "",
            password: "",
          });
          toast.success("Registration Successful");
          navigate("/login");
        } else {
          toast.warn(result.response.data);
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
      console.log(registerData);
    }
  };
  useEffect(() => {
    if (
      registerData.profilePicture.type == "image/png" ||
      registerData.profilePicture.type == "image/jpg" ||
      registerData.profilePicture.type == "image/jpeg"
    ) {
      setPreview(URL.createObjectURL(registerData.profilePicture));
    } else {
      console.log("please upload only following formats  (png/jpg/jpeg)");
      setRegisterData({ ...registerData, profilePicture: "" });
    }
  }, [registerData.profilePicture]);
  return (
    <div className="container h-screen p-8 flex flex-col items-center justify-center">
      <div className="card w-full md:max-w-lg shadow-lg p-6 bg-white rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col items-center md:col-span-2">
            <input
              hidden
              type="file"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  profilePicture: e.target.files[0],
                })
              }
            />
            <img
              className="w-32 h-32 rounded-full border-2 border-gray-300 "
              src={preview ? preview : assets.profilePicture}
              alt="No Profile Image"
            />
          </label>
          <div className="flex flex-col">
            <input
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter Name"
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Email"
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Phone Number"
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Address"
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, address: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Location"
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, location: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center md:col-span-2">
            <button
              type="submit"
              onClick={handleRegister}
              className="bg-blue-600 text-white font-semibold rounded py-2 px-6 hover:bg-blue-700 transition-all"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer font-semibold hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default RegisterPage;
