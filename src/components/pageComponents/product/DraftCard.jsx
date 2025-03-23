import { ClipboardEdit } from "lucide-react";
import Image from "next/image";

export default function DraftProductCard({ product }) {
  return (
    <div className="border w-full rounded-lg shadow-md p-4 bg-white w-64">
      {/* Product Image */}
      <div className="w-full relative h-auto min-h-40 relative mb-2">
        <Image
          src={product?.images[0]}
          alt={product?.title}
          fill
          className="object-cover rounded-md"
        />
         <ClipboardEdit className="absolute end-1 top-1 cursor-pointer bg-green-100 border rounded-full border-green-100 p-1" />
      </div>

      {/* Product Title */}
      <h3 className="text-lg font-semibold truncate">{product?.title}</h3>

      {/* Product Price */}
      {/* <p className="text-gray-600 font-medium">${product?.price}</p> */}

      {/* Status */}
      <span
        className={`inline-block px-2 py-1 mt-2 text-xs text-black-800 italic font-semibold rounded 
        ${product?.status === "Drafted" && "bg-yellow-200 "}
        ${product?.status === "Published" && "bg-green-200 "}
        ${product?.status === "Inactive" && "bg-red-200"}
      `}
      >
        {product?.status}
      </span>
    </div>
  );
}
