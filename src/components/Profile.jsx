"use client"
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/src/context/AuthContext";

const Profile = () => {


  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="relative sm:p-4">

        <div className="shade rounded-lg py-10 flex items-center flex-col justify-center">
          <div>
            <img
              src={user?.photo || "/images/user.png"}
              alt="image here"
              className="w-28 h-28 rounded-full shadow-md object-cover border border-gray-200 max-w-full m-auto"
            />

            <div className="flex items-center justify-center flex-col mt-4">
              <h1 className="capitalize text-3xl whitespace-nowrap mb-2 flex items-center justify-center text-slate-800 font-semibold">
                {user?.fullName}
                <Link
                  href="/portal/profile/edit"
                  title="Edit Profile"
                  className="cursor-pointer hover:bg-gray-200 flex justify-start items-center rounded-full p-1 ml-2 text-xl "
                >
                  <i className="bx bx-pencil"></i>
                </Link>
              </h1>
              <h2 className="text-[#6c757d] text-sm">
                {`@${user?.username}`}
              </h2>
            </div>

            <div className="grid grid-cols-2 mt-6 gap-4">
              <div className="px-4 py-2 bg-white flex items-center col-span-2 sm:col-span-1 gap-4 border rounded-md">
                <div>
                  <p className="text-sm mb-1 text-gray-500">Mobile</p>
                  <span className="">{user?.phone?.value}</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-white flex items-center col-span-2 sm:col-span-1 gap-4 border rounded-md">
                <div>
                  <p className="text-sm mb-1 text-gray-500">Email</p>
                  <span className="">
                    {user?.email?.value || "example@test.com"}
                  </span>
                </div>
              </div>
              <div className="px-4 py-2 bg-white flex items-center gap-4 border rounded-md col-span-2">
                <div>
                  <p className="text-sm mb-1 text-gray-500">Address</p>
                  <span className="">
                    {user?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
