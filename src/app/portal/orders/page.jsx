"use client";
import { useContext, useState, useEffect} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";
import Link from "next/link";

const Page = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [users, setUser] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    user: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          // setFetching(true);
          const res = await axios.get(
            `https://www.bhumap.com/api/orders`
          );
          setOrderData(res.data.message.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setFetching(false);
        }
      }
    };

    fetchData();
  }, [user]);


  return (
    <>
      <div className="w-full max-w-3xl bg-white rounded-lg p-4">
        <h1 className="text-2xl font-semibold text-gray-900">Order List</h1>
      </div>

      <section className="w-full py-5">
        <div className="max-w-6xl mx-auto bg-white border-t-2 p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="text-left">
                <tr className="text-gray-600 bg-gray-100">
                  <th className="py-3 px-5 text-sm font-semibold">Order Id</th>
                  <th className="py-3 px-5 text-sm font-semibold">Total Amount</th>
                  <th className="py-3 px-5 text-sm font-semibold">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.map((orderData, i) => (
                  <tr
                    key={orderData._id}
                    className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all`}
                  >
                    <td className="py-4 px-5 text-gray-800">{orderData.orderId}</td>
                    <td className="py-4 px-5 text-gray-600">{orderData.total}</td>
                    <td className="py-4 px-5 text-gray-600">{
                    orderData.isCompleted ? 'Completed' : 'Pending'
                    }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>

  );
};

export default Page;
