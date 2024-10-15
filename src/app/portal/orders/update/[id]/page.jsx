"use client";
import React, { useEffect, useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from 'axios';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Ripple from "material-ripple-effects";
import { isDev } from "@/src/backend/helpers/util";

const Page = ({ params }) => {
    var ripple = new Ripple();
    // const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [users, setUser] = useState(null);
    const router = useRouter();
    const [orderDetail, setOrderDetail] = useState({});

    const [formData, setFormData] = useState({
        orderId: "",
        subOrderId: "",
        newStatus: ""
    });

    useEffect(() => {
        const fetchOrder = async (id) => {
            try {
                const res = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/orders/${id}`)
                
                setOrderDetail(res.data.data);
            } catch (error) {
                setOrder({});
            }
        }; 
        fetchOrder(params.id); 
    }, []);

    async function updateOrderStatus(orderId, subOrderId, newStatus) {
        try {
          var { data } = await axios.put(`/api/orders/update-status`, {
            orderId,
            subOrderId,
            newStatus,
          });
          if (data.success) {
            setOrderDetail({
              ...orderDetail,
              subOrders: orderDetail?.subOrders?.map((v, i) => {
                if (v._id == subOrderId) {
                  v.status = newStatus;
                }
                return v;
              }),
            });
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div className="bg-white p-2 sm:p-4 flex flex-col gap-2">
          <h2 className="text-xl font-bold mb-2">My Orders</h2>

          <div className="sm:my-4 p-2 sm:p-4 max-h-[50vh] overflow-y-auto">
            {orderDetail?.subOrders?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col py-3 gap-2 sm:gap-4"
                >
                  {v.carts.map((item, j) => {
                    return (
                      <div className="flex items-stretch justify-between gap-2" key={i}> 
                          <div className="flex items-stretch justify-between gap-2" key={j}>
                            <div className="w-10 sm:w-20">
                              <Image
                                width={600}
                                height={400}
                                className="aspect-video object-cover"
                                src={
                                  item?.product_id?.images[0]?.secure_url || "/images/image.png"
                                }
                                alt=""
                              />
                            </div>
                            <div>
                              <h2 className="font-semibold sm:font-medium text-xs sm:text-base line-clamp-2">
                                {item?.product_id?.name}
                              </h2>
                              <p className="text-sm text-gray-500">
                                {item?.quantity} items x {item?.price}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-700 flex items-start">
                              {item?.quantity * item?.price}{" "}
                              <span className="text-base ml-1">₹</span>
                            </div>
                          </div>
                      </div>
                    );
                  })}

                  <div>
                    <div className="flex flex-col md:flex-row gap-2 justify-end px-4 py-3 border-t items-center">
                      <div className="flex gap-2 text-sm">
                        {[1].map((a, i) => {
                          switch (v?.status) {
                            case "Pending":
                              return (
                                <React.Fragment key={i}>
                                  <button
                                    onClick={() =>
                                      updateOrderStatus(
                                        orderDetail?._id,
                                        v?._id,
                                        "Rejected"
                                      )
                                    }
                                    onMouseUp={(e) => ripple.create(e, "light")}
                                    className="border py-2 hover:bg-red-100 bg-primary/5 border-primary/50 text-primary px-4 rounded-full "
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateOrderStatus(
                                        orderDetail?._id,
                                        v?._id,
                                        "Accept"
                                      )
                                    }
                                    onMouseUp={(e) => ripple.create(e, "light")}
                                    className="border py-2 px-4 bg-primary shadow-md text-white rounded-full "
                                  >
                                    Accept
                                  </button>
                                </React.Fragment>
                              );
                            case "Accept":
                              return (
                                <button
                                  key={i}
                                  onClick={() =>
                                    updateOrderStatus(
                                      orderDetail?._id,
                                      v?._id,
                                      "Shipped"
                                    )
                                  }
                                  onMouseUp={(e) => ripple.create(e, "light")}
                                  className="border py-2 px-4 bg-primary shadow-md text-white rounded-full "
                                >
                                  Ship
                                </button>
                              );
                            case "Shipped":
                              return (
                                <button
                                  key={i}
                                  onClick={() =>
                                    updateOrderStatus(
                                      orderDetail?._id,
                                      v?._id,
                                      "Delivered"
                                    )
                                  }
                                  onMouseUp={(e) => ripple.create(e, "light")}
                                  className="border py-2 px-4 bg-primary shadow-md text-white rounded-full "
                                >
                                  Mark Delivered
                                </button>
                              );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
};

export default Page;