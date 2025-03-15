import Image from "next/image";
import Link from "next/link";
import React from "react";

function FeaturedProduct({ videoSrc, logo, companyName, details }) {
 

  return (
    <div className="flex flex-col md:flex-row w-[95%] mx-auto shadow-md p-4 rounded-md gap-6 mt-8 bg-white">
      <video className="rounded-xl w-full md:w-[30%] h-48 md:h-auto object-cover" loop autoPlay muted>
        <source
          src={videoSrc}
          type="video/mp4"
        />
      </video>

      <div className="flex flex-col w-full md:w-2/3 gap-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <Image
              height={60}
              width={60}
              src={logo}
              alt="Product Category"
              className="rounded-lg border"
            />
            <div>
              <h3 className="text-sm font-medium text-gray-800">{companyName}</h3>
            </div>
          </div>
          <button className="rounded-full border px-4 py-2 hover:bg-gray-200 transition text-sm">
            Contact Supplier
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {details?.map((product, id) => (
            <Link key={id} href="#" className="block group">
              <div className="relative rounded-lg border overflow-hidden h-36 group-hover:shadow-lg transition">
                <Image
                  className="object-cover h-full w-full group-hover:scale-105 transition"
                  fill
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <p className="text-xs mt-1 line-clamp-2 text-gray-700">{product.title}</p>
              <h3 className="font-semibold text-sm text-gray-900 flex">
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>
              {product.price}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
