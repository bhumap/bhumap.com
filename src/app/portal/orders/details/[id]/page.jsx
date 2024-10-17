"use client";
import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { isDev } from "@/src/backend/helpers/util";
import { AuthContext } from "@/src/context/AuthContext";

const Page = ({ params }) => {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async (id) => {
            try {
                const res = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL : process.env.NEXT_PUBLIC_DOMAIN}api/orders/${id}`);
                setOrder(res.data.data);
            } catch (err) {
                setError("Failed to load order details.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder(params.id);
    }, []);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10">{error}</div>;
    if (!order) return <div className="text-center py-10">No order details available.</div>;

    const { subOrders, payment_status, user: customer, paymentMode, orderId, address, createdAt, isCompleted, utr_number, images } = order;

    return (
        <div className="min-h-screen">
        <div className="p-6 sm:p-12 max-w-5xl mx-auto bg-white">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Section */}
            {user?.userType === 'Admin' && (
                <div className="text-black p-4 rounded-lg shadow flex">
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
                        <p>
                            <span className="font-bold">UTR Number:</span> {utr_number}
                        </p>
                    </div>
                    <a href={images[1].secure_url} target="_blank" rel="noopener noreferrer" className="ml-4">
                        Payment screenshot
                        <Image
                            src={images[1].secure_url}
                            alt="payment screenshot"
                            className="rounded-lg"
                            height={200}
                            width={200}
                        />
                    </a>
                </div>          
            )}
      
            {/* Order Overview */}
            <div className="p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Order Overview</h3>
                <p className="mb-2"><span className="font-bold">Order ID:</span> {orderId}</p>
                <p className="mb-2"><span className="font-bold">Order Date:</span> {new Date(createdAt).toLocaleDateString()}</p>
                <p className="flex items-center mb-2">
                    <span className="font-bold">Payment Status:</span>
                    <span className={`ml-2 flex items-center ${payment_status === "pending" ? "text-red-500" : "text-green-500"}`}>
                        {payment_status === "pending" ? <FaTimesCircle className="mr-1" /> : <FaCheckCircle className="mr-1" />} 
                        {payment_status}
                    </span>
                </p>
                <p className="mb-2"><span className="font-bold">Payment Mode:</span> {paymentMode}</p>
                <p><span className="font-bold">Shipping Address:</span> {address}</p>
            </div>

          </div>
      
          {/* Buyer Information */}
          <div className="p-4 mt-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-black-900">Customer Information</h3>
            <p><span className="font-bold">Name:</span> {customer?.fullName}</p>
            <p><span className="font-bold">Phone:</span> {customer?.phone.value} {customer?.phone.isVarified ? "(Verified)" : "(Not Verified)"}</p>
            <p><span className="font-bold">Buyer Address:</span> {customer?.address}</p>
          </div>
      
          {/* Sub Orders - Vendor and Products */}
            <h2 className="text-xl font-bold ml-5 mt-6 text-black-800">Product Details</h2>
            {subOrders?.map((subOrder) => (
                    <div key={subOrder._id} className="mt-8">
                        {/* Sub Order Header */}
                        <div className="border p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-l font-bold text-black-900 capitalize">{subOrder.vendor_id.fullName}</h3>
                            <p className="text-black-700 dark:text-black-300">
                                <span className="text-sm capitalize">{subOrder.vendor_id.address}</span> 
                            </p>
                        </div>
                        
                        {/* Order Status Section */}
                        <p className="text-black-600 dark:text-black-300 flex flex-col items-end">
                            {/* <span className="font-bold">Order Status</span> */}
                            <span className={`ml-2 ${subOrder.status === "Pending" ? "text-red-500 font-bold" : "text-green-500 font-bold"}`}>
                                {subOrder.status}
                            </span>
                        </p>
                    </div>

                    {/* Products in Sub Order */}
                    {subOrder?.carts?.map((cart) => (
                      <div key={cart._id} className="bg-white p-6 flex flex-col md:flex-row rounded-b-lg border mb-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 relative">
                                <Image
                                    src={cart.product_id.images[0].secure_url}
                                    alt={cart.product_id.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                  
                      {/* Product Details and Price Section */}
                      <div className="flex flex-col md:flex-row flex-grow justify-between md:space-x-4">
                          {/* Product Details */}
                          <div className="flex flex-col flex-grow md:mt-0">
                            <p className="font-semibold text-lg text-black-900 capitalize mt-2 md:ml-2">{cart.product_id.name}</p>
                            <p className="text-black-600 dark:text-black-300 capitalize md:ml-2">{cart.product_id.description}</p>
                        </div>

                  
                          {/* Price Section */}
                          <div className="flex flex-col text-sm text-black-600 md:mt-0">
                            <p>Quantity: <span className="font-bold">{cart.quantity}</span></p>
                            <p>Min. Quantity: <span className="font-bold">{cart.product_id?.min_qty}</span></p>
                            <p>Unit Price: <span className="font-bold">₹{cart?.product_id?.price.toFixed(2)}</span>/{cart.product_id.uom}</p>
                            <p>Total: <span className="font-bold text-black-900">₹{(cart.price * cart.quantity).toFixed(2)}</span></p>
                        </div>
                      </div>
                  </div>
                  
                    
                    ))}

                    </div>
            ))}

      
          {/* Order Summary */}
          <div className="p-4 mt-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-black-900">Order Summary</h3>
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p className="font-bold">₹{subOrders.reduce((acc, subOrder) => acc + subOrder.subTotal, 0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>GST:</p>
              <p className="font-bold">₹{subOrders.reduce((acc, subOrder) => acc + subOrder.gst, 0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p className="font-bold">₹{subOrders.reduce((acc, subOrder) => acc + subOrder.shipping, 0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <p>Total Amount:</p>
              <p className="text-xl">₹{subOrders.reduce((acc, subOrder) => acc + subOrder.total, 0).toFixed(2)}</p>
            </div>
          </div>
      
          <div className="text-center mt-8">
            <a href="/portal/orders" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300">Back to Order History</a>
          </div>
        </div>
        </div>      
    );
};

export default Page;
