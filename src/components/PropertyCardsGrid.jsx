"use client";

import React, { useState } from "react";
import Card from "./Card";

const PropertyCardsGrid = ({ title, search, properties }) => {


  return (
    <div className="w-full overflow-hidden h-auto card-mm">
      {title && (
        <h2 className="text-center font-semibold text-primary text-2xl sm:text-3xl ">
          {title}   
        </h2>
      )}

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

      <div className="h-auto mx-auto my-8 overflow-hidden grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {properties ? (
          properties?.data?.map((v, i) => {
            return <Card property={v} key={v._id} />;
          })
        ) : (
          <>
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyCardsGrid;
