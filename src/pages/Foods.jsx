import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";
import FoodListing from "../components/FoodListing";
import Footer from "../components/Footer";

function Foods() {
  const foodItems = [
    { image: assets.ice_Cream, name: "Ice Cream" },
    { image: assets.burger, name: "Burger" },
    { image: assets.cool_drinks, name: "Cool Drinks" },
    { image: assets.sweets, name: "Sweets" },
    { image: assets.cookies, name: "Cookies" },
  ];
  return (
    <>
    <div className="relative bg-gradient-to-r    min-h-screen text-gray-600">
      {/* Banner Image */}
      <div className="absolute inset-0 mb-20">
        <img
          src={assets.food}
          alt="Delicious Drink"
          className="object-cover  h-100 opacity-30 lg:opacity-100 drop-shadow"
        />
      </div>

      {/* Banner Content */}
      <div className="relative lg:ms-60 mt-[-10px] z-10 flex flex-col items-center justify-center h-[400px] p-8 text-center">
        <h1 className="text-4xl font-bold md:text-6xl mt-20">
          Indulge in Every Sip
        </h1>
        <p className="mt-4 text-lg md:text-xl">
        "Discover What Brings You Joy and Savor Every Moment!"
        </p>

        <div className=" flex gap-x-5 rounded pt-5">
          {foodItems.map((item) => (
            <div>
              <div
                className="box rounded-full broder-gray-500 border-5 w-28 h-28 bg-center bg-cover hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <p className="text-xl text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
        <a href="#list">

        <button className="px-6 py-3 mt-6 font-medium text-red-500 bg-white rounded-full shadow-lg hover:bg-red-100">
          Explore Menu
        </button>
        </a>
      </div>
    </div>

    {/* Food Listing */}
    <div id="list">

    <FoodListing />
    </div>

    {/* footer */}
    <Footer/>
      </>
  );
}

export default Foods;
