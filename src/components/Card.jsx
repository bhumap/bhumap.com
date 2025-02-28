"use client";
import Link from "next/link";
import React from "react";

const Card = ({property}) => {

  return (
    <>
    
    {
      property ?
      <Link href={`/property/${property._id}`} className="rounded-lg block border shadow-md overflow-hidden">
      <div className="relative overflow-hidden">
        <i className="bx bx-heart absolute text-primary z-50 top-3 right-3 text-2xl"></i>
        <img
          className="w-full h-[250px] object-cover border hover:scale-110 transition-all duration-1000"
          src={property?.images[0]?.secure_url}
          alt=""
        />
      </div>

      <div className="relative p-3 w-full flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h4 className="font-semibold text-sm lg:text-lg line-clamp-3">
              {property.title}
            </h4>
            <p className="text-sm">{property.address?.cityTown}, {property.address?.district}, {property.address?.zipCode}</p>
          </div>

          <p className="whitespace-nowrap">
            <i className="bx bxs-star"></i> 4.9
          </p>
        </div>
        <span>
          <p>
            <span className="font-semibold">{property.price}</span> for {property.purpose}
          </p>
        </span>
      </div>
    </Link>
    :
    <Link href={"/property/detailpage"} className="rounded-lg block border shadow-md overflow-hidden">
      <div className="relative overflow-hidden">
        <i className="bx bx-heart absolute text-primary z-50 top-3 right-3 text-2xl"></i>
        <img
          className="w-full sm:h-[200] h-[250px] object-cover border hover:scale-110 transition-all duration-1000"
          src="https://a0.muscache.com/im/pictures/miso/Hosting-50545526/original/af14ce0b-481e-41be-88d1-b84758f578e5.jpeg?im_w=1200"
          alt=""
        />
      </div>

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
    }
    </>
  );
};

export default Card;
