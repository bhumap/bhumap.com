"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { isDev } from "@/src/backend/helpers/util";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(totalAmount);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setFetching(true);
          const res = await axios.get(
            `${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/payment?userId=${user._id}`
          );
          setData(res.data);

          const total = res.data.payments?.reduce((sum, payment) => {
            return sum + (payment.Amount ? parseFloat(payment.Amount) : 0);
          }, 0);
          setTotalAmount(total);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setFetching(false);
        }
      }
    };

    fetchData();
  }, [user]);

  console.log(data);

  return (
    <section className="flex flex-col items-center justify-center py-4 mx-auto">
      <div className="w-full rounded-lg">
        <div className="p-2 space-y-2 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Payment Status
          </h1>

          {fetching ? (
            <p>Loading...</p>
          ) : data ? (
            <div className="payment-box">
              <div className="payment-head payment-main">
                <div className="payment-title payment-head1">
                  <h4>Package</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>Amount</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>Payment Date</h4>
                </div>
              </div>

              {data.payments.map((e, i) => (
                <div className="payment-head" key={i}>
                  <div className="payment-title">
                    <h4>{e.Package_Name}</h4>
                  </div>
                  <div className="payment-title">
                    <h4>{e.Amount}</h4>
                  </div>
                  <div className="payment-title">
                    <h4>
                      {e.Payment_date
                        ? new Date(e.Payment_date).toLocaleDateString()
                        : "No date available"}
                    </h4>
                  </div>
                </div>
              ))}
              <div className="total-amount">
                <h4><b>Total Amount: <span className="total-amout">({totalAmount})</span></b> </h4>
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
