"use client";
import { CartContext } from "@/src/context/CartContext";
import React, { useContext, useState } from "react";
const ripple = new Ripple();
import Ripple from "material-ripple-effects";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  var router = useRouter();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMode,setPaymentMode] = useState("online")

  const { data, isLoading, isError, refetch } = useQuery(
    ["addresses"],
    async () => {
      var res = await axios.get(`/api/addresses`);
      return res.data.message;
    }
  );

  var [formData, setFormData] = useState({});
  const {
    cartItems,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    showSideCart,
    setShowSideCart,
    calculateTotal,
    clearCart,
  } = useContext(CartContext);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  var formInputs = [
    {
      label: "Address Title",
      name: "title",
      type: "text",
      placeholder: "e.g. My Office, My Home",
      required: true,
      span: "col-span-6",
    },
    {
      label: "Line 1",
      name: "line1",
      type: "text",
      placeholder: "",
      required: false,
      span: "col-span-6",
    },
    {
      label: "Line 2",
      name: "line2",
      type: "text",
      placeholder: "",
      required: false,
      span: "col-span-6",
    },
    {
      label: "Line 3",
      name: "line3",
      type: "text",
      placeholder: "",
      required: false,
      span: "col-span-6",
    },
    {
      label: "City Town",
      name: "cityTown",
      type: "text",
      placeholder: "",
      required: true,
      span: "col-span-6",
    },
    {
      label: "District",
      name: "district",
      type: "text",
      placeholder: "",
      required: true,
      span: "col-span-6 sm:col-span-2",
    },
    {
      label: "State",
      name: "state",
      type: "text",
      placeholder: "",
      required: true,
      span: "col-span-6 sm:col-span-2",
    },
    {
      label: "Area Pin Code",
      name: "pinCode",
      type: "number",
      placeholder: "",
      required: true,
      span: "col-span-6 sm:col-span-2",
    },
  ];

  const submitHandler = async (e) => {
    var id;
    try {
      e.preventDefault();
      setLoading(true);
      id = toast.loading("Please wait...");
      const res = await axios.post("/api/addresses", formData);

      if (res.data.success) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
        });
        setLoading(false);
        setShowAddressForm(false);
        setTimeout(() => {
          toast.dismiss(id);
        }, 2000);
      }
    } catch (error) {
      toast.update(id, {
        render: error.response?.data?.message,
        type: "error",
        isLoading: false,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        toast.dismiss(id);
      }, 4000);
    }
  };

  var [address, setAddress] = useState("");

  // Place Order
  const placeOrder = async () => {
    var id;
    try {
      if (!address) {
        toast.error("Please Select Address First!");
        return;
      }
      var dishes = cartItems.map((v) => {
        return {
          dish: v._id,
          chef: v.chef._id,
          price: v.price,
          quantity: v.quantity,
        };
      });

      setLoading(true);

      id = toast.loading("Please wait...");
      var res = await axios.post("/api/orders", { dishes, address,paymentMode });

      if (res.data.success) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
        });
        setLoading(false);
        setTimeout(() => {
          toast.dismiss(id);
        }, 5000);
        clearCart();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calculateTotals = () => {
    let uniqueChefIds = new Set();
    let totalCount = 0;

    // Count items and unique chef IDs
    cartItems.forEach((item) => {
      totalCount += item.quantity;
      uniqueChefIds.add(item.chef._id); // Add chef ID to the set
    });

    // Calculate delivery charges based on unique chef count
    const uniqueChefCount = uniqueChefIds.size;
    const deliveryCharges = uniqueChefCount * parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST);

    return { totalCount, deliveryCharges };
  };

  return (
    <div className="p-4 relative mt-6">
      <div className="max-w-6xl grid gap-8 grid-cols-3 mx-auto">
        <div className="col-span-3 lg:col-span-2">
          <div className="rounded-md p-4 border bg-white">
            {/* All Address */}
            <div>
              <h2 className="font-semibold text-xl mb-2">Select Address</h2>
              <div className="flex flex-col mb-4 gap-4">
                {
                data?.data.length ?
                data?.data?.map((v, i) => {
                  return (
                    <div key={i} className="p-2 border rounded-md">
                      <details className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none">
                          <label htmlFor={`address${i}`}>
                            {" "}
                            <input
                              type="radio"
                              onChange={(e) => setAddress(e.target.value)}
                              name="address"
                              value={v._id}
                              className="mr-2"
                              id={`address${i}`}
                            />
                            {v.title}
                          </label>
                          <span className="transition group-open:rotate-180">
                            <svg
                              fill="none"
                              height="24"
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </summary>
                        <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                          {`${v?.line1 || ""} ${v?.line2 || ""} ${
                            v?.line3 || ""
                          } ${v?.cityTown || ""} ${v?.district || ""} ${
                            v?.state || ""
                          } ${v?.pinCode || ""}`}
                        </p>
                      </details>
                    </div>
                  );
                })
                :
                <p className="text-sm text-gray-500">
                  No Shipping Address Added Yet!
                </p>
                
                }
              </div>
              <button
                onClick={() => setShowAddressForm(true)}
                type="button"
                className="text-primary border-primary border bg-primary/10 text-sm bg-primary-600 py-2 px-4 rounded-md"
              >
                Add New Address
              </button>
            </div>



            <div className="p-2 relative">
              <h2 className="my-4 text-2xl font-semibold">Payment Method</h2>
              <div className="max-w-5xl flex gap-4">
                <div className="flex items-center">
                  <input type="radio" checked={paymentMode=="online"} value={paymentMode} onChange={()=>setPaymentMode("online")} id="online" name="paymentMode" />
                  <lafbel htmlFor="online" className="mx-2">
                    Online Payment
                  </lafbel>
                </div>
                <div className="flex items-center">
                  <input type="radio"  value={paymentMode} onChange={()=>setPaymentMode("cashOnDelivery")} id="cod" name="paymentMode" />
                  <label htmlFor="cod"  className="mx-2">
                    Cash on Delivery
                  </label>
                </div>
              </div>

              {
                paymentMode == "online" ? (<>

                <h3 className="border border-black text-sm border-dashed  p-4 text-center mt-4">Payment Method Integration Here</h3>
                </>) :null
              }
            </div>

            <div
              className={`fixed ${
                showAddressForm ? "visible opacity-100" : "invisible opacity-0"
              } transition-all duration-300 top-0 overflow-auto p-4 bg-black/90 inset-0 backdrop-blur-sm z-[9999999]`}
            >
              <div
                onClick={() => setShowAddressForm(false)}
                className="absolute inset-0"
              ></div>
              <div
                className={`bg-white ${
                  showAddressForm
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                } delay-300 transition-all duration-500 relative max-w-2xl p-4 rounded-md border mx-auto`}
              >
                <div
                  onClick={() => setShowAddressForm(false)}
                  className="absolute w-8 h-8 rounded-full flex justify-center items-center text-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer top-4 right-4"
                >
                  <i className="bx bx-x"></i>
                </div>
                <h2 className="font-semibold text-xl my-4">Add New Address</h2>
                <form onSubmit={submitHandler}>
                  <div className="gap-4 grid grid-cols-6 mb-4">
                    {formInputs.map((v, i) => {
                      return (
                        <div key={i} className={`relative ${v.span}`}>
                          {/* <div key={i} className={`${v.span}`}> */}
                          <input
                            required={v.required}
                            id={v.name}
                            value={formData[v.name]}
                            onChange={changeHandler}
                            name={v.name}
                            placeholder={v.placeholder}
                            type={v.type}
                            className={`block placeholder:opacity-0  focus:placeholder:opacity-100 bg-none px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          />

                          <label
                            className="absolute rounded-sm bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            htmlFor={v.name}
                          >
                            {v.label}
                            <span className="text-red-600">
                              {v.required && "*"}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 py-2 px-4 rounded-md"
                  >
                    {loading ? "Processing..." : "Save Address"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Summary Asid */}
        <div className="col-span-3 lg:col-span-1">
          <div className="h-[80vh] border bg-white rounded-md overflow-hidden flex flex-col">
            <h2 className="font-medium text-xl p-4 sm:text-2xl">
              Order Summary
            </h2>
            <div className="flex-1 px-4 overflow-auto">
              <div>
                {cartItems.map((v, i) => {
                  return (
                    <div key={i} className="border-b py-4">
                      <div className="flex gap-2 mb-2 shrink-[none]">
                        <div className="w-24 borer">
                          <Image width={600} height={400}
                            className="aspect-[4/3] object-cover w-full border bg-gray-100 rounded-[.25rem]"
                            src={
                              v?.images[0]?.secure_url || "/images/image.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col mb-1 items-start gap-1">
                            <div className="w-full  justify-between">
                              <p className="line-clamp-2 font-semibold">
                                {v.title}
                              </p>
                              <p className="whitespace-nowrap text-sm">
                                Price : ₹ {v.price}
                              </p>
                            </div>
                          </div>
                          <p className="whitespace-nowrap text-sm">
                            Subtotal ({v.quantity}{" "}
                            {v.quantity >= 2 ? "items" : "item"}): ₹{" "}
                            <span className="font-bold">
                              {v.price * v.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div
                          onClick={() => removeFromCart(v._id)}
                          className="cursor-pointer  bg-gray-100 hover:bg-red-200 flex gap-1 items-center text-xs rounded-full px-4 py-1"
                        >
                          <i className="bx bx-trash"></i>Remove
                        </div>
                        <div className="flex justify-end items-center overflow-hidden">
                          <div
                            onClick={() => decreaseFromCart(v)}
                            className="flex justify-center items-center rounded-full w-8 h-8 cursor-pointer select-none text-xl  border hover:bg-gray-100"
                          >
                            -
                          </div>
                          <div className="px-2">{v.quantity}</div>
                          <div
                            onClick={() => addToCart(v)}
                            className="flex justify-center items-center rounded-full w-8 h-8 cursor-pointer select-none text-xl  border hover:bg-gray-100"
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 pb-40 sm:pb-4 relative z-10 border">
              <div className="flex justify-between sm:text-xl mb-2">
                <p className=" text-sm">Subtotal</p>
                <p className=" text-sm">₹ {calculateTotal()}</p>
              </div>
              {/* <div className="flex justify-between sm:text-xl mb-2">
                <p className=" text-sm">{process.env.NEXT_PUBLIC_GST_PERCENTAGE*100}% GST</p>
                <p className=" text-sm">
                  ₹ {(process.env.NEXT_PUBLIC_GST_PERCENTAGE * calculateTotal()).toFixed(0)}
                </p>
              </div> */}
              {/* <div className="flex justify-between sm:text-xl mb-2">
                <p className=" text-sm">Shipping Fee ({process.env.NEXT_PUBLIC_SHIPPING_COST} per Chef Order)</p>
                <p className=" text-sm">{calculateTotals().deliveryCharges}</p>
              </div> */}
              <div className="flex justify-between sm:text-xl font-semibold mb-2">
                <p>Total</p>
                <p>
                  ₹{" "}
                  {parseInt((process.env.NEXT_PUBLIC_GST_PERCENTAGE * calculateTotal()).toFixed(0)) +
                    parseInt(calculateTotal()) +
                    parseInt(calculateTotals()?.deliveryCharges)}
                </p>
              </div>
              {cartItems.length ? (
                <button
                  onClick={placeOrder}
                  onMouseUp={(e) => ripple.create(e, "light")}
                  className={`bg-primary ${
                    address ? "animate-pulse" : null
                  } text-center block text-white rounded-md w-full px-2 py-3`}
                >
                  Confirm Order
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;