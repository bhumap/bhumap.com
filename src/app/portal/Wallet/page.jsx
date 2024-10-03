"use client";
import React, { useState } from "react";
import { FaMoneyBillWave, FaRegClock } from "react-icons/fa";

const Page = () => {
  const [balance] = useState(250);
  const transactions = [
    {
      id: 1,
      amount: 50,
      date: "2024-09-29",
      type: "Recharge",
      status: "Completed",
    },
    {
      id: 2,
      amount: -20,
      date: "2024-09-28",
      type: "Purchase",
      status: "Completed",
    },
    {
      id: 3,
      amount: -30,
      date: "2024-09-27",
      type: "Purchase",
      status: "Completed",
    },
    {
      id: 4,
      amount: 100,
      date: "2024-09-26",
      type: "Recharge",
      status: "Completed",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-10 mx-auto max-w-5xl">
        {/* Wallet Card */}
        <div className="w-full max-w-lg rounded-lg shadow-xl bg-[rgba(210,103,72,var(--tw-bg-opacity))] p-6 mb-8 text-white relative overflow-hidden animate-shimmer justify-center border border-white bg-[linear-gradient(110deg,rgb(210,103,72),45%,rgb(232,126,99),55%,rgb(210,103,72))] bg-[length:200%_100%] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-30"></div>

            <h1 className="text-3xl font-bold relative z-10">Wallet Balance</h1>
            <p className="mt-2 text-lg relative z-10">Your current balance is:</p>
            <h2 className="text-4xl font-extrabold relative z-10">₹{balance.toFixed(2)}</h2>
        </div>
      
        {/* Recharge Button */}
        <div className="mt-6 flex justify-center">
            <button className="bg-primary text-white px-8 py-3 rounded-md shadow-md transition duration-200 flex items-center">
            <FaMoneyBillWave className="mr-2" />
            Recharge Wallet
            </button>
        </div>
        <hr />
        {/* Transaction History */}
        <div className="w-full rounded-lg border mt-10 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Transaction History</h2>
            <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-gray-100 rounded-lg">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-3 px-4 text-left text-gray-600">Date</th>
                    <th className="py-3 px-4 text-left text-gray-600">Payment Type</th>
                    <th className="py-3 px-4 text-left text-gray-600">Amount</th>
                    <th className="py-3 px-4 text-left text-gray-600">Status</th>
                </tr>
                </thead>
                <tbody className="text-gray-700">
                {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="py-2 px-4">{transaction.date}</td>
                    <td className="py-2 px-4 flex items-center">
                        <FaRegClock className="mr-1 text-gray-500" />
                        {transaction.type}
                    </td>
                    <td className={`py-2 px-4 ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount)}
                    </td>
                    <td className={`py-2 px-4 ${transaction.status === "Completed" ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.status}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    </section>
  );
};

export default Page;
