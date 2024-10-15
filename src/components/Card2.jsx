"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "@/public/images/pla1.webp"
import Image from "next/image";

import { useContext } from "react";
import { CartContext } from "@/src/context/CartContext";

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-prev-arrow`}
    style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-next-arrow`}
    style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);

const Card = ({ property }) => {
  var { addToCart } = useContext(CartContext);
  if (!property || property.length === 0) {
    return (
      <div className="no-data">
        <p>No data yet</p>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <>
      {property.map((property, index) => (
        <div
          className="rounded-lg block border shadow-md overflow-hidden inner-box"
          key={index}
        >
          <div className="relative overflow-hidden">
            <i className="bx bx-heart absolute text-primary z-50 top-3 right-3 text-2xl"></i>
            <div className="slider-main">
              <Slider {...settings}>
                {/* Rendering dynamic images */}
                {property.images?.map((image, index) => (
                  <img
                    key={index}
                    className="w-full h-[230px] object-cover border hover:scale-110 transition-all duration-1000"
                    src={image.secure_url}
                    alt={`Property Image ${index + 1}`}
                  />
                ))}

                {/* Adding a static image */}
             
                  <Image
                    key={22}
                    className="w-full h-[230px] object-cover border hover:scale-110 transition-all duration-1000"
                    src={img1}
                    alt={`Property Image`}
                  />
          
              </Slider>
            </div>
          </div>

          <div className="title-main-box p-4">
            <div>
              <h4 className="font-semibold line-clamp-3 overflow-string">
                {property.name}
              </h4>
              <p className="text-sm address">
                {property.vendor_id?.fullName}, {property.vendor_id?.address},{" "}
                {property.address?.zipCode}
              </p>
              <p className="mt-1 price-title">
                <span className="font-semibold">Price {property.price}</span>
                {property.purpose}
              </p>
              <p className="text-sm square">
                <strong>Min. Quantity Order : </strong>{property.min_qty} {property.uom}
              </p>

              <Link
                href="#"
                target="_blank"
                className="text-sm company-pvt"
              >
                {property.company}
              </Link>

              {/* <p className="text-sm square">Gst No. ({property.gst})</p> */}
{/* 
              <p className="whitespace-nowrap mt-2">
                <i className="bx bxs-star"></i> 4.9
              </p> */}

              <a href={`tel:${property?.vendor_id?.phone}`}>
                <button className="contact contact1">Contact</button>
              </a>
              <h2>{property?.vendor_id.isApproved}</h2>
            </div>
            <div>
              <a href={`tel:${property.phone}`}>
                <button className="contact contact2 ml-1">Contact</button>
              </a> &nbsp;
              <a>
                <button onClick={() => addToCart(property)} className="contact contact2 text-white duration-300 hover:bg-primary hover:text-gray-800"><i className="bx bx-cart mr-2"></i>Add to Cart</button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
