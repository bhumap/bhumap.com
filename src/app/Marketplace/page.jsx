import React from "react";
import { buildingMaterials } from "@/src/data";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="category2-box">
      <h1 className="heading">A WIDE RANGE OF BUILDING MATERIALS</h1>
      <ul>
        {buildingMaterials?.map((material, index) => (
          <li key={index}>
            <Link href={material.url}>
              <Image
                src={material.imageUrl}
                alt={material.name}
                width={40}
                height={40}
              />
              {material.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
