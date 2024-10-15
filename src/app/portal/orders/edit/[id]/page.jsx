"use client";
import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from 'axios';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isDev } from "@/src/backend/helpers/util";

const Page = ({ params }) => {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [users, setUser] = useState(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        payment_status: "",
    });

    useEffect(() => {
        const fetchOrder = async (id) => {
            try {
                const res = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/orders/${id}`)
                console.log(res.data.data.payment_status);
                setFormData({...formData, payment_status: res.data.data.payment_status});
            } catch (error) {
                setOrder({});
            }
        }; 
        fetchOrder(params.id); 
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let id = toast.loading("Please wait...");

        try {
            const res = await axios.put(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/orders/${params.id}`, formData);
            if (res.data.success) {
                toast.update(id, {
                  render: res.data.message,
                  type: "success",
                  isLoading: false,
                });
              }
        } catch (error) {
            toast.update(id, {
                render: error.response?.data?.message || "An error occurred",
                type: "error",
                isLoading: false,
            });
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
              toast.dismiss(id);
            }, 3000);
        }
    };

    const saveChanges = async (data) => {
        try {
          setFormLoading(true);
          console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            console.log('done');
        }
    };

    return (
        <div className="p-0 py-6 sm:p-10">
            <h2 className="text-black font-semibold text-2xl mb-4 text-center">
                Update Payment Status 
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                    <label className="block mb-2 font-semibold">Payment Status</label>
                    <select
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="">Select</option>
                        <option key="success" value="success">{"success"}</option>
                        <option key="pending" value="pending">{"pending"}</option>
                        <option key="cancel" value="cancel">{"cancel"}</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Save
                </button>
            </form>

        </div>
    );
};

export default Page;