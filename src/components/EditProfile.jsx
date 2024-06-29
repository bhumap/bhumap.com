"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Avatar from "react-avatar-edit";

const EditProfile = () => {
  const { user, refetch } = useContext(AuthContext);

  // For Avatar Editing
  const [tempImage, setTempImage] = useState("");
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [edited, setEdited] = useState(false);

  const routehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEdited(true);

    if (name.startsWith("email")) {
      setFormData({ ...formData, email: { [name.split(".")[1]]: value } });
      return;
    }

    if (name.startsWith("phone")) {
      setFormData({ ...formData, phone: { [name.split(".")[1]]: value } });
      return;
    }

    if (name === "photo") {
      setTempImage(e.target.files[0]);
      setFormData({ ...formData, photo: e.target.files[0] });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const UpdateProfile = async (imgURL) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/auth/edit`, {
        ...formData,
        photo: imgURL || user?.photo,
      });
      toast.success("Profile Updated Successfully!");
      setEdited(false);
      refetch();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
      setPreview(null)
    }
  };

  const uploadImageToCloudinaryAndProfileUpdate = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("file", tempImage);
      data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      var folderName = `users/${new Date().getFullYear()}/${new Date().toLocaleString(
        "default",
        { month: "long" }
      )}`;
      data.append("folder", folderName);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          body: data,
          method: "POST",
        }
      );

      const jsonRes = await res.json();

      UpdateProfile(jsonRes.secure_url);
    } catch (error) {
      alert("Something wrong! while Uplading images");
      return false;
    }
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    UpdateProfile();
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);


  return (
    <>
      <Toaster />
      <form
        className="grid sm:p-4 py-10 md:p-8 grid-cols-3"
        onSubmit={sumbitHandler}
      >
        <div className="col-span-3 md:col-span-2">
          <h2 className="text-slate-700 font-semibold text-2xl mb-4">
            <Link href="/portal/profile">
              <i className="bx bx-arrow-back"></i>
            </Link>{" "}
            Edit Profile
          </h2>

          <div className="relative group border rounded-full w-32 h-32 mb-6">
            <img
              alt="Image alternate Text"
              src={user?.photo || "/images/user.png"}
              className="h-full w-full rounded-full object-cover"
            />
            <div
              className="bg-[#00000095]  rounded-full w-6 h-6 flex justify-center items-center top-2 right-2 absolute bottom-0 transition-all cursor-pointer text-center"
              onClick={() => setPreview(user?.photo || true)}
            >
              <i className="bx bx-pencil text-white"></i>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 mb-4">
            {/* Full Name */}
            <div className="flex col-span-2 md:col-span-1 flex-col">
              <label
                className="text-[#333441d8] text-sm mb-1"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={routehandler}
                value={formData?.fullName}
                className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
              />
            </div>

            {/* Username */}
            <div className="flex col-span-2 md:col-span-1 flex-col">
              <label
                className="text-[#333441d8] text-sm mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                title="Username can't be updated!"
                onChange={routehandler}
                value={formData?.username}
                disabled={true}
                className="rounded-lg py-2 border text-gray-400 focus:text-[#1553A1] border-gray-200 focus:border-[#1554a177] cursor-not-allowed select-none"
              />
            </div>

            {/* Email */}
            <div className="flex col-span-2 md:col-span-1 flex-col">
              <label className="text-[#333441d8] text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email.value"
                placeholder="Email"
                onChange={routehandler}
                value={formData?.email?.value}
                className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
              />
            </div>

            {/* Phone */}
            <div className="flex col-span-2 md:col-span-1 flex-col">
              <label className="text-[#333441d8] text-sm mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                name="phone.value"
                placeholder="Phone"
                onChange={routehandler}
                value={formData?.phone?.value}
                className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
              />
            </div>

            {/* Designaiton */}
            <div className="flex flex-col col-span-2">
              <label
                className="text-[#333441d8] text-sm mb-1"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                onChange={routehandler}
                value={formData?.address}
                className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              disabled={!edited || loading}
              className="border-primary border disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white rounded-md py-1 px-3 "
            >
              {loading ? "Processing.." : "Save"}
            </button>

            <Link
              href="/portal/profile/update-password"
              className="border disabled:opacity-50 text-primary border-primary disabled:cursor-not-allowed rounded-md py-1 px-3"
            >
              <i className="bx bx-lock mr-1"></i>
              Reset Password
            </Link>
          </div>
        </div>

        <div className="hidden justify-center items-center md:flex">
          <img src="/images/editprofile.svg" className="w-64" alt="" />
        </div>
      </form>

      {preview && (
        <div className="px-0 py-10 md:p-10 fixed top-0 left-0 w-screen z-[99999999] h-screen bg-white/5 backdrop-blur-sm">
          <div className="bg-white rounded-md overflow-hidden border border-gray-400 shadow-md p-4 max-w-3xl mx-auto">
          <div className="text-right mb-4">
            <i onClick={()=>setPreview(null)} className="bx text-2xl cursor-pointer bg-gray-200 p-1 rounded-full bx-x"></i>
          </div>

            <Avatar
              width={"100%"}
              onCrop={(e) => {
                setTempImage(e);
              }}
              src={preview === true ? "" : preview}
              height={350}
              imageHeight={300}
              imageWidth={300}
            />
            <button
              disabled={loading}
              className="bg-primary disabled:cursor-not-allowed disabled:opacity-50 py-1 px-3 rounded-full text-white block mt-4  ml-auto"
              onClick={uploadImageToCloudinaryAndProfileUpdate}
            >
              {loading ? "Uploading..." : "Save Photo"}
            </button>
          </div>
          <div onClick={()=>setPreview(null)} className="absolute top-0 left-0 h-full z-[-1] w-full"></div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
