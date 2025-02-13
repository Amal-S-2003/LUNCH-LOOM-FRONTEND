import React, { useContext, useEffect, useState } from "react";
// import { MessContext } from "../context/messContext";
import MessCard from "./MessCard";
import { assets } from "../assets/assets";
import { MessContext } from "../context/MessContext";
import { getAllMesses } from "../services/all_api";

function MessListing({ messes }) {
  const [currentPage, setCurrentPage] = useState(1);
  console.log("MeSseS", messes);
  useEffect(() => {
    setCurrentPage(1);
  }, [messes]);


  return (
    <div className="container  2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 ">
      <section className="w-full  text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="mess-list">
          Find Your Mess here...
        </h3>
        <p className="mb-8">Eat Helthy Food at currect time</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {messes
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((mess, index) => (
              <MessCard key={index} mess={mess} />
            ))}
        </div>

        {/*  Pagination */}

        {messes.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#mess-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(messes.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#mess-list">
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
            <a href="#mess-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(messes.length / 6))
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
  );
}

export default MessListing;
