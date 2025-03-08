"use client";
import { CldVideoPlayer, CldImage } from "next-cloudinary";
import { useContext, useEffect, useState } from "react";
import "next-cloudinary/dist/cld-video-player.css";
import SimpleMap from "./SimpleMap";
import PropertyCardsGrid from "./PropertyCardsGrid";
import EmblaCarousel from "./EmblaCarousel";
import { format } from "timeago.js";
import CommentSection from "./Comments";
import { WhatsappShareButton } from "next-share";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import whb from "../../public/images/whb.webp";
import { isDev } from "@/src/backend/helpers/util";
import { toast } from "react-toastify";
import { getCookies } from "../utils/getCookies";

const PropertyDetail = ({ property }) => {
  const ownerEmail = property?.owner?.email.value;

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    ownerEmail: ownerEmail,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, message, ownerEmail } = formData;

    if (!fullName || !email || !phoneNumber || !message) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          message,
          ownerEmail,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          message: "",
          ownerEmail: ownerEmail,
        });
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  var pathname = usePathname();

  var { user } = useContext(AuthContext);

  var [showSlider, setShowSlider] = useState(false);

  var [sharing, setSharing] = useState(false);
  var [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(property.likes);
  const router = useRouter();

  var [center, setCenter] = useState(
    property.center || {
      lat: 26.734461205646056,
      lng: 80.94455546612974,
    }
  );

  const likeProperty = async () => {
    try {
      var res = await axios.put(
        `/api/properties/${property._id}?likeDislike=true`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      setLikeCount(res.data?.data?.likes);
      setLiked(!liked);
      // window.location.reload();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.error("Error liking property");
    }
  };

  useEffect(() => {
    router.push(`${pathname}/?title=${property.title}`, undefined, { shallow: true });
    setLiked(likeCount?.includes(user?._id));
  }, [user, pathname, likeCount]);

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 md:py-10">
        {/* sharing */}
        <div
          className={`fixed ${
            sharing ? "visible opacity-100" : "invisible opacity-0"
          } transition-all duration-500 flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/50 z-[9999]`}
        >
          <div
            onClick={() => {
              setSharing(false);
              document.body.style.overflow = "auto";
            }}
            className="w-full h-full"
          ></div>
          <div
            className={`${
              sharing
                ? "-translate-y-1/2 opacity-100"
                : "translate-y-1/2 opacity-0"
            } bg-white transition-all duration-500 delay-300 absolute top-1/2 left-1/2 -translate-x-1/2 border shadow-lg p-4 rounded-lg`}
          >
            <i
              onClick={() => {
                setSharing(false);
                document.body.style.overflow = "auto";
              }}
              className="bx cursor-pointer text-2xl mb-2 p-2 hover:bg-gray-100 rounded-full bx-x"
            ></i>
            <h3 className="text-xl font-semibold">Share this property</h3>
            <div className="mt-3 flex gap-3">
              <div>
                <div
                  title="Copy"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${
                        isDev()
                          ? process.env.NEXT_PUBLIC_LOCAL_URL
                          : process.env.NEXT_PUBLIC_DOMAIN
                      }property/${property._id}`
                    );
                    toast.success("Link copied to clipboard");
                  }}
                  className="border cursor-pointer bg-gray-200 h-[35px] text-lg w-[35px] p-[2px]  flex items-center justify-center rounded-[100%]"
                >
                  <i className="bx bx-copy  text-black"></i>
                </div>
              </div>

              <Link
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${
                  isDev()
                    ? process.env.NEXT_PUBLIC_LOCAL_URL
                    : process.env.NEXT_PUBLIC_DOMAIN
                }property/${property._id}`}
              >
                <div className="bg-[#316FF6] h-[35px] text-lg w-[35px] p-[2px]  flex items-center justify-center rounded-[100%]">
                  <i className="bx bxl-facebook  text-white"></i>
                </div>
              </Link>

              <Link target="_blank" href={`https://imo.im/`}>
                <div className=" h-[35px] text-lg w-[35px] bg-[#1DA1F2] flex items-center justify-center rounded-[100%]">
                  <svg
                    width="18"
                    height="8"
                    viewBox="0 0 18 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 2C0.223633 2 0 2.26836 0 2.6V7.4C0 7.73164 0.223633 8 0.5 8C0.776367 8 1 7.73164 1 7.4V2.6C1 2.26836 0.776367 2 0.5 2Z"
                      fill="white"
                    />
                    <path
                      d="M15.5 2C14.1212 2 13 3.07695 13 4.4V5.6C13 6.92305 14.1212 8 15.5 8C16.8788 8 18 6.92305 18 5.6V4.4C18 3.07695 16.8788 2 15.5 2ZM16.75 5.6C16.75 6.26211 16.1891 6.8 15.5 6.8C14.8109 6.8 14.25 6.26211 14.25 5.6V4.4C14.25 3.73789 14.8109 3.2 15.5 3.2C16.1891 3.2 16.75 3.73789 16.75 4.4V5.6Z"
                      fill="white"
                    />
                    <path
                      d="M9.42857 2C8.65686 2 7.97163 2.32549 7.5 2.82947C7.02837 2.32549 6.34314 2 5.57143 2C5.07987 2 4.62033 2.12891 4.22921 2.35391C4.12814 2.14531 3.90402 2 3.64286 2C3.28753 2 3 2.26836 3 2.6V7.4C3 7.73164 3.28753 8 3.64286 8C3.99819 8 4.28571 7.73164 4.28571 7.4V4.4C4.28571 3.73789 4.86265 3.2 5.57143 3.2C6.2802 3.2 6.85714 3.73789 6.85714 4.4V7.4C6.85714 7.73164 7.14467 8 7.5 8C7.85533 8 8.14286 7.73164 8.14286 7.4V4.4C8.14286 3.73789 8.7198 3.2 9.42857 3.2C10.1373 3.2 10.7143 3.73789 10.7143 4.4V7.4C10.7143 7.73164 11.0018 8 11.3571 8C11.7125 8 12 7.73164 12 7.4V4.4C12 3.07695 10.8467 2 9.42857 2Z"
                      fill="white"
                    />
                    <path
                      d="M0.5 1C0.776142 1 1 0.776142 1 0.5C1 0.223858 0.776142 0 0.5 0C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                target="_black"
                href={`https://www.instagram.com/share?url=${
                  isDev()
                    ? process.env.NEXT_PUBLIC_LOCAL_URL
                    : process.env.NEXT_PUBLIC_DOMAIN
                }property/${property._id}`}
              >
                <div className="h-[35px] text-lg w-[35px] p-[2px] bg-[#E4405F] flex items-center justify-center rounded-[100%]">
                  <i className="bx bxl-instagram text-white"></i>
                </div>
              </Link>

              <div className=" bg-[#25D366]  flex items-center justify-center  h-[35px] text-lg w-[35px] p-[2px] rounded-[100%]">
                <WhatsappShareButton
                  url={`${
                    isDev()
                      ? process.env.NEXT_PUBLIC_LOCAL_URL
                      : process.env.NEXT_PUBLIC_DOMAIN
                  }property/${property._id}`}
                  className="flex items-center"
                >
                  <i className="bx bxl-whatsapp text-xl mt-2 text-white"></i>
                </WhatsappShareButton>
              </div>

              <Link
                href={`https://web.whatsapp.com/send?text= Please Visit ${
                  isDev()
                    ? process.env.NEXT_PUBLIC_LOCAL_URL
                    : process.env.NEXT_PUBLIC_DOMAIN
                }property/${property._id}`}
                target="_blank"
              >
                <div className="h-[35px] text-lg w-[35px] p-[2px] bg-[#E4405F] flex items-center justify-center rounded-[100%]">
                  <Image href={whb} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="pb-4 flex flex-col md:flex-row items-start gap-2 md:items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold">
            {property.title}
          </h1>
          <div className="flex items-center text-gray-600">
            <i
              onClick={() => {
                setSharing(true);
                document.body.style.overflow = "hidden";
              }}
              className="bx p-2 hover:bg-gray-100 cursor-pointer rounded-full bx-share bx-flip-horizontal"
            ></i>
            <div
              className={`border ${
                liked ? "bg-red-600/10" : null
              } py-1 flex gap-2 items-center rounded-full px-3`}
            >
              <i
                onClick={() =>
                  !getCookies("AccessToken") ? setIsOpen(true) : likeProperty()
                }
                className={`bx ${
                  liked ? "text-red-600" : ""
                } hover:bg-gray-100 cursor-pointer rounded-full bx${
                  liked ? "s" : ""
                }-like`}
              ></i>
              <div className="text-sm">{likeCount?.length}</div>
            </div>
          </div>
        </div>

        <div className="grid h-[60vh] grid-cols-6 grid-rows-2 gap-4">
          {property?.images?.slice(0, 4)?.map((v, i) => {
            var img = (
              <Image
                width="900"
                height="600"
                className="w-full h-full object-cover"
                src={v.secure_url}
                sizes="100vw"
                priority
                alt="Description of my image"
              />
            );
            switch (i) {
              case 0:
                return (
                  <div
                    key={i}
                    className="border border-black/30 rounded-lg overflow-hidden row-span-2 col-span-6 md:col-span-4"
                  >
                    {img}
                  </div>
                );
              case 1:
                return (
                  <div
                    key={i}
                    className="border border-black/30 rounded-lg overflow-hidden row-span-1 col-span-3 md:col-span-2 relative"
                  >
                    {img}
                  </div>
                );
              case 2:
                return (
                  <div
                    key={i}
                    className="border border-black/30 rounded-lg overflow-hidden row-span-1 col-span-3 md:col-span-2 relative"
                  >
                    {img}
                    <button
                      onClick={() => {
                        setShowSlider(true);
                        document.body.style.overflow = "hidden";
                      }}
                      className="absolute text-xs sm:text-sm bg-gray-100 py-1 px-2 rounded-md border border-black/50 font-medium hover:bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1"
                    >
                      <i className="bx bx-images"></i> See All
                    </button>
                  </div>
                );
            }
          })}
        </div>

        <div className="py-2 flex items-start gap-2 md:items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 animate-pulse h-2 outline-[3px] outline outline-primary/40 rounded-full bg-primary"></div>
            <p>For {property.purpose}</p>
          </div>
          <div className="font-semibold text-lg">
            {property.price}
            {/* <span className="text-base text-gray-600 font-medium">month</span> */}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 text-gray-600 mb-4">
          <div className="col-span-6 md:col-span-4">
            {/* Description */}
            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold text-xl mb-1 text-black">
                Property Description
              </h2>
              <p className="md:text-justify">{property.description}</p>
            </div>

            {/* Features */}
            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold text-xl mb-1 text-black">
                Property Features
              </h2>
              <div>
                <ul className="space-y-2 text-left">
                  {property?.features?.map((v, i) => {
                    return (
                      <li key={i} className="flex items-center gap-2">
                        <svg
                          className="flex-shrink-0 w-3.5 h-3 text-green-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                        <p>{v}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Video Review */}
            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold text-xl mb-1 text-black">
                Video Review
              </h2>
              <CldVideoPlayer
                width="100%"
                id="second"
                src={property.video || "bhumap/j5bjcf980o5kinngfffr"}
              />
            </div>

            {/* Location View */}
            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold text-xl mb-1 text-black">
                Location View
              </h2>
              <SimpleMap center={center} setCenter={setCenter} />
            </div>

            {/* Comments */}
            <CommentSection property={property} />
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="md:sticky md:top-20 shadow-lg p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-14 h-14 rounded-full border overflow-hidden"
                  src={property.owner?.photo || "/images/user.png"}
                  alt=""
                />
                <div>
                  <div className="font-semibold text-black">
                    {property.owner?.fullName}
                  </div>
                  <div className="text-sm">
                    @{property.owner?.username} -{" "}
                    {format(new Date(property.createdAt), "en_US")}
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-black/20 rounded-md mb-2 p-2"
                  placeholder="Full Name"
                />

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-black/20 rounded-md mb-2 p-2"
                  placeholder="Email"
                />
                <input
                  required
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-black/20 rounded-md mb-2 p-2"
                  placeholder="Phone Number"
                />
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-black/20 rounded-md mb-2 p-2"
                  placeholder="Message"
                  rows={4}
                />

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {successMessage && (
                  <p className="text-green-500 mb-2">{successMessage}</p>
                )}

                <button
                  type="submit"
                  className="border border-primary w-full py-1 rounded-md text-primary bg-primary/5 hover:bg-primary/10"
                >
                  Send Query
                </button>
              </form>
            </div>
          </div>
        </div>

        <div
          className={`fixed ${
            showSlider
              ? "visible opacity-100 scale-100"
              : "invisible opacity-0 scale-0"
          } transition-all duration-1000 left-0 top-0 h-screen w-screen bg-black/90 z-[99999999]`}
        >
          <div className="flex justify-end p-4">
            <i
              onClick={() => {
                setShowSlider(false);
                document.body.style.overflow = "auto";
              }}
              className="bx z-10 text-white text-xl bg-gray-100/30 cursor-pointer rounded-full p-1 bx-x"
            ></i>
          </div>
          <EmblaCarousel slides={property?.images} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <PropertyCardsGrid title={"Related Properties"} />
      </div>
    </div>
  );
};

export default PropertyDetail;
