'use client';
import Hero from "@/src/components/Hero";
import Investments from "@/src/components/Investments";
import PropertyCardsGrid from "../components/PropertyCardsGrid";
import { useEffect, useState } from "react";

// var fetchMyPropertiesNearbyYou = async () => {
//   try {
//     var res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/properties`, {
//       cache: "no-store",
//     });
//     res = await res.json();
//     return res.message;
//   } catch (error) {
//     console.log(error);
//   }
// };

const page = async () => {
  const [nearbyYouProperties, setNearbyYouProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log("Fetching properties");
        const baseUrl =
          process.env.NEXT_PUBLIC_DOMAIN || "https://www.bhumap.com";
        const res = await fetch(`${baseUrl}/api/properties`, {
          cache: "no-store",
        });
        const data = await res.json();
        setNearbyYouProperties(data.message);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <Hero />    
    
      <div>
      No properties available.
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <PropertyCardsGrid
          title="Properties Nearby You"
          properties={nearbyYouProperties}
        />
      </div>
      <Investments />
      <div className="max-w-6xl mx-auto p-4">
        <PropertyCardsGrid properties={nearbyYouProperties} title="Sponsored Properties" />
        <PropertyCardsGrid properties={nearbyYouProperties} title="Popular Properties" search={true} />
      </div>
    </div>
  );
};

export default page;
