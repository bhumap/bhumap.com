"use client";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";

const RegistrationForm = () => {
  const { refetch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referral");
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    userType: "Buyer",
    username: "",
    phone: {
      value: "",
    },
    fullName: "",
    password: "",
    referral_code: "",
  });

  useEffect(() => {
    if (referralCode) {
      setFormData((prevData) => ({
        ...prevData,
        referral_code: referralCode,
      }));
    }
  }, [referralCode]);

  console.log(formData);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    let id;
    try {
      e.preventDefault();
      setLoading(true);
      id = toast.loading("Please wait...");
      const res = await axios.post("/api/auth/register", formData);

      if (res.data.success) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
        });
        setLoading(false);
        setTimeout(() => {
          toast.dismiss(id);
          refetch();
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      toast.update(id, {
        render: error.response?.data?.message,
        type: "error",
        isLoading: false,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        toast.dismiss(id);
      }, 3000);
    }
  };

  return (
    <section className="p-4 py-10 max-w-3xl mx-auto space-y-4 md:space-y-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Create Your Account
      </h1>
      <form className="grid gap-4 grid-cols-2" onSubmit={submitHandler}>
        <div className="col-span-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Register as
          </label>

          <div className="flex gap-2 sm:gap-5 flex-col sm:flex-row">
            <div>
              <input
                type="radio"
                checked={formData.userType === "Buyer"}
                onChange={changeHandler}
                disabled={loading}
                className="mr-2  text-primary focus:outline-none focus:ring-0"
                value="Buyer"
                name="userType"
                id="Buyer"
              />
              <label htmlFor="Buyer">Buy Property</label>
            </div>
            <div>
              <input
                type="radio"
                checked={formData.userType === "Seller"}
                onChange={changeHandler}
                disabled={loading}
                className="mr-2 text-primary focus:outline-none focus:ring-0"
                value="Seller"
                name="userType"
                id="Seller"
              />
              <label htmlFor="Seller">Sell Property</label>
            </div>
            <div>
              <input
                type="radio"
                checked={formData.userType === "Advisor"}
                onChange={changeHandler}
                disabled={loading}
                className="mr-2 text-primary focus:outline-none focus:ring-0"
                value="Advisor"
                name="userType"
                id="Advisor"
              />
              <label htmlFor="Advisor">Legal Advisor</label>
            </div>
            <div>
              <input
                type="radio"
                checked={formData.userType === "Vendor"}
                onChange={changeHandler}
                disabled={loading}
                className="mr-2 text-primary focus:outline-none focus:ring-0"
                value="Vendor"
                name="userType"
                id="Vendor"
              />
              <label htmlFor="Vendor">Vendor</label>
            </div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required={true}
            onChange={changeHandler}
            disabled={loading}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter Phone Number"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required={true}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: { value: e.target.value },
              })
            }
            disabled={loading}
          />
        </div>


          <>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>

              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                disabled={loading}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: { value: e.target.value },
                  })
                }
              />
            </div>
          </>


        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>

          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required={true}
            onChange={changeHandler}
            disabled={loading}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>

          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required={true}
              onChange={changeHandler}
              disabled={loading}
            />
            <i
              onClick={() => setShowPwd(!showPwd)}
              className={`bx cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2 bx-${
                showPwd ? "show" : "hide"
              }`}
            ></i>
          </div>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </div>

        <p className="text-sm text-center md:text-left font-light col-span-2 text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default RegistrationForm;
