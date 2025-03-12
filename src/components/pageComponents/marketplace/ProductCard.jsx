"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

const images = [
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
];

export default function ProductCard() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="flex flex-col md:flex-row w-[95%] mx-auto p-4 shadow-xl rounded-2xl mt-4">
      <div className="w-72 md:w-96 mx-auto">
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Slide ${index}`}
                className="rounded-xl h-60 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col md:flex-row justify-around w-full items-center">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-blue-600">MARCH</h2>
          <h1 className="text-2xl font-bold mt-2">
            Tuya Control 120V WIFI Alexa Smart Plug
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            American Outlet Smart Socket Works With Echo Google Home IFTTT
          </p>
          <p className="text-2xl font-semibold mt-4">$3.50-4.00</p>
          <p className="text-sm text-gray-500">Min. order: 100 pieces</p>
          <p className="text-sm text-gray-500">Easy Return</p>
          <p className="text-blue-500 underline mt-2 cursor-pointer">
            Ningbo Aipulan Lighting Technology Co., Ltd.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span>7 yrs</span>
            <span className="text-red-500">CN Supplier</span>
            <span className="font-semibold">5.0/5.0 (2 reviews)</span>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
          Chat now
        </button>
      </div>
    </div>
  );
}
