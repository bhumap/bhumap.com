import Image from "next/image";

export default function DraftProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-64">
      {/* Product Image */}
      <div className="w-full h-40 relative mb-2">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      {/* Product Title */}
      <h3 className="text-lg font-semibold truncate">{product.title}</h3>
      
      {/* Product Price */}
      <p className="text-gray-600 font-medium">${product.price}</p>
      
      {/* Status */}
      <span className="inline-block px-2 py-1 mt-2 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded">
        {product.status}
      </span>
    </div>
  );
}
