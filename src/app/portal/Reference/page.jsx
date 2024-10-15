"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { format } from 'date-fns';
import { isDev } from "@/src/backend/helpers/util";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(false);
  // const [totalAmount, setTotalAmount] = useState(0);

  // console.log(totalAmount);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setFetching(true);
          const res = await axios.get(
            `${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/rewards`
          );
          console.log('---------------->',res);
          setData(res.data.message.data);

          // const total = res.data.payments?.reduce((sum, payment) => {
          //   return sum + (payment.Commission ? parseFloat(payment.Commission) : 0);
          // }, 0);
          // setTotalAmount(total);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setFetching(false);
        }
      }
    };
    fetchData();
  }, [user]);

  

  return (
    <section className="flex flex-col items-center justify-center py-4 mx-auto">
      <div className="w-full max-w-5xl rounded-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl mb-6">
            My Earning : ₹0
          </h1>

          {!data ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Referred By</th>
                    <th className="py-3 px-6 text-left">Referred To</th>
                    <th className="py-3 px-6 text-left">Reward Amount (%)</th>
                    <th className="py-3 px-6 text-left">Amount Type</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Created Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {data.map((reward) => (
                    <tr key={reward._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-6">{reward.referred_by.fullName}</td>
                      <td className="py-4 px-6">{reward.referred_to.fullName}</td>
                      <td className="py-4 px-6 font-bold text-blue-600">{reward.reward_amount}</td>
                      <td className="py-4 px-6 capitalize">{reward.amount_type}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-lg ${
                            reward.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {reward.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {format(new Date(reward.createdAt), "MM/dd/yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
