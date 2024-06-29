"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";

const SearchBar = ({ query }) => {
  var searchParams = useSearchParams();
  var [keywordToShow, setKeywordToShow] = useState(query?.s || "");

  var router = useRouter();
  var [filter, setFilter] = useState(query);

  const changeHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  var searchWithFilters = (e) => {
    try {
      e.preventDefault();
      router.push(`/search?${queryString.stringify(filter)}`);
    } catch (error) {}
  };

  useEffect(() => {
    setKeywordToShow(query?.s || "");
  }, [searchParams]);

  return (
    <form onSubmit={searchWithFilters}>
      <h3 className="text-xl mb-2">
        Search Results for{" "}
        <span className="font-semibold">{keywordToShow}</span>
      </h3>
      <div className="relative w-full mb-3">
        <label className="block text-sm" htmlFor="">
          Location
        </label>
        <input
          className="w-full text-xs border border-black/20 focus:outline-0 focus:ring-0 sm:text-sm rounded-[.25rem]"
          type="text"
          value={filter.s}
          onChange={changeHandler}
          name="s"
          placeholder="Pin Code"
        />
      </div>
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <div className="">
            <label className="block text-sm" htmlFor="">
              Purpose
            </label>
            <select
              value={filter.purpose}
              onChange={changeHandler}
              className="rounded-[.25rem] border-black/20 py-1 text-xs sm:text-sm flex-1"
              name="purpose"
              id=""
            >
              <option value="">Select</option>
              <option value="Sale">Buy</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <div className="">
            <label className="block text-sm" htmlFor="">
              Property Type
            </label>
            <select
              value={filter.type}
              onChange={changeHandler}
              className="rounded-[.25rem] border-black/20 py-1 text-xs sm:text-sm flex-1"
              name="type"
              id=""
            >
              <option value="" hidden>
                Select
              </option>
              <option>Plot</option>
              <option>Industrial</option>
              <option>Commerial</option>
              <option>Residential</option>
              <option>Agriculture</option>
            </select>
          </div>
        </div>
        <button className="text-white bg-primary rounded-[.25rem] p-2 px-6 self-end flex justify-center items-center">
          <i className="bx bx-search  text-xs sm:text-sm md:text-base"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
