"use client";
import React, { useState } from "react";
import Link from "next/link";
const Page = () => {
  var [showMap, setShowMap] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <div className="flex mb-10 flex-col items-center justify-center">
        <h2 className="bg-gradient-to-l mb-2 text-xl font-bold sm:text-3xl text-transparent bg-clip-text inline-block from-black to-black/70">
          Bhumap Paid Membership Packages
        </h2>
        <p className="max-w-xl text-gray-500 text-center">
          Invest for a short time and receive significant benefits. Select one
          of our paid membership packages from the options below that best suits
          your investment budget.
        </p>
      </div>

      <div className="gap-4 grid mb-10 lg:mb-20  lg:grid-cols-3">
        {/* <div className="border-2 p-4 sm:p-8 border-gray-400 rounded-lg bg-white">
          <img className="mx-auto block w-20" src="/images/b1.svg" alt="" />
          <h3 className="text-2xl font-semibold text-center">Basic Package</h3>
          <div className="text-sm flex flex-col gap-2 mb-4">
            <div className="flex gap-2 text-gray-700 items-center">
              <p className="text-xl  font-bold">1</p>
              <p>Pay 4500 INR for 60 months.</p>
            </div>
            <div className="flex gap-2 text-gray-600">
              <p className="text-xl  font-bold">2</p>
              <p>
                Get a plot worth 5 Lakh INR after 5 years in a city/town of your
                choice.
              </p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
              <p className="text-xl  font-bold">3</p>
              <p>Terms & conditions applied</p>
            </div>
          </div>

          <h3 className="text-4xl font-semibold text-center">
            4500 <span className="text-black/50 text-lg">₹</span>
          </h3>
          <div className="flex justify-center mt-4">
            <Link
              href="/buyer-paid-membership/terms-and-conditions"
              className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6"
            >
              Pay Now
            </Link>
          </div>
        </div> */}

        <div className="border-2 p-4 sm:p-8 border-gray-400 rounded-lg bg-white">
          <img className="mx-auto block w-20" src="/images/b1.svg" alt="" />
          <h3 className="text-2xl font-semibold text-center">Bronze Package</h3>
          <div className="text-sm flex flex-col gap-2 mb-4">
            <div className="flex gap-2 text-gray-700 items-center">
              <p className="text-xl  font-bold">1</p>
              <p>Pay 7500 INR for 36 months.</p>
            </div>
            <div className="flex gap-2 text-gray-600 ">
              <p className="text-xl  font-bold">2</p>
              <p>
                Get a plot worth 5 Lakh INR after 3 years in a city/town of your
                choice.
              </p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
              <p className="text-xl  font-bold">3</p>
              <p>Terms & conditions applied</p>
            </div>
          </div>

          <h3 className="text-4xl font-semibold text-center">
            7500 <span className="text-black/50 text-lg">₹</span>
          </h3>
          <div className="flex justify-center mt-4">
            <Link
              href="/buyer-paid-membership/terms-and-conditions"
              className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6"
            >
              Pay Now
            </Link>
          </div>
        </div>

        <div className="border-2 p-4 sm:p-8 border-gray-400 rounded-lg bg-white">
          <img className="mx-auto block w-20" src="/images/b1.svg" alt="" />
          <h3 className="text-2xl font-semibold text-center">Silver Package</h3>
          <div className="text-sm flex flex-col gap-2 mb-4">
            <div className="flex gap-2 text-gray-700 items-center">
              <p className="text-xl  font-bold">1</p>
              <p>Pay 10,500 INR for 36 months.</p>
            </div>
            <div className="flex gap-2 text-gray-600 ">
              <p className="text-xl  font-bold">2</p>
              <p>
                Get a plot worth 7 Lakh INR after 3 years in a city/town of your
                choice.
              </p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
              <p className="text-xl  font-bold">3</p>
              <p>Terms & conditions applied</p>
            </div>
          </div>

          <h3 className="text-4xl font-semibold text-center">
            10,500 <span className="text-black/50 text-lg">₹</span>
          </h3>
          <div className="flex justify-center mt-4">
            <Link
              href="/buyer-paid-membership/terms-and-conditions"
              className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6"
            >
              Pay Now
            </Link>
          </div>
        </div>

        <div className="border-2 p-4 sm:p-8 border-gray-400 rounded-lg bg-white">
          <img className="mx-auto block w-20" src="/images/b1.svg" alt="" />
          <h3 className="text-2xl font-semibold text-center">Gold Package</h3>
          <div className="text-sm flex flex-col gap-2 mb-4">
            <div className="flex gap-2 text-gray-700 items-center">
              <p className="text-xl  font-bold">1</p>
              <p>Pay 12,500 INR for 36 months.</p>
            </div>
            <div className="flex gap-2 text-gray-600 ">
              <p className="text-xl  font-bold">2</p>
              <p>
                Get a plot worth 8.5 Lakh INR after 3 years in a city/town of
                your choice.
              </p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
              <p className="text-xl  font-bold">3</p>
              <p>Terms & conditions applied</p>
            </div>
          </div>

          <h3 className="text-4xl font-semibold text-center">
            12,500 <span className="text-black/50 text-lg">₹</span>
          </h3>
          <div className="flex justify-center mt-4">
            <Link
              href="/buyer-paid-membership/terms-and-conditions"
              className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6"
            >
              Pay Now
            </Link>
          </div>
        </div>

        <div className="border-2 p-4 sm:p-8 border-gray-400 rounded-lg bg-white">
          <img className="mx-auto block w-20" src="/images/b1.svg" alt="" />
          <h3 className="text-2xl font-semibold text-center">
            Platinum Package
          </h3>
          <div className="text-sm flex flex-col gap-2 mb-4">
            <div className="flex gap-2 text-gray-700 items-center">
              <p className="text-xl  font-bold">1</p>
              <p>Pay 16,500 INR for 48 months.</p>
            </div>
            <div className="flex gap-2 text-gray-600 ">
              <p className="text-xl  font-bold">2</p>
              <p>
                Get a 1 BHK flat worth 15 Lakh INR after 4 years in your
                city/town. Flat handover after 3 years.
              </p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
              <p className="text-xl  font-bold">3</p>
              <p>Terms & conditions applied</p>
            </div>
          </div>

          <h3 className="text-4xl font-semibold text-center">
            16,500 <span className="text-black/50 text-lg">₹</span>
          </h3>
          <div className="flex justify-center mt-4">
            <Link
              href="/buyer-paid-membership/terms-and-conditions"
              className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6"
            >
              Pay Now
            </Link>
          </div>
        </div>

        <div className="border-2 p-4 sm:p-8 border-gray-400 rounded-lg bg-white">
          <img className="mx-auto block w-20" src="/images/b1.svg" alt="" />
          <h3 className="text-2xl font-semibold text-center">
            Platinum Gold Package
          </h3>
          <div className="text-sm flex flex-col gap-2 mb-4">
            <div className="flex gap-2 text-gray-700 items-center">
              <p className="text-xl  font-bold">1</p>
              <p>Pay 27,500 INR for 48 months.</p>
            </div>
            <div className="flex gap-2 text-gray-600">
              <p className="text-xl font-bold">2</p>
              <p>
                Get a 2 BHK flat worth 25 Lakh INR after 4 years in your
                city/town. Flat handover after 3 years.
              </p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
              <p className="text-xl  font-bold">3</p>
              <p>Terms & conditions applied</p>
            </div>
          </div>

          <h3 className="text-4xl font-semibold text-center">
            27,500 <span className="text-black/50 text-lg">₹</span>
          </h3>
          <div className="flex justify-center mt-4">
            <Link
              href="/buyer-paid-membership/terms-and-conditions"
              className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6"
            >
              Pay Now
            </Link>
          </div>
          {/* <div className="flex justify-center mt-4">
            <button onClick={()=>setShowMap(true)} className="border text-primary rounded-[.25rem] border-primary/50 bg-primary/10 font-medium text-xs sm:text-sm p-2 sm:px-4">
              Check Bhumap’s Owned Properties
            </button>
          </div> */}

          <div
            className={`${
              showMap ? "opacity-100 visible" : "opacity-0 invisible"
            } transition-all duration-500  fixed top-0 p-4 left-0 w-screen z-[9999] h-screen bg-black/90`}
          >
            <div
              onClick={() => setShowMap(false)}
              className="flex justify-end pb-4 px-1 sm:px-4"
            >
              <div className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-full bg-white/90 backdrop-blur-md">
                <i className="bx text-2xl bx-x"></i>
              </div>
            </div>
            <div
              className={`${
                showMap
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              } transition-all duration-1000 delay-500 max-w-4xl mx-auto`}
            >
              <img src="./images/map.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page;
