"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";

const LoginForm = () => {
  var { refetch } = useContext(AuthContext);

  var [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  var router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    var id;
    try {
      e.preventDefault();
      setLoading(true);
      id = toast.loading("Please wait...");
      const res = await axios.post("/api/auth/login", formData);

      if (res.data.success) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
        });
        refetch()
        router.push("/");
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
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
      <div className="w-full rounded-lg md:mt-0 max-w-3xl xl:p-0">
        <div className="p-4 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login Your Account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username / Email / Mobile
              </label>

              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Anything you would like from above"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
                onChange={changeHandler}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
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
                    showPwd ? "hide" : "show"
                  }`}
                ></i>
              </div>
            </div>

            <div className="flex justify-end mb-2">
              <Link className="text-sm" href="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {loading ? "Processing..." : "Login"}
            </button>
            <p className="text-sm font-light text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
