"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setFetching(true);
          const res = await axios.get(
            `https://www.bhumap.com/api/payment?userId=${user._id}`
          );
          setData(res.data);
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
    <section className="flex flex-col items-center justify-center px-4 py-4 mx-auto">
      <div className="w-full rounded-lg md:mt-0 xl:p-0">
        <div className="p-2 space-y-2 md:space-y-3">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Update Payment Status
          </h1>

          {fetching ? (
            <p>Loading...</p>
          ) : data ? (
            <div className="payment-box">
              <div className="payment-head payment-main">
                <div className="payment-title payment-head1">
                  <h4>Name</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>Phone</h4>
                </div>
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

              {data?.payments?.map((e, i) => {
                return (
                  <div className="payment-head">
                    <div className="payment-title">
                      <h4>{e?.Buyer_name}</h4>
                    </div>
                    <div className="payment-title">
                      <h4>{e?.user_phone}</h4>
                    </div>
                    <div className="payment-title">
                      <h4>{e?.Package_Name}</h4>
                    </div>
                    <div className="payment-title">
                      <h4>{e?.Amount}</h4>
                    </div>
                    <div className="payment-title">
                      <h4>
                        {e?.Payment_date
                          ? new Date(e.Payment_date).toLocaleDateString()
                          : "No date available"}
                      </h4>
                    </div>
                  </div>
                );
              })}
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
