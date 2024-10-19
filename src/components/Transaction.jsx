"use client";
import { isDev } from "@/src/backend/helpers/util";
import React, { useState, useEffect, useContext } from "react";
import { FaMoneyBillWave, FaRegClock } from "react-icons/fa";
import axios from 'axios';
import { format } from 'date-fns';
import { AuthContext } from "../context/AuthContext";

const Transaction = () => {

  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/transactions`);
        setTransaction(response.data.message.data);
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
    <section className="w-full">
        {/* Transaction History */}
        <div className="w-full rounded-lg border mt-10 bg-white p-6">
            <h2 className="text-l font-semibold text-gray-800">Transaction History</h2>
            <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-gray-100 rounded-lg">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-3 px-4 text-left text-gray-600">Date</th>
                    <th className="py-3 px-4 text-left text-gray-600">Payment Type</th>
                    <th className="py-3 px-4 text-left text-gray-600">Recharge Amount</th>
                    <th className="py-3 px-4 text-left text-gray-600">Aprroved Amount</th>
                    <th className="py-3 px-4 text-left text-gray-600">Status</th>
                    {user?.userType === 'Admin'? (<th className="py-3 px-4 text-left text-gray-600">Actions</th>) : ""}
                    
                </tr>
                </thead>
                <tbody className="text-gray-700">
                {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="py-2 px-4">{format(new Date(transaction.transaction_date), "MMMM dd, yyyy hh:mm a")}</td>
                    <td className="py-2 px-4 flex items-center capitalize">
                        <FaRegClock className="mr-1 text-gray-500" />
                        {transaction.type}
                    </td>
                    <td className={`py-2 px-4 ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{Math.abs(transaction.amount / 100).toFixed(2)}/-
                    </td>
                    <td className={`py-2 px-4 ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{Math.abs(transaction.by_admin?.amount / 100).toFixed(2)}/-
                    </td>
                    <td className={`py-2 px-4 ${transaction.by_admin?.is_processed === true ? 'text-green-600 capitalize' : 'text-red-600 capitalize'}`}>
                        {transaction.by_admin?.is_processed === false ? 'Pending' : 'Success'}
                    </td>
                    {
                     user?.userType === 'Admin' ? (<td className="py-4 px-5 text-gray-600">
                      <a href={`recharge-wallet/update-wallet/${transaction._id}`} className="font-medium text-primary" >Recharge Wallet</a>
                  </td>) : "" 
                    }
                    
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    </section>
  );
};

export default Transaction;
