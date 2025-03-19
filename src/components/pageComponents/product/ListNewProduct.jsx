"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const supplierTypes = ["Manufacturer", "Wholesaler", "Retailer"];
const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Home Appliances" },
  { id: "3", name: "Automotive" },
];

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Prefill data from params
  const [formData, setFormData] = useState({
    title: searchParams.get("title") || "",
    price: searchParams.get("price") || "",
    minOrder: searchParams.get("minOrder") || "",
    supplier: searchParams.get("supplier") || "",
    duration: searchParams.get("duration") || "",
    rating: searchParams.get("rating") || "",
    reviews: searchParams.get("reviews") || "",
    location: searchParams.get("location") || "",
    verified: searchParams.get("verified") === "true",
    supplierType: searchParams.get("supplierType") || "Manufacturer",
    category_id: searchParams.get("category_id") || "",
    images: searchParams.getAll("images") || [],
    status: searchParams.get("status") || "Drafted",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (status) => {
    // Here, you would send data to the backend via API
    console.log({ ...formData, status });
    alert(`Product saved as ${status}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white ">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      
      <div className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Product Title"
          className="w-full p-2 border rounded-md"
        />

        {/* Price & Min Order */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="minOrder"
            value={formData.minOrder}
            onChange={handleInputChange}
            placeholder="Min Order Quantity"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Supplier & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            placeholder="Supplier Name"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Warranty Duration"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Rating & Reviews */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            placeholder="Rating"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="reviews"
            value={formData.reviews}
            onChange={handleInputChange}
            placeholder="Reviews Count"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Location */}
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="w-full p-2 border rounded-md"
        />

        {/* Verified */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="verified"
            checked={formData.verified}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, verified: e.target.checked }))
            }
          />
          <span>Verified Supplier</span>
        </label>

        {/* Supplier Type & Category */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="supplierType"
            value={formData.supplierType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            {supplierTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-2">Upload Images</label>
          <input type="file" multiple onChange={handleImageUpload} />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  width={80}
                  height={80}
                  alt="Product Image"
                  className="rounded-md"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
                  onClick={() => removeImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            onClick={() => handleSubmit("Inactive")}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={() => handleSubmit("Drafted")}
          >
            Save as Draft
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={() => handleSubmit("Published")}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
