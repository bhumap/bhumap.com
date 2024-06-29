import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative px-4 border-t bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="w-full py-6 sm:py-10 border-gray-200 ">
          <div className="w-full h-full gap-6 grid grid-cols-4">
            <div className="col-span-4 lg:col-span-1  md:col-span-2">
              <span className="flex 2xl:items-center my-2 mb-3">
                <img src="/fullLogo.svg" className="w-40" alt="" />
              </span>
              <p className="mb-4 text-gray-600">
                Trust Bhumap for expert real estate services that bring your
                dream property to life.
              </p>
              <span className="flex items-center text-gray-600 my-2">
                <i className="text-xl mr-2 bx bxl-facebook-circle"></i>
                <i className="text-xl mr-2 bx bxl-twitter"></i>
                <i className="text-xl mr-2 bx bxl-instagram"></i>
                <i className="text-xl mr-2 bx bxl-linkedin-square"></i>
                <i className="text-xl mr-2 bx bxl-google"></i>
              </span>
            </div>
            <div className="col-span-4 lg:col-span-1  md:col-span-2">
              <h5 className="font-semibold text-primary text-lg sm:mb-2">
                Buy
              </h5>
              <div>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/plot?type=buy"
                >
                  Plot
                </Link>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/industrial?type=buy"
                >
                  Industrial
                </Link>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/commercial?type=buy"
                >
                  Commercial
                </Link>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/residential?type=buy"
                >
                  Residential
                </Link>

                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/agricultural?type=buy"
                >
                  Agricultural
                </Link>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-1  md:col-span-2">
              <h5 className="font-semibold text-primary text-lg sm:mb-2">
                Rent
              </h5>
              <div>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/plot?type=rent"
                >
                  Plot
                </Link>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/industrial?type=rent"
                >
                  Industrial
                </Link>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/commercial?type=rent"
                >
                  Commercial
                </Link>
                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/residential?type=rent"
                >
                  Residential
                </Link>

                <Link
                  className="block pb-1 text-gray-600 hover:text-black"
                  href="/category/agricultural?type=rent"
                >
                  Agricultural
                </Link>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-1  md:col-span-2">
              <h5 className="font-semibold text-primary text-lg sm:mb-2">
                Contact Support
              </h5>
              <ul>
                <li className="flex items-center sm:py-1 text-gray-600 hover:text-black">
                  <i className="mr-2 text-primary text-xl bx bxs-phone"></i>
                  <a href="tel:+917800009965">+91 7800009965</a>
                </li>
                {/* <li className="flex items-center sm:py-1 text-gray-600 hover:text-black">
                  <i className="mr-2 text-primary text-xl bx bxs-location-plus"></i>
                  Chhawani Tahseel, Padrauna, Dist Kushinager UP 274304
                </li> */}
                <li className="flex items-center sm:py-1 text-gray-600 hover:text-black">
                  <i className="mr-2 text-primary text-xl bx bxl-gmail"></i>
                  <a href="mailto:bhumaphousing@gmail.com">
                    bhumaphousing@gmail.com
                  </a>
                </li>
                <li className="flex items-center py-2">
                  <button className="inline-flex py-2 px-3 text-sm animate-shimmer items-center justify-center rounded-md border border-white bg-[linear-gradient(110deg,rgb(210,103,72),45%,rgb(232,126,99),55%,rgb(210,103,72))] bg-[length:200%_100%] font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <i className='bx mr-2 text-base bx-message-dots'></i>
                    Chat With Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full items-center border-t border-gray-200 py-2">
          <p className="text-gray-600 text-center text-sm sm:text-base">
            © 2024 Bhumap. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
