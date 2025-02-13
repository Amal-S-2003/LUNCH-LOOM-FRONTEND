import React, { useContext, useEffect, useState } from "react";
import { assets, cities, plans, prices } from "../assets/assets";
import MessListing from "../components/MessListing";
import Footer from "../components/Footer";
import { MessContext } from "../context/MessContext";
import { getAllMesses } from "../services/all_api";

function MessMenu() {

  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [messes, setMesses] = useState([]);
  const fetchAllMess = async () => {
    const result = await getAllMesses();
    console.log(result.data);
    setMesses(result.data);
  };


  const filteredMesses = messes.filter((mess) =>
    Object.values(mess).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  console.log("filteredMesses>>>>>>>>>", filteredMesses);

  // };

  useEffect(() => {
    fetchAllMess();
  }, []);

  return (
    <>
      <section id="banner">
        <div className="container flex justify-between items-center lg:p-24 ">
          <div className="flex flex-col gap-y-3 p-4">
            <h1 className="text-4xl lg:text-6xl font-bold">Lunch-Loom</h1>
            <p className="text-gray-800 md:text-xl">
              "Weaving Delicious Connections, One Meal at a Time."
            </p>
            <div className="flex gap-3">
              <input
                className="bg-teal-50 p-2 border-teal-800 rounded w-100 outline-teal-500"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find Your Nearest Messes here..."
              />
              <button className="bg-teal-600 text-white px-3 py-2 mx-auto rounded flex items-center gap-2">
                <i class="fa-solid fa-magnifying-glass"></i> Search
              </button>
            </div>
          </div>
          <img
            src={assets.banner_bg}
            className="w-50 h-50 hidden md:block"
            alt="banner_image"
          />
        </div>
      </section>

      <section id="messes">
        <MessListing messes={filteredMesses} />
      </section>

      <Footer />
    </>
  );
}

export default MessMenu;
