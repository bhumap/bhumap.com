"use client";
import { useContext, useState, useEffect} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";
import Link from "next/link";

const Page = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [paymenData, setpaymenData] = useState(null);
  const [users, setUser] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    user: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          // setFetching(true);
          const res = await axios.get(
            `https://www.bhumap.com/api/users`
          );
          setUser(res.data.message.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setFetching(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Form Data Submitted:", formData);

    var id = toast.loading("Please wait...");
    try {
      const res = await axios.post(
        "https://www.bhumap.com/api/users",
        formData
      );

      setpaymenData(res.data.payments);

      if (res.data.success) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: error.response?.data?.message || "An error occurred",
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

  const handleDelete = async (paymentId) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this payment?"
      );
      if (!confirmation) {
        return;
      }

      const res = await axios.delete(
        `https://www.bhumap.com/api/payment/${paymentId}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedPayments = paymenData.filter(
          (payment) => payment._id !== paymentId
        );
        setpaymenData(updatedPayments);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete payment");
    }
  };

  console.log(paymenData);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto mt-15 bg-white rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Manage User</h1>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label htmlFor="user" className="block mb-2 text-base font-medium text-gray-800">
              Enter Phone or Username
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                name="user"
                id="user"
                placeholder="Enter Phone or Username"
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded-full shadow-sm focus:ring-primary-500 focus:border-primary-500 transition duration-300 ease-in-out"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 text-base bg-primary font-semibold text-white transition duration-300 ease-in-out ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600"} rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50`}
              >
                {loading ? "Processing..." : "Search"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <section className="w-full py-5">
        <div className="max-w-6xl mx-auto bg-white border-t-2 p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="text-left">
                <tr className="text-gray-600 bg-gray-100">
                  <th className="py-3 px-5 text-sm font-semibold">Name</th>
                  <th className="py-3 px-5 text-sm font-semibold">User Type</th>
                  <th className="py-3 px-5 text-sm font-semibold">Referral Code</th>
                  <th className="py-3 px-5 text-sm font-semibold">Address</th>
                  <th className="py-3 px-5 text-sm font-semibold">Email</th>
                  <th className="py-3 px-5 text-sm font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, i) => (
                  <tr
                    key={user._id}
                    className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all`}
                  >
                    <td className="py-4 px-5 text-gray-800">{user.fullName}</td>
                    <td className="py-4 px-5 text-gray-600">{user.userType}</td>
                    <td className="py-4 px-5 text-gray-600">{user.refral_code || 'N/A'}</td>
                    <td className="py-4 px-5 text-gray-600">{user.address}</td>
                    <td className="py-4 px-5 text-gray-600">{user.email.value || 'N/A'}</td>
                    <td className="py-4 px-5 text-gray-600">{user.phone.value || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>

  );
};

export default Page;
