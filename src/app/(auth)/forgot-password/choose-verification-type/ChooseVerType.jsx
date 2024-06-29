"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Loader from "@/src/components/Loader";
import toast from "react-hot-toast";

const ChooseVerType = () => {
  var [data, setData] = useState({});
  var router = useRouter()
  var [loading,setLoading] = useState(false)

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("forgotUser"))) {
      setData(JSON.parse(window.localStorage.getItem("forgotUser")));
    }else{
      notFound()
    }
  }, []);

  var sendOTP = async (type) =>{
    try {
      setLoading(true)
        var res = await axios.post('/api/auth/forgot-password/sendotp',{...data,type})
        if(res?.data?.success){
            if(localStorage.getItem("forgotUser")){
              var user = JSON.parse(localStorage.getItem("forgotUser"))
              user.selected = type
              localStorage.setItem("forgotUser",JSON.stringify(user))
              toast.success(res?.data?.message)
              router.push("/forgot-password/enter-otp")
            }else{
              alert("Somthing went wrong! Please Try Again Later!")
            }
        }else{
          toast.error(res?.data?.message)
        }
      } catch (error) {
        toast.error("Something went wrong!")
    }finally{
      setLoading(false)
    }
  }


  return (
    <div>
      {loading && <Loader />}
      <div className="max-w-xl mx-auto my-10 px-4">
        <h1 className="text-xl font-bold leading-tight mb-4 tracking-tight text-gray-900 md:text-2xl">
          Choose how to want to verify?
        </h1>
        <div onClick={()=>sendOTP("email")} className="border-b cursor-pointer hover:bg-gray-50 block p-3">
          <div className="text-lg flex items-center gap-2 font-semibold">
            <i className="bx text-2xl text-primary bx-envelope"></i>
            Get a code on Email.
          </div>
          {/* <p className="pl-8 text-gray-500">con••••••••@gmail.com</p> */}
          <p className="pl-8 text-gray-500">{data?.email?.value}</p>
        </div>
        <div onClick={()=>sendOTP("phone")} className="border-b cursor-pointer hover:bg-gray-50 block p-3">
          <div className="text-lg flex items-center gap-2 font-semibold">
            <i className="bx text-2xl text-primary bx-phone"></i>
            Get a code on Phone.
          </div>
          <p className="pl-8 text-gray-500">{data?.phone?.value}</p>
        </div>
      </div>
    </div>
  );
};

export default ChooseVerType;
