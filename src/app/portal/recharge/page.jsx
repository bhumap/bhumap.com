"use client"
import React from 'react';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const package_id = searchParams.get("id");

  return (
    <>
    {/* Header Section */}
    <div className="w-full p-4 bg-gray-100 shadow-md mb-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center">
        Recharge your wallet with ₹1100 and get ₹25000 in your wallet.
      </h3>
    </div>
  
    <div className="max-w-6xl mx-auto px-4 mt-14 py-6 sm:py-10 flex flex-col sm:flex-row items-start">
      {/* QR Code Section */}
      <div className="flex-shrink-0 w-full sm:w-1/2 p-4">
        <div className="bg-[rgb(210,103,72)] shadow-lg rounded-lg p-6 flex flex-col items-center">
          <Image
            src="/images/qr-code.jpg"
            alt="QR Code"
            width={200}
            height={200}
            priority
            className="rounded-md"
          />
          <p className="mt-4 text-center text-white font-medium">
            Scan this QR code to complete your payment quickly and securely.
          </p>
        </div>
      </div>
  
      {/* Form Section */}
      <div className="w-full sm:w-1/2 p-4">
        <h2 className="text-2xl font-bold mt-4 text-gray-800 text-center">Enter Details After Payment</h2>
        <form className="bg-white rounded-lg p-6 space-y-4 shadow-md">
          <div>
            <label htmlFor="recharge_amount" className="block text-sm font-medium text-gray-700">Recharge Amount</label>
            <input
              type="text"
              id="recharge_amount"
              name="recharge_amount"
              required
              readOnly
              value={1100}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="utr-number" className="block text-sm font-medium text-gray-700">UTR Number</label>
            <input
              type="text"
              id="utr-number"
              name="utr-number"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="payment-screenshot" className="block text-sm font-medium text-gray-700">Upload Payment Screenshot</label>
            <input
              type="file"
              id="payment-screenshot"
              name="payment-screenshot"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <input type="hidden" name="package_id" id="package_id" value={package_id} />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </>
  
  );
};

export default Page;
