"use client";

import Card from "@/src/components/Card";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [nearbyYouProperties, setNearbyYouProperties] = useState([]);

  useEffect(() => {
    const fetchMyPropertiesNearbyYou = async () => {
      try {
        const res = await fetch(`/api/properties`, {
          cache: "no-store",
        });
        const data = await res.json();
        setNearbyYouProperties(data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPropertiesNearbyYou();
  }, []);

  const filteredProperties = nearbyYouProperties?.data?.filter(
    (property) => property.group
  );

  return (
    <div className="overflow-hidden h-auto card-mm">
      <div className="h-auto m-auto w-11/12 mx-auto my-8 overflow-hidden grid sm:grid-cols-1 pb-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {filteredProperties?.map((e) => {
          return <Card key={e._id} property={e} />;
        })}
      </div>
    </div>
  );
};

export default Page;
