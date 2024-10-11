"use client"
import React from "react";
import Card from "./Card2";

const PropertyCardsGrid = ({ search, properties }) => {

  console.log(properties);
  return (
    <div className="w-full overflow-hidden h-auto card-mm">
      <Card property={properties} />

      {search && (
        <div className="max-w-3xl mt-2 bg-white sm:shadow-md mx-auto border-primary sm:border sm:rounded-full">
          <div className="flex-col sm:flex-row flex sm:overflow-hidden sm:rounded-full">
            <input
              className="border sm:border-0 my-2   focus-within:ring-0 flex-1 sm:py-1 sm:px-3"
              placeholder="Enter City / Town"
              type="text"
            />
            <button className="p-2 px-4 text-white bg-primary">Search</button>
          </div>
        </div>
      )}

      <div className="main-box">
        <div></div>
      </div>
    </div>
  );
};

export default PropertyCardsGrid;
