"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import axios from "axios";
import { isDev } from "@/src/backend/helpers/util";

const Page = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/packages`);
        setPackages(response.data.message.data);
      } catch (err) {
        setError("Failed to load packages.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <div className="flex mb-10 flex-col items-center justify-center">
        <h2 className="bg-gradient-to-l mb-2 text-xl font-bold sm:text-3xl text-transparent bg-clip-text inline-block from-black to-black/70">
          Bhumap Paid Membership Packages
        </h2>
        <p className="max-w-xl text-gray-500 text-center">
          Invest for a short time and receive significant benefits. Select one of our paid membership packages from the options below that best suits your investment budget.
        </p>
      </div>

      <div className="gap-4 grid mb-10 lg:mb-20 lg:grid-cols-3">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          packages.map((item, index) => (
            <div key={item.id || index} className="border-2 p-4 sm:p-8 border-gray-400 rounded-lg bg-white">
              <Image className="mx-auto block w-20" src="/images/b1.svg" alt="" width={200} height={200} />
              <h3 className="text-2xl font-semibold text-center">{item?.name} Package</h3>
              <div className="text-sm flex flex-col gap-2 mb-4">
                {item?.notes?.map((note, index) => (
                  <div key={index} className={`flex gap-2 text-gray-${700 - index * 100} items-center`}>
                    <p className="text-l font-bold">{index + 1}.</p>
                    <p>{note}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-center">
                {item?.amount} <span className="text-black/50 text-2xl">₹</span>
              </h3>
              <div className="flex justify-center mt-4">
                <Link href={`/buyer-paid-membership/terms-and-conditions?id=${item._id}`} className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6">
                  Pay Now
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
