"use client";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { isDev } from "@/src/backend/helpers/util";

const Page = ({ params }) => {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const { subOrders, payment_status, user, paymentMode, orderId, address, createdAt, isCompleted } = order;

    return (
        <div className="p-4 sm:p-10 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8">Order Details</h2>
            <div className="bg-white rounded-lg p-6 max-w-5xl mx-auto space-y-6">
                
                {/* Order Overview */}
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold mb-2">Order Overview</h3>
                    <p>
                        <span className="font-bold">Order ID:</span> {orderId}
                    </p>
                    <p>
                        <span className="font-bold">Order Date:</span> {new Date(createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-bold">Payment Status:</span> 
                        <span className={`ml-2 ${payment_status === "pending" ? "text-red-500" : "text-green-500"} flex items-center`}>
                            {payment_status === "pending" ? <FaTimesCircle className="mr-1" /> : <FaCheckCircle className="mr-1" />} 
                            {payment_status}
                        </span>
                    </p>
                    <p>
                        <span className="font-bold">Payment Mode:</span> {paymentMode}
                    </p>
                    <p>
                        <span className="font-bold">Shipping Address:</span> {address}
                    </p>
                    <p className={`font-bold ${isCompleted ? "text-green-500" : "text-red-500"}`}>
                        {isCompleted ? "Order Completed" : "Order Pending"}
                    </p>
                </div>

                {/* Buyer Information */}
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold mb-2">Buyer Information</h3>
                    <p><span className="font-bold">Name:</span> {user?.fullName}</p>
                    <p><span className="font-bold">Phone:</span> {user?.phone.value} {user?.phone.isVarified ? "(Verified)" : "(Not Verified)"}</p>
                    <p><span className="font-bold">Buyer Address:</span> {user?.address}</p>
                </div>

                {/* Sub Orders - Vendor and Products */}
                {subOrders?.map((subOrder) => (
                    <div key={subOrder._id} className="border-b pb-4 mb-4">
                        <h3 className="text-xl font-semibold mb-2">Vendor: {subOrder.vendor_id.fullName}</h3>
                        <p><span className="font-bold">Vendor Address:</span> {subOrder.vendor_id.address}</p>
                        <p><span className="font-bold">Status:</span> {subOrder.status}</p>

                        {subOrder?.carts?.map((cart) => (
                            <div key={cart._id} className="flex items-start mt-4">
                                <Image
                                    src={cart.product_id.images[0].secure_url}
                                    alt={cart.product_id.name}
                                    width={100}
                                    height={100}
                                    className="mr-4 rounded-md"
                                />
                                <div>
                                    <p className="font-semibold">{cart.product_id.name}</p>
                                    <p>Quantity: {cart.quantity}</p>
                                    <p>Unit Price: ₹{cart?.product_id?.price.toFixed(2)}/{cart.product_id.uom}</p>
                                    <p>Min. Quntity: {cart?.product_id?.min_qty} {cart.product_id.uom}</p>
                                    <p>Total: ₹{(cart.price * cart.quantity).toFixed(2)}</p>
                                    {/* <p>Unit: {cart.product_id.uom}</p> */}
                                    <p className="text-gray-600">Description: {cart.product_id.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                {/* Pricing Section */}
                <div className="border-t pt-4 mt-6">
                    <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
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
            </div>
            <div className="text-center mx-auto mt-5">
                <a href="/portal/orders" className="bg-primary text-white font-bold py-2 px-4 rounded-lg inline-block shadow-lg transition duration-300 ease-in-out">
                    Back to Order History
                </a>
            </div>

        </div>
    );
};

export default Page;
