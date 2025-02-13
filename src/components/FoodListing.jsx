import React, { useContext, useEffect, useState } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "./FoodCard";
import { assets } from "../assets/assets";
import { getAllFoods } from "../services/all_api";

function FoodListing() {
  const { allFoodItems  } = useContext(FoodContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    const result = await getAllFoods();
    console.log(result.data);

    setFoods(result.data);
    console.log(foods);
  };
  useEffect(() => {
    fetchFoods();
  }, []);
  return (
    <>
      <div className="container  2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 ">
        {/* Job Listings */}
        <section className="w-full  text-gray-800 max-lg:px-4">
          <h3 className=" text-3xl text-center py-2 font-bold" id="food-list">
            <span>"Savor the Flavor,</span>
            <span className="text-yellow-500">Stay on Trend!"</span>
          </h3>
          <p className="mb-8 text-center">
            Indulge in What's Trending – Taste It Now!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {foods
              .slice((currentPage - 1) * 8, currentPage * 8)
              .map((food, index) => (
                <FoodCard key={index} food={food} />
              ))}
          </div>

          {/*  Pagination */}

          {foods.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-10">
              <a href="#food-list">
                <img
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  src={assets.left_arrow_icon}
                  alt=""
                />
              </a>
              {Array.from({ length: Math.ceil(foods.length / 8) }).map(
                (_, index) => (
                  <a key={index} href="#food-list">
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                        currentPage === index + 1
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </a>
                )
              )}
              <a href="#food-list">
                <img
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(foods.length / 8)
                      )
                    )
                  }
                  src={assets.right_arrow_icon}
                  alt=""
                />
              </a>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default FoodListing;
