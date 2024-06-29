"use client";
import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const ResetPassword = () => {
  var { user } = useContext(AuthContext);

  var [edited, setEdited] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    currentPassword: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEdited(true);

    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const userId = user._id;
      // console.log(userId)

      const res = await axios.put(`/api/auth/update-password`, {
        userId,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setEdited(false);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={submitForm} className="sm:p-4 md:p-8 py-10 grid grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-slate-700 font-semibold text-2xl mb-4">
            <Link href="/portal/profile/edit">
              <i className="bx bx-arrow-back"></i>
            </Link>{" "}
            Update Password
          </h2>

          <input
            type="password"
            id="cur-pass"
            required
            name="currentPassword"
            onChange={changeHandler}
            value={formData.currentPassword}
            placeholder="Current Password"
            className="rounded-lg py-2 block w-full mb-4 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
          />

          <input
            id="new-pass"
            type="password"
            required
            name="newPassword"
            onChange={changeHandler}
            value={formData.newPassword}
            placeholder="New Password"
            className="rounded-lg py-2 block w-full mb-4 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
          />

          <button
            disabled={!(formData.newPassword && formData.currentPassword)}
            className="border-primary disabled:opacity-50 disabled:cursor-not-allowed border text-primary rounded-md py-1 px-3 "
          >
            Save
          </button>
        </div>

        <div className="hidden justify-center items-center md:flex">
          <img src="/images/chpwd.svg" className="w-64" alt="" />
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
