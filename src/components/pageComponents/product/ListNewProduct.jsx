"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const supplierTypes = ["Manufacturer", "Wholesaler", "Retailer"];
const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Home Appliances" },
  { id: "3", name: "Automotive" },
];

export default function EditProductPage({ params }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    minOrder: "",
    supplier: "",
    duration: "",
    rating: "",
    reviews: "",
    location: "",
    verified: false,
    supplierType: "Manufacturer",
    category_id: "",
    images: [],
    status: "Drafted",
  });

  // Function to update product images in the database
  const updateProductImages = async (data) => {
    try {
      await axios.put(`/api/products/${params.id}`, data);
      toast.success("Product images updated successfully");
    } catch (error) {
      console.error("Failed to update product images:", error);
      toast.error("Failed to update images. Try again.");
    }
  };

  // Handle form submission
  const handleSubmit = (status) => {
    axios
      .put(`/api/products/${params.id}`, { ...formData, status })
      .then((res) => {
        setFormData(res.data.data);
        toast.success(`Product saved as ${status}`);
      })
      .catch((err) => toast.error(err.message));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/upload/file`,
        {
          method: "POST",
          body: imageFormData,
        }
      );
      const data = await response.json();

      if (!data?.data) {
        toast.error("Failed to upload image");
        return;
      }

      const updatedImages = [...formData.images, ...data.data];
      setFormData((prev) => {
        const data = { ...prev, images: updatedImages };
        updateProductImages(data);
        return data;
      });

      // Update images in the database
      // updateProductImages({...prev, images:updatedImages});
    } catch (error) {
      console.error("Image Upload Error:", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  // Remove image from form data and update in DB
  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    console.log(updatedImages);
    setFormData((prev) => {
      const data = { ...prev, images: updatedImages };
      updateProductImages(data);
      return data;
    });
  };

  // Fetch product data on component mount
  useEffect(() => {
    axios
      .get(`/api/products/${params.id}`)
      .then((res) => setFormData(res.data.data))
      .catch((err) => toast.error(err.message));
  }, [params.id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-2">Upload Images</label>
        <input type="file" onChange={handleImageUpload} className="mb-2" />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.images.map((image, index) => (
            <div key={index} className="relative h-40 w-40 border rounded-md">
              <Image
                src={image}
                fill
                alt="Product"
                className="object-cover rounded-md"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full p-1"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-4">
        {[
          { label: "Product Title", name: "title", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Min Order Quantity", name: "minOrder", type: "number" },
          { label: "Supplier Name", name: "supplier", type: "text" },
          { label: "Warranty Duration", name: "duration", type: "text" },
          { label: "Rating", name: "rating", type: "number" },
          { label: "Reviews Count", name: "reviews", type: "number" },
          { label: "Location", name: "location", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}

        {/* Verified Checkbox */}
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
          {[
            { name: "supplierType", options: supplierTypes },
            { name: "category_id", options: categories },
          ].map(({ name, options }) => (
            <div key={name}>
              <label className="block font-medium mb-1">
                {name.replace("_", " ")}
              </label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                {options.map((opt) => (
                  <option key={opt.id || opt} value={opt.id || opt}>
                    {opt.name || opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          {["Inactive", "Drafted", "Published"].map((status) => (
            <button
              key={status}
              className={`py-2 px-4 rounded-md text-white ${
                status === "Inactive"
                  ? "bg-red-500"
                  : status === "Drafted"
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }`}
              onClick={() => handleSubmit(status)}
            >
              {status === "Inactive"
                ? "Delete"
                : status === "Drafted"
                ? "Save as Draft"
                : "Publish"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
