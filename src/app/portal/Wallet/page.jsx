"use client";
import { isDev } from "@/src/backend/helpers/util";
import React, { useState, useEffect, useContext } from "react";
import { FaMoneyBillWave, FaRegClock } from "react-icons/fa";
import axios from 'axios';
import { format } from 'date-fns';
import Transaction from "@/src/components/Transaction";
import { AuthContext } from "@/src/context/AuthContext";

const Page = () => {
  const [balance] = useState(0);

  const {user} = useContext(AuthContext);

  return (
    <section className="flex flex-col items-center justify-center py-10 mx-auto max-w-5xl">
        {/* Wallet Card */}
        <div className="w-full max-w-lg rounded-lg shadow-xl bg-[rgba(210,103,72,var(--tw-bg-opacity))] p-6 mb-8 text-white relative overflow-hidden animate-shimmer justify-center border border-white bg-[linear-gradient(110deg,rgb(210,103,72),45%,rgb(232,126,99),55%,rgb(210,103,72))] bg-[length:200%_100%] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-30"></div>

            <h1 className="text-3xl font-bold relative z-10">Wallet Balance</h1>
            <p className="mt-2 text-lg relative z-10">Your current balance is:</p>
            <h2 className="text-4xl font-extrabold relative z-10">₹{user?.wallet?.balance}</h2>
        </div>
      
        {/* Recharge Button */}
        <div className="mt-6 flex justify-center">
            <a href="./recharge" className="bg-primary text-white px-8 py-3 rounded-md shadow-md transition duration-200 flex items-center">
            <FaMoneyBillWave className="mr-2" />
            Recharge Wallet
            </a>
        </div>
        <hr />
        {/* Transaction History */}
        <div className="w-full">
        <Transaction />
        </div>
    </section>
  );
};

export default Page;
