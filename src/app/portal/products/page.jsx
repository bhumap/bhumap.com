"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faIndianRupeeSign, faPlus } from "@fortawesome/free-solid-svg-icons";
import { isDev } from "@/src/backend/helpers/util";

const Page = () => {
  const [products, setProducts] = useState([]);
    const router = useRouter();
    const [error, setError] = useState(false);
    const { user } = useContext(AuthContext);
  
    var [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/products?page=${1}&limit=${10}`);
          setProducts(response.data.message.data);
        } catch (err) {
          setError("Failed to load packages.");
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, [user]);
  
    return (
      <div className="py-2 sm:p-10">
        {user?.userType == "Vendor" && (
          <div className="flex flex-col gap-6">
            {/* Viewed */}
            <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-700 font-semibold text-xl">
                    Products
                </h2>
                <a href="./products/add"
                    className="bg-primary text-white font-bold py-2 px-4 rounded ml-auto">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add New Product
                </a>
            </div>
              <div className="text-center">
                {products?.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border border-gray-200 ">Image</th>
                                <th className="p-2 border border-gray-200 ">Title</th>
                                <th className="p-2 border border-gray-200 ">Category</th>
                                <th className="p-2 border border-gray-200 ">Min Pieces</th>
                                <th className="p-2 border border-gray-200 ">Price (<FontAwesomeIcon icon={faIndianRupeeSign} className="mr-1" />)</th>
                                <th className="p-2 border border-gray-200 ">UOM</th>
                                <th className="p-2 border border-gray-200 ">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products?.map((v) => (
                                <tr key={v._id} className="hover:bg-gray-50">
                                <td className="p-2 border border-gray-200">
                                    <Link href={`products/edit/${v._id}`}>
                                    <img
                                        className="w-20 h-20 object-cover rounded-md"
                                        src={
                                        v?.images[0]?.secure_url ||
                                        "/images/image.png"
                                        }
                                        alt=""
                                    />
                                    </Link>
                                </td>
                                <td className="p-2 border border-gray-200">
                                    <Link
                                    href={`products/edit/${v._id}`}
                                    className="font-medium text-primary"
                                    >
                                    {v?.name}
                                    </Link>
                                </td>
                                <td className="p-2 border border-gray-200">
                                    {v?.category_id?.name || "Undefined"}
                                </td>
                                <td className="p-2 border border-gray-200">
                                    {v?.min_qty || "Undefined"}
                                </td>
                                <td className="p-2 border border-gray-200">
                                    {v?.price}/-
                                </td>
                                <td className="p-2 border border-gray-200">
                                    {v?.uom}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  <a href={`products/edit/${v._id}`} className="font-medium text-primary">
                                      <FontAwesomeIcon icon={faPencil} className="mr-1" />Edit
                                  </a>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                  <div>
                    {loading ? (
                      <h1>Loading...</h1>
                    ) : (
                      <>
                        <p className="text-gray-400 text-sm text-left">
                          No Product Yet!
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Page;