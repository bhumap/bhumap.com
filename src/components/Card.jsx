"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { getCookies } from "../utils/getCookies";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify"; // Added missing import for toast

const Card = ({ property }) => {
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const [newProperty, setNewProperty] = useState(property);
  
  const likeProperty = async (e) => {
    // Stop propagation to prevent link navigation
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const res = await axios.put(
        `/api/properties/${property._id}?likeDislike=true`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      setLiked(!liked);
      // windowslocation.reload();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.error("Error liking property");
    }
  };

  useEffect(() => {
    // router.push(`${pathname}/?title=${property.title}`, undefined, { shallow: true });
    setLiked(property?.likes?.includes(user?._id));
  }, [property?.likes, user?._id]); // Added missing dependency

  return (
    <>
      {property ? (
        <div
          key={property._id}
          className="relative rounded-lg block border shadow-md overflow-hidden"
        >
          {/* Moved the like button outside the Link component */}
          <button
            onClick={likeProperty}
            className={`absolute z-50 top-3 right-3 border-none bg-transparent p-0 cursor-pointer`}
          >
            <i className={`bx bx-heart text-2xl ${liked ? "text-red-600" : ""}`}></i>
          </button>
          
          <Link href={`/property/${property._id}`} className="overflow-hidden block">
            <img
              className="w-full h-[180px] md:h-[200px] object-cover border hover:scale-110 transition-all duration-1000"
              src={property?.images[0]?.secure_url}
              alt=""
            />
            <div className="relative p-3 w-full flex flex-col gap-1 justify-between">
              <div className="flex flex-col md:flex-row gap-1 justify-between">
                <div>
                  <h4 className="font-semibold text-[12px] md:text-md line-clamp-3">
                    {property.title}
                  </h4>
                  <p className="text-[12px] md:text-md mt-1">
                    {property.address?.cityTown}, {property.address?.district},{" "}
                    {property.address?.zipCode}
                  </p>
                </div>

                <p className="whitespace-nowrap text-[12px] md:text-md">
                  <i className="bx bxs-star"></i> 4.9
                </p>
              </div>
              <span>
                <p className="text-[12px] md:text-md">
                  <span className="font-semibold">{property.price}</span> for{" "}
                  {property.purpose}
                </p>
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="rounded-lg block border shadow-md overflow-hidden relative">
          {/* Same structure for the placeholder/fallback card */}
          <button className="absolute z-50 top-3 right-3 border-none bg-transparent p-0 cursor-pointer">
            <i className="bx bx-heart text-2xl"></i>
          </button>
          
          <Link href={"/property/detailpage"} className="block">
            <img
              className="w-full sm:h-[200] h-[250px] object-cover border hover:scale-110 transition-all duration-1000"
              src="https://a0.muscache.com/im/pictures/miso/Hosting-50545526/original/af14ce0b-481e-41be-88d1-b84758f578e5.jpeg?im_w=1200"
              alt=""
            />

            <div className="relative p-3 w-full flex flex-col justify-between">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold line-clamp-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                    maiores aliquid nesciunt ab, ex corrupti maxime eius autem
                    provident sint? Dolore officia deleniti facilis esse eaque
                    nesciunt doloremque ratione neque!
                  </h4>
                  <p className="text-sm">Fsd, Punjab</p>
                </div>

                <p className="whitespace-nowrap">
                  <i className="bx bxs-star"></i> 4.9
                </p>
              </div>
              <span>
                <p>
                  <span className="font-semibold">$ 20920</span> for Sale
                </p>
              </span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Card;