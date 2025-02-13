import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { server_url } from '../services/server_url';

function HistoryPage() {
  const { loggedUserData } = useContext(UserContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (loggedUserData && loggedUserData[0]?.history) {
      setHistory(loggedUserData[0].history.reverse());
      
    }
  }, [loggedUserData]);

  return (
    <div className="p-4">
      <h1 className="text-4xl text-teal-500 text-center mt-5 font-bold mb-4">Subscription History</h1>
      {history.length > 0 ? (
        <div className="flex flex-col align-items-center gap-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-4 border flex gap-3 w-2/3 rounded-lg shadow-md bg-white   items-start"
            >
              <img
                src={`${server_url}/uploads/${item.messImage}`}
                alt={item.messName}
                className="w-80 h-60 object-cover rounded-lg mb-3"
              />
              <div className='bg-gray-50 w-full p-3 flex flex-col gap-2'>
              <h2 className="text-lg font-semibold">{item.messName}</h2>
              <p className="text-sm text-gray-600">{item.details}</p>
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong> {item.duration}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Price:</strong> ₹{item.price}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Starting Date:</strong> {new Date(item.startingDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ending Date:</strong> {new Date(item.endingDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Subscription Type:</strong> {item.subscriptionType}
              </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg">No subscription history available.</p>
      )}
    </div>
  );
}

export default HistoryPage;
