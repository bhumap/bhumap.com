"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { toast } from "react-toastify";

const Page = () => {
  const { user } = useContext(AuthContext);

  const copyToClipboard = () => {
    const referralUrl = `https://www.bhumap.com/register?referral=${user?.referral_code}`;
    navigator.clipboard.writeText(referralUrl)
      .then(() => {
        toast.success('Referral code copied to clipboard!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error('Failed to copy referral code.', {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <div className="flex mb-10 flex-col items-left justify-center">
        <h2 className="bg-gradient-to-l mb-2 text-xl font-bold sm:text-3xl text-transparent bg-clip-text inline-block from-black to-black/70">
          Bhumap Referral Program
        </h2>
        <p className="text-gray-500 sm:text-base text-sm mb-6">
          Unlock the power of your network with our Property Referral Program. Refer buyers, earn rewards! Get rewarded when your referrals purchase a paid membership or buy a property. Visuals guide you through the process.
        </p>

        <h2 className="mb-2 font-semibold sm:text-lg">
          How it Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-black/20 rounded-lg">
            <i className="bx bx-group text-primary text-3xl"></i>
            <h2 className="mb-2 font-semibold sm:text-lg">Invite buyers to join Bhumap</h2>
            <p className="text-gray-500 sm:text-base text-sm">Unlock exclusive rewards. Join our referral program.</p>
          </div>

          <div className="p-4 border border-black/20 rounded-lg">
            <i className="bx bx-rupee text-primary text-3xl"></i>
            <h2 className="mb-2 font-semibold sm:text-lg">Earn 5% on their paid membership fees</h2>
            <p className="text-gray-500 sm:text-base text-sm">Get 5% commission on the membership plan purchased by your referral.</p>
          </div>

          <div className="p-4 border border-black/20 rounded-lg">
            <i className="bx bx-rupee text-primary text-3xl"></i>
            <h2 className="mb-2 font-semibold sm:text-lg">Earn 2% commission if a referred member purchases a property</h2>
            <p className="text-gray-500 sm:text-base text-sm">Get a 2% commission when your referred member purchases a Bhumap's property.</p>
          </div>

          <div className="p-4 border border-black/20 rounded-lg">
            <i className="bx bx-heart text-primary text-3xl"></i>
            <h2 className="mb-2 font-semibold sm:text-lg">Repeat & Earn!</h2>
            <p className="text-gray-500 sm:text-base text-sm">Get these rewards every time your referral buys a membership plan or purchases a Bhumap's property.</p>
          </div>
        </div>
        
        {/* Referral Code Section Centered */}
        <div className="mt-6 flex justify-center">
          <div className="px-4 py-2 bg-white flex items-center justify-between gap-4 border-dashed border rounded-md md:col-span-2 w-full md:max-w-lg">
            <div>
              <p className="text-sm mb-1 text-gray-500">Referral Code</p>
              <span className="text-lg font-semibold">{user?.referral_code}</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
