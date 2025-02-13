import React, { useContext } from "react";
import { server_url } from "../services/server_url";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MessCard = ({ mess }) => {
  const navigate = useNavigate();
  const lowestPlan = mess.subscriptionPlans.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );
  const { userLogged } = useContext(UserContext);
  
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        src={`${server_url}/uploads/${mess.messImage}`}
        alt={mess.messName}
        className="w-full h-48 object-cover "
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Mess Name */}
        <h2 className="text-xl font-bold text-gray-800">{mess.messName}</h2>

        {/* Location */}
        <p className="text-gray-600 text-sm"> {mess.location}</p>

        {/* Lowest Subscription Plan */}
        <p className="text-gray-800 mt-2">
          <span className="font-semibold">₹{lowestPlan.price}</span> -{" "}
          {lowestPlan.name} Plan
        </p>
        <button
          className="bg-gray-800 mt-3 text-white p-2 rounded w-32 items-start"
          onClick={() =>
            userLogged
              ? navigate(`mess-details/${mess._id}`)
              : navigate("/login")
          }
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default MessCard;
