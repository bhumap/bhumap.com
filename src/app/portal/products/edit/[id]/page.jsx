"use client";
import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import axios from 'axios';
import { toast } from "react-toastify";

const Page = ({ params }) => {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        min_qty: 1,
        price: 0,
        uom: "",
        description: "",
        category_id: "",
        images: [],
        status: "",
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/categories?page=${1}&&limit=${50}`);
                setCategories(response.data.message.data);
            } catch (error) {
                setCategories([]);
            }
        };

        const fetchProduct = async (id) => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(response.data.data);
                const {_id, ...restProductDetails} = response.data.data;
                setFormData({...formData, ...restProductDetails});
            } catch (error) {
                setCategories([]);
            }
        };

        fetchCategory();
        fetchProduct(params.id);

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedFormData = {
            ...formData,
            images: formData.images.slice()
        };
        var id = toast.loading("Please wait...");
        try {
            const res = await axios.put(`http://localhost:3000/api/products/${params.id}`, updatedFormData);
            if (res.data.success) {
                toast.update(id, {
                  render: res.data.message,
                  type: "success",
                  isLoading: false,
                });
              }
        } catch (error) {
            toast.update(id, {
                render: error.response?.data?.message || "An error occurred",
                type: "error",
                isLoading: false,
            });
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
              toast.dismiss(id);
            }, 3000);
        }
    };

    const saveChanges = async (data) => {
        try {
          setFormLoading(true);
          console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            console.log('done');
        }
    };

    return (
        <div className="p-0 py-6 sm:p-10">
            <h2 className="text-black font-semibold text-2xl mb-4 text-center">
                Update Products
            </h2>
            <Toaster />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`relative col-span-2`}>
                <h2 className="font-semibold text-md mb-1">Products Images </h2>
                {formData.images?.length ? (
                    <p className="pb-2 text-gray-600">
                    {formData.images?.length-1}/8 images selected.
                    </p>
                ) : null}

                {formData.images.length ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {formData.images?.slice().map((v, i) => {
                        const handleRemoveImage = (index) => {
                            // Create a new array without the image at the selected index
                            const updatedImages = formData.images.filter((_, idx) => idx !== index);
                            setFormData({
                                ...formData,
                                images: updatedImages,
                            });
                        };
                        
                        return (
                        <div
                            key={i}
                            className="rounded-md group overflow-hidden relative border"
                        >
                            <Image
                            className="w-full h-full object-cover"
                            src={v.secure_url}
                            alt=""
                            height="100"
                            width="100"
                            />
                            <div className="hidden absolute top-0 left-0 w-full h-full bg-black/40 group-hover:flex justify-end items-end p-2">
                            <i className="bx text-white hover:bg-black/50 p-1 rounded-md cursor-pointer bxs-trash" onClick={() => handleRemoveImage(i)}></i>
                            </div>
                        </div>
                        );
                    })}

                    {formData.images.length != 8 && (
                        <CldUploadWidget
                        options={{
                            cropping: "server",
                            cropping_aspect_ratio: 1.5 / 1,
                        }}
                        uploadPreset={
                            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                        }
                        onSuccess={(res) => {
                            var imgs = formData.images;
                            var croppedImageUrl = res.info?.secure_url;
                            if (res?.info?.coordinates?.custom[0]) {
                            const [x, y, width, height] =
                                res?.info?.coordinates?.custom[0];
                            var croppedImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/${res?.info?.public_id}.png`;
                            }

                            imgs.push({
                                public_id: res.info.public_id,
                                secure_url: croppedImageUrl,
                            });
                            setFormData({ ...formData, images: imgs });
                            saveChanges({ ...formData, images: imgs });
                            document.body.style.overflow = "auto";
                        }}
                        >
                        {({ open }) => {
                            return (
                            <label
                                onClick={() => open()}
                                htmlFor="images"
                                className="rounded-md p-4 cursor-pointer hover:bg-gray-100 flex flex-col justify-center items-center group overflow-hidden relative border"
                            >
                                <i className="bx mb-2 bx-images"></i>
                                <div>More Images</div>
                            </label>
                            );
                        }}
                        </CldUploadWidget>
                    )}
                    </div>
                ) : (
                    <CldUploadWidget
                    options={{
                        cropping: "server",
                        cropping_aspect_ratio: 1.5 / 1,
                    }}
                    uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                    onSuccess={(res) => {
                        var imgs = formData.images;
                        var croppedImageUrl = res.info?.secure_url;
                        if (res?.info?.coordinates?.custom[0]) {
                        const [x, y, width, height] =
                            res?.info?.coordinates?.custom[0];
                        var croppedImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/${res?.info?.public_id}.png`;
                        }
                        imgs.push({
                        public_id: res.info.public_id,
                        secure_url: croppedImageUrl,
                        });
                        setFormData({ ...formData, images: imgs });
                        saveChanges({ ...formData, images: imgs });
                        document.body.style.overflow = "auto";
                    }}
                    >
                    {({ open }) => {
                        return (
                        <label
                            onClick={() => open()}
                            htmlFor="images"
                            className="border text-xl bg-primary/5 cursor-pointer hover:bg-primary/10 border-dashed rounded-md border-primary p-4 flex justify-center items-center"
                        >
                            <i className="bx mr-2 bx-images"></i> Select Images
                        </label>
                        );
                    }}
                    </CldUploadWidget>
                )}
                </div>
                {/* Name */}
                <div>
                    <label className="block mb-2 font-semibold">Name</label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Min Quantity</label>
                    <input
                    type="number"
                    name="min_qty"
                    value={formData.min_qty}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-2 font-semibold">Price</label>
                    <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                {/* Unit of Measurement (UOM) */}
                <div>
                    <label className="block mb-2 font-semibold">UOM</label>
                    <input
                    type="text"
                    name="uom"
                    value={formData.uom}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                {/* Category ID */}
                <div>
                    <label className="block mb-2 font-semibold">Category ID</label>
                    <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="">Select</option>
                        {categories.map((status) => (
                            <option key={status._id} value={status._id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-2 font-semibold">Status</label>
                    <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    >
                    <option value="">Select</option>
                    <option value="drafted">Drafted</option>
                    <option value="publish">Publish</option>
                    <option value="delete">Delete</option>
                    <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Page;