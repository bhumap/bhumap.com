"use client"
import PropertyCardsGrid from "../../../components/PropertyCardsGrid2";
import { IoArrowForwardSharp } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = async ({params}) => {
  // const alldata = await fetchMyPropertiesNearbyYou(params);
  // console.log(alldata);
  // const nearbyYouProperties = alldata?.data?.filter(property => property.category === params.id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products?category_id=${params.id}`);
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
      {/* <div className="max-w-6xl mx-auto p-4">
        <h1 className="params-title">{params.id} <IoArrowForwardSharp /> ({nearbyYouProperties.length} products available)</h1>
          <PropertyCardsGrid
          properties={nearbyYouProperties}
        />
      </div> */}
    </div>
  );
};

export default Page;
