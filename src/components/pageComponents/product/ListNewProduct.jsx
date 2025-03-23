"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const supplierTypes = [
  { id: "Manufacturer", name: "Manufacturer" },
  { id: "Wholesaler", name: "Wholesaler" },
  { id: "Retailer", name: "Retailer" },
];

export default function EditProductPage({ params }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    minOrder: "",
    supplier: "",
    supplierage: "",
    unit: "",
    rating: "",
    reviews: "",
    location:"",
    verified: false,
    supplierType: "Manufacturer",
    category_id: "",
    images: [],
    status: "Drafted",
  });
  const [categories, setCategories] = useState([]);
  const [uploadStatus, setuploadStatus] = useState(false);
  const router = useRouter()

  // Function to update product images in the database
  const updateProductImages = async (data) => {

    if(typeof data["category_id"] === 'object'){
      data["category_id"] = data['category_id']?._id
    }

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
     
    if(typeof formData["category_id"] === 'object'){
      formData["category_id"] = formData['category_id']?._id
    }

    axios
      .put(`/api/products/${params.id}`, { ...formData, status })
      .then((res) => {
        setFormData(res.data.data);
        toast.success(`Product saved as ${status}`);
        router.push("/portal/products");
      })
      .catch((err) => toast.error(err.message));
    console.log(formData,":::::")
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value,"test")
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append("file", file);

    setuploadStatus(true);

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
        setuploadStatus(false);
        toast.error("Failed to upload image");
        return;
      }

      setuploadStatus(false);

      const updatedImages = [...formData.images, ...data.data];
      setFormData((prev) => {
        const data = { ...prev, images: updatedImages };
        updateProductImages(data);
        return data;
      });

      // Update images in the database
      // updateProductImages({...prev, images:updatedImages});
    } catch (error) {
      setuploadStatus(false);
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
    
    axios
       .get("/api/categories")
       .then((res) =>{ setCategories(res.data.data); })
       .catch((err) => toast.error(err.message));
  }, [params.id]);

  return (
    <div className="max-w-3xl h-full mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-2">Upload Images</label>
        <input type="file" onChange={handleImageUpload} className="mb-2" />
        {uploadStatus && <p className="text-blue-500 text-sm">Uploading...</p>}
        <div className="flex mt-2 gap-2 overflow-x-scroll">
          {formData.images.map((image, index) => (
            <div
              key={index}
              className="relative shrink-0 h-40 w-40 border rounded-md"
            >
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
          { label: "Price", name: "price", type: "text" },
          { label: "Min Order Quantity", name: "minOrder", type: "text" },
          { label: "Unit", name: "unit", type: "text" },
          { label: "Supplier Name", name: "supplier", type: "text" },
          { label: "Supplier Age", name: "supplierage", type: "text" },
          { label: "Rating", name: "rating", type: "text" },
          { label: "Reviews Count", name: "reviews", type: "text" },
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
            { name: "supplierType",label:"Supplier Type", options: supplierTypes },
            { name: "category_id",label:"Select Category", options: categories },
          ].map(({ name, options,label }) => (
            <div key={name}>
              <label className="block font-medium mb-1">
               {label}
              </label>
              <select
                name={name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                { name === "supplierType" && <option defaultValue={formData[name]}>{formData[name]}</option>}
                { name === "category_id" && <option defaultValue={formData[name]?._id}>{formData[name]?.name}</option>}
                { options.map((opt,id) => (
                  <option key={id} value={opt?._id}>
                    {opt?.name }
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
