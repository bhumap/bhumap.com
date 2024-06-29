import React from "react";
// import SimpleMap from './SimpleMap'

const Investments = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="w-full h-auto">
        <h2 className="text-center font-semibold text-primary text-2xl sm:text-3xl ">
          Properties For Investments
        </h2>

        <div className="border border-black/20 max-w-6xl shadow-md rounded-lg mx-auto my-8">
          {/* <SimpleMap /> */}
          <img className="w-full rounded-lg h-auto" src="/images/map.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Investments;
