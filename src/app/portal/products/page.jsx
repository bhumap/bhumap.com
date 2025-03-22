"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faIndianRupeeSign,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { isDev } from "@/src/backend/helpers/util";
import NewListingModel from "@/src/components/common/NewListingModel";
import DraftProductCard from "@/src/components/pageComponents/product/DraftCard";
import AddNewCategory from "@/src/components/common/AddNewCategory";

const Page = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  var [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            isDev()
              ? process.env.NEXT_PUBLIC_LOCAL_URL
              : process.env.NEXT_PUBLIC_DOMAIN
          }api/products?page=${1}&limit=${10}`
        );
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
            <div className="flex flex-wrap items-center justify-between mt-2 mb-4">
              <h2 className="text-slate-700 font-semibold text-xl">Products</h2>
              <div className="flex gap-2">
                 <AddNewCategory/>
                 <NewListingModel />
              </div>
            </div>
            <div className="text-center gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {products?.length ? (
                products.map((item, id) => (
                  <Link href={`/portal/products/edit/${item?._id}`} key={id}>
                    <DraftProductCard product={item} />
                  </Link>
                ))
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
