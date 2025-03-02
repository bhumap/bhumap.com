"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";

const Hero = () => {
  var router = useRouter();
  var [filter, setFilter] = useState({});

  const changeHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  var searchWithFilters = (e) => {
    try {
      e.preventDefault();
      router.push(`/search?${queryString.stringify(filter)}`);
    } catch (error) {}
  };

  return (
    <div>
      <div className="w-full overflow-hidden hero-box">

        {/* <div className="active-user">
          <p>Monthly<span className="extsp">_</span>Active<span className="extsp">_</span>Users</p>
          <h2>
            502{" "}
            <span>
              <IoMdArrowDropup />
              13.48%
            </span>
          </h2>
        </div> */}

       
        <div className="w-full h-[70vh] overflow-hidden flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-photo/view-landmark-asian-sky-reflection_1417-266.jpg?t=st=1709409495~exp=1709413095~hmac=56a04fd0696a454f2fa6ed175d49173ef483e42469c310d0f59f7615ba16e9fe&w=1380"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          ></img>
        </div>
        <form
          onSubmit={searchWithFilters}
          className="mx-auto relative -translate-y-20 max-w-4xl h-auto p-4 sm:p-8 border shadow-xl bg-white rounded-lg"
        >
          <h3 className="text-3xl font-bold text-center mb-4">
            Search Property
          </h3>
          <span className="w-full flex gap-2 sm:gap-4 flex-col sm:flex-row justify-between items-center">
            <div className="flex w-full gap-2 sm:gap-4">
              <select
                className="rounded-md text-xs sm:text-sm md:text-base flex-1"
                name="purpose"
                onChange={changeHandler}
                id=""
              >
                <option value="">Purpose</option>
                <option value="Sale">Buy</option>
                <option value="Rent">Rent</option>
              </select>
              <select
                className="rounded-md text-xs sm:text-sm md:text-base flex-1"
                name="type"
                onChange={changeHandler}
                id=""
              >
                <option value="" hidden>
                  Select Property
                </option>
                <option>Plot</option>
                <option>Industrial</option>
                <option>Commerial</option>
                <option>Residential</option>
                <option>Agriculture</option>
              </select>
            </div>
            <div className="relative w-full text-xs sm:text-sm md:text-base">
              <input
                className="w-full rounded-md placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
                type="text"
                name="s"
                onChange={changeHandler}
                placeholder="Pin Code"
              />
              <button className="absolute top-1/2 right-1 text-white bg-primary rounded-md -translate-y-1/2 p-2 flex justify-center items-center">
                <i className="bx bx-search  text-xs sm:text-sm md:text-base"></i>
              </button>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Hero;
