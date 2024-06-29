"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Card from "./Card";

export default function Category({params}) {


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

      <div className="p-4 sm:py-10 max-w-6xl mx-auto">
        <div className="max-w-3xl  bg-white sm:shadow-md mx-auto border-primary sm:border sm:rounded-full">
          <div className="flex-col sm:flex-row flex sm:overflow-hidden sm:rounded-full">
            {params.cat == "residential" && <>
            <div className="pl-4 py-2 border sm:border-0 sm:pl-8 sm:py-2">
              <p className="text-sm">Type</p>
              <div>
                <select
                  name=""
                  className="sm:appearance-none w-full font-bold p-0 sm:bg-none border-0"
                  id=""
                >
                  <option>Flat</option>
                  <option>Tenament</option>
                  <option>Duplex</option>
                  <option>Bungalow</option>
                  <option>Vila</option>
                </select>
              </div>
            </div>
            <div className="border-[.5px] hidden sm:block border-primary/50 mx-4 my-4"></div>
            </>
            }


            <input
              className="border sm:border-0 my-2 focus-within:ring-0 flex-1 sm:py-1 sm:px-3"
              placeholder="Enter City / Town"
              type="text"
            />
            <button className="p-2 px-4 text-white bg-primary">Search</button>
          </div>
        </div>

        <div className="h-auto mx-auto my-10 overflow-hidden grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {/* <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card /> */}
        </div>
      </div>
    </div>
  );
}
