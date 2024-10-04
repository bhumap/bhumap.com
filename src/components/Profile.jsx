"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/src/context/AuthContext";
import { toast } from "react-toastify";
import { format } from 'date-fns';

const Profile = () => {
  const { user, membership } = useContext(AuthContext);
  console.log('lllll',membership);
  // Copy referral code to clipboard
  const copyToClipboard = () => {
    const referralUrl = `https://www.bhumap.com/register?referral=${user?.referral_code}`;
    navigator.clipboard.writeText(referralUrl)
      .then(() => {
        toast.success("Referral code copied to clipboard!", {
          position: "top-right",
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy referral code.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto bg-whiterounded-lg p-6 sm:p-10">
        <div className="text-center">
          <img
            src={user?.photo || "/images/user.png"}
            alt="Profile Image"
            className="w-32 h-32 rounded-full shadow-md object-cover border-4 border-gray-300 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-800">{user?.fullName}</h1>
          <p className="text-gray-500 text-sm">@{user?.username}</p>
          <Link
            href="/portal/profile/edit"
            title="Edit Profile"
            className="inline-block text-blue-500 hover:text-blue-600 mt-2"
          >
            <i className="bx bx-pencil text-lg"></i> Edit Profile
          </Link>
        </div>

        {/* User Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Mobile</p>
            <p className="text-lg font-medium text-gray-800">{user?.phone?.value}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">{user?.email?.value || "example@test.com"}</p>
          </div>

          <div className="sm:col-span-2 bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-medium text-gray-800">{user?.address || "N/A"}</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Referral Code</p>
              <p className="text-lg font-semibold text-gray-800">{user?.referral_code}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Active Package Section */}
        {membership ? (
          <div className="mt-6">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-gray-500">Active Package</p>
                <p className="text-lg font-semibold text-gray-800">{membership.membership_package_id.name} Package</p>
              </div>
              <p className="text-sm text-gray-400">Expiry Date: {format(new Date(membership.expire_date), "MMMM dd, yyyy")}</p>
            </div>
          </div>
        ) : (
          <div className="mt-6">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Active Package</p>
              <p className="text-lg font-semibold text-gray-800">{"No active package"}</p>
            </div>
          </div>
        </div>
        ) }
        
      </div>
    </div>
  );
};

export default Profile;
