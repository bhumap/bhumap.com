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
            `http://localhost:3000/api/users`
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
        "http://localhost:3000/api/users",
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
      <div className="w-full rounded-lg md:mt-0 max-w-3xl xl:p-0">
        <div className="p-2 space-y-2 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Manage User
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
            {/* <div>
              <label
                htmlFor="user"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Phone or Username
              </label>
              <div className="user-search-box">
                <input
                  type="text"
                  name="user"
                  id="user"
                  placeholder="Enter Phone or Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 m-auto"
                  required={true}
                  onChange={changeHandler}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {loading ? "Processing..." : "Search"}
                </button>
              </div>
            </div> */}
          </form>
        </div>
      </div>

      <section className="flex flex-col items-center justify-center py-4 mx-auto">
        <div className="w-full rounded-lg">
          <div className="p-2 space-y-2 ">
            <div className="payment-box">
              <div className="payment-head payment-main">
                <div className="payment-title payment-head1">
                  <h4>Name</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>User Type</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>Refral Code</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>Address</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>Email</h4>
                </div>
                <div className="payment-title payment-head1">
                  <h4>Phone</h4>
                </div>
              </div>

              {users?.map((e, i) => (
                <div className="payment-head" key={e._id}>
                  <div className="payment-title">
                    <h4>{e.fullName}</h4>
                  </div>
                  <div className="payment-title">
                    <h4>{e.userType}</h4>
                  </div>
                  <div className="payment-title">
                    <h4>{e.refral_code}</h4>
                  </div>
                  <div className="payment-title">
                    <h4>{e.address}</h4>
                  </div>
                  <div className="payment-title">
                    <h4>{e.email.value}</h4>
                  </div>
                  <div className="payment-title">
                    <h4>{e.phone.value}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
