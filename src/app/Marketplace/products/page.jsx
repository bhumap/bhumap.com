import FeaturedProduct from "@/src/components/pageComponents/marketplace/FeaturedProduct";
import ProductCard from "@/src/components/pageComponents/marketplace/ProductCard";
import axios from "axios";
import Image from "next/image";
import React from "react";


const getProducts = async() =>{
     try {
         let res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products?status=Published`,{
          cache:"no-cache"
         });
         res = await res.json();
         return res
     } catch (error) {
        // alert(error.message);
        return null
     }
}

async function Page() {

   const data = await getProducts();

  const products = data?.message?.data

  console.log("chal>>>>>>>>>>>>>>>", data)

  const featuredProduct = [
    {
      id: 1,
      videoSrc:"https://media.istockphoto.com/id/1324141806/video/electric-car-charging-indicator-car-dashboard-charging-progress-green-energy-concept.mp4?s=mp4-640x640-is&k=20&c=n1slWP9RyX2QnI0C2HlVJtq0BIVk4u4kmLUK5pTyDhc=",
      logo:"https://s.alicdn.com/@sc02/kf/H707ddd18c89743ed889c712effde747fm.jpg_q60.jpg",
      companyName:"OIT Innovation",
      details:[
        {
          id: 1,
          title: "OIT Industrial Power Outlet 32A IEC Smart",
          description: "",
          image:
            "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
          price: "100",
        },
        {
          id: 2,
          title: "OIT Industrial Power Outlet 32A IEC Smart",
          description: "",
          image:
            "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
          price: "100",
        },
        {
          id: 3,
          title: "OIT Industrial Power Outlet 32A IEC Smart",
          description: "",
          image:
            "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
          price: "100",
        },
        {
          id: 4,
          title: "OIT Industrial Power Outlet 32A IEC Smart",
          description: "",
          image:
            "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
          price: "100",
        },
        {
          id: 5,
          title: "OIT Industrial Power Outlet 32A IEC Smart",
          description: "",
          image:
            "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
          price: "100",
        },
      ]
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="hidden md:flex flex-col gap-4 min-w-[200px]">
        <Image
          height={200}
          width={200}
          className="object-cover w-full h-auto rounded-lg"
          src="https://cdn.pixabay.com/photo/2016/09/22/20/56/urban-1688309_1280.jpg"
          alt="Urban"
        />
        <Image
          height={200}
          width={200}
          className="object-cover w-full h-auto rounded-lg"
          src="https://cdn.pixabay.com/photo/2016/09/22/20/56/urban-1688309_1280.jpg"
          alt="Urban"
        />
        <Image
          height={200}
          width={200}
          className="object-cover w-full h-auto rounded-lg"
          src="https://cdn.pixabay.com/photo/2016/09/22/20/56/urban-1688309_1280.jpg"
          alt="Urban"
        />
      </div>

      <div className="flex-1 space-y-4">
        {featuredProduct?.map((product, index) => (
          <FeaturedProduct key={index} {...product} />
        ))}
        {products?.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Page;
