"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";
import Slider from "react-slick";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const images = [
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
];

export default function ProductCard() {
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
  };

  return (
    <div className="flex flex-col md:flex-row w-[95%] mx-auto p-6 shadow-xl rounded-2xl mt-4">
      <div className="w-72 md:w-96 mx-auto relative group">
        <Slider ref={sliderRef} {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Slide ${index}`}
                className="rounded-xl w-full h-60 object-cover"
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

      <div className="relative flex flex-col justify-around w-full items-start md:items-start mt-4 md:mt-0 md:ml-6">
        <h1 className="text-2xl font-bold">Tuya Control 120V WIFI Alexa Smart Plug</h1>
        <p className="text-2xl font-semibold mt-2">$3.50 - $4.00</p>
        <p className="text-sm text-gray-500">Min. order: 100 pieces</p>
        <p className="text-sm text-gray-500">Easy Return</p>
        <span className="text-blue-500 underline mt-2 cursor-pointer">
          Ningbo Aipulan Lighting Technology Co., Ltd. - (2 years)
        </span>
        <p className="font-semibold mt-1">5.0/5.0 from (2 reviews)</p>
        <p className="text-sm text-gray-500">Company name: India</p>

        <button className="absolute top-2 right-2 bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 text-white bg-primary transition">
          Chat now
        </button>
      </div>
    </div>
  );
}
