"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useContext, useRef } from "react";
import Slider from "react-slick";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Button from "../../ui/button";
import Image from "next/image";
import verifiedImg from "@/public/images/verified_2x.gif";
import ProductFeaturesModel from "./ProductFeaturesModel";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { AuthContext } from "@/src/context/AuthContext";

export default function ProductCard({
  title,
  images,
  price,
  minOrder,
  supplier,
  supplierage,
  rating,
  unit,
  reviews,
  location,
  verified,
  supplierType,
  vendor_id,
  features,
  catalog,
}) {
  const sliderRef = useRef(null);

   const { user } = useContext(AuthContext);

   console.log(user)

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    draggable: true
  };

  const router = useRouter();

  return (
    <div className="grid grid-cols-12 gap-4 mx-auto p-6 shadow-xl rounded-2xl mt-4">
      <div className="md:col-span-4 col-span-12  relative group rounded-xl overflow-hidden">
        <Slider className="h-60" ref={sliderRef} {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index} className="h-60">
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 flex justify-between items-center px-2 opacity-0 group-hover:opacity-100 transition">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white rounded-full p-2 shadow-lg"
            onClick={previous}
          >
            <GrFormPrevious size={24} />
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white rounded-full p-2 shadow-lg"
            onClick={next}
          >
            <GrFormNext size={24} />
          </button>
        </div>
      </div>

      <div className="md:col-span-6 col-span-12 flex flex-col itmes-center justify-center gap-1">
        <h1 className="text-md font-bold leading-tight">{title}</h1>
        <ProductFeaturesModel features={features} />
        <p className="text-sm font-semibold mt-2 flex">
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z" />
            </svg>
          }
          {price}
        </p>
        <p className="text-sm text-gray-500">Unit: {unit}</p>
        <p className="text-sm text-gray-500">Min. order: {minOrder} pieces</p>
        <div className="flex items-center gap-4 text-gray-500">
          {verified && <Image src={verifiedImg} height={60} width={60} />}{" "}
          {supplierType}
        </div>
        <p className="text-blue-500 underline cursor-pointer">
          {supplier} - ({supplierage})
        </p>
        <p className="font-semibold text-sm mt-1">
          {rating}/5.0 from ({reviews} reviews)
        </p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>

      <div className="md:col-span-2 col-span-12 flex md:flex-col items-end gap-2 mx-auto gap-4">
        <Link className={`bg-blue-500 text-xs px-4 py-2 rounded-xl bg-primary hover:bg-primary-600 text-white transition`} target="_blank" href={`https://wa.me/${vendor_id?.phone?.value}`}>
            Contact Supplier
        </Link>

        <Button
          title={"Product Catalogs"}
          onClick={() => {
            if (!catalog) {
              toast.error("No catalog available");
              return;
            }
            window.open(catalog, "_blank");
          }}
        />
      </div>
    </div>
  );
}
