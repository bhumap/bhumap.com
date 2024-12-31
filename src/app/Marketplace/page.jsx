"use client"
import Image from "next/image";
import React from "react";


const Page = () => {
  
  const items = [
    { id: 1, name: "Tiles", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=21936&format=png&color=000000" },
    { id: 1, name: "Cement", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=FSU2NoyEB9uz&format=png&color=000000" },
    { id: 2, name: "Timber", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=6530&format=png&color=000000" },
    { id: 3, name: "Wood", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=BEB8PPSQeZIx&format=png&color=000000" },
    { id: 4, name: "Plywood", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=GsXSGKwhXkad&format=png&color=000000" },
    { id: 5, name: "Brick", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=u7VLUZ413KGF&format=png&color=000000" },
    { id: 6, name: "Glass", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 6, name: "Sand", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 6, name: "Stone", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=32185&format=png&color=000000" },
    { id: 6, name: "Mortar", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=31639&format=png&color=000000" },
    { id: 6, name: "Ceramic", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 6, name: "Marble", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 6, name: "Plaster", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 6, name: "Paint", title:"test1",description:"test description", image:"https://img.icons8.com/?size=100&id=O9TF9KJi_P_w&format=png&color=000000" },
    { id: 6, name: "Granite", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 6, name: "Limestone", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
    { id: 6, name: "POP", title:"test1",description:"test description", image:"https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-icon-4/category-49.png" },
  ];

  return (
    <>
     <h1 className="text-3xl text-center my-4">A WIDE RANGE OF BUILDING MATERIALS</h1>
      <main class="card-container">
      {items.map((item,idx) => (
        <div key={idx} className="card">
        <h2 className="text-md">{item.name}</h2>
        <p class="symbol">
          <Image className="mx-auto" width={100} height={120} src={item.image} alt={item.name}/>
        </p>
        <p>{item.description}</p>
        </div>
      ))}
    </main>
    </>
  );
};

export default Page;
