import Image from "next/image";
import Link from "next/link";
import React from "react";

function FeaturedProduct() {
  const featuredProduct = [
    {
      id: 1,
      title: "OIT Industrial Power Outlet 32A IEC Smart",
      description: "",
      image:
        "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
      price: "$100",
    },
    {
      id: 2,
      title: "OIT Industrial Power Outlet 32A IEC Smart",
      description: "",
      image:
        "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
      price: "$100",
    },
    {
      id: 3,
      title: "OIT Industrial Power Outlet 32A IEC Smart",
      description: "",
      image:
        "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
      price: "$100",
    },
    {
      id: 4,
      title: "OIT Industrial Power Outlet 32A IEC Smart",
      description: "",
      image:
        "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
      price: "$100",
    },
    {
      id: 5,
      title: "OIT Industrial Power Outlet 32A IEC Smart",
      description: "",
      image:
        "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_1280.jpg",
      price: "$100",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-[95%] mx-auto shadow-md p-4 rounded-md gap-4 mt-5">
      <video className="rounded-xl w-full md:w-[30%]" controls>
        <source
          src="https://media.istockphoto.com/id/1324141806/video/electric-car-charging-indicator-car-dashboard-charging-progress-green-energy-concept.mp4?s=mp4-640x640-is&k=20&c=n1slWP9RyX2QnI0C2HlVJtq0BIVk4u4kmLUK5pTyDhc="
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col w-full md:w-2/3 gap-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <Image
              height={60}
              width={60}
              src="https://s.alicdn.com/@sc02/kf/H707ddd18c89743ed889c712effde747fm.jpg_q60.jpg"
              alt="Product Category"
              className="rounded-lg"
            />
            <div>
              <h3 className="text-sm font-medium">Electrical Equipment & Supplies</h3>
              <h3 className="text-sm text-gray-500">High-quality industrial products</h3>
            </div>
          </div>
          <button className="rounded-full border px-4 py-2 hover:bg-gray-100 transition">Contact Supplier</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProduct.map((product) => (
            <Link key={product.id} href="#" className="block">
              <div className="relative rounded-lg border overflow-hidden h-36">
                <Image
                  className="object-cover h-full w-full"
                  fill
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <p className="text-xs mt-1 line-clamp-2">{product.title}</p>
              <h3 className="font-semibold">{product.price}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
