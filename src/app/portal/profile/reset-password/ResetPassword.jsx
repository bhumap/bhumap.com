"use client";
import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Loader from "@/src/components/Loader";

const ResetPassword = () => {
  var { user } = useContext(AuthContext);
  var [showPasswords, setShowPasswords] = useState(false);

  var [edited, setEdited] = useState(false);
  var [loading, setLoading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
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
      setLoading(true);

      if (formData.newPassword != formData.confirmPassword) {
        toast.error("New Password & Confirm Password must be same!");
        return;
      }

      const res = await axios.put(`/api/auth/reset-password`, {
        userId,
        password: formData.newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/portal/profile")
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {loading && <Loader />}

      <form
        onSubmit={submitForm}
        className="sm:p-4 md:p-8 py-10 grid grid-cols-2"
      >
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-slate-700 font-semibold text-2xl mb-4">
            <Link href="/portal/profile">
              <i className="bx bx-arrow-back"></i>
            </Link>{" "}
            Reset Password
          </h2>

          <input
            type={showPasswords ? "text" : "password"}
            id="cur-pass"
            required
            name="newPassword"
            onChange={changeHandler}
            value={formData.newPassword}
            placeholder="New Password"
            className="rounded-lg py-2 block w-full mb-4 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
          />

          <input
            id="new-pass"
            type={showPasswords ? "text" : "password"}
            required
            name="confirmPassword"
            onChange={changeHandler}
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            className="rounded-lg py-2 block w-full mb-4 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
          />

          <div className="pb-4 flex items-center gap-2">
            <input
              onChange={(e) => setShowPasswords(e.target.checked)}
              id="showPsw"
              type="checkbox"
            />
            <label htmlFor="showPsw">Show Password</label>
          </div>

          <button
            disabled={!(formData.newPassword && formData.confirmPassword)}
            className="border-primary disabled:opacity-50 disabled:cursor-not-allowed border text-primary rounded-md py-1 px-3 "
          >
            Reset
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
