"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";
import Slider from "react-slick";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Button from "../../ui/button";

export default function ProductCard({
  title,
  images,
  price,
  minOrder,
  supplier,
  duration,
  rating,
  reviews,
  location,
  verified,
}) {
  const sliderRef = useRef(null);

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
  };

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

      <div className="md:col-span-6 col-span-12 col-span-4 flex flex-col itmes-center justify-center gap-3">
        <h1 className="text-md font-bold leading-tight">{title}</h1>
        <p className="text-md font-semibold mt-2 flex">
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
        <p className="text-sm text-gray-500">Min. order: {minOrder} pieces</p>
        <div className="flex items-center gap-2 text-gray-500 mt-2">
          {verified && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#2854C5"
            >
              <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
            </svg>
          )}
          <span className="text-blue-500 underline cursor-pointer">
            {supplier} - ({duration})
          </span>
        </div>
        <p className="font-semibold mt-1">
          {rating}/5.0 from ({reviews} reviews)
        </p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>

      <div className="md:col-span-2 col-span-12 flex md:flex-col items-end gap-2">
        <Button title={"Chat Now"} />
        <Button customClass="hidden md:block" title={"Check Details"} />
        <Button title={"Check Catalogs"} />
      </div>
    </div>
  );
}
