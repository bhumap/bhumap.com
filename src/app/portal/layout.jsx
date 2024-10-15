"use client";
import React from "react";


const layout = ({ children }) => {

  return (
    <div className="bg-[rgb(241,241,241)] min-h-[92vh] sm:py-10 px-4">
      <div className="max-w-7xl sm:bg-white sm:shadow-md sm:border border-black/20 rounded-lg mx-auto">
        {children}
      </div>
    </div>
  );
};

export default layout;
