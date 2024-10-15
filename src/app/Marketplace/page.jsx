"use client"
import React, { useState, useEffect } from "react";
import { buildingMaterials } from "@/src/data";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { isDev } from "@/src/backend/helpers/util";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}/api/categories?page=${1}&&limit=${50}`);
        setCategories(response.data.message.data);
      } catch (err) {
        setError("Failed to load packages.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="category2-box">
      <h1 className="heading">A WIDE RANGE OF BUILDING MATERIALS</h1>
      <ul>
        {categories?.map((category, index) => (
          <li key={index}>
            <Link href={`/products/${category._id}`}>
              <Image
                src="https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png"
                alt={category.name}
                width={40}
                height={40}
              />
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
