"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import Image from "next/image";

const MyProperties = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  var [properties, setProperties] = useState({});

  var [loading, setLoading] = useState(false);

  var [showCreateModal, setShowCreateModal] = useState(false);
  var [propertyTitle, setPropertyTitle] = useState("");

  async function createProperty(e) {
    try {
      setLoading(true);
      e.preventDefault();
      var { data } = await axios.post("/api/properties", {
        title: propertyTitle,
      });
      if (data.success) {
        alert("success");
        window.document.body.style.overflow = "auto";
        router.push(`/portal/list-property-form/${data.data._id}`);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      // setLoading(false);
    }
  }

  var fetchMyProperties = async () => {
    try {
      setLoading(true);
      var res = await fetch(
        `/api/properties/${user?.userType == "Admin" ? "getViews" : "mine"}`);
      res = await res.json();
      setProperties(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, [user]);

  return (
    <div className="py-4 sm:p-10">
      {user?.userType == "Admin" ? (
        <div className="flex flex-col gap-6">
          {/* Viewed */}
          <div>
            <h2 className="text-slate-700 font-semibold text-xl mb-2">
              Viewed Properties
            </h2>
            <div className="text-center">
              {properties?.data?.length ? (
                <div>
                  {properties?.data?.map((v, i) => {
                    return (
                      <div
                        key={v._id}
                        className="flex gap-2 relative flex-col p-2 md:flex-row border mb-4 rounded-lg text-left bg-white shadow-md"
                      >
                        <Link
                          href={`/property/${v.property?._id}`}
                          className="w-full md:w-40 aspect-video border rounded-md overflow-hidden border-black/20"
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={
                              v?.property?.images[0]?.secure_url ||
                              "/images/image.png"
                            }
                            alt=""
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            href={`/property/${v.property?._id}`}
                            className="block font-medium text-primary text-lg"
                          >
                            {v?.property?.title}
                          </Link>
                          <div className="text-left text-sm">
                            <div>
                              <span className="font-semibold mr-2">
                                Purpose :
                              </span>
                              {v?.property?.purpose || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">Type :</span>
                              {v?.property?.propertyType || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">
                                Price :
                              </span>
                              {v?.property?.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {loading ? (
                    <h1>Loading...</h1>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm text-left">
                        No Property Viewed Yet!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Shortlisted */}
          <div>
            <h2 className="text-slate-700 font-semibold text-xl mb-2">
              Shortlisted Properties
            </h2>
            <div className="text-center">
              {false ? (
                <div>
                  {properties?.data?.map((v, i) => {
                    return (
                      <div
                        key={v._id}
                        className="flex gap-2 relative flex-col p-2 md:flex-row border mb-4 rounded-lg text-left bg-white shadow-md"
                      >
                        <Link
                          href={`/property/${v.property?._id}`}
                          className="w-full md:w-40 aspect-video border rounded-md overflow-hidden border-black/20"
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={
                              v?.property?.images[0]?.secure_url ||
                              "/images/image.png"
                            }
                            alt=""
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            href={`/property/${v.property?._id}`}
                            className="block font-medium text-primary text-lg"
                          >
                            {v?.property?.title}
                          </Link>
                          <div className="text-left text-sm">
                            <div>
                              <span className="font-semibold mr-2">
                                Purpose :
                              </span>
                              {v?.property?.purpose || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">Type :</span>
                              {v?.property?.propertyType || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">
                                Price :
                              </span>
                              {v?.property?.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {loading ? (
                    <h1>Loading...</h1>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm text-left">
                        No Property Shortlisted Yet!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Rented */}
          <div>
            <h2 className="text-slate-700 font-semibold text-xl mb-2">
              Rented Properties
            </h2>
            <div className="text-center">
              {false ? (
                <div>
                  {properties?.data?.map((v, i) => {
                    return (
                      <div
                        key={v._id}
                        className="flex gap-2 relative flex-col p-2 md:flex-row border mb-4 rounded-lg text-left bg-white shadow-md"
                      >
                        <Link
                          href={`/property/${v.property?._id}`}
                          className="w-full md:w-40 aspect-video border rounded-md overflow-hidden border-black/20"
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={
                              v?.property?.images[0]?.secure_url ||
                              "/images/image.png"
                            }
                            alt=""
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            href={`/property/${v.property?._id}`}
                            className="block font-medium text-primary text-lg"
                          >
                            {v?.property?.title}
                          </Link>
                          <div className="text-left text-sm">
                            <div>
                              <span className="font-semibold mr-2">
                                Purpose :
                              </span>
                              {v?.property?.purpose || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">Type :</span>
                              {v?.property?.propertyType || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">
                                Price :
                              </span>
                              {v?.property?.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {loading ? (
                    <h1>Loading...</h1>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm text-left">
                        No Property Rented Yet!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bought */}
          <div>
            <h2 className="text-slate-700 font-semibold text-xl mb-2">
              Bought Properties
            </h2>
            <div className="text-center">
              {false ? (
                <div>
                  {properties?.data?.map((v, i) => {
                    return (
                      <div
                        key={v._id}
                        className="flex gap-2 relative flex-col p-2 md:flex-row border mb-4 rounded-lg text-left bg-white shadow-md"
                      >
                        <Link
                          href={`/property/${v.property?._id}`}
                          className="w-full md:w-40 aspect-video border rounded-md overflow-hidden border-black/20"
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={
                              v?.property?.images[0]?.secure_url ||
                              "/images/image.png"
                            }
                            alt=""
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            href={`/property/${v.property?._id}`}
                            className="block font-medium text-primary text-lg"
                          >
                            {v?.property?.title}
                          </Link>
                          <div className="text-left text-sm">
                            <div>
                              <span className="font-semibold mr-2">
                                Purpose :
                              </span>
                              {v?.property?.purpose || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">Type :</span>
                              {v?.property?.propertyType || "Undefined"}
                            </div>
                            <div>
                              <span className="font-semibold mr-2">
                                Price :
                              </span>
                              {v?.property?.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {loading ? (
                    <h1>Loading...</h1>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm text-left">
                        No Property Bought Yet!
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-2 justify-center text-sm">
                <button
                  onClick={() => {
                    setShowCreateModal(true);
                    document.body.style.overflow = "hidden";
                  }}
                  className="border px-3 py-2 rounded-md bg-primary text-white shadow-md"
                >
                  List New Property
                </button>

                <Link
                  href={
                    user?.userType == "Buyer"
                      ? "/buyer-paid-membership"
                      : "/seller-paid-membership"
                  }
                  className="border px-3 py-2 rounded-md bg-primary text-white shadow-md"
                >
                  Get Paid Membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-slate-700 font-semibold text-xl mb-2">
            My Properties
          </h2>

          <div className="text-center">
            {properties?.data?.length ? (
              <div>
                {properties?.data?.map((v, i) => {
                  return (
                    <div
                      key={v._id}
                      className="flex gap-2 relative flex-col p-2 md:flex-row border mb-4 rounded-lg text-left bg-white shadow-md"
                    >
                      <div className="w-full md:w-40 aspect-video border rounded-md overflow-hidden border-black/20">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            v?.images?.[0]?.secure_url || "/images/image.png"
                          }
                          alt="property image"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-medium text-primary text-lg">
                          {v.title}
                        </h2>
                        <div className="text-left text-sm">
                          <div>
                            <span className="font-semibold mr-2">
                              Purpose :
                            </span>
                            {v.purpose || "Undefined"}
                          </div>
                          <div>
                            <span className="font-semibold mr-2">Type :</span>
                            {v.propertyType || "Undefined"}
                          </div>
                          <div>
                            <span className="font-semibold mr-2">Price :</span>
                            {v.price}
                          </div>
                          <div>
                            <div
                              className={`${
                                v.status == "Published"
                                  ? "bg-green-700/20 border-green-700 text-green-700"
                                  : "bg-primary/20 border-primary text-primary"
                              }   px-3 mt-1 border py-1  font-medium rounded-full inline-block`}
                            >
                              {v.status}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 md:relative md:top-0 md:right-0 ">
                        <i
                          onClick={() =>
                            router.push(`/portal/list-property-form/${v._id}`)
                          }
                          className="bx bg-gray-100 cursor-pointer p-2 rounded-full shadow-sm border border-gray-300 bx-pencil"
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                {loading ? (
                  <h1>Loading...</h1>
                ) : (
                  <>
                    <img
                      className="w-56 mx-auto"
                      src="/images/propertySearch.svg"
                      alt=""
                    />
                    <p className="text-gray-400 -translate-y-full">
                      No Property Added Yet!
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="flex gap-2 justify-center text-sm">
              <button
                onClick={() => {
                  setShowCreateModal(true);
                  document.body.style.overflow = "hidden";
                }}
                className="border px-3 py-2 rounded-md bg-primary text-white shadow-md"
              >
                List New Property
              </button>

              <Link
                href={
                  user?.userType == "Buyer"
                    ? "/buyer-paid-membership"
                    : "/seller-paid-membership"
                }
                className="border px-3 py-2 rounded-md bg-primary text-white shadow-md"
              >
                Get Paid Membership
              </Link>

            </div>
          </div>
        </div>
      )}

      {/* New Property Popup */}
      <div
        className={`fixed ${
          showCreateModal
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-0"
        } transition-all duration-1000 top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-md z-20`}
      >
        <div
          onClick={() => {
            setShowCreateModal(false);
            document.body.style.overflow = "auto";
          }}
          className="w-full h-full"
        ></div>
        <div className="absolute min-w-[300px] bg-white shadow-lg top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-10">
          <h2 className="font-semibold text-lg border-b py-2 px-4 border-black/20">
            List New Property
          </h2>
          <form onSubmit={createProperty} className="p-4">
            <input
              type="text"
              disabled={loading}
              onChange={(e) => setPropertyTitle(e.target.value)}
              className="block w-full mb-4 border rounded-md border-black/20"
              placeholder="Enter Property Title"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setShowCreateModal(false);
                  document.body.style.overflow = "auto";
                }}
                className="px-3 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-md border text-primary border-primary"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="px-3 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-md border text-white bg-primary"
              >
                {loading && (
                  <i className="bx mr-1 bx-loader-circle bx-spin"></i>
                )}
                {loading ? "Processing..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
