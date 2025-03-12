import FeaturedProduct from "@/src/components/pageComponents/marketplace/FeaturedProduct";
import ProductCard from "@/src/components/pageComponents/marketplace/ProductCard";
import SmartPlugCard from "@/src/components/pageComponents/marketplace/ProductCard";
import Image from "next/image";
import React from "react";

function Page() {

  return <div className="flex">
     <div className="relative hidden md:block h-screen w-[20%]">
         <Image className="h-full w-full" fill src={"https://cdn.pixabay.com/photo/2016/09/22/20/56/urban-1688309_1280.jpg"}/>
     </div>
     <div className="">
          <FeaturedProduct/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
     </div>
  </div>;
}

export default Page;
