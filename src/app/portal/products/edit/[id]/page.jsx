import EditProductPage from "@/src/components/pageComponents/product/ListNewProduct";
import React from "react";

function Page({params}) {
 
  return <div className="overflow-y-auto">
    <EditProductPage params={params}/>
    {/* <EditProductPage params={params}/> */}
   </div>;
}

export default Page;
