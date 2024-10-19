"use client"
import React, { useContext, useState } from "react";
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import { CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import { toast } from "react-toastify";
import axios from "axios";
import { isDev } from "@/src/backend/helpers/util";
import { useRouter } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const package_id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: [{ secure_url: "", public_id: "" }],
  });
  var router = useRouter();

  const [utr_number, setUtrNumber] = useState('');
  
  const changeHandler = (e) => {
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
      amount: 1100,
      type:'recharge',
      utr_number: utr_number,
      description:'',
      images: formData.images.slice(1)
    };

    var id = toast.loading("Please wait...");

    try {
      // console.log(updatedFormData);
      const res = await axios.post(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/transactions`, updatedFormData);
      if (res.data.success) {
          toast.update(id, {
            render: res.data.message,
            type: "success",
            isLoading: false,
          });
          router.push("/portal/Wallet");
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
  }

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
    <>
    {/* Header Section */}
    <div className="w-full p-4 bg-gray-100 shadow-md mb-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center">
        Recharge your wallet with ₹1100 and get ₹25000 in your wallet.
      </h3>
    </div>
  
    <div className="max-w-6xl mx-auto px-4 mt-14 py-6 sm:py-10 flex flex-col sm:flex-row items-start">
      {/* QR Code Section */}
      <div className="flex-shrink-0 w-full sm:w-1/2 p-4">
        <div className="bg-[rgb(210,103,72)] shadow-lg rounded-lg p-6 flex flex-col items-center">
          <Image
            src="/images/qr-code.jpg"
            alt="QR Code"
            width={200}
            height={200}
            priority
            className="rounded-md"
          />
          <p className="mt-4 text-center text-white font-medium">
            Scan this QR code to complete your payment quickly and securely.
          </p>
        </div>
      </div>
  
      {/* Form Section */}
      <div className="w-full sm:w-1/2 p-4">
        <h2 className="text-2xl font-bold mt-4 text-gray-800 text-center md:mb-2">Enter Details After Payment</h2>
        <form className="bg-white rounded-lg p-6 space-y-4 shadow-md" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Recharge Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              required
              readOnly
              disabled
              value={1100}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="utr-number" className="block text-sm font-medium text-gray-700">UTR Number</label>
            <input
              type="text"
              id="utr_number"
              name="utr_number"
              onChange={(e) => setUtrNumber(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="payment-screenshot" className="block text-sm font-medium text-gray-700">Upload Payment Screenshot</label>
            {formData.images.length ? (
                    <div>
                    {formData.images?.slice(1).map((v, i) => {
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
                                <div>Select Images</div>
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
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </>
  
  );
};

export default Page;
