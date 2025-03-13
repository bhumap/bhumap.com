import FeaturedProduct from "@/src/components/pageComponents/marketplace/FeaturedProduct";
import ProductCard from "@/src/components/pageComponents/marketplace/ProductCard";
import Image from "next/image";
import React from "react";

function Page() {
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

      <div className="flex-1 space-y-4 overflow-y-auto">
          <FeaturedProduct />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
      </div>
    </div>
  );
}

export default Page;
