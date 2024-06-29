"use client";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function VerifyMobileNumber() {
  const [otp, setOtp] = useState("");
  const [phoneInputEnable, setPhoneInputEnable] = useState(false);
  const [phoneInput, setPhoneInput] = useState("+91383983939");

  return (
    <div className="px-4 py-10 min-h-[90vh] flex justify-center items-center bg-[rgb(241,241,241)]">
      <div className="border mx-auto text-center bg-white shadow-md rounded-lg p-4 sm:p-10">
        <div className="w-12 h-12 mx-auto border rounded-md bg-[rgb(241,241,241)] flex justify-center items-center mb-4 p-2">
          <img className="w-[80%] h-auto" src="./logo.png" alt="" />
        </div>
        <h2 className="text-xl font-semibold">Verify Phone Number</h2>
        <p className="text-gray-500">Enter a verification code phone number</p>

        {phoneInputEnable ? (
          <div className="flex my-2 justify-center border border-gray-400 rounded-full overflow-hidden mx-auto">
            <input
              value={phoneInput}
              onChange={(e) => {
                setPhoneInput(e.target.value);
              }}
              type="text"
              className="text-gray-500 border-0 flex-1 px-2 py-0"
            />
            <button onClick={()=>setPhoneInputEnable(false)} className="bg-gray-200 border-l border-gray-400 py-1 px-2">
              Resend
            </button>
          </div>
        ) : (
          <>
            <div>
              {phoneInput}
              <i
                onClick={()=>setPhoneInputEnable(true)}
                title="Edit Phone Number"
                className="bx ml-1 hover:bg-gray-100 p-1 rounded-full cursor-pointer bx-pencil"
              ></i>
            </div>

            <div className="flex my-4 justify-center items-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputStyle={{
                  border: "1px solid #0004",
                  borderRadius: "8px",
                  width: "54px",
                  height: "54px",
                  fontSize: "20px",
                  color: "#000",
                  fontWeight: "400",
                  margin: "5px",
                  caretColor: "blue",
                }}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <button className="bg-primary flex items-center justify-center w-full p-2  rounded-md">
              Continue <i className="bx ml-1 bxs-right-arrow"></i>
            </button>
          </>
        )}

        <p className="text-gray-500 mt-3">Did not receive a code?</p>
      </div>
    </div>
  );
}
