"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";

const MyProducts = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    var [properties, setProperties] = useState({});
  
    var [loading, setLoading] = useState(false);
  
    return (
      <div className="py-4 sm:p-10">
        {user?.userType == "Vendor" && (
          <div className="flex flex-col gap-6">
            {/* Viewed */}
            <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-700 font-semibold text-xl">
                    Product List
                </h2>
                <a href="./products/add"
                    className="bg-primary text-white font-bold py-2 px-4 rounded ml-auto"
                >
                    Add New Product
                </a>
            </div>
              <div className="text-center">
                {properties?.data?.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border border-gray-200 text-left">Image</th>
                                <th className="p-2 border border-gray-200 text-left">Title</th>
                                <th className="p-2 border border-gray-200 text-left">Category</th>
                                <th className="p-2 border border-gray-200 text-left">Pieces</th>
                                <th className="p-2 border border-gray-200 text-left">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {properties?.data.map((v) => (
                                <tr key={v._id} className="hover:bg-gray-50">
                                <td className="p-2 border border-gray-200">
                                    <Link href={`/property/${v.property?._id}`}>
                                    <img
                                        className="w-20 h-20 object-cover rounded-md"
                                        src={
                                        v?.property?.images[0]?.secure_url ||
                                        "/images/image.png"
                                        }
                                        alt=""
                                    />
                                    </Link>
                                </td>
                                <td className="p-2 border border-gray-200">
                                    <Link
                                    href={`/property/${v.property?._id}`}
                                    className="font-medium text-primary"
                                    >
                                    {v?.property?.title}
                                    </Link>
                                </td>
                                <td className="p-2 border border-gray-200">
                                    {v?.property?.category || "Undefined"}
                                </td>
                                <td className="p-2 border border-gray-200">
                                    {v?.property?.minOrder || "Undefined"}
                                </td>
                                <td className="p-2 border border-gray-200">
                                    {v?.property?.price}
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
  
  export default MyProducts;