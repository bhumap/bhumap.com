"use client";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";

const Page = () => {
  const { refetch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    Ref_ID: "",
    Referral_Name: "",
    Package: "",
    Commission: "",
    Payment_date: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Form Data Submitted:", formData);

    const commission = parseFloat(formData.Commission);
    const tenPercentCommission = (commission * 0.1).toFixed(2);

    const updatedFormData = { ...formData, Commission: tenPercentCommission };

    var id = toast.loading("Please wait...");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/reference",
        updatedFormData
      );

      if (res.data.success) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
        });
        refetch();
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
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full rounded-lg md:mt-0 max-w-3xl xl:p-0">
        <div className="p-4 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Manage Referral
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="Ref_ID"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ref ID
              </label>
              <input
                type="text"
                name="Ref_ID"
                id="Ref_ID"
                placeholder="Enter User Ref ID"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="Referral Name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Referral Name
              </label>
              <input
                type="text"
                name="Referral_Name"
                id="Referral_Name"
                placeholder="Enter Referral Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="Package"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Package Name
              </label>
              <select
                name="Package"
                id="Package"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              >
                <option value="" disabled selected>
                  Select Package
                </option>
                <option value="Basic">Basic</option>
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="Platinum Gold ">Platinum Gold </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="Commission"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Commission
              </label>
              <input
                type="text"
                name="Commission"
                id="Commission"
                placeholder="Enter Full Amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="Payment_date"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Payment Date
              </label>
              <input
                type="datetime-local"
                name="Payment_date"
                id="Payment_date"
                placeholder="Enter Payment Date"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {loading ? "Processing..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
