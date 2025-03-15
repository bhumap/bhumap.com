import FeaturedProduct from "@/src/components/pageComponents/marketplace/FeaturedProduct";
import ProductCard from "@/src/components/pageComponents/marketplace/ProductCard";
import Image from "next/image";
import React from "react";

function Page() {
  const products = [
    {
      title:
        "Tuya Control 120V WiFi Smart Plug, Alexa & Google Assistant Compatible, Remote Control, Timer, Energy Monitoring, No Hub Required, Easy Setup.",
      price: "708.00",
      minOrder: "100",
      supplier: "Shenzhen Tuya Smart Technology Co., Ltd.",
      duration: "2 years",
      rating: "4.9",
      reviews: "2",
      location: "Ahemadabad, India",
      verified: true,
      supplierType:"Dealer",
      images:[
        "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
      ]
    },
    {
    title: "Tuya 120V WiFi Smart Plug, Alexa & Google Assistant Compatible, Remote Control, Timer, No Hub Required",
    price: "750.00",
    minOrder: "50",
    supplier: "Shenzhen Tuya Smart Technology Co., Ltd.",
    duration: "2 years",
    rating: "4.8",
    reviews: "5",
    location: "Mumbai, India",
    verified: true,
    supplierType:"Manufacturer",
    images: [
      "https://cdn.pixabay.com/photo/2018/01/20/06/41/earphone-3093921_1280.jpg",
      "https://cdn.pixabay.com/photo/2018/01/20/06/41/earphone-3093921_1280.jpg",
      "https://cdn.pixabay.com/photo/2018/01/20/06/41/earphone-3093921_1280.jpg",
      "https://cdn.pixabay.com/photo/2018/01/20/06/41/earphone-3093921_1280.jpg",
    ]
  },
  {
    title: "Smart WiFi Plug 110V-240V, Voice Control with Alexa & Google, Timer & Energy Monitoring",
    price: "680.00",
    minOrder: "100",
    supplier: "Guangzhou Smart Home Tech Co., Ltd.",
    duration: "1.5 years",
    rating: "4.7",
    reviews: "8",
    location: "Delhi, India",
    verified: true,
    supplierType:"Vendor",
    images: [
      "https://cdn.pixabay.com/photo/2023/05/29/17/04/computer-8026591_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/05/29/17/04/computer-8026591_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/05/29/17/04/computer-8026591_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/05/29/17/04/computer-8026591_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/05/29/17/04/computer-8026591_1280.jpg",
    ]
  },
  {
    title: "WiFi Smart Plug with Alexa, Google Assistant & SmartThings, Remote Control, No Hub Needed",
    price: "720.00",
    minOrder: "75",
    supplier: "Shenzhen IoT Solutions Ltd.",
    duration: "3 years",
    rating: "4.9",
    reviews: "12",
    location: "Bangalore, India",
    verified: true,
    supplierType:"Manufacturer",
    images: [
      "https://cdn.pixabay.com/photo/2014/10/31/10/00/camera-510528_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/00/camera-510528_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/00/camera-510528_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/00/camera-510528_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/00/camera-510528_1280.jpg"
    ]
  },
  {
    title: "Mini Smart Plug, 120V WiFi Control with Alexa, Google Assistant, Energy Monitoring & Timer",
    price: "699.00",
    minOrder: "30",
    supplier: "Smart Living Innovations Pvt. Ltd.",
    duration: "2 years",
    rating: "4.6",
    reviews: "3",
    location: "Hyderabad, India",
    verified: false,
    supplierType:"Dealer",
    images: [
      "https://cdn.pixabay.com/photo/2014/10/31/10/01/camera-510530_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/01/camera-510530_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/01/camera-510530_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/01/camera-510530_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/10/31/10/01/camera-510530_1280.jpg",
    ]
  },
  {
    title: "WiFi Enabled Smart Plug 120V, Works with Alexa, Google Assistant, App & Voice Control",
    price: "730.00",
    minOrder: "60",
    supplier: "TechSmart Home Solutions",
    duration: "2.5 years",
    rating: "4.8",
    reviews: "7",
    location: "Chennai, India",
    verified: true,
    supplierType:"Vendor",
    images: [
      "https://cdn.pixabay.com/photo/2022/05/26/14/26/camera-7223045_1280.jpg",
      "https://cdn.pixabay.com/photo/2022/05/26/14/26/camera-7223045_1280.jpg",
      "https://cdn.pixabay.com/photo/2022/05/26/14/26/camera-7223045_1280.jpg",
      "https://cdn.pixabay.com/photo/2022/05/26/14/26/camera-7223045_1280.jpg"
    ]
  }
  ];

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
