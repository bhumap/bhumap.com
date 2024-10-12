import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "@/src/app/globals.css";

const UpdatePaymentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    Buyer_name: "",
    Package_Name: "",
    Amount: 0,
  });

  useEffect(() => {
    if (id) {
      fetchPaymentDetails(id);
    }
  }, [id]);

  const fetchPaymentDetails = async (paymentId) => {
    try {
      const res = await axios.get(
        `https://www.bhumap.com/api/payment/${paymentId}`
      );
      if (res.data.success) {
        setPaymentData(res.data.payment);
        setUpdatedData({
          Buyer_name: res.data.payment.Buyer_name,
          Package_Name: res.data.payment.Package_Name,
          Amount: res.data.payment.Amount,
        });
      } else {
        toast.error(res.data.message || "Failed to fetch payment details");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch payment details");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `https://www.bhumap.com/api/payment/${id}`,
        updatedData
      );
      if (res.data.success) {
        alert(res.data.message);
        toast.success(res.data.message);
        router.push("/portal/manageUser");
      } else {
        toast.error(res.data.message || "Failed to update payment");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update payment");
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  if (!paymentData) {
    return <p className="update-loading">Loading...</p>;
  }

  return (
    <div className="update-form">
      <div className="w-full rounded-lg md:mt-0 max-w-3xl xl:p-0">
        <div className="p-2 space-y-2 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Update Payment Status
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={updateHandler}>
            <div>
              <label
                htmlFor="Buyer_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Buyer Name
              </label>
              <div className="user-search-box">
                <input
                  type="text"
                  name="Buyer_name"
                  id="Buyer_name"
                  placeholder="Enter Phone or Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  onChange={changeHandler}
                  disabled={loading}
                  value={updatedData.Buyer_name}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Package_Name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Package Name
              </label>
              <div className="user-search-box">
                <input
                  type="text"
                  name="Package_Name"
                  id="Package_Name"
                  placeholder="Enter Phone or Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  onChange={changeHandler}
                  disabled={loading}
                  value={updatedData.Package_Name}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Buyer_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Amount
              </label>
              <div className="user-search-box">
                <input
                  type="text"
                  name="Amount"
                  id="Amount"
                  placeholder="Enter Phone or Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  onChange={changeHandler}
                  disabled={loading}
                  value={updatedData.Amount}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
            >
              {loading ? "Processing..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePaymentPage;
