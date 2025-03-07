"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { category, residentialSubTypes } from "@/src/data";
import Map from "@/src/components/Map";
import { CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "next-cloudinary/dist/cld-video-player.css";
import { isDev } from "@/src/backend/helpers/util";

const ListPropertyForm = ({ property }) => {
  console.log(property);

  var router = useRouter();

  var [center, setCenter] = useState({
    lat: property?.center?.lat || 26.734461205646056,
    lng: property?.center?.lng || 80.94455546612974,
  });

  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: {
      cityTown: "",
      district: "",
      zipCode: "",
      line1: "",
      line2: "",
      line3: "",
    },
    center: {
      lat: 31.4154491,
      lng: 73.1116333,
    },
    description: "",
    price: "",
    minOrder: null,
    company: "",
    category: "",
    title: "",
    video: "",
    phone: "",
    images: [],
    ...property,
  });

  console.log(formData);

  const [formInputs, setFormInputs] = useState([
    {
      label: "Title (0/150)",
      name: "title",
      type: "text",
      cols: 1,
      required: true,
      maxLength: 150,
    },
    { label: "Contact", name: "phone", type: "text", cols: 1, required: true },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      cols: 2,
      required: true,
    },
    { label: "Price", name: "price", type: "text", cols: 1, required: true },
    { label: "Gst", name: "gst", type: "text", cols: 1, required: true },
    {
      label: "Minimum Order Quantity",
      name: "minOrder",
      type: "text",
      cols: 1,
      required: true,
    },
    {
      label: "Company",
      name: "company",
      type: "text",
      cols: 1,
      required: true,
    },
    {
      label: "category",
      name: "category",
      type: "select",
      options: category,
      cols: 1,
      required: true,
    },
  ]);

  const AddressInputs = [
    {
      label: "Address line 1",
      name: "address.line1",
      type: "text",
      cols: 2,
      required: false,
    },
    {
      label: "Address line 2",
      name: "address.line2",
      type: "text",
      cols: 2,
      required: false,
    },
    {
      label: "Address line 3",
      name: "address.line3",
      type: "text",
      cols: 2,
      required: false,
    },
    {
      label: "City / Town",
      name: "address.cityTown",
      type: "text",
      cols: 1,
      required: true,
    },
    {
      label: "District",
      name: "address.district",
      type: "text",
      cols: 1,
      required: true,
    },
    {
      label: "Area Pin Code",
      name: "address.zipCode",
      type: "number",
      cols: 1,
      required: true,
    },
  ];

  const changeHandler = (e, i) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "propertyType") {
      var forminputscopy = formInputs;
      if (value == "Residential") {
        forminputscopy.splice(2, 0, {
          label: "Residential Type",
          name: "residentialSubType",
          type: "select",
          options: residentialSubTypes,
          cols: 1,
        });
      } else {
        setFormInputs(
          forminputscopy.filter((v) => v.name != "residentialSubType")
        );
      }
    }

    if (name.startsWith("address")) {
      setFormData({
        ...formData,
        address: { ...formData?.address, [name.split(".")[1]]: value },
      });
      return;
    }

    if (name == "features") {
      var copy = formData.features;
      copy[i] = value;
      setFormData({ ...formData, features: copy });
      return;
    }

    if (name === "title") {
      setFormInputs((prevInputs) =>
        prevInputs.map((input) =>
          input.name === "title"
            ? { ...input, label: `Title (${value.length}/150)` }
            : input
        )
      );
    }

    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = async (data) => {
    try {
      setFormLoading(true);
      var res = await axios.put(
        `${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/listing/${formData._id}`,
        { ...data, center }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setFormLoading(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setFormLoading(true);

      if (formData.images?.length < 1) {
        alert("Please Select Atleast 1 Images of your Property!");
        return;
      }

      var res = await axios.put(
        `${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/listing/${formData._id}`,
        { ...formData, status: "Published", center }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure to delete this Property?")) {
      return;
    }
    try {
      var res = await axios.delete(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/listing/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/portal/my-properties2");
      }
    } catch (error) {
      toast.success("Something went wrong!");
    }
  };

  return (
    <div>
      {formLoading && <Loader />}

      <div className="p-0 py-6 sm:p-10">
        <h2 className="text-black font-semibold text-2xl mb-4 text-center">
          Products Details
        </h2>

        <Toaster />

        <form onSubmit={submitForm} className={``}>
          <div className="grid grid-cols-2 gap-6">
            {/* images */}
            <div className={`relative col-span-2`}>
              <h2 className="font-semibold text-md mb-1">Products Images</h2>
              {formData.images?.length ? (
                <p className="pb-2 text-gray-600">
                  {formData.images?.length}/8 images selected.
                </p>
              ) : null}

              {formData.images.length ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {formData.images?.map((v, i) => {
                    return (
                      <div
                        key={i}
                        className="rounded-md group overflow-hidden relative border"
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={v.secure_url}
                          alt=""
                        />
                        <div className="hidden absolute top-0 left-0 w-full h-full bg-black/40 group-hover:flex justify-end items-end p-2">
                          <i className="bx text-white hover:bg-black/50 p-1 rounded-md cursor-pointer bxs-trash"></i>
                        </div>
                      </div>
                    );
                  })}

                  {formData.images.length != 8 && (
                    <CldUploadWidget
                      options={{
                        cropping: "server",
                        cropping_aspect_ratio: 1.5 / 1,
                      }}
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      onSuccess={(res) => {
                        var imgs = formData.images;
                        var croppedImageUrl = res.info?.secure_url;
                        if (res?.info?.coordinates?.custom[0]) {
                          const [x, y, width, height] =
                            res?.info?.coordinates?.custom[0];
                          var croppedImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/${res?.info?.public_id}.png`;
                        }

                        imgs.push({
                          public_id: res.info.public_id,
                          secure_url: croppedImageUrl,
                        });
                        setFormData({ ...formData, images: imgs });
                        saveChanges({ ...formData, images: imgs });
                        document.body.style.overflow = "auto";
                      }}
                    >
                      {({ open }) => {
                        return (
                          <label
                            onClick={() => open()}
                            htmlFor="images"
                            className="rounded-md p-4 cursor-pointer hover:bg-gray-100 flex flex-col justify-center items-center group overflow-hidden relative border"
                          >
                            <i className="bx mb-2 bx-images"></i>
                            <div>More Images</div>
                          </label>
                        );
                      }}
                    </CldUploadWidget>
                  )}
                </div>
              ) : (
                <CldUploadWidget
                  options={{
                    cropping: "server",
                    cropping_aspect_ratio: 1.5 / 1,
                  }}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={(res) => {
                    var imgs = formData.images;
                    var croppedImageUrl = res.info?.secure_url;
                    if (res?.info?.coordinates?.custom[0]) {
                      const [x, y, width, height] =
                        res?.info?.coordinates?.custom[0];
                      var croppedImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/${res?.info?.public_id}.png`;
                    }
                    imgs.push({
                      public_id: res.info.public_id,
                      secure_url: croppedImageUrl,
                    });
                    setFormData({ ...formData, images: imgs });
                    saveChanges({ ...formData, images: imgs });
                    document.body.style.overflow = "auto";
                  }}
                >
                  {({ open }) => {
                    return (
                      <label
                        onClick={() => open()}
                        htmlFor="images"
                        className="border text-xl bg-primary/5 cursor-pointer hover:bg-primary/10 border-dashed rounded-md border-primary p-4 flex justify-center items-center"
                      >
                        <i className="bx mr-2 bx-images"></i> Select Images
                      </label>
                    );
                  }}
                </CldUploadWidget>
              )}
            </div>

            {formInputs.map((v, i) => {
              var label = (
                <label
                  className="absolute flex items-center rounded-md bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-priborder-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor={v.name}
                >
                  {v.label}
                  {v.required && <div className="text-red-600 text-xl">*</div>}
                </label>
              );
              switch (v.type) {
                case "text":
                case "number":
                  return (
                    <div
                      key={i}
                      className={`relative bg-white col-span-2 sm:col-span-${v.cols}`}
                    >
                      <input
                        required={v.required}
                        id={v.name}
                        value={formData[v.name]}
                        onChange={changeHandler}
                        name={v.name}
                        maxLength={v.maxLength}
                        placeholder={v.placeholder || ""}
                        type={v.type}
                        className={`block placeholder:opacity-0 focus:placeholder:opacity-100 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer`}
                      />
                      {label}
                    </div>
                  );
                case "select":
                  return (
                    <div
                      key={i}
                      className={`relative bg-white col-span-2 sm:col-span-${v.cols}`}
                    >
                      <select
                        value={formData[v.name]}
                        required={v.required}
                        onChange={changeHandler}
                        name={v.name}
                        id={v.name}
                        className={`w-full px-2.5 pb-2.5 pt-3 placeholder:text-sm rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 border`}
                      >
                        <option value="">Select Option</option>
                        {v.options.map((a, b) => {
                          return (
                            <option value={v.values ? v.values[b] : a} key={b}>
                              {a}
                            </option>
                          );
                        })}
                      </select>
                      {label}
                    </div>
                  );
                case "textarea":
                  return (
                    <div
                      key={i}
                      className={`relative bg-white col-span-2 sm:col-span-${v.cols}`}
                    >
                      <textarea
                        required={v.required}
                        id={v.name}
                        value={formData[v.name]}
                        onChange={changeHandler}
                        name={v.name}
                        placeholder=""
                        type={v.type}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer`}
                      />
                      {label}
                    </div>
                  );
              }
            })}

            {/* Address + Location */}
            <div className="rounded-md col-span-2 pb-4">
              <h3 className="font-semibold text-xl mb-3">Address</h3>
              <div className="grid grid-cols-2 gap-6">
                {AddressInputs.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className={`relative bg-white col-span-2 sm:col-span-${v.cols}`}
                    >
                      <input
                        required={v.required}
                        id={v.name}
                        value={formData["address"][v.name.split(".")[1]]}
                        onChange={changeHandler}
                        name={v.name}
                        placeholder=""
                        type={v.type}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer`}
                      />
                      <label
                        className="absolute flex items-center rounded-md bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-priborder-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        htmlFor={v.name}
                      >
                        {v.label}
                        {v.required && (
                          <div className="text-red-600 text-xl">*</div>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="col-span-2">
              <h3 className="font-semibold text-xl mb-3">Location on Map</h3>
              <Map center={center} setCenter={setCenter} />
            </div>

            {/* Property Video */}
            <div className="col-span-2">
              <h3 className="font-semibold text-xl mb-3">
                Products Video (Optional)
              </h3>
              {formData.video ? (
                <div>
                  <CldVideoPlayer
                    width={100}
                    height={100}
                    src={formData.video}
                  />
                </div>
              ) : (
                <CldUploadWidget
                  options={{
                    sources: ["local"],
                    multiple: false,
                    showCompletedButton: true,
                    resourceType: "video",
                    showPoweredBy: false,
                    maxVideoFileSize: 105000000,
                  }}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={(res) => {
                    setFormData({ ...formData, video: res.info.public_id });
                    saveChanges({ ...formData, video: res.info.public_id });
                    document.body.style.overflow = "auto";
                  }}
                >
                  {({ open }) => {
                    return (
                      <label
                        onClick={() => open()}
                        className="border text-xl bg-primary/5 cursor-pointer hover:bg-primary/10 border-dashed rounded-md border-primary p-4 flex justify-center items-center"
                      >
                        <i className="bx mr-2 bx-video"></i> Select Video
                      </label>
                    );
                  }}
                </CldUploadWidget>
              )}
            </div>

            <div className="col-span-2 text-xs sm:text-base flex justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => deleteItem(formData._id)}
                  className="border-primary border px-3 py-2 rounded-md text-primary mr-3"
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => saveChanges(formData)}
                  className="border-primary border px-5 py-2 rounded-md text-primary mr-3"
                >
                  Save
                </button>

                <button className="bg-primary border-primary border hover:bg-primary px-5 py-2 rounded-md text-white">
                  <span>{formLoading ? "Processing..." : "Publish"}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListPropertyForm;
