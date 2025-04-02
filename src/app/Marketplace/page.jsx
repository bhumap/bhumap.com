"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import tiles from "@/public/images/marketplace/tiles.jpg";
import timber from "@/public/images/marketplace/timber.jpg";
import plywood from "@/public/images/marketplace/plywood.avif";
import bricks from "@/public/images/marketplace/bricks.jpg";
import glass from "@/public/images/marketplace/glass.avif";
import sand from "@/public/images/marketplace/sand.avif";
import stone from "@/public/images/marketplace/stone.avif";
import marble from "@/public/images/marketplace/marbal.jpg";
import plaster from "@/public/images/marketplace/plaster.jpg";
import paint from "@/public/images/marketplace/paint.avif";
import granite from "@/public/images/marketplace/granite.jpg";
import Limestone from "@/public/images/marketplace/limestone.jpg";
import POP from "@/public/images/marketplace/plaster.jpg";

const Page = () => {
  
  const items = [
    { id: 1, name: "Tiles", title:"test1",description:"Premium Tile Product Range", image:tiles },
    { id: 1, name: "Cement", title:"test1",description:"Quality Cement Supply Collection", image:"https://img.icons8.com/?size=100&id=FSU2NoyEB9uz&format=png&color=000000" },
    { id: 2, name: "Timber", title:"test1",description:"Reliable Timber Supply Options", image:timber },
    { id: 3, name: "Wood", title:"test1",description:"High Quality Wood Selection", image:"https://img.icons8.com/?size=100&id=BEB8PPSQeZIx&format=png&color=000000" },
    { id: 4, name: "Plywood", title:"test1",description:"Extensive Plywood Material Range", image:plywood },
    { id: 5, name: "Brick", title:"test1",description:"High Quality Brick Selection", image:bricks },
    { id: 6, name: "Glass", title:"test1",description:"High Quality Glass Selection", image:glass },
    { id: 7, name: "Sand", title:"test1",description:"Bulk Sand Supply Options", image:sand },
    { id: 8, name: "Stone", title:"test1",description:"Extensive Stone Material Range", image: stone },
    { id: 9, name: "Mortar", title:"test1",description:" Bulk Mortar Supply Options", image:"https://img.icons8.com/?size=100&id=31639&format=png&color=000000" },
    { id: 10, name: "Ceramic", title:"test1",description:"Premium Ceramic Product Range", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 11, name: "Marble", title:"test1",description:"Reliable Marble Supply Options", image:marble },
    { id: 12, name: "Plaster", title:"test1",description:"Plaster for Every Budget", image:plaster },
    { id: 13, name: "Paint", title:"test1",description:"Bold and Beautiful Shades", image: paint },
    { id: 14, name: "Granite", title:"test1",description:"Durable Granite for Construction", image: granite },
    { id: 15, name: "Limestone", title:"test1",description:"Limestone for Construction Excellence", image:Limestone},
    { id: 16, name: "POP", title:"test1",description:"Innovative POP for Creative Designs", image:POP },
  ];

  return (
    <>
     <h1 className="text-3xl text-center my-4">A WIDE RANGE OF BUILDING MATERIALS</h1>
      <main class="card-container">
      {items.map((item,idx) => (
        <Link href={`/Marketplace/products?category=${item.name}`} key={idx} className="card">
        <h2 className="text-md font-semibold">{item?.name}</h2>
        <p class="symbol relative h-32">
          <Image className="mx-auto rounded-md" fill src={item?.image} alt={item?.name}/>
        </p>
        <p className="text-sm text-gray-500">{item.description}</p>
        </Link>
      ))}
    </main>
    </>
  );
};

export default Page;
