"use client";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";

const Page = () => {
  const { refetch } = useContext(AuthContext);
  const [users, setUser] = useState([]);
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          // setFetching(true);
          const res = await axios.get(
            `https://bhumap.com/api/users`
          );
          setUser(res.data.message.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setFetching(false);
        }
    };

    const fetchPackages = async () => {
      try {
        // setFetching(true);
        const res = await axios.get(
          `https://bhumap.com/api/packages`
        );
        setPackages(res.data.message.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setFetching(false);
      }
    };

    fetchUsers();
    fetchPackages();
  }, []);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    membership_package_id: "",
    user_id: "",
    utr_number: "",
    expire_date: "",
    activation_date: "",
    duration_in_months: "",
    status: ""
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = { ...formData, duration_in_months: Number(formData.duration_in_months) };

    var id = toast.loading("Please wait...");
    try {
      const res = await axios.post(
        "https://bhumap.com/api/memberships",
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
            Manage Membership
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="user_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                User
              </label>
              <select
                name="user_id"
                id="user_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              >
                <option value="" selected disabled>
                  Select User
                </option>
                {users?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="membership_package_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Package Name
              </label>
                <select
                  name="membership_package_id"
                  id="membership_package_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  onChange={changeHandler}
                  disabled={loading}
                >
                  <option value="" disabled selected>
                    Select Package
                  </option>
                  {packages?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
                </select>
            </div>

            <div>
              <label
                htmlFor="utr_number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                UTR Number
              </label>
              <input
                type="text"
                name="utr_number"
                id="utr_number"
                placeholder="Enter UTR Number"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="activation_date"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Activation Date
              </label>
              <input
                type="date"
                name="activation_date"
                id="activation_date"
                placeholder="Enter activation date"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>
            
            <div>
              <label
                htmlFor="duration_in_months"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Duration in Month
              </label>
              <input
                type="text"
                name="duration_in_months"
                id="duration_in_months"
                placeholder="Enter duration in month"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="expire_date"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Expriry Date
              </label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                placeholder="Enter Payment Date"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>
            
            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Status
              </label>
                <select
                  name="status"
                  id="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  onChange={changeHandler}
                  disabled={loading}
                >
                  <option value="" disabled selected>
                    Select Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                </select>
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
