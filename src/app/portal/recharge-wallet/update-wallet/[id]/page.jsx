"use client";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { isDev } from "@/src/backend/helpers/util";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {

  const [amount, setAmount] = useState("");
  const [recharge, setRechargeData] = useState({});
  const [status, setStatus] = useState('');
  var router = useRouter();
  useEffect(() => {
    const fetchTransaction = async (id) => {
        try {
          // setFetching(true);
          const res = await axios.get(
            `${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/transactions/${id}`
          );
          setRechargeData(res.data);
          console.log(recharge);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setFetching(false);
        }
    };

    fetchTransaction(params.id);
  }, []);

  async function updateRechargestatus(e) {
    try {
      e.preventDefault();
      const rechargeData = {
        amount,
        is_processed: true
      }
      var { data } = await axios.put(`/api/transactions/${params.id}`, rechargeData);
      if (data.success) {
        toast.success(data.message);
        router.push("/portal/recharge-wallet");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full rounded-lg md:mt-0 max-w-7xl xl:p-0">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
          {/* Left side: User details with payment screenshot */}
          <div className="w-full md:w-1/2 p-4 space-y-4 bg-white rounded-lg">
            <h2 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
              User Details
            </h2>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-bold text-gray-900">
                  User Name:
                </label>
                <p className="text-gray-700">As</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900">
                  Email:
                </label>
                <p className="text-gray-700">ashu@gmail.com</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900">
                  Recharge Amount:
                </label>
                <p className="text-gray-700">20</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900">
                  Utr Number:
                </label>
                <p className="text-gray-700">20</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-900">
                Payment Screenshot:
              </label>
             <Image
                src="/images/qr-code.jpg"
                alt="Payment Screenshot"
                width={50}
                height={50}
              />
            </div>
          </div>

          {/* Right side: Recharge form */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Recharge Wallet
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={updateRechargestatus}>
              <div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
                  Recharge Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter Recharge Amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  value={status} // Set the value from the state
                  onChange={(e) => setStatus(e.target.value)} // Update state on change
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Active">Credit</option>
                  <option value="Pending">Debit</option>
                  <option value="Expired">Recharge</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
