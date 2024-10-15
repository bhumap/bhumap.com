"use client"
import PropertyCardsGrid from "../../../components/PropertyCardsGrid2";
import { IoArrowForwardSharp } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { isDev } from "@/src/backend/helpers/util";

const Page = async ({params}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/products?category_id=${params.id}`);
        console.log(response.data.message.data);
        setProducts(response.data.message.data);
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
    <div>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="params-title">{products[0]?.category_id?.name} <IoArrowForwardSharp /> ({products.length} products available)</h1>
          <PropertyCardsGrid
          properties={products}
        />
      </div>
    </div>
  );
};

export default Page;
