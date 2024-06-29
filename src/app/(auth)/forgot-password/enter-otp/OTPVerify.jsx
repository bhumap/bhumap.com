"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { notFound } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "@/src/context/AuthContext";
import Loader from "@/src/components/Loader";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(AuthContext)

  var [data, setData] = useState({});
  var router = useRouter()

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("forgotUser"))) {
      setData(JSON.parse(window.localStorage.getItem("forgotUser")));
    }else{
      notFound()
    }
  }, []);

  var verifyOTP = async (e) =>{
    e.preventDefault()
    try {
      if(otp.length != 6){
        toast.error("Please enter 6 digit code first!")
        return
      }
      setLoading(true)
        var res = await axios.post('/api/auth/forgot-password/verify-otp',{...data,otp})
        if(res?.data?.success){
           toast.success(res?.data?.message)
           window.localStorage.removeItem("forgotUser")
           window.location.replace("/portal/profile/reset-password")
        }else{
          toast.error(res?.data?.message)
        }
    } catch (error) {
        console.log(error)
    }finally{
      setLoading(false)
    }
  }


  return (
      <div>
        {loading && <Loader />}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full rounded-lg md:mt-0 max-w-3xl xl:p-0">
            <div className="">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Enter OTP Sent to
              </h1>
              <div className="text-gray-500">{data[data?.selected]?.value}</div>
              <form onSubmit={verifyOTP}>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    border: "1px solid #0004",
                    borderRadius: "8px",
                    width: "54px",
                    height: "54px",
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "400",
                    margin: "10px 10px 10px 0px",
                    caretColor: "blue",
                  }}
                  renderInput={(props) => <input {...props} />}
                />

                <button
                  type="submit"
                  className="disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OTPVerify;
