"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

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
    location: "",
    verified: false,
    supplierType: "Manufacturer",
    category_id: "",
    images: [],
    features: [],
    catalog: "",
    status: "Drafted",
  });
  const [categories, setCategories] = useState([]);
  const [uploadStatus, setuploadStatus] = useState(false);
  const router = useRouter();

  // Function to update product images in the database
  const updateFileUpload = async (data, filetype) => {
    if (typeof data["category_id"] === "object") {
      data["category_id"] = data["category_id"]?._id;
    }

    try {
      await axios.put(`/api/products/${params.id}`, data);
      toast.success(`${filetype} updated successfully`);
    } catch (error) {
      console.error("Failed to update product images:", error);
      toast.error(`Failed to update ${filetype}. Try again.`);
    }
  };

  // Handle form submission
  const handleSubmit = (status) => {
    if (typeof formData["category_id"] === "object") {
      formData["category_id"] = formData["category_id"]?._id;
    }

    axios
      .put(`/api/products/${params.id}`, { ...formData, status })
      .then((res) => {
        setFormData(res.data.data);
        toast.success(`Product saved as ${status}`);
        router.push("/portal/products");
      })
      .catch((err) => toast.error(err.message));
    console.log(formData, ":::::");
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "test");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to update features
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // Function to add a new feature input
  const addFeatureField = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  // Function to remove a feature input
  const removeFeatureField = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // Handle image upload
  const handlefileUpload = async (e, name, type) => {
    const file = e.target.files[0];
    if (!file) return;
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

      return data;
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
      updateFileUpload(data, "images");
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
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => toast.error(err.message));
  }, [params.id]);

  return (
    <div className="max-w-3xl h-full mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-2">Upload Images</label>
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files[0];
            console.log(file.type);

            if (
              file.type !== "image/jpeg" &&
              file.type !== "image/png" &&
              file.type !== "image/jpg" &&
              file.type !== "image/gif"
            ) {
              toast.error("Only JPEG, PNG, JPG and GIF files are allowed");
              return;
            }

            const data = await handlefileUpload(e, name, file);
            const updatedImages = [...formData.images, ...data.data];
            setFormData((prev) => {
              const data = { ...prev, images: updatedImages };
              updateFileUpload(data, "images");
              return data;
            });
          }}
          className="mb-2"
        />
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

      {/* Upload Product Catalog Pdf */}
      <div className="mt-4">
        <label htmlFor="product_catalog" className="flex justify-between">
          <span className="font-semibold">Product Catalog</span>
          <span className="text-sm text-gray-400 italic text-red-300">
            Pdf formate*
          </span>
        </label>
        <input
          id="product_catalog"
          name="product_catalog"
          className="border-dashed mt-3"
          type="file"
          // value={formData.catalog}
          onChange={async (e) => {
            const file = e.target.files[0];
            console.log(file);
            if (file.type !== "application/pdf") {
              toast.error("only pdf formate allowed");
              return;
            }

            const data = await handlefileUpload(e, name, file);
            const updatedCatalog = data.data[0];
            setFormData((prev) => {
              const data = { ...prev, catalog: updatedCatalog };
              updateFileUpload(data, "catalog");
              return data;
            });
          }}
        />
        <div className="flex gap-2 items-center flex-wrap justify-between">
          {formData.catalog && (
            <a
              href={formData.catalog}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Catalog
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => {
                const data = { ...prev, catalog: "" };
                updateFileUpload(data, "catalog");
                return data;
              });
            }}
            className="text-xs text-white mt-2 text-red-300 bg-red-400 p-2 rounded-md"
          >
            Remove
          </button>
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
            {
              name: "supplierType",
              label: "Supplier Type",
              options: supplierTypes,
            },
            {
              name: "category_id",
              label: "Select Category",
              options: categories,
            },
          ].map(({ name, options, label }) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <select
                name={name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                {name === "supplierType" && (
                  <option defaultValue={formData[name]}>
                    {formData[name]}
                  </option>
                )}
                {name === "category_id" && (
                  <option defaultValue={formData[name]?._id}>
                    {formData[name]?.name}
                  </option>
                )}
                {options.map((opt, id) => (
                  <option key={id} value={opt?._id}>
                    {opt?.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Product Features - Dynamic Input Fields */}
        <div>
          <label className="block font-medium mb-1 flex justify-between">
            <span>Product Features</span>
            <span className="text-sm text-gray-400 italic">
              max char length 50
            </span>
          </label>
          {formData?.features?.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                maxLength={50}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full p-2 border-dashed bg-primary-200 rounded-md"
                placeholder="Enter a feature"
              />
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removeFeatureField(index)}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            onClick={addFeatureField}
          >
            + Add Feature
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex md:flex-row flex-col  gap-2 justify-between mt-6">
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
