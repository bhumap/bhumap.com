"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const getAreaByCategory = async (query) => {
  try {
    const response = await axios.get(`/api/properties/`, {
      params: {
        ...query,
      },
    });
    return response.data.message.data;
  } catch (error) {
    toast.error("Failed to fetch properties");
  }
};

export default function Category({ params }) {
  const [properties, setProperties] = React.useState([]);
  const [searchParams, setSearchParams] = React.useState({});
  const search = useSearchParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state

  var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
  };

  // Form Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  // Search Data
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    axios
      .get(`/api/properties/`, {
        params: {
          ...searchParams,
        },
      })
      .then((res) => {
        setProperties(res.data.message);
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false); // Stop loading on error
      });
  };

  // Handle Pagination
  const handlePagination = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil((properties?.count || 1) / 10)) return;
    setPage(pageNumber);

    setLoading(true); // Start loading for pagination

    axios
      .get(`/api/properties/`, {
        params: {
          ...searchParams,
          page: pageNumber,
        },
      })
      .then((res) => {
        setProperties(res.data.message);
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false); // Stop loading on error
      });
  };

  // Fetching Data Category Wise
  useEffect(() => {
    let query = {};
    search.get("type") && (query.purpose = search.get("type"));
    query.propertyType = params.cat;
    setSearchParams(query);

    setLoading(true); // Start loading

    axios
      .get(`/api/properties/`, {
        params: {
          ...query,
        },
      })
      .then((res) => {
        setProperties(res.data.message);
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false); // Stop loading on error
      });
  }, [params]);

  return (
    <div className="">
      <div>
        <Slider {...settings}>
          <div>
            <div className="border h-[40vh]">
              <img
                className="w-full h-full object-cover"
                src="https://img.freepik.com/premium-photo/man-holding-model-house_31965-132910.jpg?w=1380"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="border h-[40vh]">
              <img
                className="w-full h-full object-cover"
                src="https://img.freepik.com/premium-photo/man-holding-model-house_31965-132910.jpg?w=1380"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="border h-[40vh]">
              <img
                className="w-full h-full object-cover"
                src="https://img.freepik.com/premium-photo/man-holding-model-house_31965-132910.jpg?w=1380"
                alt=""
              />
            </div>
          </div>
        </Slider>
      </div>

      <div className="p-6 sm:py-12 max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 ">
            {params.cat === "residential" && (
              <>
                <div className="pl-4 py-2 sm:py-0 border-b sm:border-0 sm:pl-8">
                  <p className="text-sm font-medium text-gray-600">Type</p>
                  <select
                    name="propertyType"
                    className="mt-1 sm:mt-0 w-full font-semibold text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    id="propertyType"
                  >
                    <option>Flat</option>
                    <option>Tenament</option>
                    <option>Duplex</option>
                    <option>Bungalow</option>
                    <option>Villa</option>
                  </select>
                </div>
                <div className="border-l border-gray-300 h-10 hidden sm:block mx-4"></div>
              </>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto md:border md:border-gray-300 rounded-full md:shadow-md p-2"
            >
              <input
                name="cityTown"
                className="border border-gray-300 rounded-full md:px-4 py-2 w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter City / Town"
                type="text"
                onChange={handleChange}
              />
              <input
                name="zipCode"
                className="border border-gray-300 rounded-full md:px-4 py-2 w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter Zip Code"
                type="text"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="px-6 py-2 text-white bg-primary rounded-full hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div>
          {loading ? ( // Show loader when fetching data
            <div className="flex justify-center items-center">
              <div className="loader"></div> 
            </div>
          ) : properties?.data?.length > 0 ? (
            <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex justify-center">
              {properties?.data?.map((property) => (
                <Card key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full justify-center items-center gap-4 p-4">
              <Image
                className="w-40 h-40 object-contain"
                src="/images/propertySearch.svg"
                alt="No Property Found"
                width={160}
                height={160}
              />
              <p className="text-gray-400 text-center">No Property Found!</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6 mb-6">
        {/* Previous Button */}
        <button
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 border rounded-md transition-colors ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: Math.ceil((properties?.count || 1) / 10) }).map(
          (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={index}
                onClick={() => handlePagination(pageNumber)}
                className={`px-3 py-1 border rounded-md transition-colors ${
                  page === pageNumber
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          }
        )}

        {/* Next Button */}
        <button
          onClick={() => handlePagination(page + 1)}
          disabled={page === Math.ceil((properties?.count || 1) / 10)}
          className={`px-3 py-1 border rounded-md transition-colors ${
            page === Math.ceil((properties?.count || 1) / 10)
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
