import React from "react";

const LegalAdvisor = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <h2 className="bg-gradient-to-r mb-3 text-3xl font-bold sm:text-4xl text-transparent bg-clip-text inline-block from-black to-black/50">
          Legal Advisors
        </h2>

        <div className="mb-4 sm:mb-6">
          <form action="">
            <h2 className="mb-2 text-gray-600">Find Nearest Legal Advisor</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 flex-wrap">
              <input
                type="text"
                className="border-black/10 placeholder:text-black/40 rounded-md"
                placeholder="Town / City Name"
              />
              <input
                type="text"
                className="border-black/10 placeholder:text-black/40 rounded-md"
                placeholder="District Name"
              />
              <input
                type="number"
                className="border-black/10 placeholder:text-black/40 rounded-md"
                placeholder="Pincode"
              />
              <div>
                <button className="py-2 h-full px-4 text-sm bg-primary text-white rounded-md">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((v, i) => {
            return (
              <div
                key={i}
                className="flex rounded-lg flex-col items-center border shadow-md p-4 gap-4"
              >
                <div>
                  <img
                    className="w-28 h-28 rounded-full border"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-primary text-lg">
                    Mr. Mufaddal Advisor
                  </h2>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1">BS Real Estate Management</p>
                    <p>
                      {" "}
                      <i className="bx font-medium text-black mr-1 bxs-map"></i>{" "}
                      Lacknow ,Punjab, 36000
                    </p>
                    <p>
                      <i className="bx font-medium text-black mr-1 bxs-phone"></i>{" "}
                      9822828282
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button className="inline-flex py-2 px-3 text-sm mx-auto items-center justify-center rounded-md border border-white bg-[linear-gradient(110deg,rgb(210,103,72),45%,rgb(232,126,99),55%,rgb(210,103,72))] bg-[length:200%_100%] font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalAdvisor;
